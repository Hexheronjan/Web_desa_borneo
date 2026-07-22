// Modul config: warna, nama, sidebar items per role
// 10 roles x 60 modul sesuai tabel struktur prototype

export type RoleKey =
  | "admin_super"
  | "operator_sid"
  | "pemerintah_desa"
  | "bpd"
  | "lembaga_adat"
  | "guru_fasilitator"
  | "nakes_posyandu"
  | "warga"
  | "dinas_pmd"
  | "peneliti"
  | "layanan_slv";

export interface SidebarItem {
  label: string;
  path: string;
  group?: string;
}

export interface RoleConfig {
  key: RoleKey;
  nama: string;
  warna: string;
  dashboardPath: string;
  sidebarItems: SidebarItem[];
}

export const roleConfig: Record<RoleKey, RoleConfig> = {
  // === ADMINISTRATOR SISTEM (Modul 1–14) ===
  admin_super: {
    key: "admin_super",
    nama: "Administrator Sistem",
    warna: "#1a237e",
    dashboardPath: "/admin",
    sidebarItems: [
      { label: "User Management", path: "/admin/user-management", group: "PENGATURAN SISTEM" },
      { label: "Role Management", path: "/admin/role-management", group: "PENGATURAN SISTEM" },
      { label: "Hak Akses", path: "/admin/hak-akses", group: "PENGATURAN SISTEM" },
      { label: "Master Desa", path: "/admin/master-desa", group: "MASTER DATA" },
      { label: "SDGs Desa", path: "/admin/sdgs-desa", group: "MASTER DATA" },
      { label: "Indikator Smart Living", path: "/admin/indikator-smart-living", group: "MASTER DATA" },
      { label: "Readiness Assessment", path: "/admin/readiness-assessment", group: "SMART LIVING" },
      { label: "DSS Recommendation", path: "/admin/dss-recommendation", group: "SMART LIVING" },
      { label: "Maturity Assessment", path: "/admin/maturity-assessment", group: "SMART LIVING" },
      { label: "Quality of Life", path: "/admin/quality-of-life", group: "SMART LIVING" },
      { label: "Dashboard Analytics", path: "/admin/dashboard-analytics", group: "MONITORING" },
      { label: "Audit Log", path: "/admin/audit-log", group: "MONITORING" },
      { label: "Monitoring Sistem", path: "/admin/monitoring-sistem", group: "MONITORING" },
      { label: "Backup & Restore", path: "/admin/backup-restore", group: "SYSTEM" },
    ],
  },

  // === OPERATOR SID (Modul 15–21) ===
  operator_sid: {
    key: "operator_sid",
    nama: "Operator SID",
    warna: "#00695c",
    dashboardPath: "/operator-sid",
    sidebarItems: [
      { label: "Data Penduduk", path: "/operator-sid/data-penduduk", group: "SISTEM INFORMASI DESA" },
      { label: "Data Pendidikan", path: "/operator-sid/data-pendidikan", group: "SISTEM INFORMASI DESA" },
      { label: "Data Kesehatan", path: "/operator-sid/data-kesehatan", group: "SISTEM INFORMASI DESA" },
      { label: "Data Ekonomi", path: "/operator-sid/data-ekonomi", group: "SISTEM INFORMASI DESA" },
      { label: "Data Infrastruktur", path: "/operator-sid/data-infrastruktur", group: "SISTEM INFORMASI DESA" },
      { label: "Data Budaya", path: "/operator-sid/data-budaya", group: "SISTEM INFORMASI DESA" },
      { label: "Validasi Data", path: "/operator-sid/validasi-data", group: "SISTEM INFORMASI DESA" },
      { label: "Validasi Surat", path: "/operator-sid/validasi-surat", group: "LAYANAN WARGA" },
    ],
  },

  // === PEMDES / KEPALA DESA (Modul 22–31) ===
  pemerintah_desa: {
    key: "pemerintah_desa",
    nama: "Pemerintah Desa",
    warna: "#283593",
    dashboardPath: "/pemdes",
    sidebarItems: [
      { label: "Dashboard Utama", path: "/pemdes", group: "SMART LIVING INDEX" },
      { label: "RPJMDes", path: "/pemdes/rpjmdes", group: "TATA KELOLA DESA" },
      { label: "RKPDes", path: "/pemdes/rkpdes", group: "TATA KELOLA DESA" },
      { label: "APBDes", path: "/pemdes/apbdes", group: "TATA KELOLA DESA" },
      { label: "Prioritas Program", path: "/pemdes/dss-recommendation", group: "DSS RECOMMENDATION" },
      { label: "SDGs 3", path: "/pemdes/sdgs-3", group: "DASHBOARD SDGs" },
      { label: "SDGs 4", path: "/pemdes/sdgs-4", group: "DASHBOARD SDGs" },
      { label: "SDGs 18", path: "/pemdes/sdgs-18", group: "DASHBOARD SDGs" },
      { label: "Quality of Life Index", path: "/pemdes/quality-of-life", group: "DASHBOARD QoL" },
      { label: "KPI Smart Living", path: "/pemdes/kpi-dashboard", group: "KPI DASHBOARD" },
    ],
  },

  // === BPD (Modul 32–34) ===
  bpd: {
    key: "bpd",
    nama: "BPD",
    warna: "#4527a0",
    dashboardPath: "/bpd",
    sidebarItems: [
      { label: "Evaluasi Program", path: "/bpd/evaluasi-program", group: "MONITORING DESA" },
      { label: "Transparansi APBDes", path: "/bpd/transparansi-apbdes", group: "MONITORING DESA" },
      { label: "Aspirasi Masyarakat", path: "/bpd/aspirasi-masyarakat", group: "MONITORING DESA" },
    ],
  },

  // === LEMBAGA ADAT (Modul 35–38) ===
  lembaga_adat: {
    key: "lembaga_adat",
    nama: "Lembaga Adat",
    warna: "#2e7d32",
    dashboardPath: "/adat",
    sidebarItems: [
      { label: "Kelembagaan Adat", path: "/adat/kelembagaan-adat", group: "BUDAYA DAN ADAT" },
      { label: "Huma Betang", path: "/adat/huma-betang", group: "BUDAYA DAN ADAT" },
      { label: "Musyawarah Adat", path: "/adat/musyawarah-adat", group: "BUDAYA DAN ADAT" },
      { label: "Kalender Adat", path: "/adat/kalender-adat", group: "BUDAYA DAN ADAT" },
    ],
  },

  // === GURU (Modul 39–42) ===
  guru_fasilitator: {
    key: "guru_fasilitator",
    nama: "Guru/Tenaga Pendidikan",
    warna: "#1565c0",
    dashboardPath: "/guru",
    sidebarItems: [
      { label: "Data Siswa", path: "/guru/data-siswa", group: "PENDIDIKAN DESA" },
      { label: "APS", path: "/guru/aps", group: "PENDIDIKAN DESA" },
      { label: "APK", path: "/guru/apk", group: "PENDIDIKAN DESA" },
      { label: "Literasi Digital", path: "/guru/literasi-digital", group: "PENDIDIKAN DESA" },
    ],
  },

  // === NAKES (Modul 43–46) ===
  nakes_posyandu: {
    key: "nakes_posyandu",
    nama: "Tenaga Kesehatan",
    warna: "#e65100",
    dashboardPath: "/nakes",
    sidebarItems: [
      { label: "Data Balita", path: "/nakes/data-balita", group: "KESEHATAN DESA" },
      { label: "Ibu Hamil", path: "/nakes/ibu-hamil", group: "KESEHATAN DESA" },
      { label: "Posyandu", path: "/nakes/posyandu", group: "KESEHATAN DESA" },
      { label: "Stunting", path: "/nakes/stunting", group: "KESEHATAN DESA" },
    ],
  },

  // === WARGA (Modul 47–50) ===
  warga: {
    key: "warga",
    nama: "Tokoh Masyarakat",
    warna: "#6a1b9a",
    dashboardPath: "/warga",
    sidebarItems: [
      { label: "Surat Online", path: "/warga/surat-online", group: "LAYANAN DESA" },
      { label: "Pengaduan", path: "/warga/pengaduan", group: "LAYANAN DESA" },
      { label: "Aspirasi", path: "/warga/aspirasi", group: "LAYANAN DESA" },
      { label: "Kualitas Hidup", path: "/warga/survey-qol", group: "SURVEY QoL" },
    ],
  },

  // === DINAS PMD REGIONAL (Modul 51–54) ===
  dinas_pmd: {
    key: "dinas_pmd",
    nama: "Dinas PMD Regional",
    warna: "#0d47a1",
    dashboardPath: "/dinas-pmd",
    sidebarItems: [
      { label: "Monitoring Multi Desa", path: "/dinas-pmd/monitoring-multi-desa", group: "MONITORING DESA" },
      { label: "Ranking Desa", path: "/dinas-pmd/benchmarking-desa", group: "BENCHMARKING DESA" },
      { label: "Readiness Dashboard", path: "/dinas-pmd/readiness-dashboard", group: "READINESS ASSESSMENT" },
      { label: "Maturity Dashboard", path: "/dinas-pmd/maturity-dashboard", group: "MATURITY ASSESSMENT" },
    ],
  },

  // === PENELITI (Modul 55–60) ===
  peneliti: {
    key: "peneliti",
    nama: "Peneliti",
    warna: "#37474f",
    dashboardPath: "/peneliti",
    sidebarItems: [
      { label: "Kuesioner Readiness", path: "/peneliti/kuesioner-readiness", group: "READINESS ASSESSMENT" },
      { label: "Gap Analysis", path: "/peneliti/gap-analysis", group: "READINESS ASSESSMENT" },
      { label: "Pairwise Comparison", path: "/peneliti/pairwise-comparison", group: "DSS ANALYTICS" },
      { label: "Consistency Ratio", path: "/peneliti/consistency-ratio", group: "DSS ANALYTICS" },
      { label: "Penilaian Maturity", path: "/peneliti/penilaian-maturity", group: "MATURITY ASSESSMENT" },
      { label: "UAT dan SUS", path: "/peneliti/uat-sus", group: "EVALUASI SISTEM" },
    ],
  },
  
  // === MASYARAKAT UMUM (SDGs 3, 4 & 18 + Profil) ===
  layanan_slv: {
    key: "layanan_slv",
    nama: "Masyarakat Umum",
    warna: "#2e7d32",
    dashboardPath: "/layanan-slv",
    sidebarItems: [
      // === Menu Utama ===
      { label: "Dasbor Masyarakat", path: "/layanan-slv", group: "Menu Utama" },
      { label: "Informasi Desa", path: "/layanan-slv/informasi-desa", group: "Menu Utama" },
      { label: "Layanan Publik Desa", path: "/layanan-slv/layanan-publik", group: "Menu Utama" },
      { label: "Agenda dan Kegiatan", path: "/layanan-slv/agenda-kegiatan", group: "Menu Utama" },

      // === SDG Desa 3—Kesehatan ===
      { label: "Posyandu Digital", path: "/layanan-slv/posyandu-digital", group: "SDG Desa 3—Kesehatan" },
      { label: "Jadwal Kesehatan", path: "/layanan-slv/jadwal-kesehatan", group: "SDG Desa 3—Kesehatan" },
      { label: "Informasi Kesehatan dan SDG Desa 3", path: "/layanan-slv/monitoring-kesehatan", group: "SDG Desa 3—Kesehatan" },
      { label: "Riwayat Layanan Kesehatan Saya", path: "/layanan-slv/riwayat-kesehatan", group: "SDG Desa 3—Kesehatan" },
      { label: "Edukasi Kesehatan", path: "/layanan-slv/edukasi-kesehatan", group: "SDG Desa 3—Kesehatan" },
      { label: "Telekonsultasi", path: "/layanan-slv/telekonsultasi", group: "SDG Desa 3—Kesehatan" },

      // === SDG Desa 4—Pendidikan ===
      { label: "Literasi Digital", path: "/layanan-slv/literasi-digital", group: "SDG Desa 4—Pendidikan" },
      { label: "Kelas Desa", path: "/layanan-slv/kelas-desa", group: "SDG Desa 4—Pendidikan" },
      { label: "Pelatihan Online", path: "/layanan-slv/pelatihan-online", group: "SDG Desa 4—Pendidikan" },
      { label: "Sertifikat Saya", path: "/layanan-slv/sertifikasi", group: "SDG Desa 4—Pendidikan" },
      { label: "Riwayat Pelatihan", path: "/layanan-slv/riwayat-pelatihan", group: "SDG Desa 4—Pendidikan" },

      // === SDG Desa 18—Kelembagaan dan Kebudayaan ===
      { label: "Informasi Budaya Publik dan SDG Desa 18", path: "/layanan-slv/informasi-budaya", group: "SDG Desa 18—Kelembagaan dan Kebudayaan" },
      { label: "Kalender Adat", path: "/layanan-slv/kalender-adat", group: "SDG Desa 18—Kelembagaan dan Kebudayaan" },
      { label: "Arsip Budaya Publik", path: "/layanan-slv/arsip-budaya", group: "SDG Desa 18—Kelembagaan dan Kebudayaan" },

      // === Partisipasi ===
      { label: "Forum Desa", path: "/layanan-slv/forum-desa", group: "Partisipasi" },
      { label: "Musyawarah dan Partisipasi Desa", path: "/layanan-slv/musyawarah-digital", group: "Partisipasi" },
      { label: "Aspirasi dan Pengaduan", path: "/layanan-slv/aspirasi-pengaduan", group: "Partisipasi" },
      { label: "Status Usulan", path: "/layanan-slv/status-usulan", group: "Partisipasi" },

      // === Pengguna ===
      { label: "Profil Saya", path: "/layanan-slv/profil-saya", group: "Pengguna" },
      { label: "Riwayat Layanan Saya", path: "/layanan-slv/riwayat-layanan", group: "Pengguna" },
      { label: "Notifikasi", path: "/layanan-slv/notifikasi", group: "Pengguna" },
      { label: "Bantuan dan Panduan", path: "/layanan-slv/bantuan-panduan", group: "Pengguna" },
    ],
  },
};

roleConfig.admin_super.sidebarItems = [
  { label: "Dasbor Operasional Sistem", path: "/admin", group: "MENU UTAMA" },
  
  // Kerangka dan Penilaian
  { label: "Master Kerangka Kesiapan", path: "/admin/master-framework", group: "Kerangka dan Penilaian" },
  { label: "Versi Kerangka", path: "/admin/framework-versioning", group: "Kerangka dan Penilaian" },
  { label: "Manajemen Periode", path: "/admin/manajemen-periode", group: "Kerangka dan Penilaian" },
  { label: "Validasi Teknis dan Kualitas Data", path: "/admin/validasi-data", group: "Kerangka dan Penilaian" },
  { label: "Integrasi Data Desa", path: "/admin/integrasi-data-desa", group: "Kerangka dan Penilaian" },

  // Tata Kelola dan DSS
  { label: "Konfigurasi Tata Kelola Sistem", path: "/admin/governance-management", group: "Tata Kelola dan DSS" },
  { label: "Basis Pengetahuan DSS", path: "/admin/dss-knowledge-base", group: "Tata Kelola dan DSS" },
  { label: "Monitoring Rekomendasi DSS", path: "/admin/dss-recommendation", group: "Tata Kelola dan DSS" },

  // Penelitian dan Evaluasi
  { label: "Evaluasi Artefak", path: "/admin/evaluasi-artefak", group: "Penelitian dan Evaluasi" },
  { label: "Validasi Pakar", path: "/admin/expert-validation", group: "Penelitian dan Evaluasi" },
  { label: "Hasil UAT, SUS, dan Umpan Balik", path: "/admin/uat-results", group: "Penelitian dan Evaluasi" },
  { label: "Repositori Penelitian", path: "/admin/research-repository", group: "Penelitian dan Evaluasi" },

  // Administrasi Sistem
  { label: "Manajemen Pengguna dan Peran", path: "/admin/user-management", group: "Administrasi Sistem" },
  { label: "Jejak Audit", path: "/admin/audit-log", group: "Administrasi Sistem" },
  { label: "Sistem dan Pengaturan", path: "/admin/konfigurasi-sistem", group: "Administrasi Sistem" },
  { label: "Pencadangan dan Pemulihan", path: "/admin/backup-restore", group: "Administrasi Sistem" },
  { label: "Notifikasi Sistem", path: "/admin/pengaturan-notifikasi", group: "Administrasi Sistem" },
];

roleConfig.operator_sid.sidebarItems = [
  { label: "Profil Desa", path: "/operator-sid/profil-desa", group: "DATA DESA" },
  { label: "Data Kependudukan", path: "/operator-sid/data-penduduk", group: "DATA DESA" },
  { label: "Data Pendidikan", path: "/operator-sid/data-pendidikan", group: "DATA DESA" },
  { label: "Data Kesehatan", path: "/operator-sid/data-kesehatan", group: "DATA DESA" },
  { label: "Data Ekonomi", path: "/operator-sid/data-ekonomi", group: "DATA DESA" },
  { label: "Data Infrastruktur", path: "/operator-sid/data-infrastruktur", group: "DATA DESA" },
  { label: "Data Sosial & Budaya", path: "/operator-sid/data-budaya", group: "DATA DESA" },
  { label: "Data Lingkungan", path: "/operator-sid/data-lingkungan", group: "DATA DESA" },
  { label: "Integrasi Data Desa", path: "/operator-sid/integrasi-data-desa", group: "INTEGRASI & SINKRONISASI" },
  { label: "Sinkronisasi SID", path: "/operator-sid/sinkronisasi-sid", group: "INTEGRASI & SINKRONISASI" },
  { label: "Import Data Excel", path: "/operator-sid/import-data-excel", group: "INTEGRASI & SINKRONISASI" },
  { label: "Riwayat Sinkronisasi", path: "/operator-sid/riwayat-sinkronisasi", group: "INTEGRASI & SINKRONISASI" },
  { label: "Validasi Data Assessment", path: "/operator-sid/validasi-data", group: "KUALITAS DATA" },
  { label: "Monitoring Kelengkapan Data", path: "/operator-sid/monitoring-kelengkapan-data", group: "KUALITAS DATA" },
  { label: "Data Quality Monitoring", path: "/operator-sid/data-quality-monitoring", group: "KUALITAS DATA" },
  { label: "Notifikasi Data Tidak Lengkap", path: "/operator-sid/notifikasi-data-tidak-lengkap", group: "KUALITAS DATA" },
  { label: "Pengaturan Akun", path: "/operator-sid/pengaturan-akun", group: "PENGATURAN" },
  { label: "Panduan & Bantuan", path: "/operator-sid/panduan-bantuan", group: "PENGATURAN" },
];

roleConfig.pemerintah_desa.sidebarItems = [
  // === Menu Utama ===
  { label: "Dasbor Strategis", path: "/pemdes", group: "Menu Utama" },
  { label: "Profil Desa", path: "/pemdes/profil-desa", group: "Menu Utama" },
  { label: "Data Desa Terintegrasi", path: "/pemdes/data-desa-terintegrasi", group: "Menu Utama" },
  { label: "Statistik Desa", path: "/pemdes/statistik-desa", group: "Menu Utama" },
  // === Penilaian dan Pemantauan ===
  { label: "Penilaian Kesiapan", path: "/pemdes/penilaian-kesiapan", group: "Penilaian dan Pemantauan" },
  { label: "Penilaian Kematangan Implementasi", path: "/pemdes/penilaian-kematangan", group: "Penilaian dan Pemantauan" },
  { label: "Penilaian Kualitas Hidup", path: "/pemdes/quality-of-life", group: "Penilaian dan Pemantauan" },
  { label: "Hasil Penilaian Desa", path: "/pemdes/hasil-assessment-desa", group: "Penilaian dan Pemantauan" },
  { label: "Pemantauan SDG Desa 3, 4, dan 18", path: "/pemdes/pemantauan-sdgs", group: "Penilaian dan Pemantauan" },
  { label: "Kualitas dan Keterbaruan Data", path: "/pemdes/kualitas-data", group: "Penilaian dan Pemantauan" },
  // === Keputusan dan Perencanaan ===
  { label: "Rekomendasi DSS", path: "/pemdes/dss-recommendation", group: "Keputusan dan Perencanaan" },
  { label: "Musyawarah dan Keputusan", path: "/pemdes/musyawarah-keputusan", group: "Keputusan dan Perencanaan" },
  { label: "Roadmap Smart Living Village", path: "/pemdes/roadmap-smart-living-village", group: "Keputusan dan Perencanaan" },
  { label: "Program dan Rencana Tindak Lanjut", path: "/pemdes/rkpdes", group: "Keputusan dan Perencanaan" },
  // === Monitoring dan Evaluasi ===
  { label: "Pemantauan Program", path: "/pemdes/monitoring-program", group: "Monitoring dan Evaluasi" },
  { label: "Progres Indikator", path: "/pemdes/kpi-dashboard", group: "Monitoring dan Evaluasi" },
  { label: "Unggah Bukti", path: "/pemdes/upload-evidence", group: "Monitoring dan Evaluasi" },
  { label: "Evaluasi Capaian", path: "/pemdes/evaluasi-capaian", group: "Monitoring dan Evaluasi" },
  // === Partisipasi ===
  { label: "Aspirasi dan Partisipasi Masyarakat", path: "/pemdes/aspirasi-partisipasi", group: "Partisipasi" },
  // === Laporan ===
  { label: "Laporan Desa", path: "/pemdes/laporan-desa", group: "Laporan" },
  { label: "Dokumentasi Kegiatan", path: "/pemdes/dokumentasi-kegiatan", group: "Laporan" },
  { label: "Notifikasi dan Peringatan", path: "/pemdes/notifikasi-peringatan", group: "Sistem" },
];

roleConfig.bpd.sidebarItems = [
  { label: "Profil Desa", path: "/bpd/profil-desa", group: "PROFIL & INFORMASI" },
  { label: "Ringkasan Assessment", path: "/bpd/ringkasan-assessment", group: "PROFIL & INFORMASI" },
  { label: "Monitoring Readiness", path: "/bpd/monitoring-readiness", group: "MONITORING & PENGAWASAN" },
  { label: "Monitoring Maturity", path: "/bpd/monitoring-maturity", group: "MONITORING & PENGAWASAN" },
  { label: "Monitoring Quality of Life", path: "/bpd/monitoring-quality-of-life", group: "MONITORING & PENGAWASAN" },
  { label: "Monitoring DSS Recommendation", path: "/bpd/evaluasi-program", group: "MONITORING & PENGAWASAN" },
  { label: "Pengawasan RTL", path: "/bpd/pengawasan-rtl", group: "MONITORING & PENGAWASAN" },
  { label: "Monitoring Program Desa", path: "/bpd/monitoring-program-desa", group: "MONITORING & PENGAWASAN" },
  { label: "Monitoring Evidence", path: "/bpd/monitoring-evidence", group: "MONITORING & PENGAWASAN" },
  { label: "Transparansi Anggaran Program", path: "/bpd/transparansi-apbdes", group: "TRANSPARANSI & AKUNTABILITAS" },
  { label: "Aspirasi Masyarakat", path: "/bpd/aspirasi-masyarakat", group: "PARTISIPASI MASYARAKAT" },
  { label: "Laporan Pengawasan BPD", path: "/bpd/laporan-pengawasan-bpd", group: "LAPORAN & NOTIFIKASI" },
  { label: "Notifikasi Temuan", path: "/bpd/notifikasi-temuan", group: "LAPORAN & NOTIFIKASI" },
];

roleConfig.lembaga_adat.sidebarItems = [
  { label: "Dasbor Kebudayaan dan SDG Desa 18", path: "/adat", group: "Dasbor" },
  { label: "Profil Adat Desa", path: "/adat/profil-adat", group: "Profil & Lembaga" },
  { label: "Data Lembaga Adat", path: "/adat/kelembagaan-adat", group: "Profil & Lembaga" },
  { label: "Data Tokoh Adat", path: "/adat/data-tokoh-adat", group: "Profil & Lembaga" },
  { label: "Warisan Budaya", path: "/adat/arsip", group: "Budaya & Pengetahuan" },
  { label: "Pengetahuan dan Praktik Lokal", path: "/adat/huma-betang", group: "Budaya & Pengetahuan" },
  { label: "Persetujuan dan Klasifikasi Data Budaya", path: "/adat/persetujuan-data", group: "Pemantauan & Persetujuan" },
  { label: "Monitoring Ketahanan Budaya", path: "/adat/monitoring-ketahanan-budaya", group: "Pemantauan & Persetujuan" },
  { label: "Monitoring SDG Desa 18", path: "/adat/monitoring-kearifan-lokal", group: "Pemantauan & Persetujuan" },
  { label: "Musyawarah dan Keputusan Adat", path: "/adat/musyawarah-adat", group: "Keputusan & Validasi" },
  { label: "Telaah Dampak Program terhadap Budaya", path: "/adat/dampak-program-budaya", group: "Keputusan & Validasi" },
  { label: "Pertimbangan Kesesuaian Program", path: "/adat/telaah-adat", group: "Keputusan & Validasi" },
  { label: "Aspirasi Masyarakat Adat", path: "/adat/aspirasi-masyarakat-adat", group: "Partisipasi & Laporan" },
  { label: "Dokumentasi Adat", path: "/adat/arsip", group: "Partisipasi & Laporan" },
  { label: "Kalender Adat", path: "/adat/kalender-adat", group: "Partisipasi & Laporan" },
  { label: "Laporan", path: "/adat/laporan-kelembagaan", group: "Partisipasi & Laporan" },
  { label: "Notifikasi", path: "/adat/notifikasi", group: "Partisipasi & Laporan" },
];

roleConfig.guru_fasilitator.sidebarItems = [
  // 1
  { label: "Dasbor Pendidikan", path: "/guru", group: "Dasbor" },
  // 2
  { label: "Profil Pendidikan Desa", path: "/guru/profil-pendidikan-desa", group: "Data Pendidikan" },
  // 3
  { label: "Data Pendidikan Desa", path: "/guru/data-pendidikan-desa", group: "Data Pendidikan" },
  // 4
  { label: "Monitoring Pendidikan dan SDG Desa 4", path: "/guru/monitoring-pendidikan", group: "Monitoring & Analisis" },
  // 5
  { label: "Literasi Digital", path: "/guru/literasi-digital", group: "Monitoring & Analisis" },
  // 6
  { label: "Kompetensi dan Pengembangan SDM Pendidikan", path: "/guru/kompetensi-sdm", group: "Monitoring & Analisis" },
  // 7
  { label: "Pelatihan dan Sertifikasi", path: "/guru/pelatihan-sertifikasi", group: "Pengembangan & Pelatihan" },
  // 8
  { label: "Program dan Tindak Lanjut", path: "/guru/program-tindak-lanjut", group: "Pengembangan & Pelatihan" },
  // 9
  { label: "Rekomendasi Pendidikan", path: "/guru/rekomendasi", group: "Pengembangan & Pelatihan" },
  // 10
  { label: "Laporan", path: "/guru/laporan", group: "Dokumentasi & Laporan" },
  // 11
  { label: "Notifikasi", path: "/guru/notifikasi", group: "Dokumentasi & Laporan" },
];


roleConfig.nakes_posyandu.sidebarItems = [
  // 1
  { label: "Dasbor Kesehatan", path: "/nakes", group: "Dasbor" },
  // 2
  { label: "Profil Kesehatan Desa", path: "/nakes/profil-kesehatan-desa", group: "Data Kesehatan" },
  // 3
  { label: "Data Kesehatan Desa", path: "/nakes/data-kesehatan-desa", group: "Data Kesehatan" },
  // 4
  { label: "Monitoring Kesehatan dan SDG Desa 3", path: "/nakes/monitoring-kesehatan", group: "Monitoring & Analisis" },
  // 5
  { label: "Posyandu Digital", path: "/nakes/posyandu", group: "Layanan Kesehatan" },
  // 6
  { label: "Data Ibu dan Anak", path: "/nakes/ibu-hamil", group: "Layanan Kesehatan" },
  // 7
  { label: "Monitoring Stunting", path: "/nakes/stunting", group: "Layanan Kesehatan" },
  // 8
  { label: "Penyakit Prioritas", path: "/nakes/penyakit-prioritas", group: "Layanan Kesehatan" },
  // 9
  { label: "Program Kesehatan Desa", path: "/nakes/program-kesehatan-desa", group: "Program & Rekomendasi" },
  // 10
  { label: "Kader Kesehatan", path: "/nakes/kader-kesehatan", group: "Program & Rekomendasi" },
  // 11
  { label: "Edukasi Kesehatan", path: "/nakes/edukasi-kesehatan", group: "Program & Rekomendasi" },
  // 12
  { label: "Rekomendasi/DSS Kesehatan", path: "/nakes/dss-kesehatan", group: "Program & Rekomendasi" },
  // 13
  { label: "Analisis Kesenjangan Kesehatan", path: "/nakes/health-gap-analysis", group: "Monitoring & Analisis" },
  // 14
  { label: "Target Hasil Kesehatan dan Kualitas Hidup", path: "/nakes/target-qol-kesehatan", group: "Monitoring & Analisis" },
  // 15
  { label: "Dokumentasi", path: "/nakes/dokumentasi-kesehatan", group: "Dokumentasi & Laporan" },
  // 16
  { label: "Kalender Kesehatan", path: "/nakes/kalender-kesehatan", group: "Dokumentasi & Laporan" },
  // 17
  { label: "Laporan", path: "/nakes/laporan-kesehatan-desa", group: "Dokumentasi & Laporan" },
  // 18
  { label: "Notifikasi", path: "/nakes/notifikasi", group: "Dokumentasi & Laporan" },
];

roleConfig.warga.sidebarItems = [
  // === KONDISI DESA ===
  { label: "Profil dan Kondisi Desa", path: "/warga/profil-desa", group: "KONDISI DESA" },
  { label: "Ringkasan Kesiapan Desa", path: "/warga/hasil-readiness-desa", group: "KONDISI DESA" },
  { label: "Ringkasan Kualitas Hidup Masyarakat", path: "/warga/hasil-quality-of-life-desa", group: "KONDISI DESA" },
  { label: "Roadmap Smart Living Village", path: "/warga/roadmap-desa", group: "KONDISI DESA" },
  // === ASPIRASI & KEBUTUHAN ===
  { label: "Aspirasi Masyarakat", path: "/warga/aspirasi", group: "ASPIRASI & KEBUTUHAN" },
  { label: "Pemantauan Masalah Masyarakat", path: "/warga/pemantauan-masalah", group: "ASPIRASI & KEBUTUHAN" },
  { label: "Prioritas Kebutuhan Masyarakat", path: "/warga/prioritas-kebutuhan", group: "ASPIRASI & KEBUTUHAN" },
  { label: "Usulan Program Desa", path: "/warga/usulan-program-desa", group: "ASPIRASI & KEBUTUHAN" },
  // === MUSYAWARAH & KEPUTUSAN ===
  { label: "Agenda dan Musyawarah Desa", path: "/warga/agenda-musyawarah", group: "MUSYAWARAH & KEPUTUSAN" },
  { label: "Masukan dan Partisipasi Masyarakat", path: "/warga/masukan-partisipasi", group: "MUSYAWARAH & KEPUTUSAN" },
  { label: "Hasil Keputusan dan Tindak Lanjut", path: "/warga/hasil-keputusan", group: "MUSYAWARAH & KEPUTUSAN" },
  // === MONITORING ===
  { label: "Program dan Status Pelaksanaan", path: "/warga/pemantauan-program-desa", group: "MONITORING" },
  { label: "Survei Persepsi Kesiapan", path: "/warga/survei-readiness", group: "MONITORING" },
  { label: "Survei Kualitas Hidup Masyarakat", path: "/warga/survey-qol", group: "MONITORING" },
  // === INFORMASI PUBLIK ===
  { label: "Informasi Kesehatan dan SDG Desa 3", path: "/warga/informasi-kesehatan", group: "INFORMASI PUBLIK" },
  { label: "Informasi Pendidikan dan SDG Desa 4", path: "/warga/informasi-pendidikan", group: "INFORMASI PUBLIK" },
  { label: "Informasi Budaya Publik dan SDG Desa 18", path: "/warga/informasi-budaya", group: "INFORMASI PUBLIK" },
  { label: "Agenda dan Informasi Publik", path: "/warga/agenda-informasi-publik", group: "INFORMASI PUBLIK" },
  { label: "Notifikasi dan Tindak Lanjut", path: "/warga/notifikasi", group: "INFORMASI PUBLIK" },
];

roleConfig.dinas_pmd.sidebarItems = [
  { label: "Profil Wilayah Kabupaten", path: "/dinas-pmd/profil-wilayah-kabupaten", group: "MONITORING WILAYAH" },
  { label: "Monitoring Readiness Desa", path: "/dinas-pmd/readiness-dashboard", group: "MONITORING WILAYAH" },
  { label: "Monitoring Maturity Desa", path: "/dinas-pmd/maturity-dashboard", group: "MONITORING WILAYAH" },
  { label: "Monitoring Quality of Life Desa", path: "/dinas-pmd/monitoring-quality-of-life-desa", group: "MONITORING WILAYAH" },
  { label: "Peta Smart Living Village (GIS)", path: "/dinas-pmd/monitoring-multi-desa", group: "MONITORING WILAYAH" },
  { label: "Benchmarking Desa", path: "/dinas-pmd/benchmarking-desa", group: "ANALISIS & EVALUASI" },
  { label: "Monitoring DSS Desa", path: "/dinas-pmd/monitoring-dss-desa", group: "ANALISIS & EVALUASI" },
  { label: "Monitoring Program Desa", path: "/dinas-pmd/monitoring-program-desa", group: "ANALISIS & EVALUASI" },
  { label: "Validasi Assessment Desa", path: "/dinas-pmd/validasi-assessment-desa", group: "ANALISIS & EVALUASI" },
  { label: "Analisis Gap Wilayah", path: "/dinas-pmd/analisis-gap-wilayah", group: "ANALISIS & EVALUASI" },
  { label: "Roadmap Kabupaten", path: "/dinas-pmd/roadmap-kabupaten", group: "ANALISIS & EVALUASI" },
  { label: "Monitoring Evidence Desa", path: "/dinas-pmd/monitoring-evidence-desa", group: "DATA & DOKUMENTASI" },
  { label: "Laporan Kabupaten", path: "/dinas-pmd/laporan-kabupaten", group: "DATA & DOKUMENTASI" },
  { label: "Pengguna", path: "/dinas-pmd/pengguna", group: "PENGATURAN" },
  { label: "Pengaturan Sistem", path: "/dinas-pmd/pengaturan-sistem", group: "PENGATURAN" },
];

roleConfig.peneliti.sidebarItems = [
  { label: "Dashboard - Ringkasan Penelitian", path: "/peneliti", group: "DASHBOARD" },
  { label: "Smart Living Dashboard Analytics", path: "/peneliti/dashboard-analytics", group: "DASHBOARD ANALYTICS" },
  { label: "Research Overview", path: "/peneliti/research-overview", group: "RESEARCH OVERVIEW" },
  { label: "Dataset Assessment", path: "/peneliti/dataset-assessment", group: "RESEARCH OVERVIEW" },
  { label: "Analisis Readiness", path: "/peneliti/kuesioner-readiness", group: "ANALISIS FRAMEWORK" },
  { label: "Analisis Maturity", path: "/peneliti/penilaian-maturity", group: "ANALISIS FRAMEWORK" },
  { label: "Analisis Quality of Life", path: "/peneliti/analisis-qol", group: "ANALISIS FRAMEWORK" },
  { label: "SDGs Dashboard", path: "/peneliti/sdgs-dashboard", group: "ANALISIS FRAMEWORK" },
  { label: "Analisis DSS Recommendation", path: "/peneliti/pairwise-comparison", group: "ANALISIS FRAMEWORK" },
  { label: "Validasi Artefak", path: "/peneliti/validasi-artefak", group: "VALIDASI & EVALUASI" },
  { label: "UAT & SUS Evaluation", path: "/peneliti/uat-sus", group: "VALIDASI & EVALUASI" },
  { label: "Expert Validation", path: "/peneliti/expert-validation", group: "VALIDASI & EVALUASI" },
  { label: "Statistik Penelitian", path: "/peneliti/consistency-ratio", group: "ANALITIK PENELITIAN" },
  { label: "Visualisasi Data", path: "/peneliti/visualisasi-data", group: "ANALITIK PENELITIAN" },
  { label: "Repository Penelitian", path: "/peneliti/repository-penelitian", group: "REPOSITORY & PUBLIKASI" },
  { label: "Publikasi & Sitasi", path: "/peneliti/publikasi-sitasi", group: "REPOSITORY & PUBLIKASI" },
  { label: "Laporan Penelitian", path: "/peneliti/laporan-penelitian", group: "REPOSITORY & PUBLIKASI" },
];

// Map database role string to RoleKey
export function getRoleKey(dbRole: string): RoleKey {
  if (dbRole in roleConfig) return dbRole as RoleKey;
  return "warga";
}

// Get role config from path
export function getRoleFromPath(pathname: string, userRole?: string): RoleConfig {
  // === PRIORITAS 1: Cek apakah path ada di sidebar role yang sedang login ===
  // Ini memastikan layanan_slv (dan role lain) yang mengakses route modulnya
  // tetap mendapat sidebar yang benar.
  if (userRole && userRole in roleConfig) {
    const userConfig = roleConfig[userRole as RoleKey];

    // Cek apakah ini adalah dashboard path role tersebut
    if (
      pathname === userConfig.dashboardPath ||
      pathname.startsWith(userConfig.dashboardPath + "/")
    ) {
      return userConfig;
    }

    // Cek apakah path saat ini ada di salah satu sidebar item role tersebut
    const isInUserSidebar = userConfig.sidebarItems.some(
      (item) =>
        pathname === item.path ||
        (item.path !== "/" && pathname.startsWith(item.path + "/"))
    );
    if (isInUserSidebar) {
      return userConfig;
    }
  }

  // === PRIORITAS 1.5: Jika userRole terdefinisi dan BUKAN admin_super,
  // maka paksa gunakan roleConfig dari userRole tersebut (tidak boleh beralih ke role lain).
  if (userRole && userRole in roleConfig && userRole !== "admin_super") {
    return roleConfig[userRole as RoleKey];
  }

  // === PRIORITAS 2: Deteksi berdasarkan prefix path (fallback) ===
  if (pathname.startsWith("/admin")) return roleConfig.admin_super;
  if (pathname.startsWith("/operator-sid")) return roleConfig.operator_sid;
  if (pathname.startsWith("/pemdes")) return roleConfig.pemerintah_desa;
  if (pathname.startsWith("/bpd")) return roleConfig.bpd;
  if (pathname.startsWith("/adat")) return roleConfig.lembaga_adat;
  if (pathname.startsWith("/guru")) return roleConfig.guru_fasilitator;
  if (pathname.startsWith("/nakes")) return roleConfig.nakes_posyandu;
  if (pathname.startsWith("/warga")) return roleConfig.warga;
  if (pathname.startsWith("/dinas-pmd")) return roleConfig.dinas_pmd;
  if (pathname.startsWith("/peneliti")) return roleConfig.peneliti;
  if (pathname.startsWith("/layanan-slv")) return roleConfig.layanan_slv;
  if (pathname.startsWith("/pengguna-layanan")) return roleConfig.layanan_slv;
  if (pathname.startsWith("/sustainability")) return roleConfig.admin_super;

  // === PRIORITAS 3: Kembalikan config userRole sebagai fallback terakhir ===
  if (userRole && userRole in roleConfig) {
    return roleConfig[userRole as RoleKey];
  }
  return roleConfig.warga;
}

// Get dashboard path for a given role
export function getDashboardPath(role: string): string {
  const config = roleConfig[role as RoleKey];
  return config?.dashboardPath || "/warga";
}

// Legacy compatibility exports
export type ModulKey = "belajar" | "sehat" | "adat" | "data-desa";
export interface ModulConfig {
  key: ModulKey;
  nama: string;
  warna: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  panelKiri: string;
  panelTengah: string;
  panelKanan: string;
  sidebarItems: { label: string; path: string }[];
}

export function getModulFromPath(pathname: string): { nama: string; warna: string; sidebarItems: { label: string; path: string }[] } {
  const role = getRoleFromPath(pathname);
  return {
    nama: role.nama,
    warna: role.warna,
    sidebarItems: role.sidebarItems,
  };
}

export function getFiturFromPath(pathname: string, modul: { sidebarItems: { label: string; path: string }[] }): string {
  const sortedItems = [...modul.sidebarItems].sort((a, b) => b.path.length - a.path.length);
  const item = sortedItems.find((i) => pathname === i.path || (i.path !== "/" && pathname.startsWith(i.path + "/")));
  return item?.label ?? "Dashboard";
}

export interface LayananSLVMetadata {
  fieldDataUtama: string;
  isiDataInformasi: string;
  fungsiSistem: string;
  output: string;
  placeholderTitle: string;
  placeholderCategory: string;
  placeholderValue: string;
  placeholderDescription: string;
  readOnly?: boolean;
}

export const layananSLVMetadata: Record<string, LayananSLVMetadata> = {
  "Posyandu Digital": {
    fieldDataUtama: "Data Balita, Ibu Hamil",
    isiDataInformasi: "Data Kesehatan",
    fungsiSistem: "Pelayanan Posyandu",
    output: "Riwayat Posyandu",
    placeholderTitle: "Nama Balita / Ibu Hamil",
    placeholderCategory: "Jenis Pelayanan (e.g. Imunisasi, Vitamin, Timbang)",
    placeholderValue: "Hasil Pengukuran (e.g. BB 12kg, TB 90cm)",
    placeholderDescription: "Catatan atau riwayat pemeriksaan posyandu",
    readOnly: true
  },
  "Jadwal Kesehatan": {
    fieldDataUtama: "Jadwal",
    isiDataInformasi: "Agenda",
    fungsiSistem: "Monitoring Jadwal",
    output: "Jadwal",
    placeholderTitle: "Nama Agenda Kegiatan Kesehatan",
    placeholderCategory: "Kategori Agenda (e.g. Posyandu Bulanan, Vaksinasi Massal)",
    placeholderValue: "Waktu & Tempat Pelaksanaan",
    placeholderDescription: "Detail deskripsi jadwal dan persiapan kegiatan",
    readOnly: true
  },
  "Monitoring Kesehatan": {
    fieldDataUtama: "Pemeriksaan",
    isiDataInformasi: "Riwayat",
    fungsiSistem: "Monitoring",
    output: "Status Kesehatan",
    placeholderTitle: "Nama Pasien / Warga",
    placeholderCategory: "Kategori Pemeriksaan (e.g. Tekanan Darah, Kolesterol)",
    placeholderValue: "Status Kesehatan (e.g. Sehat, Perlu Rujukan)",
    placeholderDescription: "Detail riwayat hasil pemeriksaan dan catatan dokter",
    readOnly: true
  },
  "Riwayat Kesehatan": {
    fieldDataUtama: "Rekam Medis",
    isiDataInformasi: "Riwayat",
    fungsiSistem: "Riwayat Layanan",
    output: "Rekam Medis",
    placeholderTitle: "Nomor RM / Nama Pasien",
    placeholderCategory: "Jenis Layanan / Tindakan Medis",
    placeholderValue: "Status Rekam Medis (e.g. Selesai, Tindak Lanjut)",
    placeholderDescription: "Rincian diagnosa, resep obat, dan riwayat rekam medis",
    readOnly: true
  },
  "Edukasi Kesehatan": {
    fieldDataUtama: "Materi",
    isiDataInformasi: "Video/PDF",
    fungsiSistem: "Edukasi",
    output: "Materi",
    placeholderTitle: "Judul Materi Edukasi Kesehatan",
    placeholderCategory: "Format Materi (e.g. Video, PDF, Infografis)",
    placeholderValue: "Target Edukasi (e.g. Ibu Hamil, Remaja, Lansia)",
    placeholderDescription: "Ringkasan konten edukasi atau link materi/sumber",
    readOnly: true
  },
  "Telekonsultasi": {
    fieldDataUtama: "Dokter, Jadwal",
    isiDataInformasi: "Booking",
    fungsiSistem: "Konsultasi",
    output: "Jadwal Konsultasi",
    placeholderTitle: "Nama Dokter / Tenaga Medis",
    placeholderCategory: "Spesialisasi (e.g. Dokter Umum, Spesialis Anak)",
    placeholderValue: "Jadwal Konsultasi (e.g. Senin 09:00 WIB)",
    placeholderDescription: "Detail link konsultasi virtual, keluhan awal, atau booking ID",
    readOnly: true
  },
  "Literasi Digital": {
    fieldDataUtama: "Modul",
    isiDataInformasi: "Materi",
    fungsiSistem: "Pembelajaran",
    output: "Progress",
    placeholderTitle: "Nama Modul / Topik Literasi",
    placeholderCategory: "Kategori Pembelajaran (e.g. Internet Sehat, Keamanan Data)",
    placeholderValue: "Target Waktu Penyelesaian",
    placeholderDescription: "Isi materi modul literasi digital singkat",
    readOnly: true
  },
  "Kelas Desa": {
    fieldDataUtama: "Jadwal",
    isiDataInformasi: "Pelatihan",
    fungsiSistem: "Registrasi",
    output: "Peserta",
    placeholderTitle: "Nama Kelas Virtual / Tatap Muka",
    placeholderCategory: "Kategori Pelatihan (e.g. Bahasa Inggris, Microsoft Office)",
    placeholderValue: "Kapasitas & Batas Registrasi",
    placeholderDescription: "Daftar peserta yang terdaftar dan syarat kelas",
    readOnly: true
  },
  "Pelatihan Online": {
    fieldDataUtama: "Materi",
    isiDataInformasi: "LMS",
    fungsiSistem: "Pembelajaran",
    output: "Progress",
    placeholderTitle: "Judul Pelatihan Online",
    placeholderCategory: "Materi Platform LMS (e.g. Video Sesi 1, Kuis)",
    placeholderValue: "Progress Belajar (e.g. 75% Selesai)",
    placeholderDescription: "Detail status pembelajaran LMS dan nilai kuis",
    readOnly: true
  },
  "Sertifikasi": {
    fieldDataUtama: "Nilai",
    isiDataInformasi: "Sertifikat",
    fungsiSistem: "Generate Sertifikat",
    output: "Sertifikat",
    placeholderTitle: "Nama Penerima Sertifikat",
    placeholderCategory: "Nilai Kelulusan & Predikat (e.g. 95 - Sangat Memuaskan)",
    placeholderValue: "Nomor Sertifikat / Tautan Unduh",
    placeholderDescription: "Detail kompetensi yang disertifikasi",
    readOnly: true
  },
  "Riwayat Pelatihan": {
    fieldDataUtama: "Riwayat",
    isiDataInformasi: "Data Pelatihan",
    fungsiSistem: "Riwayat",
    output: "History",
    placeholderTitle: "Nama Program Pelatihan Diikuti",
    placeholderCategory: "Penyelenggara / Narasumber",
    placeholderValue: "Status Akhir (e.g. Lulus, Berjalan)",
    placeholderDescription: "History detail tanggal mulai dan selesai pelatihan",
    readOnly: true
  },
  "Informasi Adat": {
    fieldDataUtama: "Artikel",
    isiDataInformasi: "Informasi",
    fungsiSistem: "Publikasi",
    output: "Informasi",
    placeholderTitle: "Judul Artikel / Informasi Adat",
    placeholderCategory: "Kategori Adat (e.g. Upacara Adat, Silsilah Budaya)",
    placeholderValue: "Status Publikasi (e.g. Diterbitkan, Draf)",
    placeholderDescription: "Konten lengkap artikel informasi adat dan budaya",
    readOnly: true
  },
  "Kalender Adat": {
    fieldDataUtama: "Agenda",
    isiDataInformasi: "Jadwal",
    fungsiSistem: "Kalender",
    output: "Kalender Adat",
    placeholderTitle: "Nama Ritual / Acara Adat",
    placeholderCategory: "Kategori Ritual (e.g. Ritual Keagamaan, Festival Tahunan)",
    placeholderValue: "Jadwal Adat (e.g. Hari Pantang, Bulan Purnama)",
    placeholderDescription: "Detail tata cara dan lokasi upacara adat",
    readOnly: true
  },
  "Arsip Budaya": {
    fieldDataUtama: "Dokumen",
    isiDataInformasi: "Arsip",
    fungsiSistem: "Dokumentasi",
    output: "Arsip",
    placeholderTitle: "Nama Dokumen / Aset Warisan Budaya",
    placeholderCategory: "Kategori Dokumen (e.g. Naskah Kuno, Foto Sejarah)",
    placeholderValue: "Status Dokumentasi (e.g. Digitalized, Hardcopy)",
    placeholderDescription: "Deskripsi fisik, arti filosofis, dan penyimpanan arsip",
    readOnly: true
  },
  "Forum Desa": {
    fieldDataUtama: "Diskusi",
    isiDataInformasi: "Forum",
    fungsiSistem: "Interaksi",
    output: "Forum",
    placeholderTitle: "Topik Diskusi / Pertanyaan Warga",
    placeholderCategory: "Kategori Forum (e.g. Gotong Royong, Usulan Infrastruktur)",
    placeholderValue: "Status Interaksi (e.g. Aktif, Selesai)",
    placeholderDescription: "Detail postingan diskusi dan rangkuman pendapat warga",
    readOnly: true
  },
  "Musyawarah Digital": {
    fieldDataUtama: "Agenda",
    isiDataInformasi: "Voting",
    fungsiSistem: "Musyawarah",
    output: "Keputusan",
    placeholderTitle: "Judul Agenda Musyawarah Desa",
    placeholderCategory: "Status Voting (e.g. Terbuka, Ditutup)",
    placeholderValue: "Target Keputusan / Resolusi",
    placeholderDescription: "Detail hasil musyawarah dan keputusan mufakat",
    readOnly: true
  },
  "Partisipasi Musyawarah": {
    fieldDataUtama: "Voting",
    isiDataInformasi: "Aspirasi",
    fungsiSistem: "Partisipasi",
    output: "Hasil Voting",
    placeholderTitle: "Pilihan Opsi Voting / Referendum",
    placeholderCategory: "Topik Aspirasi Warga",
    placeholderValue: "Hasil Perolehan Suara (e.g. Setuju 80%, Tolak 20%)",
    placeholderDescription: "Keterangan partisipasi suara warga",
    readOnly: true
  },
  "Profil Saya": {
    fieldDataUtama: "Biodata",
    isiDataInformasi: "Data User",
    fungsiSistem: "Update Profil",
    output: "Profil",
    placeholderTitle: "Nama Lengkap / Username",
    placeholderCategory: "Informasi Identitas (e.g. NIK, Alamat RT/RW)",
    placeholderValue: "Status Akun (e.g. Terverifikasi)",
    placeholderDescription: "Detail data biodata lengkap Masyarakat Umum",
    readOnly: true
  },
  "Riwayat Layanan": {
    fieldDataUtama: "Seluruh Aktivitas",
    isiDataInformasi: "Riwayat",
    fungsiSistem: "Monitoring Aktivitas",
    output: "History",
    placeholderTitle: "Nama Layanan / Modul Yang Diakses",
    placeholderCategory: "Jenis Aktivitas (e.g. Booking Telemedicine, Request Surat)",
    placeholderValue: "Status Layanan (e.g. Selesai, Proses)",
    placeholderDescription: "Detail log riwayat aktivitas lengkap",
    readOnly: true
  },
  "Notifikasi": {
    fieldDataUtama: "Pesan Sistem",
    isiDataInformasi: "Informasi",
    fungsiSistem: "Push Notification",
    output: "Notifikasi",
    placeholderTitle: "Subjek Notifikasi Sistem",
    placeholderCategory: "Tingkat Prioritas (e.g. Penting, Info Biasa)",
    placeholderValue: "Status Pengiriman (e.g. Terkirim)",
    placeholderDescription: "Isi lengkap pesan notifikasi / pengumuman sistem",
    readOnly: true
  },
  "Bantuan & Panduan": {
    fieldDataUtama: "FAQ",
    isiDataInformasi: "Bantuan",
    fungsiSistem: "Help Center",
    output: "Bantuan",
    placeholderTitle: "Topik Pertanyaan / Kendala Sistem",
    placeholderCategory: "Kategori Bantuan (e.g. Masalah Akun, Error Aplikasi)",
    placeholderValue: "Tautan Panduan PDF/Video",
    placeholderDescription: "Jawaban FAQ atau langkah panduan penyelesaian kendala",
    readOnly: true
  }
};
