'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  LineChart, Line, ResponsiveContainer, XAxis, YAxis
} from 'recharts';
import {
  AlertTriangle, CheckCircle2, Info, ArrowUpRight, ChevronRight,
  ShieldCheck, FileText, TrendingUp, Award, Target,
  Calendar, Users, HeartPulse, Baby, Stethoscope, ClipboardList,
  BarChart2, RefreshCw, Bell, Lock, HelpCircle
} from 'lucide-react';

const CLR = {
  primary: '#166534',
  secondary: '#15803d',
  light: '#dcfce7',
  warning: '#d97706',
  danger: '#dc2626',
};

// ─── DATA MOCK ───────────────────────────────────────────────────────────────
const PENGUMUMAN = [
  { id: 1, teks: 'Posyandu Balita Bulan Juli: Akan dilaksanakan 15 Juli 2026', tgl: '08/07/2026', type: 'event' },
  { id: 2, teks: 'Pemeriksaan IVA Test Gratis: Untuk Ibu Usia 30-50 Tahun', tgl: '07/07/2026', type: 'info' },
  { id: 3, teks: 'Edukasi Cuci Tangan Pakai Sabun: Di Sekolah Dasar Desa Lung Anai', tgl: '05/07/2026', type: 'info' },
  { id: 4, teks: 'Vaksinasi Campak Rubella (MR): Untuk Anak Usia 9 Bulan - 12 Tahun', tgl: '03/07/2026', type: 'warning' },
  { id: 5, teks: 'Fogging Pencegahan DBD: Di Wilayah RT 02 dan RT 03', tgl: '01/07/2026', type: 'info' },
];

const KESENJANGAN = [
  { masalah: 'Cakupan Imunisasi Dasar Lengkap masih rendah', target: 95, realisasi: 68, gap: 27, level: 'tinggi' },
  { masalah: 'Prevalensi Stunting masih di atas standar', target: 20, realisasi: 32, gap: 12, level: 'tinggi' },
  { masalah: 'Cakupan Pemeriksaan Ibu Hamil (ANC) belum optimal', target: 95, realisasi: 70, gap: 25, level: 'sedang' },
];

const REKOMENDASI_DSS = [
  { no: 1, rekomendasi: 'Optimalkan program imunisasi door-to-door untuk meningkatkan cakupan imunisasi dasar.', prioritas: 'Tinggi' },
  { no: 2, rekomendasi: 'Perkuat intervensi gizi spesifik dan sensitif pada kelompok 1000 HPK.', prioritas: 'Tinggi' },
  { no: 3, rekomendasi: 'Tingkatkan edukasi KIA dan kunjungan ANC secara rutin oleh bidan dan kader.', prioritas: 'Sedang' },
];

const PERINGATAN = [
  { teks: 'Data Posyandu belum diperbarui (2 hari yang lalu)', tipe: 'warning' },
  { teks: '15 Ibu hamil belum pemeriksaan ANC', tipe: 'warning' },
  { teks: 'Program Posyandu Remaja tertunda', tipe: 'info' },
  { teks: 'Kelengkapan data Ibu & Anak 68%', tipe: 'warning' },
];

// Sparkline data (5 semesters)
const SPARK_IMUNISASI = [
  { val: 62 }, { val: 64 }, { val: 65 }, { val: 66 }, { val: 68 }
];
const SPARK_ANC = [
  { val: 65 }, { val: 66 }, { val: 68 }, { val: 67 }, { val: 70 }
];
const SPARK_STUNTING = [
  { val: 36 }, { val: 35 }, { val: 34 }, { val: 33 }, { val: 32 }
];
const SPARK_POSYANDU = [
  { val: 68 }, { val: 70 }, { val: 71 }, { val: 72 }, { val: 73 }
];

export default function NakesDashboardPage() {
  const [periode, setPeriode] = useState('Triwulan 2 (Apr - Jun 2026)');

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs bg-slate-50/50">

      {/* ── HEADER ── */}
      <div className="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-1.5">
            <HeartPulse className="text-emerald-700" size={22} /> TENAGA KESEHATAN
          </h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Dasbor Kesehatan dan SDG Desa 3 — Nakes Posyandu Desa</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={periode}
            onChange={e => setPeriode(e.target.value)}
            className="h-8 px-3 rounded-lg border border-slate-200 text-xs font-bold bg-white text-slate-700 focus:outline-none"
          >
            <option>Triwulan 2 (Apr - Jun 2026)</option>
            <option>Triwulan 1 (Jan - Mar 2026)</option>
            <option>Semester 1 2026</option>
            <option>Juli 2026</option>
          </select>
        </div>
      </div>

      {/* ── BARIS 1: 6 KARTU INDEKS UTAMA ── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: 'Skor Kesiapan Bidang Kesehatan', val: '71,80', sub: 'Kategori: Baik', prog: 71.8, color: '#166534', icon: BarChart2 },
          { label: 'Capaian SDG Desa 3', val: '61%', sub: 'Kategori: Sedang', prog: 61, color: '#15803d', icon: Award },
          { label: 'Kualitas Data Kesehatan', val: '82%', sub: 'Kategori: Baik', prog: 82, color: '#166534', icon: ShieldCheck },
          { label: 'Cakupan Pelayanan', val: '73%', sub: 'Kategori: Sedang', prog: 73, color: '#d97706', icon: HeartPulse },
          { label: 'Status Ibu & Anak (Agregat)', val: '74%', sub: 'Kategori: Sedang', prog: 74, color: '#d97706', icon: Baby },
          { label: 'Program Kesehatan Aktif', val: '15', sub: 'Program Kesehatan', prog: 100, color: '#166534', icon: ClipboardList },
        ].map((k, i) => {
          const Icon = k.icon;
          return (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm flex flex-col justify-between gap-2">
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-tight">{k.label}</span>
                <Icon size={14} style={{ color: k.color }} className="flex-shrink-0" />
              </div>
              <div>
                <p className="text-xl font-black text-slate-800 leading-none">{k.val}</p>
                <p className="text-[9px] text-slate-400 font-semibold mt-1">{k.sub}</p>
              </div>
              <div className="w-full h-1 bg-slate-100 rounded-full">
                <div className="h-full rounded-full" style={{ width: `${k.prog}%`, backgroundColor: k.color }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* ── BARIS 2: MAIN GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* KIRI (2/3) */}
        <div className="lg:col-span-2 space-y-4">

          {/* Kesenjangan Kesehatan Prioritas */}
          <Card>
            <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-red-750" /> Kesenjangan Kesehatan Prioritas
              </CardTitle>
              <Link href="/nakes/health-gap-analysis" className="text-[10px] font-bold text-emerald-700 hover:underline">Lihat Detail →</Link>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {KESENJANGAN.map((k, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-slate-800 leading-tight">{k.masalah}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Target: {k.target}% | Realisasi: {k.realisasi}% | <span className="text-red-600 font-bold">Kesenjangan: {k.gap}%</span>
                      </p>
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded border bg-red-50 text-red-700 border-red-200">Prioritas Tinggi</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
                    <div className="h-full bg-emerald-750" style={{ width: `${k.realisasi}%` }} />
                    <div className="absolute top-0 h-full border-r-2 border-dashed border-red-400" style={{ left: `${k.target}%` }} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rekomendasi DSS Kesehatan */}
          <Card>
            <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Target size={13} className="text-emerald-700" /> Rekomendasi DSS Kesehatan
              </CardTitle>
              <Link href="/nakes/dss-kesehatan" className="text-[10px] font-bold text-emerald-700 hover:underline">Lihat Detail →</Link>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {REKOMENDASI_DSS.map((r, i) => (
                <div key={i} className="flex gap-2 p-2.5 rounded-lg border border-slate-100 bg-slate-50/50">
                  <span className="w-5 h-5 rounded-full bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center flex-shrink-0">{r.no}</span>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 leading-snug">{r.rekomendasi}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5">Skala Prioritas: <strong className="text-slate-600">{r.prioritas}</strong></p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Tren Indikator Kesehatan Utama */}
          <Card>
            <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tren Indikator Kesehatan Utama</CardTitle>
              <Link href="/nakes/monitoring-kesehatan" className="text-[10px] font-bold text-emerald-700 hover:underline">Lihat Semua →</Link>
            </CardHeader>
            <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Cakupan Imunisasi Dasar', val: '68%', diff: '+3%', data: SPARK_IMUNISASI },
                { label: 'Cakupan ANC (Ibu Hamil)', val: '70%', diff: '+4%', data: SPARK_ANC },
                { label: 'Prevalensi Stunting', val: '32%', diff: '-2%', data: SPARK_STUNTING },
                { label: 'Kunjungan Posyandu Aktif', val: '73%', diff: '+5%', data: SPARK_POSYANDU },
              ].map((t, i) => (
                <div key={i} className="p-2 border rounded-xl flex flex-col justify-between gap-1.5 bg-white">
                  <div>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tight leading-tight">{t.label}</span>
                    <div className="flex justify-between items-center mt-0.5">
                      <span className="text-base font-black text-slate-800 leading-none">{t.val}</span>
                      <span className={`text-[9px] font-bold ${t.diff.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{t.diff}</span>
                    </div>
                  </div>
                  <div className="h-[40px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={t.data}>
                        <Line type="monotone" dataKey="val" stroke="#166534" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="text-[8px] text-slate-405 font-mono text-center block mt-0.5">Tren 5 Semester</span>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

        {/* KANAN (1/3) */}
        <div className="space-y-4">

          {/* Pengumuman Kesehatan */}
          <Card>
            <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Bell size={13} /> Pengumuman Kesehatan
              </CardTitle>
              <Link href="/nakes/kalender-kesehatan" className="text-[10px] font-bold text-emerald-700 hover:underline">Lihat Semua →</Link>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {PENGUMUMAN.map(n => (
                <div key={n.id} className="flex gap-2 p-2 rounded-lg border bg-slate-50 border-slate-100">
                  <span className="text-xs flex-shrink-0 mt-0.5">📢</span>
                  <div>
                    <p className="font-semibold text-slate-800 leading-snug">{n.teks}</p>
                    <p className="text-[9px] text-slate-400 mt-0.5 font-mono">{n.tgl}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Peringatan */}
          <Card className="border-red-200">
            <CardHeader className="py-2.5 border-b border-red-100 bg-red-50/30 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle size={13} className="text-red-700" /> Peringatan
              </CardTitle>
              <Link href="/nakes/peringatan" className="text-[10px] font-bold text-red-700 hover:underline">Lihat Semua →</Link>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              {PERINGATAN.map((p, i) => (
                <div key={i} className="flex gap-2 p-2 rounded-lg border bg-red-50/50 border-red-100">
                  <span className="flex-shrink-0 mt-0.5">⚠️</span>
                  <p className="font-semibold text-slate-850 leading-tight">{p.teks}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Aksi Cepat */}
          <Card>
            <CardHeader className="py-2.5 border-b">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Aksi Cepat</CardTitle>
            </CardHeader>
            <CardContent className="p-3 grid grid-cols-2 gap-2">
              {[
                { label: 'Input Data Posyandu', path: '/nakes/posyandu', icon: '📋' },
                { label: 'Verifikasi Data', path: '/nakes/data-kesehatan-desa', icon: '✔' },
                { label: 'Kelola Program', path: '/nakes/program-kesehatan-desa', icon: '📂' },
                { label: 'Jadwal Posyandu', path: '/nakes/kalender-kesehatan', icon: '📅' },
                { label: 'Tambah Rujukan', path: '/nakes/ibu-hamil', icon: '🏥' },
                { label: 'Laporan Bulanan', path: '/nakes/laporan-kesehatan-desa', icon: '📊' },
                { label: 'Lihat Rekomendasi', path: '/nakes/dss-kesehatan', icon: '💡' },
              ].map((a, i) => (
                <Link key={i} href={a.path}
                  className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl flex flex-col items-center gap-1 text-center transition-all">
                  <span className="text-base">{a.icon}</span>
                  <p className="font-bold text-emerald-900 leading-tight text-[10px]">{a.label}</p>
                </Link>
              ))}
            </CardContent>
          </Card>

        </div>
      </div>

      {/* ── CATATAN PENTING (FOOTER GRIDS) ── */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-2 border-t pt-4">
        {[
          { icon: Lock, title: 'Data bersifat sensitif', text: 'Data individu hanya untuk kepentingan pelayanan sesuai kewenangan.' },
          { icon: ShieldCheck, title: 'Validasi data', text: 'Pastikan data yang diinput lengkap, akurat, dan diperbarui secara berkala.' },
          { icon: HeartPulse, title: 'SDG Desa 3', text: 'Indikator kesehatan berkontribusi pada pencapaian SDG 3 (Kehidupan Sehat & Sejahtera).' },
          { icon: HelpCircle, title: 'Keputusan bersama', text: 'Rekomendasi bersifat alat bantu. Keputusan akhir melalui pimpinan desa dan musyawarah.' },
          { icon: ClipboardList, title: 'Jejak audit aktif', text: 'Semua aktivitas tercatat untuk keamanan dan akuntabilitas.' },
        ].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="p-3 bg-white border border-slate-200 rounded-xl flex flex-col gap-1.5 shadow-sm">
              <div className="flex items-center gap-1.5">
                <Icon size={14} className="text-emerald-700" />
                <span className="font-bold text-slate-800 text-[10px]">{item.title}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal">{item.text}</p>
            </div>
          );
        })}
      </div>

      {/* ── CATATAN SIMULASI ── */}
      <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-250 text-yellow-900 text-xs flex items-start gap-2">
        <span className="flex-shrink-0 mt-0.5">📊</span>
        <p className="font-semibold leading-relaxed">
          <strong>Catatan Data Simulasi Terkendali:</strong> Seluruh angka yang ditampilkan pada dasbor ini merupakan data simulasi terkendali yang digunakan untuk keperluan penelitian dan pengujian sistem. Data aktual lapangan mungkin berbeda.
        </p>
      </div>

    </div>
  );
}