# Garis Cerita (`GCK`) — 2D Sketch Parallax Architecture & Engineering Studio Website

Website resmi interaktif bergaya **Sketsa 2D dengan Efek Multi-Layer Paralaks** dan tampilan **Minimalis (Tanpa Menu Bar & Tanpa Peta)** untuk **PT Garis Cerita Karya (Garis Cerita / GCK)** — Studio Arsitektur, Engineering (Struktur & MEP), Urban Design, Masterplan, Interior, & Digital BIM Laboratory di Jakarta Selatan.

---

## ✨ Fitur Utama (Revisi 2D Sketch Parallax)

1. **Raw Background Sketsa Bersih (`assets/images/studio-sketch-raw-bg.jpg`)**:
   - Gambar latar belakang sketsa 2D ruang studio (`1376×768`) telah dibersihkan/diekstrak sepenuhnya dari teks, panah, menu atas, dan kartu wireframe bawah sehingga seluruh bidang ruang studio (plafon kayu, dinding kisi, lantai parket, meja studio, kursi, dan rak arsip) tampil utuh dan bersih.
2. **Efek Multi-Layer 2D Paralaks & Tampilan Minimalis**:
   - **Tanpa Menu Bar Atas, Tanpa Mini-Map, Tanpa Bottom Bar**: Seluruh navigasi menyatu langsung sebagai **5 tombol tautan per menu di dalam gambar sketsa** lengkap dengan tipografi tulisan tangan (`Caveat`), panah lengkung oranye, ikon tombol lingkaran oranye, dan *highlight* bingkai sketsa pada objek.
   - **5 Lapisan Paralaks (`60fps`)**: Latar ruang studio, berkas cahaya matahari jendela, objek interaktif di meja/dinding, elemen *foreground* (tanaman rambat kiri, kursi kulit depan, bangku buku kanan, partikel debu cahaya), serta *callout* tautan menu bergerak dengan kedalaman berbeda mengikuti gerakan kursor, kemiringan perangkat (*gyroscope*), maupun *idle breathing* halus.
3. **5 Tombol Menu Interaktif di Dalam Gambar Sketsa**:
   - 👤 **`ABOUT STUDIO` (Bingkai Foto Dinding Kiri)**: Profil resmi PT Garis Cerita Karya (`GCK`), Visi & Misi, 17 Tim & Tenaga Ahli Bersertifikasi, Nilai & Pendekatan, serta Koneksi, Klien & Vendor.
   - 📁 **`PORTFOLIO` (Papan Tulis Proyek di Meja)**: Zoom halus ke papan tulis dan membuka **22 Proyek Portofolio Desain** (Arsitektur, Perkotaan, Interior, Lanskap, Masterplan, Komersial, Pemerintah) beserta lembar detail teknis.
   - 🧪 **`RESEARCH & LAB` (Komputer Studi & Riset)**: Menampilkan panel cepat *Feasibility Study Dashboard*, *Urban Study & Data*, *Design Lab (Parametric / BIM)*, sinkronisasi **GitHub API (`@garislab`)**, *live preview* web app (`PSA_Mblock`, `PSA_LB`, `5D_Dashboard_Prototype`, `Garis-BIM-Simulation-Prototype`), dan kalkulator KDB/KLB/GFA/NLA.
   - 📄 **`ARCHIVE / HISTORY` (Rak Dokumen Kanan)**: Rak binder interaktif yang memuat Sejarah Studio & Milestone (2012–2026), **13 Penghargaan Sayembara**, Dokumen Legalitas & SBU (`AR001`, `AR003`, PERKINDO), serta tautan PDF Portofolio.
   - 📞 **`CONTACT` (Telepon Meja Kiri)**: Memunculkan animasi getar telepon di sketsa + **efek suara dering telepon mekanik klasik** (*Web Audio API* prosedural tanpa file MP3 eksternal), gelombang suara oranye, informasi kontak studio Jakarta Selatan, dan formulir WhatsApp/Email.
4. **Responsif untuk Desktop, Tablet, dan HP (Mobile)**:
   - **Desktop & Landscape**: Tampilan layar penuh 100% sketsa 2D dengan efek paralaks dan 5 tautan menu di dalam gambar sketsa.
   - **HP (Mobile) & Tablet Portrait**: Mendukung *touch-pan* (geser sketsa halus) maupun tombol **Lihat Utuh / Perbesar Sketsa**, dilengkapi kartu tautan cepat bergaya sketsa di bagian bawah layar *portrait* agar seluruh 5 menu dapat diakses dengan satu sentuhan ibu jari.

---

## 🖼️ File Raw Background Sketsa

File raw background sketsa yang sudah dibersihkan tanpa teks/UI tersimpan di:
- 👉 **[`assets/images/studio-sketch-raw-bg.jpg`](assets/images/studio-sketch-raw-bg.jpg)**

---

## 🛠️ Cara Update Data Secara Manual

Seluruh data teks, proyek portofolio, link GitHub Lab (`Feasibility Study`, `BIM`, `Tools`), anggota tim, penghargaan, dan kontak disimpan terpusat di:
- 👉 **[`js/studio-data.js`](js/studio-data.js)**
