'use client';


import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import {
  AlertTriangle, CheckCircle2, Info, Eye, FileCheck,
  ArrowUpRight, ChevronRight, ClipboardList, BarChart2,
  Activity, ShieldCheck, FileText, TrendingUp,
  RefreshCw, Award, Target, Zap,
} from 'lucide-react';

// ─── Warna tema BPD ─────────────────────────────────────────────────────────
const C = {
  primary: '#1a56db',
  primaryDark: '#1e429f',
  green: '#057a55',
  orange: '#c27803',
  red: '#c81e1e',
  purple: '#7e3af2',
  slate: '#374151',
};

// ─── DATA MOCK ───────────────────────────────────────────────────────────────

const notifikasi = [
  { id: 1, type: 'error', teks: 'Program "Peningkatan Infrastruktur Digital Desa" realisasi di bawah target (48%)', tgl: '16/06/2025' },
  { id: 2, type: 'warning', teks: 'Evidence program "Pelatihan Digital" perlu perbaikan dokumentasi', tgl: '15/06/2025' },
  { id: 3, type: 'info', teks: 'Program "Bank Sampah Digital" terlambat 15 hari dari jadwal', tgl: '14/06/2025' },
  { id: 4, type: 'success', teks: 'Verifikasi evidence program "Internet Desa" telah diverifikasi', tgl: '13/06/2025' },
];

const monitoringDSS = [
  { rekomendasi: 'Peningkatan Infrastruktur Digital Desa', dimensi: 'Teknologi', status: 'Berjalan', progress: 70 },
  { rekomendasi: 'Penggunaan Kapasitas SDM Desa', dimensi: 'SDM', status: 'Berjalan', progress: 65 },
  { rekomendasi: 'Pengembangan Ekonomi Digital', dimensi: 'Ekonomi', status: 'Belum Dimulai', progress: 0 },
  { rekomendasi: 'Pelestarian Budaya dan Kearifan Lokal', dimensi: 'Sosial Budaya', status: 'Berjalan', progress: 60 },
  { rekomendasi: 'Pengelolaan Lingkungan Berkelanjutan', dimensi: 'Lingkungan', status: 'Berjalan', progress: 75 },
];

const monitoringProgram = [
  { nama: 'Internet Desa', anggaran: 120000000, realisasi: 78500000, persen: 65.4, progress: 65, dampak: '+4,10 Readiness', dampakColor: C.primary },
  { nama: 'Digitalisasi Layanan Desa', anggaran: 85000000, realisasi: 85000000, persen: 100, progress: 100, dampak: '+3,20 Readiness', dampakColor: C.primary },
  { nama: 'Pelatihan Digital Perangkat', anggaran: 60000000, realisasi: 45000000, persen: 75, progress: 75, dampak: '+3,00 QoL', dampakColor: C.purple },
  { nama: 'Posyandu Digital', anggaran: 50000000, realisasi: 30000000, persen: 60, progress: 60, dampak: '+2,80 QoL', dampakColor: C.purple },
  { nama: 'Bank Sampah Digital', anggaran: 40000000, realisasi: 18000000, persen: 45, progress: 45, dampak: '+2,50 Maturity', dampakColor: C.green },
];

const evaluasiDampak = [
  { program: 'Internet Desa', readiness: '+4,20', maturity: '+0,30', qol: '+1,10' },
  { program: 'Digitalisasi Layanan Desa', readiness: '+3,20', maturity: '+0,40', qol: '+1,80' },
  { program: 'Pelatihan Digital Perangkat Desa', readiness: '+2,50', maturity: '+0,30', qol: '+3,40' },
  { program: 'Posyandu Digital', readiness: '+1,80', maturity: '+0,30', qol: '+2,80' },
  { program: 'Bank Sampah Digital', readiness: '+1,10', maturity: '+1,50', qol: '+1,20' },
];

const evidenceProgram = [
  { program: 'Internet Desa', tgl: '13/06/2025', jumlah: '5 Dokumen', status: 'Diverifikasi', statusColor: 'text-green-700 bg-green-100' },
  { program: 'Digitalisasi Layanan Desa', tgl: '10/06/2025', jumlah: '4 Dokumen', status: 'Diverifikasi', statusColor: 'text-green-700 bg-green-100' },
  { program: 'Pelatihan Digital', tgl: '09/06/2025', jumlah: '3 Dokumen', status: 'Perlu Perbaikan', statusColor: 'text-orange-700 bg-orange-100' },
  { program: 'Posyandu Digital', tgl: '08/06/2025', jumlah: '4 Dokumen', status: 'Diverifikasi', statusColor: 'text-green-700 bg-green-100' },
  { program: 'Bank Sampah Digital', tgl: '07/06/2025', jumlah: '2 Dokumen', status: 'Menunggu Verifikasi', statusColor: 'text-blue-700 bg-blue-100' },
];

const aspirasiData = [
  { name: 'Infrastruktur', value: 4, color: '#1a56db', persen: '33,33%' },
  { name: 'Pendidikan', value: 3, color: '#7e3af2', persen: '25,00%' },
  { name: 'Ekonomi', value: 2, color: '#057a55', persen: '16,67%' },
  { name: 'Lingkungan', value: 2, color: '#c27803', persen: '16,67%' },
  { name: 'Budaya', value: 1, color: '#c81e1e', persen: '8,33%' },
];

const anggaranProgram = [
  { nama: 'Internet Desa', anggaran: 120, realisasi: 78.5 },
  { nama: 'Digitalisasi Layanan', anggaran: 85, realisasi: 85 },
  { nama: 'Pelatihan Digital', anggaran: 60, realisasi: 45 },
  { nama: 'Posyandu Digital', anggaran: 50, realisasi: 30 },
  { nama: 'Bank Sampah Digital', anggaran: 40, realisasi: 18 },
];

const siklusPengawasan = [
  { no: 1, judul: 'Assessment', sub: 'Hasil penilaian desa (Readiness, Maturity, QoL)', icon: ClipboardList, done: true },
  { no: 2, judul: 'DSS Recommendation', sub: 'Rekomendasi program prioritas dari sistem', icon: BarChart2, done: true },
  { no: 3, judul: 'RTL & Perencanaan', sub: 'Rencana tindak lanjut oleh Pemdes', icon: FileText, done: true },
  { no: 4, judul: 'Implementasi Program', sub: 'Pelaksanaan program sesuai rencana', icon: Zap, done: true },
  { no: 5, judul: 'Monitoring & Pengawasan', sub: 'Pemantauan dan pengawasan oleh BPD', icon: Activity, active: true },
  { no: 6, judul: 'Evaluasi & Dampak', sub: 'Evaluasi dampak program terhadap indeks', icon: TrendingUp, done: false },
  { no: 7, judul: 'Reassessment', sub: 'Penilaian ulang untuk perbaikan berkelanjutan', icon: RefreshCw, done: false },
];

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    'Berjalan': 'bg-blue-100 text-blue-700',
    'Belum Dimulai': 'bg-gray-100 text-gray-600',
    'Selesai': 'bg-green-100 text-green-700',
    'Terlambat': 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${map[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  );
}

function ProgressBar({ value, color = '#1a56db' }: { value: number; color?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      <span className="text-[10px] text-gray-500 w-7 text-right">{value}%</span>
    </div>
  );
}

function SectionHeader({ title, href, label = 'Lihat Semua →' }: { title: string; href?: string; label?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</h3>
      {href && (
        <Link href={href} className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 transition-colors">
          {label}
        </Link>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function BPDDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8">

      {/* ── WELCOME + NOTIFIKASI ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome banner */}
        <div className="lg:col-span-2 rounded-xl bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 p-5 flex items-center justify-between gap-4 text-white shadow-md overflow-hidden relative">
          <div className="flex-1 z-10">
            <h2 className="text-lg font-black leading-tight mb-1">Selamat datang, Ketua BPD 👋</h2>
            <p className="text-sm text-blue-100 leading-relaxed">
              Berikut ringkasan pengawasan dan monitoring pelaksanaan program Smart Living Village Desa Lung Anai.
            </p>
          </div>
          {/* Ilustrasi desa */}
          <div className="hidden sm:flex items-center justify-center w-36 h-24 rounded-xl bg-white/10 border border-white/20 overflow-hidden flex-shrink-0 z-10">
            <div className="text-center">
              <div className="text-4xl">🏘️</div>
              <p className="text-[10px] font-bold mt-1 text-blue-100">DESA LUNG ANAI</p>
            </div>
          </div>
          <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/5" />
          <div className="absolute -left-4 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
        </div>

        {/* Notifikasi Temuan & Peringatan */}
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Notifikasi Temuan &amp; Peringatan</p>
            <Link href="/bpd/notifikasi-temuan" className="text-[11px] font-semibold text-blue-600 hover:text-blue-800">Lihat Semua →</Link>
          </div>
          <div className="space-y-2">
            {notifikasi.map((n) => {
              const iconMap = {
                error: <AlertTriangle size={13} className="text-red-500 flex-shrink-0 mt-0.5" />,
                warning: <AlertTriangle size={13} className="text-orange-500 flex-shrink-0 mt-0.5" />,
                info: <Info size={13} className="text-blue-500 flex-shrink-0 mt-0.5" />,
                success: <Info size={13} className="text-green-500 flex-shrink-0 mt-0.5" />,
              };
              return (
                <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50 border border-gray-100">
                  {iconMap[n.type as keyof typeof iconMap]}
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] text-gray-700 leading-snug">{n.teks}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">{n.tgl}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── INDEKS CARDS ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {/* Readiness */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center"><BarChart2 size={12} className="text-white" /></div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Readiness Index</span>
          </div>
          <p className="text-2xl font-black text-gray-900">74,20</p>
          <p className="text-[10px] text-gray-500">Kategori</p>
          <span className="text-[11px] font-bold text-blue-600">Siap</span>
          <Link href="/bpd/monitoring-readiness" className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Maturity */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-purple-600 flex items-center justify-center"><Award size={12} className="text-white" /></div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Maturity Index</span>
          </div>
          <p className="text-2xl font-black text-gray-900">2,95</p>
          <p className="text-[10px] text-gray-500">Kategori</p>
          <span className="text-[11px] font-bold text-purple-600">Berkembang</span>
          <Link href="/bpd/monitoring-maturity" className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* QoL */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center"><TrendingUp size={12} className="text-white" /></div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Quality of Life Index</span>
          </div>
          <p className="text-2xl font-black text-gray-900">72,35</p>
          <p className="text-[10px] text-gray-500">Kategori</p>
          <span className="text-[11px] font-bold text-green-600">Baik</span>
          <Link href="/bpd/monitoring-quality-of-life" className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Progress RTL */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center"><Target size={12} className="text-white" /></div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Progress RTL</span>
          </div>
          <p className="text-2xl font-black text-gray-900">67,80%</p>
          <p className="text-[10px] text-gray-500">Tindak Lanjut</p>
          <span className="text-[11px] font-bold text-orange-500">&nbsp;</span>
          <Link href="/bpd/pengawasan-rtl" className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Program Berjalan */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center"><Activity size={12} className="text-white" /></div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Program Berjalan</span>
          </div>
          <p className="text-2xl font-black text-gray-900">9</p>
          <p className="text-[10px] text-gray-500">Program</p>
          <span className="text-[11px] font-bold text-blue-500">&nbsp;</span>
          <Link href="/bpd/monitoring-program-desa" className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Program Terlambat */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-red-500 flex items-center justify-center"><AlertTriangle size={12} className="text-white" /></div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Program Terlambat</span>
          </div>
          <p className="text-2xl font-black text-red-600">2</p>
          <p className="text-[10px] text-gray-500">Program</p>
          <span className="text-[11px] font-bold text-red-500">&nbsp;</span>
          <Link href="/bpd/monitoring-program-desa" className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
        </div>

        {/* Evidence Terverifikasi */}
        <div className="col-span-1 bg-white rounded-xl border border-gray-200 shadow-sm p-3 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 mb-1">
            <div className="w-6 h-6 rounded-md bg-green-600 flex items-center justify-center"><ShieldCheck size={12} className="text-white" /></div>
            <span className="text-[10px] font-semibold text-gray-500 uppercase">Evidence Terverifikasi</span>
          </div>
          <p className="text-2xl font-black text-gray-900">15</p>
          <p className="text-[10px] text-gray-500">Bukti</p>
          <span className="text-[11px] font-bold text-green-600">&nbsp;</span>
          <Link href="/bpd/monitoring-evidence" className="text-[10px] text-blue-500 hover:underline mt-1">Lihat Detail →</Link>
        </div>
      </div>

      {/* ── MONITORING DSS + PROGRAM + EVALUASI DAMPAK ───────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Monitoring Tindak Lanjut DSS */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Tindak Lanjut DSS" href="/bpd/evaluasi-program" />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Rekomendasi DSS</th>
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Dimensi</th>
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Status RTL</th>
                  <th className="text-left py-1.5 text-[10px] font-bold text-gray-400 uppercase">Progress</th>
                </tr>
              </thead>
              <tbody>
                {monitoringDSS.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 pr-2 font-medium text-gray-700 leading-snug" style={{ maxWidth: 120, whiteSpace: 'normal' }}>{row.rekomendasi}</td>
                    <td className="py-2 pr-2 text-gray-500 whitespace-nowrap">{row.dimensi}</td>
                    <td className="py-2 pr-2 whitespace-nowrap"><StatusBadge status={row.status} /></td>
                    <td className="py-2 w-24"><ProgressBar value={row.progress} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/bpd/pengawasan-rtl" className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Detail Pengawasan RTL <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Monitoring Program Desa */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Program Desa" href="/bpd/monitoring-program-desa" />
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Program</th>
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Anggaran (Rp)</th>
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Realisasi</th>
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Progress</th>
                  <th className="text-left py-1.5 text-[10px] font-bold text-gray-400 uppercase">Dampak ke Indeks</th>
                </tr>
              </thead>
              <tbody>
                {monitoringProgram.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 pr-2 font-medium text-gray-700 leading-snug" style={{ maxWidth: 100, whiteSpace: 'normal' }}>{row.nama}</td>
                    <td className="py-2 pr-2 text-gray-500 whitespace-nowrap">{(row.anggaran / 1000000).toFixed(0)}jt</td>
                    <td className="py-2 pr-2 text-gray-500 whitespace-nowrap">
                      {(row.realisasi / 1000000).toFixed(0)}jt
                      <span className="text-gray-400 ml-0.5">({row.persen.toFixed(0)}%)</span>
                    </td>
                    <td className="py-2 pr-2 w-20"><ProgressBar value={row.progress} color={row.persen >= 100 ? C.green : row.persen < 50 ? C.red : C.primary} /></td>
                    <td className="py-2 text-[10px] font-bold whitespace-nowrap" style={{ color: row.dampakColor }}>{row.dampak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/bpd/monitoring-program-desa" className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Semua Program <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Evaluasi Dampak Program */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Evaluasi Dampak Program" href="/bpd/evaluasi-program" label="Lihat Detail →" />
          <p className="text-[10px] text-gray-400 font-semibold uppercase mb-2">Dampak terhadap Indeks</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-1.5 pr-2 text-[10px] font-bold text-gray-400 uppercase">Program</th>
                  <th className="text-center py-1.5 pr-1 text-[10px] font-bold text-blue-500 uppercase">Readiness</th>
                  <th className="text-center py-1.5 pr-1 text-[10px] font-bold text-purple-500 uppercase">Maturity</th>
                  <th className="text-center py-1.5 text-[10px] font-bold text-green-600 uppercase">QoL</th>
                </tr>
              </thead>
              <tbody>
                {evaluasiDampak.map((row, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 pr-2 font-medium text-gray-700 leading-snug" style={{ maxWidth: 110, whiteSpace: 'normal' }}>{row.program}</td>
                    <td className="py-2 pr-1 text-center text-blue-600 font-bold">{row.readiness}</td>
                    <td className="py-2 pr-1 text-center text-purple-600 font-bold">{row.maturity}</td>
                    <td className="py-2 text-center text-green-600 font-bold">{row.qol}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link href="/bpd/evaluasi-program" className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Analisis Dampak <ArrowUpRight size={11} />
          </Link>
        </div>
      </div>

      {/* ── EVIDENCE + ASPIRASI + TRANSPARANSI ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Monitoring Evidence Program */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Monitoring Evidence Program" href="/bpd/monitoring-evidence" />
          <div className="space-y-2">
            {evidenceProgram.map((ev, i) => (
              <div key={i} className="flex items-center gap-2 p-2 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <FileCheck size={13} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-gray-800 truncate">{ev.program}</p>
                  <p className="text-[10px] text-gray-400">{ev.tgl} • {ev.jumlah}</p>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap ${ev.statusColor}`}>
                  {ev.status}
                </span>
                <button className="p-1 rounded hover:bg-gray-100 transition-colors">
                  <Eye size={12} className="text-gray-400" />
                </button>
              </div>
            ))}
          </div>
          <Link href="/bpd/monitoring-evidence" className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Semua Evidence <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Aspirasi Masyarakat */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Aspirasi Masyarakat" href="/bpd/aspirasi-masyarakat" />
          <div className="flex items-center gap-3">
            {/* Donut chart */}
            <div className="relative flex-shrink-0">
              <ResponsiveContainer width={120} height={120}>
                <PieChart>
                  <Pie
                    data={aspirasiData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={38}
                    outerRadius={55}
                    startAngle={90}
                    endAngle={-270}
                    stroke="none"
                  >
                    {aspirasiData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 6 }} formatter={(v: any) => [`${v} Aspirasi`]} />
                </PieChart>
              </ResponsiveContainer>
              {/* Center label */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <p className="text-xs font-bold text-gray-500">Total</p>
                <p className="text-lg font-black text-gray-900">12</p>
              </div>
            </div>
            {/* Legend */}
            <div className="flex-1 space-y-1.5">
              {aspirasiData.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[11px] text-gray-600">{item.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[11px] font-bold text-gray-800">{item.value}</span>
                    <span className="text-[10px] text-gray-400">({item.persen})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/bpd/aspirasi-masyarakat" className="mt-3 flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 font-semibold">
            Lihat Semua Aspirasi <ArrowUpRight size={11} />
          </Link>
        </div>

        {/* Transparansi Anggaran Program */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <SectionHeader title="Transparansi Anggaran Program" href="/bpd/transparansi-apbdes" label="Lihat Detail →" />
          {/* Totals */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-[9px] text-gray-400 uppercase font-semibold">Total Anggaran (Rp)</p>
              <p className="text-sm font-black text-gray-900">355.000.000</p>
            </div>
            <div className="text-center p-2 bg-blue-50 rounded-lg">
              <p className="text-[9px] text-gray-400 uppercase font-semibold">Realisasi Anggaran</p>
              <p className="text-sm font-black text-blue-700">256.500.000</p>
              <p className="text-[9px] text-blue-500">(72,25%)</p>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded-lg">
              <p className="text-[9px] text-gray-400 uppercase font-semibold">Sisa Anggaran</p>
              <p className="text-sm font-black text-orange-600">98.500.000</p>
              <p className="text-[9px] text-orange-400">(27,75%)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={110}>
            <BarChart data={anggaranProgram} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={10}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="nama" tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 8, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 10, borderRadius: 6 }}
                formatter={(v: any) => [`Rp ${v}jt`]}
              />
              <Bar dataKey="anggaran" name="Anggaran (Rp)" fill="#bfdbfe" radius={[2, 2, 0, 0]} />
              <Bar dataKey="realisasi" name="Realisasi (Rp)" fill="#1a56db" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ── SIKLUS PENGAWASAN SLV ────────────────────────────────────────── */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4">
          Siklus Pengawasan Smart Living Village
        </h3>
        <div className="flex flex-wrap items-start gap-0">
          {siklusPengawasan.map((step, i) => {
            const Icon = step.icon;
            const isActive = step.active;
            const isDone = step.done;
            const isLast = i === siklusPengawasan.length - 1;
            return (
              <div key={i} className="flex items-center gap-0 flex-1 min-w-0">
                {/* Step */}
                <div className="flex flex-col items-center text-center flex-shrink-0 w-24 sm:w-28">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-sm mb-2 border-2 transition-all ${
                    isActive
                      ? 'bg-blue-600 border-blue-600 shadow-blue-200 shadow-md'
                      : isDone
                      ? 'bg-green-500 border-green-500'
                      : 'bg-gray-100 border-gray-200'
                  }`}>
                    {isDone && !isActive
                      ? <CheckCircle2 size={16} className="text-white" />
                      : <Icon size={16} className={isActive ? 'text-white' : isDone ? 'text-white' : 'text-gray-400'} />
                    }
                  </div>
                  <p className={`text-[10px] font-bold leading-tight mb-0.5 ${isActive ? 'text-blue-700' : isDone ? 'text-green-700' : 'text-gray-400'}`}>
                    {i + 1}. {step.judul}
                  </p>
                  <p className="text-[9px] text-gray-400 leading-snug hidden sm:block">{step.sub}</p>
                </div>
                {/* Connector arrow */}
                {!isLast && (
                  <div className="flex-1 flex items-center justify-center pb-6">
                    <div className={`h-0.5 w-full ${isDone ? 'bg-green-300' : 'bg-gray-200'}`} />
                    <ChevronRight size={12} className={`flex-shrink-0 -ml-1 ${isDone ? 'text-green-400' : 'text-gray-300'}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between text-[10px] text-gray-400 pt-2 border-t border-gray-100">
        <span>APL-SLV Borneo © 2025 · Smart Living Village for Borneo</span>
        <span>Desa Lung Anai, Kecamatan Loa Kuluu, Kabupaten Kutai Kartanegara, Kalimantan Timur</span>
      </div>

    </div>
  );
}