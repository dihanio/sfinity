# 🌟 SFINITY Frontend

Aplikasi web Next.js modern dan sangat interaktif untuk proyek SFINITY. Dirancang dengan estetika yang kaya, animasi yang mulus, dan tata letak yang responsif untuk memberikan pengalaman pengguna yang premium.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 / React 19
- **Styling:** Tailwind CSS, Radix UI, Shadcn UI
- **Animasi:** Framer Motion, GSAP, Tailwind Animate
- **State Management:** Zustand, React Query (@tanstack/react-query)
- **Ikon:** Lucide React, Hugeicons
- **Komunikasi API:** Axios, Socket.io-client
- **Visualisasi Data:** Recharts
- **Lainnya:** Groq SDK, Tesseract.js, React Markdown

## 🚀 Cara Menjalankan

### Prasyarat
Pastikan Anda telah menginstal Node.js (v18+) dan npm di mesin Anda.

### Instalasi

1. **Clone repositori dan masuk ke direktori frontend:**
   ```bash
   cd sfinity-fe
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Environment Variables (Variabel Lingkungan):**
   Salin file `.env.example` menjadi `.env` (jika ada) atau atur variabel lingkungan sesuai dengan endpoint backend/AI.
   ```bash
   # Contoh .env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   NEXT_PUBLIC_AI_API_URL=http://localhost:8000
   ```

4. **Jalankan server development:**
   ```bash
   npm run dev
   ```

5. Buka [http://localhost:3000](http://localhost:3000) di browser Anda untuk melihat aplikasi.

## 📂 Struktur Proyek

- `src/components`: Komponen UI yang dapat digunakan kembali (Dashboard, Charts, Forms, dll)
- `src/app` atau `src/pages`: Routing aplikasi dan tampilan halaman
- `src/lib` atau `src/utils`: Fungsi utilitas dan konfigurasi
- `public`: Aset statis (gambar, ikon)
