# WebKelas - Platform Pembelajaran Interaktif dengan Animasi 3D

WebKelas adalah platform pembelajaran interaktif yang menggunakan teknologi 3D dan animasi untuk membuat pengalaman belajar menjadi lebih menarik, intuitif, dan efektif.

## Fitur Utama

- ?? **Visualisasi 3D Interaktif**: Materi pelajaran??ngkatkan dengan model 3D yang dapat diputar, dizoom, dan dimanipulasi
- ? **Animasi Halus**: Menggunakan GSAP dan Framer Motion untuk transisi dan efek yang halus dan profesional
- ?? **Efek 3D Puzzle**: Animasi khusus berupa puzzle 3D yang berputar sebagai elemen visual utama
- ?? **Kursus Beragam**: Mata pelajaran dari pemrograman, matematika, fisika, hingga desain UI/UX
- ?? **Responsive Design**: Tampilan yang optimal di berbagai perangkat dari desktop hingga mobile
- ?? **Desain Modern**: Antarmuka yang clean, modern, dan mudahdinavigasi dengan tema gelap yang nyaman untuk mata

## Teknologi yang Digunakan

- **Frontend**: React 18 dengan Vite
- **Animasi 3D**: Three.js dengan react-three-fiber dan @react-three/drei
- **Animasi UI**: GSAP (GreenSock Animation Platform) dan Framer Motion
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: Emoji dan Unicode untuk kesederhanaan

## Struktur Proyek

`
src/
+-- assets/           # Gambar dan media statis
+-- components/       # Komponen yang dapat digunakan kembali
¦   +-- AnimatedText.jsx   # Teks dengan efek split-text animation
¦   +-- PuzzleAnimation.jsx # Animasi 3D puzzle utama
+-- pages/            # Halaman-halaman website
¦   +-- Home.jsx          # Halaman beranda
¦   +-- Courses.jsx       # Daftar kursus
¦   +-- CourseDetail.jsx  # Detail kursus individu
¦   +-- About.jsx         # Halaman tentang kami
¦   +-- Contact.jsx       # Halaman kontak
¦   +-- NotFound.jsx      # Halaman 404
+-- App.jsx           # Komponen utama dengan routing
+-- App.css           # Styles global
+-- main.jsx          # Entry point React
`

## Cara Menjalankan Proyek

Catatan: Karena ada masalah dengan native dependencies pada lingkungan tertentu, berikut adalah beberapa solusi yang dapat dicoba:

### Solusi 1: Membersihkan dan Menginstal Ulang Dependencies
`ash
# Hapus file lock dan node_modules
rm -rf package-lock.json node_modules

# Install ulang dependencies
npm install

# Jalankan server pengembangan
npm run dev
`

### Solusi 2: Menggunakan Flag --no-optional
`ash
# Hapus file lock dan node_modules
rm -rf package-lock-json node_modules

# Install tanpa optional dependencies
npm install --no-optional

# Jalankan server pengembangan
npm run dev
`

### Solusi 3: Menggunakan Yarn atau pnpm (Alternatif Package Manager)
`ash
# Install yarn jika belum ada
npm install -g yarn

# Atau install pnpm
npm install -g pnpm

# Hapus file lock dan node_modules
rm -rf package-lock.json node_modules

# Install dengan yarn
yarn install

# Jalankan server pengembangan
yarn dev
`

## Fitur yang Dapat Dikembangkan Lebih Lanjut

1. **Sistem Autentikasi**: Login dan registrasi pengguna
2. **Progress Tracking**: Melacak progres belajar setiap pengguna
3. **Quiz Interaktif**: Ujian dengan visualisasi 3D
4. **Forum Diskusi**: Komunitas belajar yang aktif
5. **Mode Offline**: Akses materi tanpa koneksi internet
6. **Integrasi VR**: Dukungan headset virtual reality untuk imersi yang lebih dalam

## Kontribusi

Kami menyambut kontribusi dari siapa saja yang ingin membantu meningkatkan WebKelas. Silakan buat pull laporkan issues, atau fork repositori ini.

## Lisensi

Proyek ini dilisensikan di bawah lisensi MIT - lihat file [LICENSE](LICENSE) untuk detail lebih lanjut.

## Kontak

- Email: info@webkelas.id
- Website: https://webkelas.id
- Twitter: @webkelas_id

© 2026 WebKelas. Hak cipta dilindungi undang-undang.

