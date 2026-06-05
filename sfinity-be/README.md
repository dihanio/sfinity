# 🌟 SFINITY Backend

Layanan backend yang tangguh untuk proyek SFINITY. Dibangun menggunakan Node.js dan Express, menyediakan RESTful API, komunikasi real-time melalui Socket.io, dan integrasi database yang aman menggunakan MongoDB.

## 🛠️ Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (melalui Mongoose)
- **Autentikasi:** JWT (JSON Web Tokens), bcryptjs
- **Real-time:** Socket.io
- **Middleware:** CORS, Morgan (Logger)
- **Environment:** dotenv

## 🚀 Cara Menjalankan

### Prasyarat
Pastikan Anda telah menginstal Node.js dan MongoDB yang sedang berjalan di mesin Anda.

### Instalasi

1. **Masuk ke direktori backend:**
   ```bash
   cd sfinity-be
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Environment Variables (Variabel Lingkungan):**
   Buat file `.env` di direktori utama berdasarkan `.env.example` (jika ada) dan atur variabel Anda:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/sfinity
   JWT_SECRET=rahasia_super_aman_anda
   ```

4. **Jalankan server development:**
   ```bash
   npm run dev
   ```
   *(Perintah ini menggunakan `nodemon` untuk melakukan muat ulang otomatis saat ada perubahan file)*

5. Untuk menjalankan di mode produksi:
   ```bash
   npm start
   ```

## 📂 Struktur Proyek

- `config/`: File konfigurasi (contoh: koneksi database)
- `constants/`: Konstanta global dan enum
- `controllers/`: Inti logika pemrosesan request dan respons API
- `data/`: Data awal (seed data) atau sumber daya data statis
- `middleware/`: Middleware Express (autentikasi, penanganan error, dll)
- `models/`: Skema database Mongoose
- `routes/`: Definisi endpoint API
- `services/`: Lapisan logika bisnis yang kompleks
- `utils/`: Fungsi bantuan (helper) dan utilitas
- `app.js`: Pengaturan utama aplikasi Express
- `server.js`: Titik masuk server (entry point) dan inisialisasi Socket.io
