'use client';

import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  AlertTriangle, CheckCircle2, Info, ArrowUpRight, ChevronRight,
  Activity, ShieldCheck, FileText, TrendingUp, RefreshCw, Award,
  Target, Zap, Calendar, Users, MapPin, BarChart2, Globe,
  ClipboardList, Camera, Search, Eye, Map, Compass,
  Building2, Star, Layers,
} from 'lucide-react';

// ─── Warna tema Dinas PMD ────────────────────────────────────────────────────
const C = {
  primary: '#312e81',
  secondary: '#4338ca',
  green: '#276749',
  orange: '#c05621',
  blue: '#2b6cb0',
};

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

const pengumuman = [
  { id: 1, teks: 'Rapat Koordinasi Smart Living Village', tgl: '25/06/2025' },
  { id: 2, teks: 'Batas Akhir Validasi Assessment Desa', tgl: '30/06/2025' },
  { id: 3, teks: 'Pelatihan Pengelola SID Kecamatan', tgl: '28/06/2025' },
  { id: 4, teks: 'Monitoring Program Tahap II', tgl: '22/06/2025' },
  { id: 5, teks: 'Evaluasi Smart Living Village 2025', tgl: '15/06/2025' },
];

// Monitoring Readiness Desa
const readinessDesa = [
  { no: 1, desa: 'Lung Anai', kecamatan: 'Loa Kulu', index: 74.30, kategori: 'Baik' },
  { no: 2, desa: 'Muara Aloh', kecamatan: 'Tenggarong Seberang', index: 68.20, kategori: 'Baik' },
  { no: 3, desa: 'Loa Duri Ilir', kecamatan: 'Loa Janan', index: 65.10, kategori: 'Cukup' },
  { no: 4, desa: 'Long Beleh Modang', kecamatan: 'Kota Bangun', index: 62.40, kategori: 'Cukup' },
  { no: 5, desa: 'Muara Kaman Ulu', kecamatan: 'Muara Kaman', index: 60.30, kategori: 'Cukup' },
];

// Benchmarking top 10
const benchmarking = [
  { rank: 1, desa: 'Lung Anai', readiness: 74.30 },
  { rank: 2, desa: 'Muara Aloh', readiness: 68.20 },
  { rank: 3, desa: 'Loa Duri Ilir', readiness: 65.10 },
  { rank: 4, desa: 'Long Beleh Modang', readiness: 62.40 },
  { rank: 5, desa: 'Muara Kaman Ulu', readiness: 60.30 },
  { rank: 6, desa: 'Bukit Raya', readiness: 58.70 },
  { rank: 7, desa: 'Sebulu Ulu', readiness: 54.10 },
  { rank: 8, desa: 'Kota Bangun', readiness: 52.30 },
  { rank: 9, desa: 'Loa Lepu', readiness: 49.60 },
  { rank: 10, desa: 'Kutai Buana', readiness: 51.30 },
];

// Monitoring QoL Desa (Radar data as table)
const qolDesa = [
  { dimensi: 'Kesehatan', skor: 72.40 },
  { dimensi: 'Pendidikan', skor: 70.80 },
  { dimensi: 'Ekonomi', skor: 72.10 },
  { dimensi: 'Lingkungan', skor: 69.30 },
  { dimensi: 'Sosial Budaya', skor: 70.50 },
  { dimensi: 'Kelembagaan', skor: 71.20 },
];

// Monitoring Maturity Desa - donut
const maturityData = [
  { name: 'Developing (2)', value: 61, persen: '31,5%', color: '#ecc94b' },
  { name: 'Established (3)', value: 72, persen: '37,3%', color: '#4299e1' },
  { name: 'Smart Living Ready (4)', value: 32, persen: '16,6%', color: '#48bb78' },
  { name: 'Initial (1)', value: 28, persen: '14,5%', color: '#e53e3e' },
];

// Monitoring QoL Distribution
const qolDistribution = [
  { kategori: 'Sangat Baik (≥ 80)', jumlah: 45, persen: '23,3%', color: '#276749' },
  { kategori: 'Baik (70 - 79)', jumlah: 96, persen: '49,7%', color: '#4299e1' },
  { kategori: 'Sedang (60 - 69)', jumlah: 39, persen: '20,2%', color: '#ecc94b' },
  { kategori: 'Rendah (< 60)', jumlah: 13, persen: '6,7%', color: '#e53e3e' },
];

// Analisis Gap Wilayah
const gapWilayah = [
  { dimensi: 'Sumber Daya Manusia', saat: 57.81, target: 75.0, gap: 17.19, prioritas: 'Tinggi' },
  { dimensi: 'Infrastruktur Digital', saat: 61.23, target: 80.0, gap: 18.77, prioritas: 'Tinggi' },
  { dimensi: 'Ekonomi', saat: 64.12, target: 80.0, gap: 15.88, prioritas: 'Tinggi' },
  { dimensi: 'Kesehatan', saat: 62.40, target: 75.0, gap: 12.60, prioritas: 'Sedang' },
  { dimensi: 'Lingkungan', saat: 66.30, target: 80.0, gap: 13.70, prioritas: 'Sedang' },
  { dimensi: 'Sosial Budaya', saat: 64.10, target: 75.0, gap: 10.90, prioritas: 'Sedang' },
  { dimensi: 'Kelembagaan', saat: 67.20, target: 80.0, gap: 12.80, prioritas: 'Sedang' },
];

// Monitoring DSS Desa
const dssDesa = [
  { desa: 'Lung Anai', rekomendasi: 'Peningkatan SDM & Literasi Digital', status: 'Berjalan', progress: 70 },
  { desa: 'Muara Aloh', rekomendasi: 'Peningkatan Infrastruktur Dasar', status: 'Berjalan', progress: 55 },
  { desa: 'Loa Duri Ilir', rekomendasi: 'Pengembangan Ekonomi Desa', status: 'Berjalan', progress: 45 },
  { desa: 'Long Beleh Modang', rekomendasi: 'Penguatan Kelembagaan Desa', status: 'Berjalan', progress: 40 },
  { desa: 'Muara Kaman Ulu', rekomendasi: 'Peningkatan Layanan Kesehatan', status: 'Dalam Proses', progress: 40 },
];

// Monitoring Program Desa - donut
const programDesaData = [
  { name: 'Berjalan', value: 198, persen: '60,4%', color: '#4299e1' },
  { name: 'Selesai/Proses', value: 72, persen: '22,0%', color: '#48bb78' },
  { name: 'Dalam Proses', value: 38, persen: '11,6%', color: '#ecc94b' },
  { name: 'Tertunda', value: 20, persen: '6,0%', color: '#e53e3e' },
];

// Prioritas Intervensi Kabupaten
const prioritasIntervensi = [
  { no: 1, judul: 'Peningkatan SDM & Literasi Digital', deskripsi: 'Peningkatan kualitas sumber daya manusia dan literasi digital', prioritas: 'Tinggi' },
  { no: 2, judul: 'Peningkatan Infrastruktur Digital', deskripsi: 'Pembangunan infrastruktur internet dan teknologi di desa', prioritas: 'Tinggi' },
  { no: 3, judul: 'Penguatan Kesehatan Masyarakat', deskripsi: 'Peningkatan akses dan kualitas layanan kesehatan desa', prioritas: 'Tinggi' },
  { no: 4, judul: 'Pelestarian Budaya & Kearifan Lokal', deskripsi: 'Melindungi nilai budaya dalam konteks pembangunan', prioritas: 'Sedang' },
];

// Target & Roadmap
const targetRoadmap = [
  { tahun: '2024\n(Capai)', maturity: 54.30, qol: 57.40 },
  { tahun: '2025', maturity: 58.70, qol: 63.40 },
  { tahun: '2026', maturity: 71.40, qol: 72.00 },
  { tahun: '2027', maturity: 81.20, qol: 81.70 },
];

// Validasi Assessment
const validasiAssessment = { total: 193, tervalidasi: 174, persen: '90,2%', dalam: 15, persenD: '7,8%', revisi: 4, persenR: '2,0%' };

// Dokumentasi
const dokumentasiKab = [
  { judul: 'Rakor Smart Living Village', tgl: '25/06/2025', emoji: '📋' },
  { judul: 'Pelatihan Operator SID', tgl: '20/06/2025', emoji: '💻' },
  { judul: 'Monitoring Desa Lung Anai', tgl: '18/06/2025', emoji: '🏘️' },
  { judul: 'Evaluasi Program Desa', tgl: '15/06/2025', emoji: '📊' },
];

// Siklus SLV Kabupaten
const siklusKab = [
  { no: 1, judul: 'Monitoring & Assessment', sub: 'Mengumpulkan data dan kondisi desa di seluruh kabupaten', icon: ClipboardList, done: true },
  { no: 2, judul: 'Analisis & DSS', sub: 'Menganalisa data dan rekomendasi prioritas desa', icon: BarChart2, done: true },
  { no: 3, judul: 'Implementasi Program', sub: 'Desa melaksanakan program berdasarkan rekomendasi', icon: Zap, done: true },
  { no: 4, judul: 'Monitoring & Evaluasi', sub: 'Memantau progress program dan dampaknya', icon: Activity, active: true },
  { no: 5, judul: 'Evaluasi QoL', sub: 'Evaluasi dampak terhadap kualitas hidup masyarakat', icon: TrendingUp, done: false },
  { no: 6, judul: 'Reassessment', sub: 'Penilaian ulang untuk perbaikan berkelanjutan', icon: RefreshCw, done: false },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function SH({ title, href, label = 'Lihat Semua →' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
      {href && <Link href={href} className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">{label}</Link>}
    </div>
  );
}

function SB({ status }: { status: string }) {
  const m: Record<string, string> = { 'Berjalan': 'bg-blue-100 text-blue-700', 'Selesai': 'bg-green-100 text-green-700', 'Dalam Proses': 'bg-yellow-100 text-yellow-700', 'Cukup': 'bg-yellow-100 text-yellow-700', 'Baik': 'bg-green-100 text-green-700' };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${m[status] ?? 'bg-gray-100 text-gray-500'}`}>{status}</span>;
}

function PB({ p }: { p: string }) {
  const m: Record<string, string> = { 'Tinggi': 'bg-red-100 text-red-700', 'Sedang': 'bg-yellow-100 text-yellow-700' };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${m[p] ?? 'bg-gray-100 text-gray-500'}`}>{p}</span>;
}

function PBar({ value, color = '#4338ca' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-[9px] text-gray-400 w-6 text-right">{value}%</span>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function DinasPMDDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME + PENGUMUMAN ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-xl overflow-hidden relative shadow-md bg-gradient-to-br from-indigo-900 via-indigo-800 to-purple-700">
          <div className="p-5 flex items-center justify-between gap-4 text-white relative z-10">
            <div className="flex-1">
              <h2 className="text-lg font-black leading-tight mb-1">Selamat datang, Dinas PMD Kabupaten Kutai Kartanegara 🏛️</h2>
              <p className="text-sm text-indigo-200 leading-relaxed">
                Berikut ringkasan kondisi Smart Living Village di seluruh desa untuk<br />
                mendukung pengambilan keputusan dan perencanaan pembangunan desa.
              </p>
            </div>
            <div className="hidden sm:flex items-center justify-center w-36 h-24 rounded-xl bg-white/10 border border-white/20 flex-shrink-0">
              <div className="text-center">
                <div className="text-4xl">🏛️</div>
                <p className="text-[9px] font-bold mt-1 text-indigo-200">DINAS PMD<br />KUTAI KARTANEGARA</p>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
        </div>

        <div className="rounded-xl border border-indigo-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pengumuman &amp; Informasi</p>
            <Link href="/dinas-pmd/pengaturan-sistem" className="text-[11px] font-semibold text-indigo-600 hover:text-indigo-800">Lihat Semua →</Link>
          </div>
          <div className="space-y-2">
            {pengumuman.map((n) => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-indigo-50 border border-indigo-100">
                <div className="w-5 h-5 rounded-full bg-indigo-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Building2 size={10} className="text-indigo-700" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-700 leading-snug">{n.teks}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{n.tgl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── KARTU INDEKS ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Total Desa Terdaftar', value: '193', sub: 'Desa', cat: '', icon: Building2, color: '#312e81', href: '/dinas-pmd/profil-wilayah-kabupaten' },
          { label: 'Rata-rata Readiness Index', value: '69,42', sub: 'Kategori', cat: 'Baik', icon: BarChart2, color: '#4338ca', href: '/dinas-pmd/readiness-dashboard' },
          { label: 'Rata-rata Maturity Index', value: '57,81', sub: 'Kategori', cat: '', icon: Award, color: '#6d28d9', href: '/dinas-pmd/maturity-dashboard' },
          { label: 'Rata-rata Quality of Life Index', value: '71,28', sub: 'Kategori', cat: 'Baik', icon: TrendingUp, color: '#276749', href: '/dinas-pmd/monitoring-quality-of-life-desa' },
          { label: 'Assessment Tervalidasi', value: '174', sub: 'Desa (90,2%)', cat: '', icon: ShieldCheck, color: '#2b6cb0', href: '/dinas-pmd/validasi-assessment-desa' },
          { label: 'Program Aktif', value: '328', sub: 'Program', cat: '', icon: Layers, color: '#9333ea', href: '/dinas-pmd/monitoring-program-desa' },
        ].map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: card.color }}>
                  <Icon size={12} className="text-white" />
                </div>
                <span className="text-[9px] font-semibold text-gray-500 uppercase leading-none">{card.label}</span>
              </div>
              <p className="text-2xl font-black text-gray-900">{card.value}</p>
              <p className="text-[10px] text-gray-500">{card.sub}</p>
              {card.cat && <span className="text-[11px] font-bold text-indigo-600">{card.cat}</span>}
              <Link href={card.href} className="text-[10px] text-indigo-500 hover:underline mt-1">Lihat Detail →</Link>
            </div>
          );
        })}
      </div>

      {/* ── READINESS + BENCHMARKING + PETA ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Monitoring Readiness Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Monitoring Readiness Desa" href="/dinas-pmd/readiness-dashboard" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400">No</th>
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400">Desa</th>
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400">Kecamatan</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-indigo-600">Readiness Index</th>
                <th className="text-center py-1.5 text-[9px] font-bold text-gray-400">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {readinessDesa.map((row) => (
                <tr key={row.no} className="border-b border-gray-50">
                  <td className="py-1.5 pr-1 text-gray-400">{row.no}</td>
                  <td className="py-1.5 pr-1 font-medium text-gray-700">{row.desa}</td>
                  <td className="py-1.5 pr-1 text-gray-500">{row.kecamatan}</td>
                  <td className="py-1.5 pr-1 text-center font-bold text-indigo-700">{row.index.toFixed(2)}</td>
                  <td className="py-1.5 text-center"><SB status={row.kategori} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 p-2 bg-indigo-50 rounded-lg text-center">
            <span className="text-[10px] text-gray-500">Rata-rata Kabupaten: </span>
            <span className="text-xs font-black text-indigo-700">69,42</span>
            <span className="ml-2"><SB status="Baik" /></span>
          </div>
        </div>

        {/* Benchmarking Desa TOP 10 */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Benchmarking Desa (Top 10)" href="/dinas-pmd/benchmarking-desa" />
          <div className="space-y-1.5">
            {benchmarking.map((d) => (
              <div key={d.rank} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-black ${
                  d.rank <= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'
                }`}>{d.rank}</div>
                <span className="text-[11px] font-medium text-gray-700 flex-1">{d.desa}</span>
                <span className="text-[11px] font-bold text-indigo-700">{d.readiness.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Peta SLV (GIS placeholder) */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Peta Smart Living Village (GIS)" href="/dinas-pmd/monitoring-multi-desa" label="Lihat Peta Lengkap →" />
          <div className="w-full h-48 bg-green-50 rounded-lg border border-green-200 flex items-center justify-center relative overflow-hidden">
            <div className="text-center z-10">
              <Map size={32} className="mx-auto text-green-600 mb-1" />
              <p className="text-xs font-bold text-green-700">Peta Interaktif GIS</p>
              <p className="text-[10px] text-green-500">Kabupaten Kutai Kartanegara</p>
            </div>
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #276749 1px, transparent 1px)', backgroundSize: '12px 12px' }} />
          </div>
          <div className="mt-2 flex flex-wrap gap-2 text-[9px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> Siap (≥ 70)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-500" /> Berkembang (50-69)</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> Perlu Intervensi (&lt; 50)</span>
          </div>
        </div>
      </div>

      {/* ── QoL + MATURITY + QoL DISTRIBUTION + GAP ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Monitoring QoL Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Monitoring Quality of Life Desa" href="/dinas-pmd/monitoring-quality-of-life-desa" label="Lihat Detail →" />
          <div className="flex items-center gap-3 mb-3">
            <div className="text-center p-2 bg-indigo-50 rounded-lg flex-shrink-0">
              <p className="text-[9px] text-gray-400 uppercase">Rata-rata QoL</p>
              <p className="text-xl font-black text-indigo-700">71,28</p>
              <p className="text-[10px] font-bold text-green-600">Baik</p>
            </div>
            <div className="flex-1 space-y-1.5">
              {qolDesa.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-600 w-20 truncate">{d.dimensi}</span>
                  <div className="flex-1 mx-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${d.skor}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-indigo-700 w-8 text-right">{d.skor.toFixed(1)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monitoring Maturity Desa - donut */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Monitoring Maturity Desa" href="/dinas-pmd/maturity-dashboard" label="Lihat Detail →" />
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={maturityData} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={44} stroke="none">
                    {maturityData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[8px] text-gray-400">Total Desa</p>
                <p className="text-lg font-black text-gray-900">193</p>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {maturityData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">{d.persen}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monitoring QoL Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Monitoring Quality of Life Distribution" href="/dinas-pmd/monitoring-quality-of-life-desa" />
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={qolDistribution} dataKey="jumlah" cx="50%" cy="50%" innerRadius={28} outerRadius={44} stroke="none">
                    {qolDistribution.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[8px] text-gray-400">Total Desa</p>
                <p className="text-lg font-black text-gray-900">193</p>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {qolDistribution.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-gray-600">{d.kategori}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">{d.jumlah} ({d.persen})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Analisis Gap Wilayah */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Analisis Gap Wilayah" href="/dinas-pmd/analisis-gap-wilayah" label="Lihat Detail →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1 pr-1 text-[9px] font-bold text-gray-400">Dimensi</th>
                <th className="text-center py-1 pr-1 text-[9px] font-bold text-indigo-600">Rata-rata Saat Ini</th>
                <th className="text-center py-1 pr-1 text-[9px] font-bold text-green-600">Target 2027</th>
                <th className="text-center py-1 pr-1 text-[9px] font-bold text-red-600">Gap</th>
                <th className="text-center py-1 text-[9px] font-bold text-gray-400">Prioritas</th>
              </tr>
            </thead>
            <tbody>
              {gapWilayah.map((r, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-1.5 pr-1 font-medium text-gray-700 leading-snug">{r.dimensi}</td>
                  <td className="py-1.5 pr-1 text-center text-indigo-700 font-bold">{r.saat.toFixed(2)}</td>
                  <td className="py-1.5 pr-1 text-center text-green-700 font-bold">{r.target.toFixed(2)}</td>
                  <td className="py-1.5 pr-1 text-center text-red-600 font-bold">{r.gap.toFixed(2)}</td>
                  <td className="py-1.5 text-center"><PB p={r.prioritas} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── DSS DESA + PROGRAM + PRIORITAS + TARGET ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Monitoring DSS Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Monitoring DSS Desa" href="/dinas-pmd/monitoring-dss-desa" />
          <div className="space-y-2">
            {dssDesa.map((d, i) => (
              <div key={i} className="p-2 border border-gray-100 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-bold text-gray-700">{d.desa}</span>
                  <SB status={d.status} />
                </div>
                <p className="text-[10px] text-gray-500 mb-1">{d.rekomendasi}</p>
                <PBar value={d.progress} />
              </div>
            ))}
          </div>
        </div>

        {/* Monitoring Program Desa - donut */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Monitoring Program Desa" href="/dinas-pmd/monitoring-program-desa" label="Lihat Detail →" />
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={programDesaData} dataKey="value" cx="50%" cy="50%" innerRadius={28} outerRadius={44} stroke="none">
                    {programDesaData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[8px] text-gray-400">Total Program</p>
                <p className="text-lg font-black text-gray-900">328</p>
                <p className="text-[8px] text-gray-400">Program</p>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {programDesaData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[10px] text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-[10px] font-bold text-gray-700">{d.value} ({d.persen})</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Prioritas Intervensi Kabupaten */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Prioritas Intervensi Kabupaten" href="/dinas-pmd/roadmap-kabupaten" label="Lihat Roadmap →" />
          <div className="space-y-2">
            {prioritasIntervensi.map((p, i) => (
              <div key={i} className="p-2 border border-gray-100 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-[9px] font-black flex items-center justify-center flex-shrink-0">{p.no}</span>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-gray-800 leading-snug">{p.judul}</p>
                    <p className="text-[10px] text-gray-400">{p.deskripsi}</p>
                    <div className="mt-1"><PB p={p.prioritas} /></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Target & Roadmap Kabupaten */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Target & Roadmap Kabupaten" href="/dinas-pmd/roadmap-kabupaten" label="Lihat Roadmap →" />
          <p className="text-[10px] text-gray-400 mb-1">Maturity Index (Target)</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={targetRoadmap} margin={{ top: 0, right: 5, left: -20, bottom: 0 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="tahun" tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 90]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
              <Bar dataKey="maturity" name="Maturity" fill="#4338ca" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-[10px] text-gray-400 mt-2 mb-1">QoL Index (Target)</p>
          <ResponsiveContainer width="100%" height={80}>
            <BarChart data={targetRoadmap} margin={{ top: 0, right: 5, left: -20, bottom: 0 }} barSize={12}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="tahun" tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[40, 90]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} />
              <Bar dataKey="qol" name="QoL" fill="#276749" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── VALIDASI + DOKUMENTASI + SIKLUS ──────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Validasi Assessment Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Validasi Assessment Desa" href="/dinas-pmd/validasi-assessment-desa" label="Lihat Detail →" />
          <div className="grid grid-cols-4 gap-2">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[9px] text-gray-400 uppercase">Total Assessment</p>
              <p className="text-xl font-black text-gray-900">{validasiAssessment.total}</p>
              <p className="text-[9px] text-gray-400">Desa</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg">
              <p className="text-[9px] text-gray-400 uppercase">Tervalidasi</p>
              <p className="text-xl font-black text-green-700">{validasiAssessment.tervalidasi}</p>
              <p className="text-[9px] text-green-500">Desa ({validasiAssessment.persen})</p>
            </div>
            <div className="text-center p-2 bg-yellow-50 rounded-lg">
              <p className="text-[9px] text-gray-400 uppercase">Dalam Validasi</p>
              <p className="text-xl font-black text-yellow-600">{validasiAssessment.dalam}</p>
              <p className="text-[9px] text-yellow-500">Desa ({validasiAssessment.persenD})</p>
            </div>
            <div className="text-center p-2 bg-red-50 rounded-lg">
              <p className="text-[9px] text-gray-400 uppercase">Perlu Revisi</p>
              <p className="text-xl font-black text-red-600">{validasiAssessment.revisi}</p>
              <p className="text-[9px] text-red-500">Desa ({validasiAssessment.persenR})</p>
            </div>
          </div>
        </div>

        {/* Dokumentasi Kegiatan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Dokumentasi Kegiatan" href="/dinas-pmd/laporan-kabupaten" />
          <div className="flex gap-2 overflow-x-auto pb-1">
            {dokumentasiKab.map((dok, i) => (
              <div key={i} className="flex-shrink-0 w-28">
                <div className="w-28 h-20 rounded-lg flex items-center justify-center text-4xl bg-indigo-50 border border-indigo-100 mb-1.5">{dok.emoji}</div>
                <p className="text-[10px] font-semibold text-gray-700 leading-tight truncate">{dok.judul}</p>
                <p className="text-[9px] text-gray-400">{dok.tgl}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Siklus placeholder */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center justify-center">
          <div className="text-center">
            <Globe size={32} className="mx-auto text-indigo-300 mb-2" />
            <p className="text-xs font-bold text-gray-500">Monitoring Evidence Desa</p>
            <Link href="/dinas-pmd/monitoring-evidence-desa" className="text-[11px] text-indigo-600 hover:underline">Lihat Detail →</Link>
          </div>
        </div>
      </div>

      {/* ── SIKLUS SLV KABUPATEN ─────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-indigo-200 shadow-sm p-5">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
          Siklus Smart Living Village Kabupaten
        </h3>
        <div className="flex flex-wrap items-start gap-0">
          {siklusKab.map((step, i) => {
            const Icon = step.icon;
            const isActive = step.active;
            const isDone = step.done;
            const isLast = i === siklusKab.length - 1;
            return (
              <div key={i} className="flex items-center gap-0 flex-1 min-w-0">
                <div className="flex flex-col items-center text-center flex-shrink-0 w-24 sm:w-28">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-2 border-2 ${
                    isActive ? 'bg-indigo-600 border-indigo-600 shadow-indigo-200 shadow-md'
                    : isDone ? 'bg-indigo-500 border-indigo-500'
                    : 'bg-gray-100 border-gray-200'
                  }`}>
                    {isDone && !isActive
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <Icon size={16} className={isActive || isDone ? 'text-white' : 'text-gray-400'} />
                    }
                  </div>
                  <p className={`text-[10px] font-bold leading-tight mb-0.5 ${isActive ? 'text-indigo-700' : isDone ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {i + 1}. {step.judul}
                  </p>
                  <p className="text-[9px] text-gray-400 leading-snug hidden sm:block">{step.sub}</p>
                </div>
                {!isLast && (
                  <div className="flex-1 flex items-center justify-center pb-6">
                    <div className={`h-0.5 w-full ${isDone ? 'bg-indigo-300' : 'bg-gray-200'}`} />
                    <ChevronRight size={12} className={`flex-shrink-0 -ml-1 ${isDone ? 'text-indigo-400' : 'text-gray-300'}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100">
        <span>© 2025 Dinas PMD Kabupaten Kutai Kartanegara</span>
        <span>Smart Living Village for Borneo</span>
      </div>

    </div>
  );
}