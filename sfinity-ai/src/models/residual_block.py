# ══════════════════════════════════════════════════════════════════════════════
#  ResidualBlock — Custom Keras Layer
#  Harus didefinisikan sebelum load model agar custom_objects tersedia.
# ══════════════════════════════════════════════════════════════════════════════

from tensorflow.keras import layers
from tensorflow.keras.regularizers import l2


class ResidualBlock(layers.Layer):
    """
    Skip-connection block untuk tabular data.
    input → Dense → BN → ReLU → Dropout → Dense → BN → (+skip) → ReLU
    """

    def __init__(self, units, dropout_rate=0.3, l2_reg=1e-4, **kwargs):
        super().__init__(**kwargs)
        self.units = units
        self.dropout_rate = dropout_rate
        self.l2_reg = l2_reg
        reg = l2(l2_reg)
        self.d1   = layers.Dense(units, kernel_regularizer=reg)
        self.d2   = layers.Dense(units, kernel_regularizer=reg)
        self.bn1  = layers.BatchNormalization()
        self.bn2  = layers.BatchNormalization()
        self.act1 = layers.Activation("relu")
        self.act2 = layers.Activation("relu")
        self.drop = layers.Dropout(dropout_rate)
        self.proj = None

    def build(self, input_shape):
        if input_shape[-1] != self.units:
            self.proj = layers.Dense(self.units, use_bias=False)
        super().build(input_shape)

    def call(self, x, training=False):
        h = self.act1(self.bn1(self.d1(x), training=training))
        h = self.drop(h, training=training)
        h = self.bn2(self.d2(h), training=training)
        skip = self.proj(x) if self.proj else x
        return self.act2(h + skip)

    def get_config(self):
        cfg = super().get_config()
        cfg.update({
            "units": self.units,
            "dropout_rate": self.dropout_rate,
            "l2_reg": self.l2_reg,
        })
        return cfg
