# ══════════════════════════════════════════════════════════════════════════════
#  Pydantic Schemas — Request & Response Models
# ══════════════════════════════════════════════════════════════════════════════

from pydantic import BaseModel, Field
from typing import Optional


class UserInput(BaseModel):
    """Data keuangan mahasiswa untuk prediksi."""

    # Demografis
    usia: int = Field(..., ge=15, le=60, description="Usia mahasiswa")
    gender: str = Field(..., description="Gender: Male / Female / Non-binary")
    year_in_school: str = Field(
        ..., description="Tahun studi: Freshman / Sophomore / Junior / Senior"
    )
    major: str = Field(
        ..., description="Jurusan, contoh: Computer Science, Engineering, dll."
    )
    preferred_payment_method: str = Field(
        ...,
        description="Metode pembayaran: Cash / Credit/Debit Card / Mobile Payment App",
    )

    # Pemasukan
    pendapatan: float = Field(..., ge=0, description="Pendapatan bulanan (IDR)")
    bantuan: float = Field(0, ge=0, description="Bantuan/beasiswa bulanan (IDR)")

    # Pengeluaran (10 kategori)
    pendidikan: float = Field(0, ge=0, description="Pengeluaran pendidikan (IDR)")
    tempat_tinggal: float = Field(
        0, ge=0, description="Pengeluaran tempat tinggal (IDR)"
    )
    makanan: float = Field(0, ge=0, description="Pengeluaran makanan (IDR)")
    transportasi: float = Field(0, ge=0, description="Pengeluaran transportasi (IDR)")
    buku: float = Field(0, ge=0, description="Pengeluaran buku (IDR)")
    hiburan: float = Field(0, ge=0, description="Pengeluaran hiburan (IDR)")
    perawatan: float = Field(0, ge=0, description="Pengeluaran perawatan (IDR)")
    teknologi: float = Field(0, ge=0, description="Pengeluaran teknologi (IDR)")
    kesehatan: float = Field(0, ge=0, description="Pengeluaran kesehatan (IDR)")
    lainnya: float = Field(0, ge=0, description="Pengeluaran lainnya (IDR)")

    # Optional
    nama: Optional[str] = Field("User", description="Nama mahasiswa (untuk label)")

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "usia": 20,
                    "gender": "Female",
                    "year_in_school": "Sophomore",
                    "major": "Engineering",
                    "preferred_payment_method": "Credit/Debit Card",
                    "pendapatan": 14000000,
                    "bantuan": 2000000,
                    "pendidikan": 4200000,
                    "tempat_tinggal": 3500000,
                    "makanan": 2100000,
                    "transportasi": 600000,
                    "buku": 800000,
                    "hiburan": 1200000,
                    "perawatan": 600000,
                    "teknologi": 1100000,
                    "kesehatan": 400000,
                    "lainnya": 700000,
                    "nama": "Mahasiswa Demo",
                }
            ]
        }
    }
