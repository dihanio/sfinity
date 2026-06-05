# Dokumen Project Plan
**Coding Camp 2026 powered by DBS Foundation**

- **ID Tim Capstone Project**: CC26-PSU174
- **Tema Capstone**: Revolusi Teknologi Keuangan (Fintech) untuk Generasi Muda
- **Nama/Judul Proyek**: SFINITY: Solusi Cerdas untuk Mengelola Keuangan dan Investasi

## List Anggota
| ID Registrasi | Nama Lengkap | Peran | Status |
| :--- | :--- | :--- | :--- |
| CDCC123D6Y0309 | Bintang Qaulan Tsaqiila | Data Scientist | Aktif |
| CDCC284D6Y1229 | Daniel Rizal Alonso | Data Scientist | Aktif |
| CACC284D6Y1757 | Diha Anfeu Nio Julaynda | AI Engineer | Aktif |
| CACC284D6X1216 | Aulia Agastya Herawati | AI Engineer | Aktif |
| CFCC154D6X1145 | Auni Ulil Qisty | Full-Stack Developer | Aktif |
| CFCC010D6X2167 | Azzahrah Nabila | Full-Stack Developer | Aktif |

---

## 1. Ringkasan Eksekutif

### Latar Belakang
Perkembangan teknologi finansial di Indonesia mendorong peningkatan penggunaan layanan keuangan digital, terutama di kalangan generasi muda. Berdasarkan SNLIK 2025 oleh OJK (Otoritas Jasa Keuangan) dan BPS (Badan Pusat Statistik), indeks literasi keuangan mencapai 66,46% dan inklusi keuangan 80,51%. Namun, angka ini belum merata karena lebih banyak dipengaruhi oleh kelompok berpendidikan tinggi dan pekerja profesional dengan literasi hingga 85,80%.

Di sisi lain, mahasiswa usia 18–25 tahun memiliki inklusi keuangan tinggi (±89,96%) tetapi literasi yang masih lebih rendah ±73,22%, menunjukkan penggunaan layanan belum diiringi pemahaman yang cukup. Ditambah dengan kecenderungan konsumtif dan ketergantungan pada *e-wallet* serta *paylater*, banyak mahasiswa belum optimal dalam mengelola keuangan. Hal ini menegaskan adanya kesenjangan literasi antara pekerja dan pelajar, sehingga diperlukan upaya edukasi keuangan yang lebih terarah bagi mahasiswa.

### Problem Statement
Permasalahan utama adalah belum adanya sistem yang mampu membantu generasi muda dalam memantau dan menganalisis pola pengeluaran secara otomatis dan personal. Sebagian besar aplikasi keuangan saat ini hanya berfungsi sebagai alat pencatatan transaksi tanpa memberikan *insight* yang mendalam terkait perilaku keuangan pengguna.

Akibatnya, pengguna sering tidak menyadari pola pengeluaran yang tidak sehat hingga berdampak pada kondisi finansial jangka panjang. Selain itu, kurangnya rekomendasi yang relevan dan personal membuat pengguna kesulitan dalam mengambil keputusan finansial yang tepat.

### Research Questions
1. Bagaimana pola pengeluaran pengguna dapat dianalisis secara otomatis menggunakan *machine learning* berdasarkan data transaksi?
2. Dapatkah model Deep Learning mengklasifikasikan perilaku boros (boros/tidak boros) dengan akurasi minimal ≥ 85%?
3. Bagaimana sistem dapat menghasilkan rekomendasi keuangan yang dipersonalisasi berdasarkan profil dan perilaku pengguna?
4. Bagaimana merancang dan mengintegrasikan sistem AI ke dalam aplikasi berbasis web secara end-to-end?

### Alasan Pemilihan Proyek
Proyek SFINITY dipilih karena permasalahan pengelolaan keuangan merupakan isu nyata yang dialami oleh generasi muda saat ini. Banyak individu yang memiliki pendapatan namun tidak mampu mengelola keuangan secara optimal.

Melalui aplikasi ini, tim berupaya menghadirkan solusi yang tidak hanya membantu pencatatan keuangan, tetapi juga memberikan *insight*, prediksi, dan rekomendasi berbasis AI sehingga dapat memberikan dampak nyata dalam meningkatkan literasi dan kesehatan finansial pengguna.

Proyek ini juga dirancang sebagai *Minimum Viable Product* (MVP) yang memenuhi standar Capstone Coding Camp dengan mengintegrasikan AI/ML, backend, dan frontend secara end-to-end.

---

## 2. Cakupan Proyek dan Hasil Kerja

Sfinity merupakan aplikasi pengelola keuangan pribadi berbasis web yang dirancang untuk membantu generasi muda dalam mengelola, memahami, dan meningkatkan kondisi finansial mereka. Sistem ini tidak hanya berfungsi sebagai alat pencatatan transaksi, tetapi juga dilengkapi dengan fitur analisis perilaku, gamifikasi, perencanaan keuangan, serta rekomendasi berbasis data.

Melalui pendekatan berbasis kecerdasan buatan (AI) dan *data-driven system*, Sfinity mampu memberikan insight personal, mendeteksi kecenderungan perilaku boros, serta memberikan rekomendasi keuangan yang relevan sesuai profil pengguna.

### Kesesuaian dengan Capstone Playbook (Main Quest):
Proyek SFINITY dikembangkan dengan mengacu pada standar Capstone Coding Camp, dengan memenuhi kriteria berikut:
- Mengintegrasikan Front-End dan Back-End dalam satu sistem aplikasi
- Menggunakan RESTful API untuk komunikasi data
- Menggunakan network calls (Fetch API / Axios) untuk integrasi sistem
- Mengimplementasikan Artificial Intelligence / Machine Learning sebagai fitur utama
- Sistem dirancang agar berjalan stabil dan tidak mengalami crash

---

## 3. Pembagian Tugas Setiap Individu

### 📊 Data Scientist - Data & Insight (Daniel Rizal Alonso)
Bertanggung jawab untuk melaksanakan proses *data wrangling* secara menyeluruh, dimulai dari mengumpulkan dataset (publik/sintetis). Tugas mencakup:
- Pengumpulan dan pembuatan dataset
- Pembersihan data dan pra-pemrosesan
- Analisis Data Eksploratif (EDA)
- Visualisasi data untuk analisis
- Rekayasa fitur (*feature engineering*)
- Evaluasi model (kolaborasi)
- Pembuatan wawasan dan laporan analisis

### 📊 Data Scientist - Dashboard & Data Support (Bintang Qaulan Tsaqiila)
Bertanggung jawab dalam penyajian data serta memastikan data dapat dimanfaatkan secara optimal dalam sistem aplikasi. Tugas mencakup:
- Validasi dataset
- Penyusunan Data dictionary
- Visualisasi data (untuk dashboard/user)
- Dashboard interaktif (Streamlit)
- Integrasi data ke sistem (backend & frontend)
- Data support & debugging
- Dokumentasi data

### 🧠 AI Engineer - Deep Learning Model (Diha Anfeu Nio Julaynda)
Fokus pada pengembangan model Deep Learning (TensorFlow) untuk menggolongkan perilaku pengguna sebagai boros atau tidak boros. Tugas mencakup:
- Pengembangan model klasifikasi perilaku boros
- Training & evaluasi model
- Hyperparameter tuning
- Export model ke format produksi (.keras / SavedModel)
- Deployment model menggunakan FastAPI

### 🧠 AI Engineer - Recommendation System (Aulia Agastya Herawati)
Menciptakan sistem rekomendasi finansial (berbasis *rule-based*) yang disesuaikan dengan perilaku pengguna dan output model Deep Learning. Tugas mencakup:
- Pengembangan sistem rekomendasi berbasis rule-based / ML
- Integrasi rekomendasi ke sistem
- Pengembangan logika personalisasi
- Integrasi endpoint rekomendasi

### 💻 Full-Stack Web Developer - Frontend (Auni Ulil Qisty)
Merancang dan mengembangkan antarmuka pengguna SFINITY. Tugas mencakup:
- Desain UI/UX dan prototyping (Figma)
- Implementasi dashboard dan fitur gamifikasi (Tailwind CSS/NativeWind)
- Integrasi API ke frontend (Axios)
- Optimasi dan testing responsivitas

### ⚙️ Full-Stack Web Developer - Backend (Azzahrah Nabila)
Membangun RESTful API menggunakan Express.js untuk mengelola logika aplikasi. Tugas mencakup:
- Pembuatan REST API
- Dokumentasi API (Swagger)
- Manajemen database (MongoDB)
- Integrasi model ML dan sistem rekomendasi
- Authentication & Authorization (JWT & Bcrypt)
- Deployment Server

---

## 4. Batasan Proyek
- Tidak terintegrasi dengan API bank atau e-wallet.
- Menggunakan dataset sintetis dan/atau dataset publik.
- Model utama difokuskan pada Deep Learning sederhana untuk klasifikasi perilaku.
- Sistem rekomendasi menggunakan pendekatan *rule-based* atau sederhana.

---

## 5. Alur Pengerjaan
Pengembangan Sfinity dilakukan melalui kerja sama antara Data Scientist, AI Engineer, dan Full-Stack Web Developer dengan pendekatan paralel yang saling terhubung.

1. **Tahap Perencanaan (Minggu 1):** Konsep dan persiapan.
2. **Tahap Pengembangan Awal (Minggu 2):** Pembersihan data, setup infrastruktur frontend & backend.
3. **Tahap Pengembangan Lanjutan (Minggu 3):** Pelatihan model, pembuatan endpoint inti.
4. **Tahap Integrasi Sistem (Minggu 4):** Menghubungkan Backend ke Frontend & ML.
5. **Penyempurnaan & Deployment (Minggu 5):** Bug fixing, presentasi MVP.

### Jadwal Pengerjaan (Gantt Chart)
Gantt Chart disusun untuk memberikan gambaran yang jelas mengenai alur pengerjaan proyek, durasi setiap task, serta keterlibatan masing-masing anggota tim dalam setiap tahapan pengembangan.

---

## 6. Sumber Daya Proyek

### Data Science
- **Google Colaboratory:** Platform eksperimen kode Python.
- **Pandas, NumPy:** Pembersihan data.
- **Matplotlib:** Visualisasi data.
- **Streamlit:** Dashboard interaktif.

### Frontend
- **React Native / Next.js:** Framework UI utama.
- **Figma:** Desain UI/UX.
- **Tailwind CSS:** *Styling* antarmuka.
- **Axios:** Panggilan jaringan (API).
- **Recharts / Victory:** Grafik finansial.

### Backend
- **Express.js:** Framework Node.js untuk API.
- **MongoDB:** Database NoSQL.
- **JWT & Bcrypt:** Autentikasi.
- **Swagger:** Dokumentasi API.
- **Postman:** Pengujian endpoint.

### AI / ML
- **Python 3.10+**
- **TensorFlow / Keras:** Deep Learning.
- **Scikit-learn:** Preprocessing & Evaluasi.
- **FastAPI & Uvicorn:** Deployment AI Endpoint.

### Kolaborasi & Dataset
- **GitHub:** Version control.
- **Kaggle:** Personal Finance Tracker Dataset.

---

## 7. Rencana Manajemen Risiko dan Isu (SMART Mitigation)

### [Manajemen Tim]
**a. Risiko miskomunikasi antar tim**
- *Mitigation:* Menyusun API contract terpusat, meeting mingguan, dan penggunaan GitHub Projects.

**b. Risiko keterlambatan anggota tim**
- *Mitigation:* Membagi task board yang di-review per minggu (target >80% selesai).

### [Machine Learning]
**a. Risiko performa model rendah**
- *Mitigation:* Target akurasi ≥ 85%, eksperimen algoritma XGBoost/Random Forest dan tuning.

**b. Risiko kualitas dataset kurang baik**
- *Mitigation:* Menggabungkan dataset sintetis dan publik untuk mencapai 1000+ baris data berkualitas (target minggu ke-2).

### [Frontend]
**a. Risiko integrasi API tidak konsisten**
- *Mitigation:* Sepakati API contract dan gunakan *mock* API.

**b. Risiko performa UI menurun**
- *Mitigation:* Menerapkan *lazy loading* dan pagination (waktu load target < 2 detik).

### [Backend]
**a. Risiko latency pada API dan model ML**
- *Mitigation:* Optimasi query MongoDB dan *asynchronous processing* (Response target < 1 detik).

**b. Risiko keamanan data pengguna**
- *Mitigation:* Semua *protected endpoint* diwajibkan menggunakan JWT Middleware.

### [Data Science]
**a. Risiko insight tidak relevan**
- *Mitigation:* Mengkombinasikan output Deep Learning dengan sistem *rule-based* bisnis yang tervalidasi.

**b. Risiko keterbatasan waktu pengerjaan**
- *Mitigation:* Fokus hanya pada fitur *Minimum Viable Product* (MVP).
