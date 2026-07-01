# Deskripsi Role Sistem

## 1. Super Admin

### Dashboard
- **Ringkasan Nasional**
  - Field Data Utama: Total Desa, Readiness, Maturity, QoL, SLV Index, SDGs
  - Isi Data/Informasi: KPI seluruh desa
  - Fungsi Sistem: Menampilkan dashboard nasional
  - Output: Dashboard Nasional

### Framework & Assessment
- **Master Framework**
  - Field Data Utama: Nama Framework, Dimensi, Indikator, Bobot
  - Isi Data/Informasi: Framework Readiness, Maturity, QoL
  - Fungsi Sistem: Mengelola framework penelitian
  - Output: Framework Aktif

- **Framework Versioning**
  - Field Data Utama: Versi, Tanggal, Status
  - Isi Data/Informasi: Riwayat Framework
  - Fungsi Sistem: Version Control
  - Output: Versi Framework

- **Manajemen Periode**
  - Field Data Utama: Tahun, Semester, Status
  - Isi Data/Informasi: Periode Assessment
  - Fungsi Sistem: Membuka dan menutup periode
  - Output: Periode Aktif

- **Validasi Data**
  - Field Data Utama: Dataset, Status Validasi
  - Isi Data/Informasi: Hasil Validasi
  - Fungsi Sistem: Memvalidasi data penelitian
  - Output: Dataset Valid

- **Integrasi Data Desa**
  - Field Data Utama: API, Sinkronisasi
  - Isi Data/Informasi: Data SID, SDGs, Desa
  - Fungsi Sistem: ETL dan Integrasi
  - Output: Database Terintegrasi

### Governance & DSS
- **Governance Management**
  - Field Data Utama: Master Governance
  - Isi Data/Informasi: Tata Kelola Desa
  - Fungsi Sistem: Mengelola governance
  - Output: Data Governance

- **DSS Knowledge Base**
  - Field Data Utama: Rule, Bobot, Aturan
  - Isi Data/Informasi: Knowledge Base
  - Fungsi Sistem: Mengelola basis pengetahuan DSS
  - Output: Rule DSS

- **DSS Recommendation**
  - Field Data Utama: Readiness, Maturity, QoL
  - Isi Data/Informasi: Rule Engine
  - Fungsi Sistem: Menghasilkan rekomendasi
  - Output: Prioritas Program

### Evaluation & Research
- **Evaluasi Artefak**
  - Field Data Utama: Artefak 1–6
  - Isi Data/Informasi: Nilai Evaluasi
  - Fungsi Sistem: Evaluasi seluruh artefak
  - Output: Nilai Evaluasi

- **Expert Validation**
  - Field Data Utama: Validator, Nilai
  - Isi Data/Informasi: Hasil Expert Review
  - Fungsi Sistem: Validasi Artefak
  - Output: Nilai Validitas

- **UAT & SUS**
  - Field Data Utama: SUS Score, Feedback
  - Isi Data/Informasi: Hasil UAT
  - Fungsi Sistem: Evaluasi usability
  - Output: Nilai SUS

- **Repository Penelitian**
  - Field Data Utama: Dokumen
  - Isi Data/Informasi: File Penelitian
  - Fungsi Sistem: Repository
  - Output: Arsip Penelitian

### Administration
- **User Management**
  - Field Data Utama: User, Role, Password
  - Isi Data/Informasi: Data User
  - Fungsi Sistem: CRUD User
  - Output: User Aktif

- **Audit Log**
  - Field Data Utama: Aktivitas Sistem
  - Isi Data/Informasi: Log Aktivitas
  - Fungsi Sistem: Monitoring
  - Output: Audit Trail

- **Sistem & Pengaturan**
  - Field Data Utama: Konfigurasi Sistem
  - Isi Data/Informasi: Parameter Sistem
  - Fungsi Sistem: Konfigurasi
  - Output: Setting Sistem

- **Backup & Restore**
  - Field Data Utama: Backup Database
  - Isi Data/Informasi: File Backup
  - Fungsi Sistem: Backup & Restore
  - Output: Backup Database

- **Notifikasi Sistem**
  - Field Data Utama: Judul, Isi, Target
  - Isi Data/Informasi: Broadcast
  - Fungsi Sistem: Mengirim Notifikasi
  - Output: Notifikasi

---

## 2. Peneliti

### Dashboard
- **Ringkasan Penelitian**
  - Field Data Utama: Readiness, Maturity, QoL, SLV Index
  - Isi Data/Informasi: KPI Penelitian
  - Fungsi Sistem: Menampilkan dashboard penelitian
  - Output: Dashboard Penelitian

### Dashboard Analytics
- **Smart Living Dashboard Analytics**
  - Field Data Utama: Seluruh KPI
  - Isi Data/Informasi: Dashboard Analitik
  - Fungsi Sistem: Monitoring hasil penelitian
  - Output: Dashboard Analitik

### Research Overview
- **Research Overview**
  - Field Data Utama: Lokasi, Sampel
  - Isi Data/Informasi: Informasi Penelitian
  - Fungsi Sistem: Ringkasan Penelitian
  - Output: Profil Penelitian

- **Dataset Assessment**
  - Field Data Utama: Dataset Responden
  - Isi Data/Informasi: Data Assessment
  - Fungsi Sistem: Mengelola Dataset
  - Output: Dataset

### Analysis Framework
- **Analisis Readiness**
  - Field Data Utama: 20 Indikator
  - Isi Data/Informasi: Hasil Assessment
  - Fungsi Sistem: Hitung Readiness
  - Output: Radar Chart

- **Analisis Maturity**
  - Field Data Utama: Level 1-5
  - Isi Data/Informasi: Nilai Maturity
  - Fungsi Sistem: Analisis Maturity
  - Output: Maturity Chart

- **Analisis Quality of Life**
  - Field Data Utama: Indikator QoL
  - Isi Data/Informasi: Nilai QoL
  - Fungsi Sistem: Analisis QoL
  - Output: QoL Dashboard

- **SDGs Dashboard**
  - Field Data Utama: SDGs 3,4,18
  - Isi Data/Informasi: Data SDGs
  - Fungsi Sistem: Monitoring SDGs
  - Output: Dashboard SDGs

- **Analisis DSS**
  - Field Data Utama: Bobot AHP
  - Isi Data/Informasi: Rule DSS
  - Fungsi Sistem: Analisis Prioritas
  - Output: Ranking Program

### Validasi & Evaluasi
- **Validasi Artefak**
  - Field Data Utama: Nilai Validator
  - Isi Data/Informasi: Hasil Validasi
  - Fungsi Sistem: Validasi Artefak
  - Output: Nilai Valid

- **Expert Validation**
  - Field Data Utama: Penilaian Pakar
  - Isi Data/Informasi: Expert Review
  - Fungsi Sistem: Validasi Pakar
  - Output: Nilai Expert

- **UAT & SUS Evaluation**
  - Field Data Utama: Kuesioner SUS
  - Isi Data/Informasi: Feedback User
  - Fungsi Sistem: Evaluasi Sistem
  - Output: Nilai SUS

### Analitik Penelitian
- **Statistik Penelitian**
  - Field Data Utama: Dataset
  - Isi Data/Informasi: Statistik
  - Fungsi Sistem: Statistik Deskriptif
  - Output: Statistik

- **Visualisasi Data**
  - Field Data Utama: Dataset
  - Isi Data/Informasi: Grafik
  - Fungsi Sistem: Visualisasi
  - Output: Grafik

### Repository & Publikasi
- **Repository Penelitian**
  - Field Data Utama: Dokumen
  - Isi Data/Informasi: File Penelitian
  - Fungsi Sistem: Repository
  - Output: Arsip

- **Publikasi & Sitasi**
  - Field Data Utama: Metadata Artikel
  - Isi Data/Informasi: Artikel
  - Fungsi Sistem: Publikasi
  - Output: Daftar Publikasi

- **Laporan Penelitian**
  - Field Data Utama: Dataset
  - Isi Data/Informasi: Laporan
  - Fungsi Sistem: Generate PDF/Excel
  - Output: Laporan

---

## 3. Layanan SLV

### Dashboard
- **Dashboard Utama**
  - Field Data Utama: Profil, Ringkasan Aktivitas
  - Isi Data/Informasi: Informasi Pengguna
  - Fungsi Sistem: Dashboard Pengguna
  - Output: Dashboard

### SDGs 3
- **Posyandu Digital**
  - Field Data Utama: Data Balita, Ibu Hamil
  - Isi Data/Informasi: Data Kesehatan
  - Fungsi Sistem: Pelayanan Posyandu
  - Output: Riwayat Posyandu

- **Jadwal Kesehatan**
  - Field Data Utama: Jadwal
  - Isi Data/Informasi: Agenda
  - Fungsi Sistem: Monitoring Jadwal
  - Output: Jadwal

- **Monitoring Kesehatan**
  - Field Data Utama: Pemeriksaan
  - Isi Data/Informasi: Riwayat
  - Fungsi Sistem: Monitoring
  - Output: Status Kesehatan

- **Riwayat Kesehatan**
  - Field Data Utama: Rekam Medis
  - Isi Data/Informasi: Riwayat
  - Fungsi Sistem: Riwayat Layanan
  - Output: Rekam Medis

- **Edukasi Kesehatan**
  - Field Data Utama: Materi
  - Isi Data/Informasi: Video/PDF
  - Fungsi Sistem: Edukasi
  - Output: Materi

- **Telekonsultasi**
  - Field Data Utama: Dokter, Jadwal
  - Isi Data/Informasi: Booking
  - Fungsi Sistem: Konsultasi
  - Output: Jadwal Konsultasi

### SDGs 4
- **Literasi Digital**
  - Field Data Utama: Modul
  - Isi Data/Informasi: Materi
  - Fungsi Sistem: Pembelajaran
  - Output: Progress

- **Kelas Desa**
  - Field Data Utama: Jadwal
  - Isi Data/Informasi: Pelatihan
  - Fungsi Sistem: Registrasi
  - Output: Peserta

- **Pelatihan Online**
  - Field Data Utama: Materi
  - Isi Data/Informasi: LMS
  - Fungsi Sistem: Pembelajaran
  - Output: Progress

- **Sertifikasi**
  - Field Data Utama: Nilai
  - Isi Data/Informasi: Sertifikat
  - Fungsi Sistem: Generate Sertifikat
  - Output: Sertifikat

- **Riwayat Pelatihan**
  - Field Data Utama: Riwayat
  - Isi Data/Informasi: Data Pelatihan
  - Fungsi Sistem: Riwayat
  - Output: History

### SDGs 18
- **Informasi Adat**
  - Field Data Utama: Artikel
  - Isi Data/Informasi: Informasi
  - Fungsi Sistem: Publikasi
  - Output: Informasi

- **Kalender Adat**
  - Field Data Utama: Agenda
  - Isi Data/Informasi: Jadwal
  - Fungsi Sistem: Kalender
  - Output: Kalender Adat

- **Arsip Budaya**
  - Field Data Utama: Dokumen
  - Isi Data/Informasi: Arsip
  - Fungsi Sistem: Dokumentasi
  - Output: Arsip

- **Forum Desa**
  - Field Data Utama: Diskusi
  - Isi Data/Informasi: Forum
  - Fungsi Sistem: Interaksi
  - Output: Forum

- **Musyawarah Digital**
  - Field Data Utama: Agenda
  - Isi Data/Informasi: Voting
  - Fungsi Sistem: Musyawarah
  - Output: Keputusan

- **Partisipasi Musyawarah**
  - Field Data Utama: Voting
  - Isi Data/Informasi: Aspirasi
  - Fungsi Sistem: Partisipasi
  - Output: Hasil Voting

### Profil
- **Profil Saya**
  - Field Data Utama: Biodata
  - Isi Data/Informasi: Data User
  - Fungsi Sistem: Update Profil
  - Output: Profil

- **Riwayat Layanan**
  - Field Data Utama: Seluruh Aktivitas
  - Isi Data/Informasi: Riwayat
  - Fungsi Sistem: Monitoring Aktivitas
  - Output: History

- **Notifikasi**
  - Field Data Utama: Pesan Sistem
  - Isi Data/Informasi: Informasi
  - Fungsi Sistem: Push Notification
  - Output: Notifikasi

- **Bantuan & Panduan**
  - Field Data Utama: FAQ
  - Isi Data/Informasi: Bantuan
  - Fungsi Sistem: Help Center
  - Output: Bantuan
