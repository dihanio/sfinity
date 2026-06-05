<div align="center">
  <h1>🧠 SFINITY AI</h1>
  <p><b>Layanan Klasifikasi & Mesin Rekomendasi Finansial</b></p>
</div>

API SFINITY berbasis **FastAPI** ini digunakan sebagai "otak utama" untuk menganalisis perilaku keuangan mahasiswa menggunakan model *deep learning* (Multilayer Perceptron dengan Custom Residual Blocks). 

API ini memproses data demografis, pendapatan, dan alokasi pengeluaran ke dalam 10 kategori untuk mengklasifikasikan status keuangan mahasiswa, memberikan rekomendasi finansial darurat, serta memproyeksikan simulasi saldo tabungan selama 6 bulan ke depan dalam 3 skenario gaya hidup berbeda.

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

   > **Catatan Penting:** Uvicorn dikonfigurasi untuk berjalan **tanpa reload** secara default agar TensorFlow tidak me-load model berkali-kali pada saat proses pengembangan (startup) yang bisa memperlambat inisialisasi.

---

### Opsi B: Menjalankan dengan Docker 🐳

Untuk mempermudah integrasi dengan backend tanpa perlu menginstal Python atau TensorFlow di server utama komputer Anda:

1. **Jalankan menggunakan Docker Compose:**
   ```bash
   docker-compose up -d --build
   ```

2. **Hentikan Layanan:**
   ```bash
   docker-compose down
   ```

---

## 🔌 API Endpoints Utama

### 1. Health Check & Load Test
* **Method:** `GET`
* **Path:** `/` atau `/health`
* **Deskripsi:** Memeriksa status server dan memastikan bahwa model AI telah sukses masuk ke dalam memori RAM.

### 2. SFINITY Core Predictor & Recommender
* **Method:** `POST`
* **Path:** `/predict`
* **Deskripsi:** Endpoint paling penting. Menerima data keuangan utuh dari mahasiswa dan memproses 3 tahapan (Klasifikasi Target, Pembuatan Skenario Forecasting, Penyusunan Rekomendasi).

---

## 📖 Dokumentasi Interaktif (Swagger UI)

Dokumentasi lengkap, spesifikasi skema input-output, serta sandbox testing (*Try it out*) dapat diakses langsung melalui browser setelah server FastAPI berjalan:

* **Swagger UI:** [http://localhost:8000/docs](http://localhost:8000/docs)
* **ReDoc:** [http://localhost:8000/redoc](http://localhost:8000/redoc)
