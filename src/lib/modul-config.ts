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
