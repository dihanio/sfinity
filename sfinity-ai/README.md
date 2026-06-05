# 🌟 SFINITY AI — Layanan Klasifikasi & Rekomendasi Finansial Mahasiswa

API SFINITY berbasis **FastAPI** ini digunakan untuk menganalisis perilaku keuangan mahasiswa menggunakan model deep learning (Multilayer Perceptron dengan Custom Residual Blocks). API ini memproses data demografis, pendapatan, dan alokasi pengeluaran ke dalam 10 kategori untuk mengklasifikasikan status keuangan mahasiswa, memberikan rekomendasi finansial, serta memproyeksikan saldo tabungan selama 6 bulan ke depan dalam 3 skenario gaya hidup berbeda.

---

## 📂 Struktur Proyek

```text
sfinity-ai/
├── app.py                          # Entry point aplikasi FastAPI
├── requirements.txt                # Dependensi Python & ML
├── Dockerfile                      # Dockerfile untuk deployment mandiri
├── docker-compose.yml              # Konfigurasi Docker Compose
├── .gitignore                      # Konfigurasi git ignore
├── model/                          # Menyimpan artefak model machine learning
│   ├── best_sfinity_model.keras    # Model saraf Keras (.keras)
│   ├── preprocessor.pkl            # StandardScaler/OneHotEncoder
│   ├── label_encoder.pkl           # Label Target (Bahaya, Waspada, Stabil, Sangat Sehat)
│   └── feature_meta.json           # Metadata fitur yang dibutuhkan model
├── notebook/                       # Folder riset & eksperimen data
│   ├── Salinan_dari_bismillah.ipynb
│   └── hasil_clustering_finansial_IDR (3).csv
└── src/                            # Source code modular
    ├── config.py                   # Konstanta global, path, dan segment metadata
    ├── models/                     # Representasi data & custom layers
    │   ├── schemas.py              # Validasi request body (Pydantic)
    │   └── residual_block.py       # Custom Keras layer untuk deserialisasi model
    ├── services/                   # Business logic / Layanan
    │   ├── model_service.py        # Loading model & pipeline inference (Singleton)
    │   ├── recommendation.py       # Pembuat rekomendasi finansial spesifik segmen
    │   └── forecast.py             # Mesin proyeksi finansial 3 skenario
    └── routes/                     # Router API endpoints
        ├── health.py               # Endpoint cek kesehatan & metadata
        └── predict.py              # Endpoint utama proses prediksi
```

---

## ⚡ Cara Menjalankan Aplikasi

### Opsi A: Menjalankan Secara Lokal (Python)

1. **Buat Virtual Environment & Aktifkan:**
   ```bash
   python -m venv venv
   # Di Windows:
   .\venv\Scripts\activate
   # Di macOS/Linux:
   source venv/bin/activate
   ```

2. **Instal Dependensi:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Jalankan Server Uvicorn:**
   ```bash
   python app.py
   ```
   *Server akan berjalan di: **`http://localhost:8000`***

   > [!NOTE]
   > Uvicorn dikonfigurasi untuk berjalan **tanpa reload** secara default agar TensorFlow tidak me-load model berkali-kali pada startup yang memperlambat inisialisasi.

---

### Opsi B: Menjalankan dengan Docker 🐳

Untuk mempermudah integrasi dengan backend tanpa perlu menginstal Python atau TensorFlow di server utama:

1. **Jalankan menggunakan Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

2. **Hentikan Layanan:**
   ```bash
   docker-compose down
   ```

---

## 🔌 API Endpoints

### 1. Health Check
* **Method:** `GET`
* **Path:** `/` atau `/health`
* **Deskripsi:** Memeriksa status server dan apakah model ML telah berhasil di-load di memori.

### 2. Model Metadata
* **Method:** `GET`
* **Path:** `/meta`
* **Deskripsi:** Mengembalikan informasi daftar fitur numerik, kategorikal, dan klasifikasi kelas model.

### 3. Prediksi & Rekomendasi Utama
* **Method:** `POST`
* **Path:** `/predict`
* **Request Body (JSON):**
```json
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
  "nama": "Mahasiswa Demo"
}
```

* **Response Body (JSON):**
```json
{
  "success": true,
  "nama": "Mahasiswa Demo",
  "prediksi": {
    "label": "Bahaya",
    "icon": "🔴",
    "confidence": 100.0,
    "probabilities": {
      "Bahaya": 100.0,
      "Sangat Sehat": 0.0,
      "Stabil": 0.0,
      "Waspada": 0.0
    }
  },
  "rekomendasi": {
    "label": "Bahaya",
    "icon": "🔴",
    "color": "#e76f51",
    "tagline": "KONDISI BAHAYA! Pengeluaran melebihi batas aman...",
    "ringkasan": {
      "total_pemasukan": 16000000,
      "total_pengeluaran": 15200000,
      "sisa_atau_defisit": 800000,
      "status_sisa": "SURPLUS",
      "rasio_pengeluaran_pct": 95.0,
      "rasio_tabungan_pct": 5.0,
      "total_non_esensial": 3600000
    },
    "risiko": [
      "Risiko utang karena pengeluaran melebihi pemasukan",
      "Tidak ada buffer untuk keadaan darurat",
      "Potensi gagal bayar UKT / kost jika tidak segera diatasi",
      "Stres finansial berdampak pada performa akademik"
    ],
    "tindakan_darurat": [
      "SEGERA buat daftar pengeluaran minggu ini dan coret semua yang bukan kebutuhan primer",
      "Hentikan sementara langganan streaming, gym, atau layanan berbayar",
      "Masak sendiri minimal 5 hari dalam seminggu — hemat 30-40% biaya makan",
      "Hubungi bagian kemahasiswaan untuk informasi beasiswa darurat atau cicilan UKT",
      "Cari sumber penghasilan tambahan: freelance, asisten dosen, jualan online"
    ],
    "rekomendasi_jangka_pendek": [...],
    "rekomendasi_jangka_panjang": [...],
    "target": {
      "target_saving_pct": 10,
      "target_saving_amount": 1600000,
      "selisih_dari_target": 800000,
      "pesan": "Kamu perlu menambah Rp 800.000 per bulan untuk mencapai target tabungan 10%."
    }
  },
  "forecast": {
    "status_quo": {
      "nama": "Status Quo",
      "keterangan": "Tidak ada perubahan gaya hidup",
      "saving_per_bulan": 800000,
      "pengeluaran_per_bulan": 15200000,
      "rasio_pengeluaran_pct": 95.0,
      "rasio_tabungan_pct": 5.0,
      "total_saving_6_bulan": 4800000,
      "dana_darurat_3x": 45600000,
      "bulan_capai_dana_darurat": 57.0,
      "status_prediksi": "Bahaya",
      "timeline": [
        { "bulan": 1, "tabungan_kumulatif": 800000, "status": "Bahaya" },
        { "bulan": 2, "tabungan_kumulatif": 1600000, "status": "Bahaya" }
        // ... s/d bulan ke-6
      ]
    },
    "perbaikan_moderat": { ... },
    "perbaikan_agresif": { ... }
  }
}
```

---

## 🛠️ Contoh Integrasi Backend (Node.js / Express)

Gunakan package `axios` untuk melakukan request dari backend Node.js ke API SFINITY AI:

```javascript
const axios = require('axios');

async function getFinancialRecommendation(studentData) {
  try {
    const response = await axios.post('http://localhost:8000/predict', studentData);
    
    if (response.data.success) {
      const { prediksi, rekomendasi, forecast } = response.data;
      console.log(`Prediksi Keuangan: ${prediksi.label} (${prediksi.confidence}%)`);
      console.log(`Pesan/Tagline: ${rekomendasi.tagline}`);
      return { prediksi, rekomendasi, forecast };
    }
  } catch (error) {
    console.error('Gagal mengambil data prediksi:', error.message);
    throw error;
  }
}
```

---

## 📖 Dokumentasi Interaktif (Swagger UI)

Dokumentasi lengkap, spesifikasi skema input-output, serta sandbox testing (Try it out) dapat diakses langsung melalui browser setelah server berjalan:

* **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
