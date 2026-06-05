# ══════════════════════════════════════════════════════════════════════════════
#  SFINITY — FastAPI REST API (Entry Point)
#  Klasifikasi & Rekomendasi Perilaku Finansial Mahasiswa
#
#  Jalankan:
#    python app.py
#    atau: uvicorn app:app --host 0.0.0.0 --port 8000 --reload
# ══════════════════════════════════════════════════════════════════════════════

from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.services.model_service import model_service
from src.routes import health, predict


# ── Lifespan (startup / shutdown) ────────────────────────────────────────────
@asynccontextmanager
async def lifespan(app: FastAPI):
    """Load model artifacts saat startup."""
    model_service.load()
    yield
    print("SFINITY API shutting down.")


# ── App ──────────────────────────────────────────────────────────────────────
app = FastAPI(
    title="SFINITY API",
    description=(
        "Klasifikasi & Rekomendasi Perilaku Finansial Mahasiswa. "
        "Menerima data keuangan mahasiswa dan mengembalikan prediksi status finansial, "
        "rekomendasi tindakan, serta proyeksi keuangan 6 bulan."
    ),
    version="1.0.0",
    lifespan=lifespan,
)

# ── CORS ─────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],       # Ganti dengan domain spesifik di production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Register Routes ──────────────────────────────────────────────────────────
app.include_router(health.router)
app.include_router(predict.router)


# ── Run ──────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000)
