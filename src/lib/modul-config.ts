// Modul config: warna, nama, sidebar items, panel labels
export type ModulKey = "belajar" | "sehat" | "adat" | "data-desa";

export interface ModulConfig {
  key: ModulKey;
  nama: string;
  warna: string;          // hex color
  bgClass: string;        // tailwind bg class
  textClass: string;      // tailwind text class
  borderClass: string;
  panelKiri: string;
  panelTengah: string;
  panelKanan: string;
  sidebarItems: { label: string; path: string }[];
}

export const modulConfig: Record<ModulKey, ModulConfig> = {
  belajar: {
    key: "belajar",
    nama: "Smart Belajar Adat",
    warna: "#1E5FA5",
    bgClass: "bg-[#1E5FA5]",
    textClass: "text-[#1E5FA5]",
    borderClass: "border-[#1E5FA5]",
    panelKiri: "Jadwal/Kegiatan",
    panelTengah: "Konten & Aktivitas",
    panelKanan: "Status Peserta",
    sidebarItems: [
      { label: "Dashboard Modul", path: "/belajar" },
      { label: "E-Learning Budaya Lokal", path: "/belajar/e-learning" },
      { label: "Platform Pembelajaran Digital Desa", path: "/belajar/platform-pembelajaran" },
      { label: "Pusat Literasi Digital Desa", path: "/belajar/pusat-literasi" },
      { label: "Program Pelatihan Guru Digital", path: "/belajar/pelatihan-guru" },
      { label: "Kelas Virtual Komunitas", path: "/belajar/kelas-virtual" },
      { label: "Laporan Pembelajaran", path: "/belajar/laporan-pembelajaran" },
    ],
  },
  sehat: {
    key: "sehat",
    nama: "Smart Sehat Adat",
    warna: "#E07B2A",
    bgClass: "bg-[#E07B2A]",
    textClass: "text-[#E07B2A]",
    borderClass: "border-[#E07B2A]",
    panelKiri: "Antrian/Jadwal",
    panelTengah: "Ringkasan Layanan",
    panelKanan: "Status Kasus",
    sidebarItems: [
      { label: "Dashboard Modul", path: "/sehat" },
      { label: "Telemedicine Desa", path: "/sehat/telemedicine" },
      { label: "Rekam Medis Digital", path: "/sehat/rekam-medis" },
      { label: "Monitoring Kesehatan Warga", path: "/sehat/monitoring" },
      { label: "Sistem Informasi Posyandu", path: "/sehat/posyandu" },
      { label: "Deteksi Dini Stunting & Gizi", path: "/sehat/stunting" },
      { label: "Laporan Kesehatan", path: "/sehat/laporan-kesehatan" },
    ],
  },
  adat: {
    key: "adat",
    nama: "Smart Lembaga Adat",
    warna: "#2E7D32",
    bgClass: "bg-[#2E7D32]",
    textClass: "text-[#2E7D32]",
    borderClass: "border-[#2E7D32]",
    panelKiri: "Agenda/Registrasi",
    panelTengah: "Ringkasan Fitur",
    panelKanan: "Status Proses",
    sidebarItems: [
      { label: "Dashboard Modul", path: "/adat" },
      { label: "SI Kelembagaan Adat", path: "/adat/kelembagaan" },
      { label: "Arsip Digital Adat & Budaya", path: "/adat/arsip" },
      { label: "Musyawarah Adat Online", path: "/adat/musyawarah" },
      { label: "Digital Mapping Wilayah Adat", path: "/adat/mapping" },
      { label: "Portal Hukum Adat & Konflik", path: "/adat/hukum-adat" },
      { label: "Laporan Kelembagaan", path: "/adat/laporan-kelembagaan" },
    ],
  },
  "data-desa": {
    key: "data-desa",
    nama: "Data Desa Adat Borneo",
    warna: "#5E35B1",
    bgClass: "bg-[#5E35B1]",
    textClass: "text-[#5E35B1]",
    borderClass: "border-[#5E35B1]",
    panelKiri: "Ringkasan",
    panelTengah: "Statistik",
    panelKanan: "Status Wilayah",
    sidebarItems: [
      { label: "Dashboard Utama", path: "/" },
      { label: "Data Desa", path: "/data-desa" },
      { label: "Manajemen Pengguna", path: "/data-desa/pengguna" },
    ],
  },
};

export function getModulFromPath(pathname: string): ModulConfig {
  if (pathname.startsWith("/belajar")) return modulConfig.belajar;
  if (pathname.startsWith("/sehat")) return modulConfig.sehat;
  if (pathname.startsWith("/adat")) return modulConfig.adat;
  return modulConfig["data-desa"];
}

export function getFiturFromPath(pathname: string, modul: ModulConfig): string {
  const item = modul.sidebarItems.find((i) => pathname === i.path || pathname.startsWith(i.path + "/"));
  return item?.label ?? modul.nama;
}
