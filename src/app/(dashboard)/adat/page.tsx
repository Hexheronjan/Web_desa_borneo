'use client';

import Link from 'next/link';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertTriangle, CheckCircle2, Info, Bell, ArrowUpRight,
  ChevronRight, Activity, ShieldCheck, FileText, TrendingUp,
  RefreshCw, Award, Target, Zap, BookOpen, Calendar,
  Users, Landmark, Camera, Film, Image, FileCheck,
  MessageSquare, ClipboardList, BarChart2, Heart, ShieldAlert, CheckSquare, Plus, FileSpreadsheet
} from 'lucide-react';

const COLOR = '#5c3d11'; // Cokelat Kayu Adat

const PENGUMUMAN_DATA = [
  { id: 1, type: 'event', teks: 'Rapat Besar Lembaga Adat: Membahas Festival Hudoq 2026', tgl: '20/06/2026' },
  { id: 2, type: 'event', teks: 'Upacara Adat Ngerun Tahun: Akan dilaksanakan pada 10 Juli 2026', tgl: '18/06/2026' },
  { id: 3, type: 'info', teks: 'Pelatihan Pemandu Wisata Budaya Berbasis Kearifan Lokal', tgl: '17/06/2026' },
  { id: 4, type: 'warning', teks: 'Verifikasi Program Wisata Desa: Perlu telaah program & persetujuan adat', tgl: '16/06/2026' },
];

const RADAR_DATA = [
  { aspek: 'Kelembagaan Adat', nilai: 78 },
  { aspek: 'Musyawarah & Gotong Royong', nilai: 75 },
  { aspek: 'Praktik & Seni Budaya', nilai: 74 },
  { aspek: 'Tata Kelola Data Budaya', nilai: 72 },
  { aspek: 'Bahasa Lokal', nilai: 73 },
  { aspek: 'Hukum Adat', nilai: 79 },
];

const KEARIFAN_LOKAL_DATA = [
  { dimensi: 'Pengelolaan Hutan & SDA', skor: 78.0, kategori: 'Tinggi' },
  { dimensi: 'Sistem Gotong Royong Betang', skor: 79.5, kategori: 'Tinggi' },
  { dimensi: 'Hukum Adat Betutu', skor: 74.0, kategori: 'Tinggi' },
  { dimensi: 'Kearifan Ekonomi Kreatif', skor: 71.0, kategori: 'Sedang' },
  { dimensi: 'Sistem Medis Tradisional', skor: 69.5, kategori: 'Sedang' },
];

const TELAAH_PROGRAM_DATA = [
  { program: 'Pembangunan Internet Desa', status: 'sesuai nilai adat', ket: 'Mendukung komunikasi tanpa merusak situs keramat', statusColor: 'bg-green-50 text-green-700 border-green-200' },
  { program: 'Pengembangan Wisata Desa Baru', status: 'sesuai dengan penyesuaian', ket: 'Perlu zonasi ketat di sekitar wilayah Betang', statusColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { program: 'Pelatihan Digital UMKM', status: 'sesuai nilai adat', ket: 'Mendukung peningkatan ekonomi kerajinan lokal', statusColor: 'bg-green-50 text-green-700 border-green-200' },
  { program: 'Pembangunan Gedung Serbaguna', status: 'perlu musyawarah', ket: 'Lokasi rencana bersinggungan dengan hutan adat', statusColor: 'bg-amber-50 text-amber-700 border-amber-200' },
];

const DAMPAK_PROGRAM_DATA = [
  { program: 'Pengembangan Wisata Desa', dampak: '+4,20', ket: 'Promosi produk kerajinan anyaman & tari lokal' },
  { program: 'Pelatihan Digital UMKM', dampak: '+2,80', ket: 'Mendukung pemasaran kerajinan secara online' },
  { program: 'Festival Hudoq Tahunan', dampak: '+5,00', ket: 'Puncak ketahanan budaya & partisipasi publik' },
  { program: 'Pembangunan Gedung Adat', dampak: '+3,50', ket: 'Memperkokoh ruang rapat kelembagaan adat' },
];

const DOKUMENTASI_DATA = [
  { judul: 'Tari Gong Dayak', tgl: '15/06/2026', tipe: 'Video', emoji: '🎭' },
  { judul: 'Ritual Mecaq Undat', tgl: '05/06/2026', tipe: 'Foto', emoji: '🕯️' },
  { judul: 'Hukum Adat Dayak', tgl: '01/06/2026', tipe: 'Dokumen', emoji: '📜' },
  { judul: 'Konstruksi Betang', tgl: '28/05/2026', tipe: 'Foto', emoji: '🏠' },
];

export default function AdatDashboardPage() {
  return (
    <div className="flex flex-col gap-4 pb-8 text-xs">
      
      {/* ── WELCOME & TITLE ── */}
      <div className="flex justify-between items-center border-b pb-3 flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">Dasbor Kebudayaan, Tata Kelola Adat, dan SDG Desa 18</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Portal Monitoring Nilai Adat, Kearifan Lokal, &amp; Perlindungan Budaya</p>
        </div>
        <div className="text-right text-[10px] text-slate-400 font-bold bg-slate-50 p-2 border rounded-xl flex items-center gap-1.5">
          <span>Tahun Evaluasi: 2026</span>
          <span className="w-1.5 h-1.5 bg-amber-600 rounded-full" />
          <span>Wilayah: Desa Lung Anai</span>
        </div>
      </div>

      {/* ── ROW BANNER UTAMA & PENGUMUMAN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Welcome banner */}
        <div className="lg:col-span-2 rounded-xl overflow-hidden relative shadow-md p-5 flex flex-col justify-between text-white"
          style={{ background: 'linear-gradient(135deg, #5c3d11 0%, #7c2d12 50%, #9a3412 100%)' }}>
          <div className="relative z-10 space-y-2">
            <h2 className="text-lg font-black leading-tight">Selamat datang, Ketua Lembaga Adat 🏛️</h2>
            <p className="text-xs text-amber-100 leading-relaxed max-w-xl">
              Portal data adat ini memfasilitasi perlindungan warisan budaya, penataan hukum adat, dan telaah program pembangunan agar berjalan selaras dengan adat istiadat di Desa Lung Anai.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 pt-4 relative z-10 text-[10px] font-bold">
            <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/20">Kelembagaan Adat</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/20">Musyawarah Komunitas</span>
            <span className="bg-white/10 px-2.5 py-1 rounded-full border border-white/20">Perlindungan Data Budaya</span>
          </div>
          <div className="absolute right-4 bottom-4 opacity-10 text-9xl">🏠</div>
        </div>

        {/* Pengumuman bertanggal 2026 */}
        <div className="rounded-xl border border-amber-200 bg-white shadow-sm p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3 border-b pb-1.5">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1"><Bell size={13} /> Berita &amp; Rapat Adat (2026)</p>
          </div>
          <div className="space-y-2.5">
            {PENGUMUMAN_DATA.map((n) => (
              <div key={n.id} className="flex gap-2 p-2 rounded-lg bg-amber-50/50 border border-amber-100/50">
                <span className="text-amber-800 text-xs">📢</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-800 leading-snug">{n.teks}</p>
                  <p className="text-[9px] text-slate-400 mt-1 font-mono">{n.tgl}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW KARTU INDEKS & CAPAIAN SDG 18 (5 KARTU) ── */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Capaian SDG Desa 18 */}
        <div className="bg-amber-50 rounded-xl border border-amber-200 shadow-sm p-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Award size={16} className="text-amber-800" />
            <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wide leading-none">Capaian SDG Desa 18</span>
          </div>
          <div>
            <p className="text-2xl font-black text-amber-900 leading-none">84.5%</p>
            <p className="text-[9px] text-amber-700 font-semibold mt-1">Kategori: Sangat Tinggi</p>
          </div>
          <div className="w-full h-1 bg-amber-200 rounded-full overflow-hidden">
            <div className="h-full bg-amber-700" style={{ width: '84.5%' }} />
          </div>
        </div>

        {/* Skor Kesiapan Budaya */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Landmark size={15} className="text-indigo-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase leading-none">Kesiapan Budaya &amp; Adat</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-800 leading-none">74,20</p>
            <p className="text-[9px] text-indigo-700 font-bold mt-1">Status: Siap / Lestari</p>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600" style={{ width: '74.2%' }} />
          </div>
        </div>

        {/* Skor Ketahanan Budaya */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <Activity size={15} className="text-rose-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase leading-none">Skor Ketahanan Budaya</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-800 leading-none">72,80</p>
            <p className="text-[9px] text-rose-700 font-bold mt-1">Status: Tinggi</p>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-rose-600" style={{ width: '72.8%' }} />
          </div>
        </div>

        {/* Skor Keberlanjutan Pengetahuan Lokal */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <BookOpen size={15} className="text-emerald-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase leading-none">Keberlanjutan Pengetahuan</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-800 leading-none">75,60</p>
            <p className="text-[9px] text-emerald-700 font-bold mt-1">Status: Terpelihara</p>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600" style={{ width: '75.6%' }} />
          </div>
        </div>

        {/* Usulan Aspirasi Masuk */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-3.5 flex flex-col justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <MessageSquare size={15} className="text-purple-600" />
            <span className="text-[9px] font-bold text-slate-500 uppercase leading-none">Aspirasi Masuk</span>
          </div>
          <div>
            <p className="text-xl font-black text-slate-800 leading-none">14 Usulan</p>
            <p className="text-[9px] text-purple-700 font-bold mt-1">4 Menunggu Telaah</p>
          </div>
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600" style={{ width: '80%' }} />
          </div>
        </div>
      </div>

      {/* ── ROW EMPAT INDIKATOR UTAMA D6 (EKSPLISIT) ── */}
      <Card className="border border-amber-250 bg-amber-50/10">
        <CardHeader className="py-2.5 px-4 bg-amber-50/30 border-b">
          <CardTitle className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <Landmark size={14} /> Kinerja Empat Indikator Utama (Sub-Dimensi D6: Budaya &amp; Lembaga Adat)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Kelembagaan & Kewenangan Adat', val: '78.0 / 100', status: 'Kuat', desc: 'Struktur adat memiliki wewenang penuh penyelesaian sengketa lokal.' },
            { label: 'Musyawarah & Partisipasi Komunitas', val: '75.2 / 100', status: 'Aktif', desc: 'Rapat adat Rumah Betang melibatkan pemuda & perwakilan wanita Dayak.' },
            { label: 'Keberlanjutan Praktik Budaya', val: '74.0 / 100', status: 'Lestari', desc: 'Transfer kearifan lokal kerajinan mandau & seni tari Gong terjaga.' },
            { label: 'Tata Kelola & Perlindungan Data', val: '72.4 / 100', status: 'Terlindungi', desc: 'Naskah adat digital tersimpan rapi dengan klasifikasi terbatas.' },
          ].map((ind, idx) => (
            <div key={idx} className="p-3 bg-white border border-amber-100 rounded-xl space-y-1.5">
              <p className="font-bold text-slate-800 text-[11px] leading-snug">{ind.label}</p>
              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-black text-amber-800">{ind.val}</span>
                <span className="text-[9px] font-bold text-green-700 bg-green-50 px-1.5 py-0.2 rounded border border-green-200">{ind.status}</span>
              </div>
              <p className="text-[10px] text-slate-500 font-semibold leading-normal pt-1 border-t border-slate-50">{ind.desc}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ── ROW AKSI CEPAT / QUICK ACTIONS ── */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Aksi Cepat Administrasi Adat</h3>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            { label: 'Periksa Data Budaya', desc: 'Arsip & Warisan', path: '/adat/arsip', color: 'hover:bg-amber-50 hover:border-amber-300 text-amber-900' },
            { label: 'Tetapkan Klasifikasi', desc: 'Persetujuan Akses', path: '/adat/persetujuan-data', color: 'hover:bg-indigo-50 hover:border-indigo-300 text-indigo-900' },
            { label: 'Berikan Persetujuan', desc: 'Program & Nilai Adat', path: '/adat/persetujuan-data', color: 'hover:bg-green-50 hover:border-green-300 text-green-900' },
            { label: 'Jadwalkan Musyawarah', desc: 'Rapat Betang', path: '/adat/musyawarah-adat', color: 'hover:bg-purple-50 hover:border-purple-300 text-purple-900' },
            { label: 'Telaah Program', desc: 'Evaluasi APBDes', path: '/adat/telaah-adat', color: 'hover:bg-sky-50 hover:border-sky-300 text-sky-900' },
            { label: 'Buat Laporan Adat', desc: 'Dokumen Tahunan', path: '/adat/laporan-kelembagaan', color: 'hover:bg-rose-50 hover:border-rose-300 text-rose-900' },
          ].map((act, i) => (
            <Link
              key={i}
              href={act.path}
              className={`p-3 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between gap-1 shadow-sm transition-all group ${act.color}`}
            >
              <p className="font-bold text-slate-805 leading-snug group-hover:text-amber-800">{act.label}</p>
              <p className="text-[9px] text-slate-400 font-semibold">{act.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ── ROW GRID DATA MONITORING & KETAHANAN ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Radar Ketahanan */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Radar Ketahanan Budaya</p>
            <Link href="/adat/monitoring-ketahanan-budaya" className="text-[10px] text-amber-700 font-bold hover:underline">Detail →</Link>
          </div>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={RADAR_DATA}>
                <PolarGrid stroke="#fde68a" />
                <PolarAngleAxis dataKey="aspek" tick={{ fontSize: 8, fill: '#78350f' }} />
                <PolarRadiusAxis angle={30} domain={[60, 85]} tick={{ fontSize: 8 }} />
                <Radar name="Nilai Kinerja" dataKey="nilai" stroke="#7c2d12" fill="#7c2d12" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Telaah Program & Kesesuaian Adat */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Kesesuaian Program Desa dengan Nilai Adat</p>
            <Link href="/adat/telaah-adat" className="text-[10px] text-amber-700 font-bold hover:underline">Detail →</Link>
          </div>
          <div className="space-y-2">
            {TELAAH_PROGRAM_DATA.map((tp, idx) => (
              <div key={idx} className="p-2 border rounded-lg bg-slate-50/50 space-y-1">
                <div className="flex justify-between items-start gap-1">
                  <p className="font-bold text-slate-805 leading-snug">{tp.program}</p>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold border capitalize flex-shrink-0 ${tp.statusColor}`}>{tp.status}</span>
                </div>
                <p className="text-[10px] text-slate-550 leading-relaxed font-semibold">{tp.ket}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dampak Program & Monitoring Kearifan Lokal */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Dampak Program terhadap Kebudayaan</p>
              <Link href="/adat/dampak-program-budaya" className="text-[10px] text-amber-700 font-bold hover:underline">Detail →</Link>
            </div>
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-left text-slate-400">
                  <th className="pb-1.5">Program Kerja</th>
                  <th className="pb-1.5 text-center text-amber-800">Dampak</th>
                  <th className="pb-1.5">Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {DAMPAK_PROGRAM_DATA.map((dp, idx) => (
                  <tr key={idx} className="border-b border-slate-50">
                    <td className="py-2 font-semibold text-slate-800 leading-snug">{dp.program}</td>
                    <td className="py-2 text-center font-black text-amber-700">{dp.dampak}</td>
                    <td className="py-2 text-[10px] text-slate-450 leading-snug">{dp.ket}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── ROW DOKUMENTASI & PERLINDUNGAN DATA ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Dokumentasi Berkas Adat */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <p className="text-xs font-bold text-gray-700 uppercase tracking-wider">Dokumentasi Warisan Budaya &amp; Berkas (2026)</p>
            <Link href="/adat/arsip" className="text-[10px] text-amber-700 font-bold hover:underline">Arsip Berkas →</Link>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {DOKUMENTASI_DATA.map((d, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50 flex flex-col justify-between gap-1 text-center">
                <span className="text-3xl">{d.emoji}</span>
                <p className="font-bold text-slate-800 truncate leading-tight mt-1">{d.judul}</p>
                <p className="text-[8px] text-slate-400 mt-0.5">{d.tgl}</p>
                <span className="text-[8px] font-bold bg-amber-100 text-amber-800 px-1 py-0.2 rounded border border-amber-200 mt-1">{d.tipe}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Informasi Perlindungan Budaya Tetap */}
        <Card className="border-red-200 bg-red-50/10">
          <CardHeader className="py-2.5 bg-red-50/30 border-b border-red-100">
            <CardTitle className="text-xs font-bold text-red-900 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-red-700" /> Perlindungan Data Budaya
            </CardTitle>
          </CardHeader>
          <CardContent className="p-3.5 space-y-2 text-[11px] text-slate-650 leading-relaxed font-semibold">
            <p>🔒 <strong>Informasi Keamanan:</strong></p>
            <p>Data budaya dikelola berdasarkan kewenangan komunitas, klasifikasi, tujuan penggunaan, persetujuan, dan jejak audit.</p>
            <p>Dashboard publik hanya boleh menampilkan data budaya yang telah ditetapkan sebagai informasi publik.</p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
