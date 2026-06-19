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
  | "peneliti";

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
  // === SUPER ADMIN (Modul 1–14) ===
  admin_super: {
    key: "admin_super",
    nama: "Super Admin",
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
    nama: "Pemdes (Kepala Desa)",
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
    nama: "Guru",
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
    nama: "Nakes",
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
    nama: "Warga",
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
};

roleConfig.admin_super.sidebarItems = [
  { label: "Master Framework", path: "/admin/master-framework", group: "FRAMEWORK & ASSESSMENT" },
  { label: "Framework Versioning", path: "/admin/framework-versioning", group: "FRAMEWORK & ASSESSMENT" },
  { label: "Manajemen Periode", path: "/admin/manajemen-periode", group: "FRAMEWORK & ASSESSMENT" },
  { label: "Manajemen User & Role", path: "/admin/user-management", group: "FRAMEWORK & ASSESSMENT" },
  { label: "Validasi Data", path: "/admin/validasi-data", group: "FRAMEWORK & ASSESSMENT" },
  { label: "Integrasi Data Desa", path: "/admin/integrasi-data-desa", group: "DATA & INTEGRASI" },
  { label: "Audit Log", path: "/admin/audit-log", group: "DATA & INTEGRASI" },
  { label: "Governance Management", path: "/admin/governance-management", group: "TATA KELOLA & DSS" },
  { label: "DSS Knowledge Base", path: "/admin/dss-knowledge-base", group: "TATA KELOLA & DSS" },
  { label: "Readiness, Maturity & QoL Analytics", path: "/admin/dashboard-analytics", group: "PENELITIAN & EVALUASI ARTEFAK" },
  { label: "Evaluasi Artefak", path: "/admin/evaluasi-artefak", group: "PENELITIAN & EVALUASI ARTEFAK" },
  { label: "Expert Validation", path: "/admin/expert-validation", group: "PENELITIAN & EVALUASI ARTEFAK" },
  { label: "UAT Results (SUS & Feedback)", path: "/admin/uat-results", group: "PENELITIAN & EVALUASI ARTEFAK" },
  { label: "Research Repository", path: "/admin/research-repository", group: "PENELITIAN & EVALUASI ARTEFAK" },
  { label: "Konfigurasi Sistem", path: "/admin/konfigurasi-sistem", group: "SISTEM" },
  { label: "Backup & Restore", path: "/admin/backup-restore", group: "SISTEM" },
  { label: "Pengaturan Notifikasi", path: "/admin/pengaturan-notifikasi", group: "SISTEM" },
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
  { label: "Profil Desa Lung Anai", path: "/pemdes/profil-desa", group: "INFORMASI DESA" },
  { label: "Data Desa Ringkas", path: "/pemdes/data-desa-ringkas", group: "INFORMASI DESA" },
  { label: "Statistik Desa", path: "/pemdes/statistik-desa", group: "INFORMASI DESA" },
  { label: "Readiness Assessment", path: "/pemdes/readiness-assessment", group: "ASSESSMENT" },
  { label: "Maturity Assessment", path: "/pemdes/maturity-assessment", group: "ASSESSMENT" },
  { label: "Quality of Life Assessment", path: "/pemdes/quality-of-life", group: "ASSESSMENT" },
  { label: "Hasil Assessment Desa", path: "/pemdes/hasil-assessment-desa", group: "ASSESSMENT" },
  { label: "DSS Recommendation", path: "/pemdes/dss-recommendation", group: "DECISION SUPPORT SYSTEM" },
  { label: "Roadmap Smart Living Village", path: "/pemdes/roadmap-smart-living-village", group: "PERENCANAAN & TINDAK LANJUT" },
  { label: "Rencana Tindak Lanjut (RTL)", path: "/pemdes/rkpdes", group: "PERENCANAAN & TINDAK LANJUT" },
  { label: "Monitoring Program", path: "/pemdes/monitoring-program", group: "MONITORING & EVALUASI" },
  { label: "Progress Indikator", path: "/pemdes/kpi-dashboard", group: "MONITORING & EVALUASI" },
  { label: "Upload Evidence", path: "/pemdes/upload-evidence", group: "MONITORING & EVALUASI" },
  { label: "Evaluasi Capaian", path: "/pemdes/evaluasi-capaian", group: "MONITORING & EVALUASI" },
  { label: "Laporan Desa", path: "/pemdes/laporan-desa", group: "LAPORAN & DOKUMENTASI" },
  { label: "Dokumentasi Kegiatan", path: "/pemdes/dokumentasi-kegiatan", group: "LAPORAN & DOKUMENTASI" },
  { label: "Notifikasi Program Prioritas", path: "/pemdes/notifikasi-program-prioritas", group: "NOTIFIKASI" },
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
  { label: "Profil Adat Desa Lung Anai", path: "/adat/profil-adat", group: "BUDAYA DAN ADAT" },
  { label: "Data Lembaga Adat", path: "/adat/kelembagaan-adat", group: "BUDAYA DAN ADAT" },
  { label: "Data Tokoh Adat", path: "/adat/data-tokoh-adat", group: "BUDAYA DAN ADAT" },
  { label: "Warisan Budaya", path: "/adat/arsip", group: "BUDAYA DAN ADAT" },
  { label: "Pengetahuan Lokal", path: "/adat/huma-betang", group: "BUDAYA DAN ADAT" },
  { label: "Monitoring Ketahanan Budaya", path: "/adat/monitoring-ketahanan-budaya", group: "BUDAYA DAN ADAT" },
  { label: "Monitoring Kearifan Lokal", path: "/adat/monitoring-kearifan-lokal", group: "BUDAYA DAN ADAT" },
  { label: "Dampak Program terhadap Budaya", path: "/adat/dampak-program-budaya", group: "BUDAYA DAN ADAT" },
  { label: "Validasi Program Desa", path: "/adat/validasi-program-desa", group: "BUDAYA DAN ADAT" },
  { label: "Aspirasi Masyarakat Adat", path: "/adat/aspirasi-masyarakat-adat", group: "BUDAYA DAN ADAT" },
  { label: "Dokumentasi Adat", path: "/adat/arsip", group: "BUDAYA DAN ADAT" },
  { label: "Kalender Adat", path: "/adat/kalender-adat", group: "BUDAYA DAN ADAT" },
  { label: "Laporan Adat", path: "/adat/laporan-kelembagaan", group: "BUDAYA DAN ADAT" },
];

roleConfig.guru_fasilitator.sidebarItems = [
  { label: "Profil Pendidikan Desa", path: "/guru/profil-pendidikan-desa", group: "DATA PENDIDIKAN" },
  { label: "Data Pendidikan Desa", path: "/guru/data-siswa", group: "DATA PENDIDIKAN" },
  { label: "Monitoring Pendidikan", path: "/guru/monitoring-pendidikan", group: "DATA PENDIDIKAN" },
  { label: "Literasi Digital", path: "/guru/literasi-digital", group: "DATA PENDIDIKAN" },
  { label: "Pelatihan & Sertifikasi", path: "/guru/pelatihan-sertifikasi", group: "PENGEMBANGAN SDM" },
  { label: "Monitoring SDM Desa", path: "/guru/monitoring-sdm-desa", group: "PENGEMBANGAN SDM" },
  { label: "Program Pendidikan Desa", path: "/guru/program-pendidikan-desa", group: "PENGEMBANGAN SDM" },
  { label: "Dampak Pendidikan", path: "/guru/dampak-pendidikan", group: "EVALUASI & DAMPAK" },
  { label: "Kontribusi ke Readiness", path: "/guru/kontribusi-readiness", group: "EVALUASI & DAMPAK" },
  { label: "Kontribusi ke QoL", path: "/guru/kontribusi-qol", group: "EVALUASI & DAMPAK" },
  { label: "Kontribusi ke Maturity", path: "/guru/kontribusi-maturity", group: "EVALUASI & DAMPAK" },
  { label: "Aspirasi Pendidikan", path: "/guru/aspirasi-pendidikan", group: "PARTISIPASI & DOKUMENTASI" },
  { label: "Dokumentasi Pendidikan", path: "/guru/dokumentasi-pendidikan", group: "PARTISIPASI & DOKUMENTASI" },
  { label: "Kalender Pendidikan", path: "/guru/kalender-pendidikan", group: "PARTISIPASI & DOKUMENTASI" },
  { label: "Laporan Pendidikan Desa", path: "/guru/laporan-pendidikan-desa", group: "PARTISIPASI & DOKUMENTASI" },
];

roleConfig.nakes_posyandu.sidebarItems = [
  { label: "Profil Kesehatan Desa", path: "/nakes/profil-kesehatan-desa", group: "DATA KESEHATAN" },
  { label: "Data Kesehatan Desa", path: "/nakes/data-kesehatan-desa", group: "DATA KESEHATAN" },
  { label: "Monitoring Kesehatan", path: "/nakes/monitoring-kesehatan", group: "DATA KESEHATAN" },
  { label: "Posyandu Digital", path: "/nakes/posyandu", group: "DATA KESEHATAN" },
  { label: "Data Ibu & Anak", path: "/nakes/ibu-hamil", group: "DATA KESEHATAN" },
  { label: "Monitoring Stunting", path: "/nakes/stunting", group: "DATA KESEHATAN" },
  { label: "Penyakit Prioritas", path: "/nakes/penyakit-prioritas", group: "DATA KESEHATAN" },
  { label: "Program Kesehatan Desa", path: "/nakes/program-kesehatan-desa", group: "PROGRAM KESEHATAN" },
  { label: "Kader Kesehatan", path: "/nakes/kader-kesehatan", group: "PROGRAM KESEHATAN" },
  { label: "Edukasi Kesehatan", path: "/nakes/edukasi-kesehatan", group: "PROGRAM KESEHATAN" },
  { label: "DSS Kesehatan", path: "/nakes/dss-kesehatan", group: "ANALISIS & REKOMENDASI" },
  { label: "Health Gap Analysis", path: "/nakes/health-gap-analysis", group: "ANALISIS & REKOMENDASI" },
  { label: "Target QoL Kesehatan", path: "/nakes/target-qol-kesehatan", group: "ANALISIS & REKOMENDASI" },
  { label: "Dokumentasi Kesehatan", path: "/nakes/dokumentasi-kesehatan", group: "DOKUMENTASI & LAPORAN" },
  { label: "Kalender Kesehatan", path: "/nakes/kalender-kesehatan", group: "DOKUMENTASI & LAPORAN" },
  { label: "Laporan Kesehatan Desa", path: "/nakes/laporan-kesehatan-desa", group: "DOKUMENTASI & LAPORAN" },
];

roleConfig.warga.sidebarItems = [
  { label: "Profil Desa Lung Anai", path: "/warga/profil-desa", group: "INFORMASI DESA" },
  { label: "Hasil Readiness Desa", path: "/warga/hasil-readiness-desa", group: "INFORMASI DESA" },
  { label: "Hasil Quality of Life Desa", path: "/warga/hasil-quality-of-life-desa", group: "INFORMASI DESA" },
  { label: "Roadmap Desa", path: "/warga/roadmap-desa", group: "INFORMASI DESA" },
  { label: "Aspirasi Masyarakat", path: "/warga/aspirasi", group: "PARTISIPASI MASYARAKAT" },
  { label: "Survei Readiness", path: "/warga/survei-readiness", group: "PARTISIPASI MASYARAKAT" },
  { label: "Survei Quality of Life", path: "/warga/survey-qol", group: "PARTISIPASI MASYARAKAT" },
  { label: "Usulan Program Desa", path: "/warga/usulan-program-desa", group: "PARTISIPASI MASYARAKAT" },
  { label: "Program Desa", path: "/warga/program-desa", group: "MONITORING PROGRAM" },
  { label: "Status Program", path: "/warga/status-program", group: "MONITORING PROGRAM" },
  { label: "Pelaporan Masalah Desa", path: "/warga/pengaduan", group: "MONITORING PROGRAM" },
  { label: "Agenda Desa", path: "/warga/agenda-desa", group: "INFORMASI PUBLIK" },
  { label: "Informasi Adat & Budaya", path: "/warga/informasi-adat-budaya", group: "INFORMASI PUBLIK" },
  { label: "Informasi Pendidikan", path: "/warga/informasi-pendidikan", group: "INFORMASI PUBLIK" },
  { label: "Informasi Kesehatan", path: "/warga/informasi-kesehatan", group: "INFORMASI PUBLIK" },
  { label: "Notifikasi Desa", path: "/warga/notifikasi-desa", group: "INFORMASI PUBLIK" },
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
  { label: "Research Overview", path: "/peneliti/research-overview", group: "RESEARCH OVERVIEW" },
  { label: "Dataset Assessment", path: "/peneliti/dataset-assessment", group: "RESEARCH OVERVIEW" },
  { label: "Analisis Readiness", path: "/peneliti/kuesioner-readiness", group: "ANALISIS FRAMEWORK" },
  { label: "Analisis Maturity", path: "/peneliti/penilaian-maturity", group: "ANALISIS FRAMEWORK" },
  { label: "Analisis Quality of Life", path: "/peneliti/analisis-quality-of-life", group: "ANALISIS FRAMEWORK" },
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
export function getRoleFromPath(pathname: string): RoleConfig {
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
  if (pathname.startsWith("/sustainability")) return roleConfig.admin_super;
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
  const item = modul.sidebarItems.find((i) => pathname === i.path || (i.path !== "/" && pathname.startsWith(i.path + "/")));
  return item?.label ?? "Dashboard";
}
