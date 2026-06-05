<div align="center">
  <h1>🌟 SFINITY</h1>
  <p><b>Solusi Cerdas untuk Mengelola Keuangan dan Investasi</b></p>
  <p><i>Capstone Project CC26-PSU174 — Coding Camp 2026 powered by DBS Foundation</i></p>
</div>

---

## 📖 Latar Belakang & Problem Statement
Perkembangan teknologi finansial di Indonesia mendorong peningkatan penggunaan layanan keuangan digital. Namun, tingginya inklusi keuangan pada generasi muda (khususnya mahasiswa) seringkali tidak dibarengi dengan tingkat literasi yang cukup. Adanya kecenderungan konsumtif dan ketergantungan pada *e-wallet* atau *paylater* mengakibatkan mahasiswa belum optimal dalam mengelola keuangannya.

SFINITY hadir sebagai **Minimum Viable Product (MVP)** untuk menjawab permasalahan tersebut. Sistem ini dibangun tidak hanya sebagai alat pencatatan transaksi biasa, tetapi dilengkapi dengan pendekatan *Machine Learning* untuk menganalisis pola pengeluaran secara otomatis dan personal, memberikan rekomendasi, serta menyertakan elemen edukasi dan *gamification*.

## ✨ Fitur Unggulan (Hasil Implementasi)
Berdasarkan pengembangan sistem *end-to-end*, berikut adalah fitur utama yang berjalan di dalam SFINITY:
1. **🤖 AI Financial Health:** Menganalisis dan mengklasifikasikan kondisi keuangan (Bahaya, Waspada, Stabil, Sangat Sehat) berdasarkan transaksi dan profil pengguna menggunakan Deep Learning.
2. **🎯 Gamification & Missions:** Menyediakan misi harian, perolehan XP, dan sistem kenaikan level untuk memotivasi pengguna agar lebih bijak secara finansial.
3. **🧾 Receipt Scanner (OCR):** Fitur pemindai struk belanja fisik agar nominal dan kategori terisi secara otomatis.
4. **📊 Interactive Dashboard:** Analisis pengeluaran bulanan, distribusi kategori, dan grafik *cashflow* yang responsif.
5. **🎯 Goals & Budgeting:** Membantu pengguna menetapkan target tabungan dan memantau batas pengeluaran bulanan.
6. **📚 Financial Education:** Akses rekomendasi dan artikel literasi keuangan (berbasis *rule-based* system yang menyesuaikan klasifikasi ML).

---

## 🏗️ Arsitektur & Struktur Repositori

Proyek ini mengintegrasikan AI/ML, Backend, dan Frontend secara *end-to-end* dalam bentuk *monorepo*. Klik tautan di bawah untuk melihat dokumentasi teknis masing-masing layanan:

### 1. 🎨 [Frontend (`sfinity-fe`)](./sfinity-fe)
Aplikasi antarmuka pengguna interaktif dan responsif dengan fitur *gamification*.
- **Tech Stack:** Next.js 16, React 19, Tailwind CSS, Framer Motion, Zustand.

### 2. ⚙️ [Backend (`sfinity-be`)](./sfinity-be)
Layanan REST API utama yang mengamankan data dan memproses logika bisnis.
- **Tech Stack:** Node.js, Express.js, MongoDB (Mongoose), Socket.io, JWT.

### 3. 🧠 [Artificial Intelligence (`sfinity-ai`)](./sfinity-ai)
Mesin prediktif berbasis *Machine Learning* untuk mengidentifikasi perilaku boros dan *forecasting*.
- **Tech Stack:** Python, FastAPI, TensorFlow/Keras, Scikit-Learn.

---

## 🚀 Panduan Menjalankan Sistem (Lokal)

Untuk menjalankan seluruh ekosistem SFINITY, Anda membutuhkan **Node.js**, **Python**, dan **MongoDB**. Anda harus membuka **3 terminal terpisah**.

### Terminal 1: Backend (Express.js)
Pastikan MongoDB sudah berjalan (lokal atau cloud).
```bash
cd sfinity-be
npm install
npm run dev
```

### Terminal 2: AI Engine (FastAPI)
```bash
cd sfinity-ai
# Sangat disarankan membuat virtual environment (venv)
pip install -r requirements.txt
python app.py
```

### Terminal 3: Frontend (Next.js)
```bash
cd sfinity-fe
npm install
npm run dev
```

Setelah ketiga layanan berstatus berjalan tanpa *error*, buka SFINITY melalui browser di **http://localhost:3000** 🚀

---

## 👥 Tim Pengembang (CC26-PSU174)
Pengembangan SFINITY dilakukan dengan kerja sama *end-to-end* oleh:

| ID Registrasi | Nama Lengkap | Peran Utama |
| :--- | :--- | :--- |
| CDCC123D6Y0309 | **Bintang Qaulan Tsaqiila** | Data Scientist (Dashboard & Data Support) |
| CDCC284D6Y1229 | **Daniel Rizal Alonso** | Data Scientist (Data & Insight) |
| CACC284D6Y1757 | **Diha Anfeu Nio Julaynda** | AI Engineer (Deep Learning Model) |
| CACC284D6X1216 | **Aulia Agastya Herawati** | AI Engineer (Recommendation System) |
| CFCC154D6X1145 | **Auni Ulil Qisty** | Full-Stack Developer (Frontend/UI) |
| CFCC010D6X2167 | **Azzahrah Nabila** | Full-Stack Developer (Backend/API) |
