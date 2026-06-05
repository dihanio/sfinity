<div align="center">
  <h1>🎨 SFINITY Frontend</h1>
  <p><b>Aplikasi Antarmuka Pengguna & Dasbor Finansial Interaktif</b></p>
</div>

SFINITY Frontend adalah aplikasi web berbasis **Next.js** yang dirancang untuk memberikan pengalaman *budgeting* yang tidak membosankan. Melalui penggabungan visual yang memukau, animasi yang responsif, dan elemen permainan (*gamification*), pengguna akan merasa lebih termotivasi untuk mengelola keuangannya.

---

## ✨ Fitur Unggulan

- **📊 Dasbor Analitik Visual:** Menampilkan grafik interaktif (menggunakan Recharts) untuk *cashflow* bulanan, alokasi pengeluaran, dan kesehatan finansial.
- **🎮 Gamification System:** Pengguna bisa mendapatkan XP (Experience Points), naik level, dan mengumpulkan lencana (*badges*) setelah menyelesaikan misi harian seperti mencatat pengeluaran atau membaca artikel edukasi.
- **📸 AI Receipt Scanner:** Terintegrasi dengan fitur kamera (Tesseract.js OCR) yang memungkinkan pengguna memindai struk belanja fisik agar nominal dan kategori terisi secara otomatis tanpa harus mengetik manual.
- **✨ Animasi Premium:** Transisi halaman dan komponen dibuat hidup menggunakan kombinasi **Framer Motion** dan **GSAP**.
- **🤖 Integrasi AI:** Tampilan visual untuk laporan status kesehatan finansial (Bahaya, Waspada, Stabil, Sangat Sehat) yang ditarik langsung dari layanan *Machine Learning*.
- **📱 Responsif:** Dioptimalkan secara penuh untuk penggunaan di berbagai ukuran layar (Desktop, Tablet, dan Mobile).

---

## 🛠️ Tech Stack & Dependencies

- **Core Framework:** Next.js 16 (App Router), React 19
- **Styling:** Tailwind CSS v4, CSS Modules
- **UI Components:** Radix UI Primitives, Shadcn UI (Customized)
- **State Management:** 
  - Zustand (Local/Global State)
  - React Query / `@tanstack/react-query` (Server State & Caching)
- **Animations:** Framer Motion, GSAP, Tailwind Animate
- **Icons & Assets:** Lucide React, Hugeicons
- **Utilities:** Axios (HTTP Client), Socket.io-client (Real-time events), React Markdown

---

## 📂 Struktur Direktori Utama

```text
sfinity-fe/
├── public/                 # Gambar statis, aset ikon, logo
├── src/
│   ├── app/                # Konfigurasi routing Next.js (App Router)
│   ├── components/         # Komponen React yang dapat digunakan ulang (Reusable)
│   │   ├── dashboard/      # Widget grafik dan ringkasan dasbor
│   │   ├── gamification/   # Komponen level, lencana, progres XP
│   │   ├── scan/           # Antarmuka kamera dan pemindai OCR struk
│   │   ├── transactions/   # Daftar dan form transaksi
│   │   └── ui/             # Komponen dasar Shadcn UI (Button, Input, Dialog)
│   ├── data/               # Data dummy atau konstanta konfigurasi
│   ├── lib/                # Fungsi utilitas murni, format data, kalkulasi
│   ├── services/           # Logika pemanggilan API ke Backend via Axios
│   └── stores/             # Penyimpanan state global Zustand per modul
├── .env.example            # Contoh variabel lingkungan
└── package.json            # Daftar dependensi npm
```

---

## 🚀 Cara Instalasi & Menjalankan

### Prasyarat
- Node.js versi 18 atau lebih baru.
- Layanan Backend (API SFINITY) sebaiknya sudah berjalan untuk menghindari error pengambilan data.

### Langkah-langkah

1. Masuk ke direktori frontend:
   ```bash
   cd sfinity-fe
   ```

2. Instal seluruh dependensi:
   ```bash
   npm install
   ```

3. Konfigurasi Environment:
   Buat file `.env` dan sesuaikan URL API dengan milik Anda.
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. Jalankan server tahap *development*:
   ```bash
   npm run dev
   ```

5. Buka `http://localhost:3000` di peramban (browser) Anda.
