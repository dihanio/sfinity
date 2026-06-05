# 🌟 SFINITY

**SFINITY** adalah sebuah platform manajemen dan klasifikasi keuangan interaktif khusus untuk mahasiswa, terintegrasi dengan kecerdasan buatan (AI) untuk memberikan analisis pengeluaran dan rekomendasi finansial yang cerdas.

Proyek ini dibangun menggunakan arsitektur yang terbagi menjadi tiga layanan utama (Frontend, Backend, dan AI API).

---

## 🏗️ Struktur Repositori

Repositori ini menampung seluruh *source code* SFINITY yang terbagi ke dalam tiga folder (Anda bisa mengklik masing-masing folder untuk melihat dokumentasi detailnya):

### 1. 🎨 [Frontend (`sfinity-fe`)](./sfinity-fe)
Aplikasi antarmuka pengguna (User Interface) yang interaktif, dinamis, dan dilengkapi elemen *gamification*.
- **Tech Stack:** Next.js 16, React 19, Tailwind CSS, Framer Motion, GSAP, Zustand.
- [Baca dokumentasi Frontend di sini](./sfinity-fe/README.md)

### 2. ⚙️ [Backend (`sfinity-be`)](./sfinity-be)
Layanan API utama yang menangani manajemen data pengguna, autentikasi, manajemen transaksi, dan komunikasi *real-time*.
- **Tech Stack:** Node.js, Express.js, MongoDB (Mongoose), Socket.io, JWT.
- [Baca dokumentasi Backend di sini](./sfinity-be/README.md)

### 3. 🧠 [Kecerdasan Buatan / AI (`sfinity-ai`)](./sfinity-ai)
Mesin cerdas (*Machine Learning Engine*) yang bertugas untuk mengklasifikasi status kesehatan finansial mahasiswa (Bahaya, Waspada, Stabil, Sangat Sehat), serta membuat simulasi/proyeksi tabungan.
- **Tech Stack:** Python, FastAPI, TensorFlow/Keras, Scikit-Learn.
- [Baca dokumentasi AI di sini](./sfinity-ai/README.md)

---

## 🚀 Cara Menjalankan SFINITY (Lokal)

Untuk menjalankan proyek ini secara utuh di komputer Anda, Anda perlu membuka **3 terminal terpisah** dan menjalankan masing-masing layanan secara bersamaan.

### Terminal 1: Backend
Pastikan MongoDB sudah menyala, lalu masuk ke direktori Backend dan jalankan:
```bash
cd sfinity-be
npm install
npm run dev
```
*(Berjalan secara default di port 5000)*

### Terminal 2: AI (Machine Learning)
Masuk ke direktori AI, pastikan dependensi Python sudah terinstal, lalu jalankan API:
```bash
cd sfinity-ai
pip install -r requirements.txt
python app.py
```
*(Berjalan secara default di port 8000)*

### Terminal 3: Frontend
Masuk ke direktori Frontend, dan jalankan tampilan web:
```bash
cd sfinity-fe
npm install
npm run dev
```
*(Berjalan secara default di port 3000)*

Setelah ketiga layanan di atas berstatus **Running**, Anda bisa membuka aplikasi secara utuh melalui browser di **http://localhost:3000** 🚀

---

## 👥 Pengembang
- **Diha Anfeu Nio Julaynda**
