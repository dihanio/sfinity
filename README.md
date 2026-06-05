<div align="center">
  <h1>🌟 SFINITY</h1>
  <p><b>Platform Manajemen & Klasifikasi Keuangan Mahasiswa Terintegrasi AI</b></p>
  <p>SFINITY membantu mahasiswa melacak pengeluaran, mencapai target finansial, dan mendapatkan rekomendasi cerdas dari Artificial Intelligence berbasis gaya hidup mereka, semuanya dibalut dalam pengalaman yang seru (*gamified*).</p>
</div>

---

## 📖 Tentang Proyek
Mengelola keuangan bagi mahasiswa seringkali membingungkan. SFINITY hadir bukan hanya sebagai buku kas digital, melainkan sebagai asisten finansial pribadi. Dengan pendekatan **Gamification** (level, misi harian, lencana) dan **Artificial Intelligence** (klasifikasi tingkat bahaya finansial & proyeksi tabungan), mahasiswa didorong untuk lebih sadar dan bijak dalam mengelola uang mereka.

## ✨ Fitur Utama
1. **🤖 AI Financial Health:** Mengklasifikasikan kondisi keuangan (Bahaya, Waspada, Stabil, Sangat Sehat) dan memberikan saran perbaikan spesifik.
2. **🎯 Gamification & Missions:** Misi harian, perolehan XP, dan kenaikan level untuk memotivasi pengguna berhemat.
3. **🧾 Receipt Scanner (OCR):** Pindai struk belanja dengan kamera untuk mencatat pengeluaran secara otomatis.
4. **📊 Interactive Dashboard:** Analisis pengeluaran bulanan, distribusi kategori, dan grafik *cashflow*.
5. **🎯 Goals & Budgeting:** Tetapkan target tabungan dan batas pengeluaran bulanan.
6. **📚 Financial Education:** Akses ke artikel dan video literasi keuangan terkurasi.

---

## 🏗️ Arsitektur & Struktur Repositori

Proyek ini dibangun menggunakan arsitektur *Monorepo* modern yang memisahkan tanggung jawab ke dalam 3 layanan (*services*):

### 1. 🎨 [Frontend (`sfinity-fe`)](./sfinity-fe)
Aplikasi antarmuka pengguna yang sangat interaktif dan memanjakan mata.
- **Teknologi:** Next.js 16 (App Router), React 19, Tailwind CSS, Framer Motion, GSAP.
- **Peran:** Menyajikan visualisasi data, antarmuka scanner struk, animasi gamifikasi, dan *state management* (Zustand & React Query).
- [📖 Baca Dokumentasi Frontend](./sfinity-fe/README.md)

### 2. ⚙️ [Backend (`sfinity-be`)](./sfinity-be)
Layanan API utama yang mengelola logika bisnis dan bertindak sebagai jembatan ke database dan AI.
- **Teknologi:** Node.js, Express.js, MongoDB (Mongoose), Socket.io, JWT.
- **Peran:** Autentikasi, manajemen transaksi, kalkulasi XP/Level, CRUD target/budget, dan *real-time updates*.
- [📖 Baca Dokumentasi Backend](./sfinity-be/README.md)

### 3. 🧠 [Artificial Intelligence (`sfinity-ai`)](./sfinity-ai)
Mesin analitik berbasis Machine Learning untuk *Decision Support System*.
- **Teknologi:** Python, FastAPI, TensorFlow/Keras, Scikit-Learn.
- **Peran:** Menerima profil dan data pengeluaran mahasiswa, lalu mengembalikan status klasifikasi, proyeksi 6 bulan ke depan, dan rekomendasi langkah darurat.
- [📖 Baca Dokumentasi AI](./sfinity-ai/README.md)

---

## 🚀 Panduan Menjalankan Keseluruhan Sistem

Untuk menjalankan SFINITY secara lokal, Anda membutuhkan **Node.js**, **Python**, dan **MongoDB** terinstal di komputer Anda. Anda perlu membuka **3 tab terminal terpisah**.

### Terminal 1: Menjalankan Backend (API Utama)
Pastikan MongoDB sudah berjalan (lokal atau Atlas).
```bash
cd sfinity-be
npm install
# Buat file .env sesuai contoh (berisi PORT, MONGO_URI, JWT_SECRET)
npm run dev
```
*Backend akan berjalan di `http://localhost:5000`*

### Terminal 2: Menjalankan AI Engine (FastAPI)
```bash
cd sfinity-ai
# Sangat disarankan membuat virtual environment (venv)
pip install -r requirements.txt
python app.py
```
*AI Engine akan berjalan di `http://localhost:8000`*

### Terminal 3: Menjalankan Frontend (Next.js)
```bash
cd sfinity-fe
npm install
# Buat file .env sesuai contoh (NEXT_PUBLIC_API_URL, dll)
npm run dev
```
*Aplikasi web akan berjalan di `http://localhost:3000`*

🌟 **Selesai!** Buka `http://localhost:3000` di browser untuk mulai menggunakan SFINITY.

---

## 👥 Pengembang
Dikembangkan oleh **Diha Anfeu Nio Julaynda** - Mahasiswa Universitas Negeri Surabaya (UNESA).
