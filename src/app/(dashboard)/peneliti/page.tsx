'use client';

import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, ScatterChart, Scatter, ZAxis,
  PieChart, Pie, Cell,
} from 'recharts';
import {
  ArrowUpRight, CheckCircle2, ChevronRight,
  FileText, TrendingUp, Database, BookOpen,
  ClipboardList, BarChart2, Users, Shield,
  FlaskConical, Microscope, Award, Star,
} from 'lucide-react';

// ─── Warna tema Peneliti ─────────────────────────────────────────────────────
const C = { primary: '#1a365d', secondary: '#2b6cb0', green: '#276749', purple: '#553c9a' };

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

// Radar Readiness
const radarReadiness = [
  { aspek: 'SDM & Literasi Digital', nilai: 68 },
  { aspek: 'Infrastruktur Digital', nilai: 72 },
  { aspek: 'Kesehatan', nilai: 75 },
  { aspek: 'Ekonomi', nilai: 70 },
  { aspek: 'Lingkungan', nilai: 69 },
  { aspek: 'Sosial Budaya', nilai: 73 },
  { aspek: 'Kelembagaan', nilai: 71 },
];

// Maturity Donut
const maturityData = [
  { name: 'Level 1 (Pemula)', value: 0, persen: '0%', color: '#e53e3e' },
  { name: 'Level 2 (Dasar)', value: 19, persen: '10%', color: '#ecc94b' },
  { name: 'Level 3 (Berkembang)', value: 60, persen: '60%', color: '#4299e1' },
  { name: 'Level 4 (Maju)', value: 30, persen: '30%', color: '#48bb78' },
  { name: 'Level 5 (Unggul)', value: 0, persen: '0%', color: '#9f7aea' },
];

// QoL donut
const qolData = [
  { name: 'Kesehatan', nilai: 72.40, color: '#2b6cb0' },
  { name: 'Pendidikan', nilai: 70.80, color: '#276749' },
  { name: 'Ekonomi', nilai: 72.10, color: '#c05621' },
  { name: 'Lingkungan', nilai: 69.30, color: '#c53030' },
  { name: 'Sosial Budaya', nilai: 70.50, color: '#553c9a' },
];

// DSS Recommendation
const dssRecommendation = [
  { judul: 'Literasi Digital Masyarakat', frekuensi: '16 Kali' },
  { judul: 'Implementasi Program 5 Program Berjalan', persen: '71%' },
  { judul: 'Efektivitas Rekomendasi Tingkat Penerimaan', persen: '85%' },
  { judul: 'Dampak Implementasi Peningkatan Readiness', nilai: '+12,40' },
];

// Validasi Artefak DSR
const validasiArtefak = [
  { artefak: 'Artefak 1 - Wawancara', status: 'Selesai' },
  { artefak: 'Artefak 2 - FGD', status: 'Selesai' },
  { artefak: 'Artefak 3 - Readiness Assessment', status: 'Selesai' },
  { artefak: 'Artefak 4 - Validasi Ahli', status: 'Selesai' },
  { artefak: 'Artefak 5 - Observasi Lapangan', status: 'Selesai' },
  { artefak: 'Artefak 6 - APL-SLV Borneo (Instansiasi)', status: 'Selesai' },
];

// Expert Validation
const expertValidation = [
  { validator: 'Validator 1', bidang: 'Smart Village', skor: 92.00, status: 'Valid' },
  { validator: 'Validator 2', bidang: 'DSS & AI', skor: 90.00, status: 'Valid' },
  { validator: 'Validator 3', bidang: 'Sistem Informasi', skor: 95.00, status: 'Valid' },
];

// Tren Readiness
const trenReadiness = [
  { tahun: '2023', nilai: 55.30 },
  { tahun: '2024', nilai: 63.10 },
  { tahun: '2025', nilai: 74.30 },
];

// Tren QoL
const trenQoL = [
  { tahun: '2023', nilai: 58.40 },
  { tahun: '2024', nilai: 64.80 },
  { tahun: '2025', nilai: 71.28 },
];

// Scatter data Readiness vs QoL
const scatterData = [
  { readiness: 60, qol: 55 }, { readiness: 65, qol: 60 }, { readiness: 70, qol: 65 },
  { readiness: 72, qol: 68 }, { readiness: 74, qol: 71 }, { readiness: 78, qol: 75 },
  { readiness: 80, qol: 78 }, { readiness: 85, qol: 82 },
];

// Distribusi dimensi pie
const distribusiDimensi = [
  { name: 'SDM & Literasi Digital (21%)', value: 21, color: '#2b6cb0' },
  { name: 'Infrastruktur Digital (16)', value: 16, color: '#276749' },
  { name: 'Readiness (9%)', value: 9, color: '#c05621' },
  { name: 'Ekonomi (17%)', value: 17, color: '#e53e3e' },
  { name: 'Lingkungan (9%)', value: 9, color: '#553c9a' },
  { name: 'Sosial Budaya (8%)', value: 8, color: '#c53030' },
  { name: 'Kelembagaan (8%)', value: 8, color: '#d69e2e' },
];

// Repository
const repository = [
  { nama: 'Instrumen Penelitian', sub: 'Questionnaire, Panduan Wawancara, Pedoman FGD', jumlah: 12, icon: ClipboardList, color: '#2b6cb0' },
  { nama: 'Dataset Penelitian', sub: 'Data Assessment, QoL, Maturity, DSS', jumlah: 8, icon: Database, color: '#276749' },
  { nama: 'Dokumen Validasi', sub: 'Hasil Validasi Ahli, UAT, SUS', jumlah: 6, icon: Shield, color: '#553c9a' },
  { nama: 'Dokumentasi Lapangan', sub: 'Foto, Video, Catatan Observasi', jumlah: 15, icon: FileText, color: '#c05621' },
];

// Publikasi
const publikasi = [
  { tipe: 'Artikel Jurnal', jumlah: '2 Publikasi', icon: BookOpen, color: '#2b6cb0' },
  { tipe: 'Prosiding Konferensi', jumlah: '1 Publikasi', icon: Award, color: '#276749' },
  { tipe: 'Laporan Penelitian', jumlah: '3 Dokumen', icon: FileText, color: '#553c9a' },
  { tipe: 'Sitasi', jumlah: '0 Sitasi', icon: Star, color: '#c05621' },
];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

function SH({ title, href, label = 'Lihat Analisis Lengkap →' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
      {href && <Link href={href} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">{label}</Link>}
    </div>
  );
}

function SB({ status }: { status: string }) {
  const m: Record<string, string> = { 'Selesai': 'bg-green-100 text-green-700', 'Valid': 'bg-green-100 text-green-700', 'Berjalan': 'bg-blue-100 text-blue-700' };
  return <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${m[status] ?? 'bg-gray-100 text-gray-500'}`}>{status}</span>;
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function PenelitiDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME ──────────────────────────────────────────────────────── */}
      <div className="rounded-xl overflow-hidden relative shadow-md bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-700">
        <div className="p-5 flex items-center justify-between gap-4 text-white relative z-10">
          <div className="flex-1">
            <h2 className="text-xl font-black leading-tight mb-1">Selamat datang, Peneliti Smart Living Village 👋</h2>
            <p className="text-sm text-blue-100">Dashboard Evaluasi dan Validasi Framework Smart Living Village Readiness</p>
          </div>
          <div className="hidden sm:flex items-center justify-center w-40 h-20 rounded-xl bg-white/10 border border-white/20 flex-shrink-0 p-2 text-center">
            <div>
              <p className="text-[10px] font-bold text-blue-200">PENELITI · Smart Living Village</p>
              <p className="text-[9px] text-blue-300 mt-0.5">Research Dashboard</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/5" />
      </div>

      {/* ── STAT CARDS ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {[
          { label: 'Total Desa Sampel', value: '1', sub: 'Desa Lung Anai', icon: Users, color: '#1a365d' },
          { label: 'Assessment Terkumpul', value: '1', sub: 'Dataset 100% Terkumpul', icon: Database, color: '#2b6cb0' },
          { label: 'Readiness Rata-rata', value: '74,30', sub: 'Kategori: Baik', icon: BarChart2, color: '#276749' },
          { label: 'Maturity Rata-rata', value: '3,15', sub: 'Level: Berkembang', icon: TrendingUp, color: '#c05621' },
          { label: 'Quality of Life Rata-rata', value: '71,28', sub: 'Kategori: Baik', icon: Award, color: '#553c9a' },
          { label: 'Validasi Ahli', value: '3', sub: 'Validator', icon: Shield, color: '#c53030' },
          { label: 'Artefak Tervalidasi', value: '6 / 6', sub: '100% Valid', icon: CheckCircle2, color: '#276749' },
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
              <p className="text-xl font-black text-gray-900">{card.value}</p>
              <p className="text-[10px] text-gray-500 leading-snug">{card.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ── ANALISIS READINESS + MATURITY + QoL + DSS ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Analisis Readiness — Radar */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Analisis Readiness" href="/peneliti/analisis-readiness" />
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={radarReadiness} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke="#bee3f8" />
              <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 8, fill: '#1a365d' }} />
              <PolarRadiusAxis angle={30} domain={[60, 80]} tick={false} />
              <Radar name="Nilai" dataKey="nilai" stroke="#2b6cb0" fill="#2b6cb0" fillOpacity={0.2} strokeWidth={2} />
              <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${v}`, 'Nilai']} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="mt-1 p-2 bg-blue-50 rounded-lg text-[10px] text-gray-600">
            <p><span className="font-bold text-blue-700">Rata-rata Skor: 74,30</span> — Kategori: <span className="font-bold text-green-700">Baik</span></p>
            <p className="mt-0.5">Dimensi Tertinggi: <span className="font-semibold">SDM & Literasi Digital (85,40)</span></p>
            <p>Dimensi Terendah: <span className="font-semibold">Kelembagaan (61,20)</span></p>
          </div>
          <Link href="/peneliti/analisis-readiness" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Analisis Maturity — Donut */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Analisis Maturity" href="/peneliti/analisis-maturity" />
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
                <p className="text-[8px] text-gray-400">Rata-rata Level</p>
                <p className="text-base font-black text-gray-900">3,15</p>
                <p className="text-[8px] font-bold text-blue-600">Berkembang</p>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {maturityData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[9px] text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-700">{d.persen}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href="/peneliti/analisis-maturity" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Analisis QoL — Donut */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Analisis Quality of Life" href="/peneliti/analisis-quality-of-life" />
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={100} height={100}>
                <PieChart>
                  <Pie data={qolData} dataKey="nilai" cx="50%" cy="50%" innerRadius={28} outerRadius={44} stroke="none">
                    {qolData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-[8px] text-gray-400">Rata-rata Skor</p>
                <p className="text-base font-black text-gray-900">71,28</p>
                <p className="text-[8px] font-bold text-green-600">Baik</p>
              </div>
            </div>
            <div className="flex-1 space-y-1">
              {qolData.map((d, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                    <span className="text-[9px] text-gray-600">{d.name}</span>
                  </div>
                  <span className="text-[9px] font-bold text-gray-700">{d.nilai.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
          <Link href="/peneliti/analisis-quality-of-life" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Analisis DSS Recommendation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Analisis DSS Recommendation" href="/peneliti/analisis-dss-recommendation" />
          <div className="space-y-2">
            <div className="p-2 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Rekomendasi Terbanyak</p>
              <p className="text-[11px] font-bold text-gray-800">Literasi Digital Masyarakat</p>
              <p className="text-sm font-black text-blue-700 mt-0.5">16 Kali</p>
            </div>
            <div className="p-2 bg-green-50 rounded-lg border border-green-100">
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Implementasi Program</p>
              <p className="text-[11px] font-semibold text-gray-700">5 Program Berjalan</p>
              <p className="text-sm font-black text-green-700 mt-0.5">71%</p>
            </div>
            <div className="p-2 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Efektivitas Rekomendasi</p>
              <p className="text-[11px] font-semibold text-gray-700">Tingkat Penerimaan</p>
              <p className="text-sm font-black text-purple-700 mt-0.5">85%</p>
            </div>
            <div className="p-2 bg-orange-50 rounded-lg border border-orange-100">
              <p className="text-[9px] text-gray-400 uppercase font-bold mb-0.5">Dampak Implementasi</p>
              <p className="text-[11px] font-semibold text-gray-700">Peningkatan Readiness</p>
              <p className="text-sm font-black text-orange-700 mt-0.5">+12,40</p>
            </div>
          </div>
          <Link href="/peneliti/analisis-dss-recommendation" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Analisis Lengkap <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── VALIDASI + UAT SUS + EXPERT + STATISTIK ──────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

        {/* Validasi Artefak DSR */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Validasi Artefak (DSR)" href="/peneliti/validasi-artefak" label="Lihat Detail Validasi →" />
          <div className="space-y-1.5">
            {validasiArtefak.map((a, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-gray-50 border border-gray-100">
                <span className="text-[11px] font-medium text-gray-700">{a.artefak}</span>
                <SB status={a.status} />
              </div>
            ))}
          </div>
          <Link href="/peneliti/validasi-artefak" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Validasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* UAT & SUS Evaluation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="UAT & SUS Evaluation" href="/peneliti/uat-sus-evaluation" label="Lihat Detail Evaluasi →" />
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-[9px] text-gray-400 uppercase font-bold">SUS Score</p>
              <p className="text-2xl font-black text-blue-700 mt-1">87,5</p>
              <p className="text-[10px] font-bold text-green-600">Excellent</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-xl border border-green-200">
              <p className="text-[9px] text-gray-400 uppercase font-bold">UAT Score</p>
              <p className="text-2xl font-black text-green-700 mt-1">92,3%</p>
              <p className="text-[10px] font-bold text-green-600">Excellent</p>
            </div>
          </div>
          <div className="p-2 bg-gray-50 rounded-lg border border-gray-200 text-center">
            <p className="text-[10px] text-gray-400">Acceptance Rate</p>
            <p className="text-lg font-black text-gray-900">92,3%</p>
            <div className="h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
              <div className="h-full rounded-full bg-green-500" style={{ width: '92.3%' }} />
            </div>
          </div>
          <Link href="/peneliti/uat-sus-evaluation" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Evaluasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Expert Validation */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Expert Validation" href="/peneliti/expert-validation" label="Lihat Detail Validasi →" />
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Validator</th>
                <th className="text-left py-1.5 pr-1 text-[9px] font-bold text-gray-400 uppercase">Bidang Keahlian</th>
                <th className="text-center py-1.5 pr-1 text-[9px] font-bold text-blue-600 uppercase">Skor</th>
                <th className="text-center py-1.5 text-[9px] font-bold text-gray-400 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {expertValidation.map((v, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-2 pr-1 font-medium text-gray-700">{v.validator}</td>
                  <td className="py-2 pr-1 text-gray-500">{v.bidang}</td>
                  <td className="py-2 pr-1 text-center font-black text-blue-700">{v.skor.toFixed(2)}</td>
                  <td className="py-2 text-center"><SB status={v.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/peneliti/expert-validation" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Validasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Statistik Penelitian */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Statistik Penelitian" href="/peneliti/statistik-penelitian" label="Lihat Detail Statistik →" />
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-2 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-[8px] text-gray-400 uppercase font-bold">Cronbach Alpha</p>
              <p className="text-xl font-black text-blue-700">0,892</p>
              <p className="text-[9px] font-bold text-green-600">Reliabel</p>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded-lg border border-purple-200">
              <p className="text-[8px] text-gray-400 uppercase font-bold">R Square (R²)</p>
              <p className="text-xl font-black text-purple-700">0,756</p>
              <p className="text-[9px] font-bold text-yellow-600">Kuat</p>
            </div>
            <div className="text-center p-2 bg-green-50 rounded-lg border border-green-200">
              <p className="text-[8px] text-gray-400 uppercase font-bold">KMO</p>
              <p className="text-xl font-black text-green-700">0,847</p>
              <p className="text-[9px] font-bold text-green-600">Baik</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[8px] text-gray-400 uppercase font-bold">Validitas Konstruk</p>
              <p className="text-xs font-black text-green-700">Valid</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[8px] text-gray-400 uppercase font-bold">Signifikansi (p-value)</p>
              <p className="text-xs font-black text-blue-700">0,000</p>
              <p className="text-[8px] text-gray-400">&lt; 0,05</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[8px] text-gray-400 uppercase font-bold">Model Fit</p>
              <p className="text-xs font-black text-green-700">Baik</p>
            </div>
          </div>
          <Link href="/peneliti/statistik-penelitian" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail Statistik <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── VISUALISASI DATA + REPOSITORY + PUBLIKASI ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Visualisasi Data Penelitian */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Visualisasi Data Penelitian" href="/peneliti/visualisasi-data" label="Lihat Semua Visualisasi →" />
          <div className="grid grid-cols-2 gap-2">
            {/* Tren Readiness */}
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Tren Readiness Desa</p>
              <ResponsiveContainer width="100%" height={70}>
                <BarChart data={trenReadiness} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={14}>
                  <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 80]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 9 }} />
                  <Bar dataKey="nilai" fill="#2b6cb0" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Tren QoL */}
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Tren Quality of Life</p>
              <ResponsiveContainer width="100%" height={70}>
                <BarChart data={trenQoL} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={14}>
                  <XAxis dataKey="tahun" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis domain={[40, 80]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <Tooltip contentStyle={{ fontSize: 9 }} />
                  <Bar dataKey="nilai" fill="#276749" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Scatter */}
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Hubungan Readiness & QoL</p>
              <ResponsiveContainer width="100%" height={70}>
                <ScatterChart margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="readiness" type="number" domain={[55, 90]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} name="Readiness" />
                  <YAxis dataKey="qol" type="number" domain={[50, 85]} tick={{ fontSize: 7, fill: '#94a3b8' }} axisLine={false} tickLine={false} name="QoL" />
                  <ZAxis range={[20, 20]} />
                  <Tooltip contentStyle={{ fontSize: 9 }} />
                  <Scatter data={scatterData} fill="#553c9a" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-[8px] text-purple-600 font-bold text-center">R² = 0,756</p>
            </div>
            {/* Pie distribusi */}
            <div>
              <p className="text-[9px] text-gray-400 font-semibold mb-1">Distribusi Dimensi Readiness</p>
              <ResponsiveContainer width="100%" height={70}>
                <PieChart>
                  <Pie data={distribusiDimensi} dataKey="value" cx="50%" cy="50%" outerRadius={32} stroke="none">
                    {distribusiDimensi.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 9 }} formatter={(v: any) => [`${v}%`, '']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <Link href="/peneliti/visualisasi-data" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Semua Visualisasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Repository Penelitian */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Repository Penelitian" href="/peneliti/repository-penelitian" label="Lihat Repository →" />
          <div className="space-y-3">
            {repository.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="flex items-start gap-3 p-2.5 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: r.color + '15' }}>
                    <Icon size={16} style={{ color: r.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-[11px] font-bold text-gray-800">{r.nama}</p>
                      <span className="text-[11px] font-black ml-1 flex-shrink-0" style={{ color: r.color }}>{r.jumlah} File</span>
                    </div>
                    <p className="text-[10px] text-gray-400 leading-snug">{r.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <Link href="/peneliti/repository-penelitian" className="mt-3 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Repository <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Publikasi & Sitasi */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SH title="Publikasi & Sitasi" href="/peneliti/publikasi-sitasi" label="Lihat Detail →" />
          <div className="space-y-3">
            {publikasi.map((p, i) => {
              const Icon = p.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 border border-gray-100 rounded-lg">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: p.color + '15' }}>
                    <Icon size={16} style={{ color: p.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[11px] font-bold text-gray-800">{p.tipe}</p>
                    <p className="text-[10px] font-black mt-0.5" style={{ color: p.color }}>{p.jumlah}</p>
                  </div>
                  <ArrowUpRight size={12} className="text-gray-300" />
                </div>
              );
            })}
          </div>

          {/* Info Panel */}
          <div className="mt-3 p-3 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-[10px] font-bold text-blue-800 mb-1">Informasi Penelitian</p>
            <p className="text-[9px] text-gray-600 leading-snug">
              Dashboard ini menampilkan data, analisis, validasi, dan evaluasi untuk kerangka penelitian Smart Living Village Readiness Framework.
            </p>
            <Link href="/peneliti/research-overview" className="mt-2 inline-flex items-center gap-1 text-[10px] font-bold text-blue-600 hover:underline">
              Panduan Penggunaan <ArrowUpRight size={9} />
            </Link>
          </div>

          <Link href="/peneliti/publikasi-sitasi" className="mt-2 w-full flex items-center justify-center gap-1 py-1.5 rounded-lg border border-blue-300 text-blue-700 text-[11px] font-bold hover:bg-blue-50 transition-colors">
            Lihat Detail <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100 gap-1">
        <span>© 2025 Penelitian Smart Living Village. All rights reserved.</span>
        <div className="flex gap-3">
          {['Smart Living Village', 'Partisipasi Warga', 'Transparansi', 'Kolaborasi', 'Keberlanjutan'].map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
        <span>Versi 1.0.0</span>
      </div>

    </div>
  );
}
