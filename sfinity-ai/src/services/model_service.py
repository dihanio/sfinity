# ══════════════════════════════════════════════════════════════════════════════
#  ModelService — Load artefak & inference
# ══════════════════════════════════════════════════════════════════════════════

import json
import joblib
import numpy as np
import pandas as pd
import tensorflow as tf

from src.config import (
    MODEL_PATH, PREPROCESSOR_PATH, LABEL_ENC_PATH, FEATURE_META_PATH,
    SPENDING_COLS, ESS_COLS, NON_ESS_COLS, LABEL_ICON,
)
from src.models.residual_block import ResidualBlock


class ModelService:
    """Singleton-style service untuk load model dan menjalankan inference."""

    def __init__(self):
        self.model = None
        self.preprocessor = None
        self.label_enc = None
        self.feature_meta = None
        self._loaded = False

    # ── Load ──────────────────────────────────────────────────────────────────

    def load(self):
        """Load semua artefak model dari disk."""
        self.model = tf.keras.models.load_model(
            MODEL_PATH,
            custom_objects={"ResidualBlock": ResidualBlock},
        )
        self.preprocessor = joblib.load(PREPROCESSOR_PATH)
        self.label_enc    = joblib.load(LABEL_ENC_PATH)

        with open(FEATURE_META_PATH, "r", encoding="utf-8") as f:
            self.feature_meta = json.load(f)

        self._loaded = True

        print(f"[OK] Model loaded       : {MODEL_PATH}")
        print(f"[OK] Preprocessor loaded : {PREPROCESSOR_PATH}")
        print(f"[OK] LabelEncoder loaded : {LABEL_ENC_PATH}")
        print(f"[OK] Feature meta loaded : {FEATURE_META_PATH}")
        print(f"     Classes : {list(self.label_enc.classes_)}")
        print(f"     Features: {self.feature_meta['n_features']}")

    @property
    def is_ready(self) -> bool:
        return self._loaded

    # ── Feature Engineering ───────────────────────────────────────────────────

    def _engineer_features(self, user: dict) -> pd.DataFrame:
        """Replicate feature engineering dari notebook training."""
        eps = 1e-6
        user_df = pd.DataFrame([user])

        total_exp = sum(user.get(k, 0) for k in SPENDING_COLS)
        total_inc = user.get("pendapatan", 0) + user.get("bantuan", 0)
        sisa      = total_inc - total_exp
        ess       = sum(user.get(k, 0) for k in ESS_COLS)
        ne        = sum(user.get(k, 0) for k in NON_ESS_COLS)

        user_df["saving_ratio"]     = sisa / (total_inc + eps)
        user_df["dependency_ratio"] = user.get("bantuan", 0) / (total_inc + eps)
        user_df["ess_ratio"]        = ess / (total_exp + eps)
        user_df["disc_ratio"]       = ne / (total_exp + eps)
        user_df["hiburan_ratio"]    = user.get("hiburan", 0) / (total_exp + eps)
        user_df["teknologi_ratio"]  = user.get("teknologi", 0) / (total_exp + eps)

        rasio_exp = total_exp / (total_inc + eps)
        disc_r    = ne / (total_exp + eps)
        user_df["pressure_index"]   = rasio_exp * (1 + disc_r)

        return user_df

    # ── Inference ─────────────────────────────────────────────────────────────

    def predict(self, user: dict) -> dict:
        """
        Jalankan inference: feature engineering → preprocess → predict.

        Returns
        -------
        dict dengan keys: label, confidence, probabilities
        """
        RAW_NUM = self.feature_meta["RAW_NUM"]
        RAW_CAT = self.feature_meta["RAW_CAT"]

        user_df = self._engineer_features(user)
        input_p = self.preprocessor.transform(user_df[RAW_NUM + RAW_CAT])
        probs   = self.model.predict(input_p, verbose=0)[0]
        idx     = int(np.argmax(probs))
        label   = self.label_enc.inverse_transform([idx])[0]
        conf    = float(probs[idx])

        probabilities = {
            cls: round(float(p) * 100, 2)
            for cls, p in zip(self.label_enc.classes_, probs)
        }

        return {
            "label": label,
            "icon": LABEL_ICON.get(label, ""),
            "confidence": round(conf * 100, 2),
            "probabilities": probabilities,
        }


# ── Singleton instance ────────────────────────────────────────────────────────
model_service = ModelService()
