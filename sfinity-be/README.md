<div align="center">
  <h1>⚙️ SFINITY Backend</h1>
  <p><b>Core API & Layanan Bisnis Logika Manajemen Keuangan</b></p>
</div>

SFINITY Backend adalah inti sistem (jantung operasional) yang memproses semua *request* dari antarmuka web, mengelola integritas data secara persisten di MongoDB, dan bertindak sebagai *gateway* penghubung menuju layanan AI.

---

## ✨ Fitur & Modul Utama

- **🔐 Autentikasi Aman:** Menggunakan JWT (JSON Web Tokens) dan hashing sandi (Bcrypt) untuk mengamankan identitas dan sesi pengguna.
- **💸 Modul Transaksi & Budget:** API komprehensif untuk mencatat pemasukan/pengeluaran, mengelompokkan kategori, serta menetapkan target batasan anggaran (*budgeting*) bulanan.
- **🎯 Gamification Engine:** Mengatur penambahan *Experience Points* (XP), pengecekan misi harian yang berhasil diselesaikan, dan logika kenaikan level pengguna.
- **📈 AI Gateway Service:** Modul khusus yang merutekan *request* (berupa kumpulan ringkasan transaksi pengguna) menuju *Machine Learning Engine* (FastAPI) untuk dievaluasi.
- **🔄 Real-time Updates:** Menerapkan Socket.io untuk memberikan notifikasi instan kepada pengguna jika ada peringatan status keuangan (Bahaya) atau pencapaian level baru.
- **📊 Pelaporan Khusus:** API yang meng-agregasi (mengumpulkan dan meringkas) jutaan baris transaksi menjadi metrik yang siap digunakan untuk grafik pada Frontend.

---

## 🛠️ Tech Stack & Dependencies

- **Platform:** Node.js
- **Web Framework:** Express.js 5.x
- **Database & ORM:** MongoDB menggunakan Mongoose
- **Keamanan:** JSONWebToken (`jsonwebtoken`), Bcrypt.js, CORS
- **Real-time:** Socket.io
- **Lingkungan & Log:** Dotenv, Morgan (Logger)

---

## 📂 Struktur Direktori Utama

```text
sfinity-be/
├── config/             # Pengaturan koneksi database MongoDB
├── constants/          # Variabel konstanta global (misal: Kode Status, Nama Level)
├── controllers/        # Pengendali logika API (Menyatukan service dan mengirim respons)
├── data/               # File JSON berisi data awal/seed (Misi default, artikel edukasi)
├── middleware/         # Proteksi route (Cek Token JWT), penanganan error
├── models/             # Definisi skema (Schema) database MongoDB via Mongoose
├── routes/             # Pemetaan URL Endpoints ke fungsi controller
│   ├── authRoutes.js         # Endpoint Login & Register
│   ├── transactionRoutes.js  # Endpoint Pemasukan & Pengeluaran
│   ├── aiRoutes.js           # Endpoint Penghubung ke SFINITY AI
│   └── ... (Modul lainnya)
├── services/           # Lapisan logika bisnis (Kalkulasi rumit, manipulasi data)
├── utils/              # Fungsi pendukung (Pembuat respons JSON baku, dll)
├── app.js              # Inisialisasi utama aplikasi Express
└── server.js           # Entry point untuk menjalankan HTTP server & Socket.io
```

---

## 🚀 Cara Instalasi & Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru.
- **MongoDB** sudah berjalan di mesin lokal Anda (localhost:27017) atau gunakan layanan Cloud (MongoDB Atlas).

### Langkah-langkah

1. Masuk ke direktori backend:
   ```bash
   cd sfinity-be
   ```

2. Instal seluruh dependensi:
   ```bash
   npm install
   ```

3. Konfigurasi Environment:
   Buat file `.env` di folder *root* backend ini, lalu isi konfigurasinya:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sfinity_db
   JWT_SECRET=rahasia_aman_sfinity_2026
   AI_API_URL=http://localhost:8000
   ```

4. Jalankan server tahap *development* (otomatis restart saat ada perubahan file berkat `nodemon`):
   ```bash
   npm run dev
   ```

5. Untuk menjalankan di tahap produksi:
   ```bash
   npm start
   ```

*(Secara default, API akan merespons di `http://localhost:5000`)*
