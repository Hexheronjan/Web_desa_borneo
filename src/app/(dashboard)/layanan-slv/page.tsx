'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  Heart,
  BookOpen,
  GraduationCap,
  Award,
  Landmark,
  MessageSquare,
  Star,
  ArrowRight,
  Stethoscope,
  ChevronRight,
  Bell,
  Calendar,
  User,
  History,
  HelpCircle,
  Download,
  FileText,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function LayananSLVDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? 'Andi Saputra';

  // ─── KEY METRICS ──────────────────────────────────────────────────────────
  const keyMetrics = [
    { label: 'Layanan Kesehatan Diakses', value: '12 Kali', href: '/layanan-slv/monitoring-kesehatan', icon: Heart, color: '#e53935', bg: 'bg-red-50' },
    { label: 'Pelatihan Diikuti', value: '8 Program', href: '/layanan-slv/pelatihan-online', icon: GraduationCap, color: '#1e88e5', bg: 'bg-blue-50' },
    { label: 'Sertifikat Diperoleh', value: '4 Sertifikat', href: '/layanan-slv/sertifikasi', icon: Award, color: '#8e24aa', bg: 'bg-purple-50' },
    { label: 'Kegiatan Adat Diikuti', value: '6 Kegiatan', href: '/layanan-slv/kalender-adat', icon: Landmark, color: '#f4511e', bg: 'bg-orange-50' },
    { label: 'Forum Desa Diikuti', value: '5 Kegiatan', href: '/layanan-slv/forum-desa', icon: MessageSquare, color: '#00897b', bg: 'bg-teal-50' },
    { label: 'Tingkat Kepuasan Layanan', value: '4,6 dari 5', href: '#', icon: Star, color: '#fdd835', bg: 'bg-yellow-50' },
  ];

  // ─── JADWAL & KEGIATAN MENDATANG ──────────────────────────────────────────
  const jadwalMendatang = [
    { icon: Heart, color: 'bg-pink-100 text-pink-600', title: 'Posyandu Balita', sub: 'Posyandu Mekat Desa Sehat', tgl: '28 Jun 2026', jam: '08:00 WIB' },
    { icon: GraduationCap, color: 'bg-blue-100 text-blue-600', title: 'Pelatihan Literasi Digital', sub: 'Materi Keamanan Digital', tgl: '29 Jun 2026', jam: '10:00 WIB' },
    { icon: Landmark, color: 'bg-orange-100 text-orange-600', title: 'Musyawarah Adat Bulanan', sub: 'Bale Adat Desa', tgl: '30 Jun 2026', jam: '13:00 WIB' },
    { icon: Heart, color: 'bg-red-100 text-red-600', title: 'Edukasi Kesehatan Remaja', sub: 'Topik: Gizi Seimbang', tgl: '01 Jul 2026', jam: '09:00 WIB' },
    { icon: BookOpen, color: 'bg-purple-100 text-purple-600', title: 'Kelas Online Bahasa Inggris', sub: 'Level Dasar – Pertemuan 3', tgl: '02 Jul 2026', jam: '15:30 WIB' },
  ];

  // ─── LAYANAN POPULER ──────────────────────────────────────────────────────
  const layananPopuler = [
    { label: 'Posyandu Digital', href: '/layanan-slv/posyandu-digital', icon: Heart, color: 'text-pink-600 bg-pink-50 border-pink-200' },
    { label: 'Telekonsultasi', href: '/layanan-slv/telekonsultasi', icon: Stethoscope, color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    { label: 'Kelas Desa', href: '/layanan-slv/kelas-desa', icon: BookOpen, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { label: 'Pelatihan Online', href: '/layanan-slv/pelatihan-online', icon: GraduationCap, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { label: 'Informasi Adat', href: '/layanan-slv/informasi-adat', icon: Landmark, color: 'text-orange-600 bg-orange-50 border-orange-200' },
    { label: 'Forum Desa', href: '/layanan-slv/forum-desa', icon: MessageSquare, color: 'text-teal-600 bg-teal-50 border-teal-200' },
  ];

  // ─── RIWAYAT LAYANAN TERBARU ──────────────────────────────────────────────
  const riwayatLayanan = [
    { icon: Stethoscope, color: 'bg-emerald-100 text-emerald-600', title: 'Telekonsultasi – Dr. Rina', status: 'Selesai', statusColor: 'bg-green-100 text-green-700', tgl: '26/06/2026' },
    { icon: Heart, color: 'bg-pink-100 text-pink-600', title: 'Posyandu Balita', status: 'Selesai', statusColor: 'bg-green-100 text-green-700', tgl: '25/06/2026' },
    { icon: GraduationCap, color: 'bg-blue-100 text-blue-600', title: 'Pelatihan Pendidikan Digital', status: 'Berlangsung', statusColor: 'bg-blue-100 text-blue-700', tgl: '24/06/2026' },
    { icon: Landmark, color: 'bg-orange-100 text-orange-600', title: 'Musyawarah Desa Digital', status: 'Selesai', statusColor: 'bg-green-100 text-green-700', tgl: '23/06/2026' },
  ];

  // ─── INFORMASI & PENGUMUMAN ───────────────────────────────────────────────
  const informasi = [
    { title: 'Imunisasi BCG untuk bayi usia 0–1 bulan', sub: 'Posyandu, Melalui Desa Sehat', tgl: '26/06/2026', icon: Heart, color: 'text-red-500' },
    { title: 'Pendaftaran Pelatihan Digital Marketing Desa', sub: 'Dibuka Hingga 5 Juli 2026', tgl: '25/06/2026', icon: GraduationCap, color: 'text-blue-500' },
    { title: 'Jadwal Adat Penetapan Hasil Panen', sub: 'Akan dilaksanakan pada 30 Juni 2026', tgl: '24/06/2026', icon: Landmark, color: 'text-orange-500' },
    { title: 'Beasiswa Dana Kesehatan Tahun 2026', sub: 'Pendaftaran dibuka 1–19 Juli 2026', tgl: '23/06/2026', icon: FileText, color: 'text-purple-500' },
  ];

  // ─── PROGRESS PEMBELAJARAN ────────────────────────────────────────────────
  const progressBelajar = [
    { label: 'Literasi Digital Dasar', val: 75, color: 'bg-emerald-500' },
    { label: 'Microsoft Office Dasar', val: 60, color: 'bg-blue-500' },
    { label: 'Bahasa Inggris Pemula', val: 40, color: 'bg-orange-500' },
    { label: 'Desain Grafis Dasar', val: 20, color: 'bg-purple-500' },
  ];

  // ─── KALENDER ADAT JUNI 2026 ──────────────────────────────────────────────
  const kalenderHeader = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
  // Juni 2026: mulai Senin (1 Jun = Senin)
  const kalenderDays = [
    null, null, null, null, null, null, null, // tidak ada hari kosong di awal (Juni 1 = Senin)
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, null, null, null, null, null,
  ].slice(7); // hapus baris dummy

  const kalenderDaysFixed = [
    1, 2, 3, 4, 5, 6, 7,
    8, 9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
    29, 30, null, null, null, null, null,
  ];

  const adatEvents: Record<number, string> = {
    7: 'Ritual Adat Mappare Temme',
    14: 'Upacara Adat Ngalung',
    21: 'Upacara Adat Bailan',
    30: 'Musyawarah Adat Bulanan',
  };

  const adatDates = Object.keys(adatEvents).map(Number);
  const today = 30; // current date from context (30 Jun 2026)

  // ─── AKSES CEPAT ─────────────────────────────────────────────────────────
  const aksesCepat = [
    { label: 'Profil Saya', href: '/layanan-slv/profil-saya', icon: User },
    { label: 'Riwayat Layanan', href: '/layanan-slv/riwayat-layanan', icon: History },
    { label: 'Notifikasi', href: '/layanan-slv/notifikasi', icon: Bell, badge: 6 },
    { label: 'Bantuan', href: '/layanan-slv/bantuan-panduan', icon: HelpCircle },
    { label: 'Pusat Unduhan', href: '/layanan-slv/riwayat-pelatihan', icon: Download },
  ];

  return (
    <div className="flex flex-col gap-5 pb-6">

      {/* ── WELCOME ─────────────────────────────────────────────────────── */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
          Selamat datang, Layanan SLV Smart Living Village 👋
        </h2>
        <p className="text-xs md:text-sm text-slate-500 font-medium mt-0.5">
          Manfaatkan layanan desa untuk hidup sehat, belajar bermutu dan lestarikan budaya.
        </p>
      </div>

      {/* ── BANNER ───────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg bg-emerald-950 text-white min-h-[150px] flex flex-col justify-center px-6 md:px-12 py-8">
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-950/80 to-emerald-900/40 z-0" />
        <div className="relative z-10 space-y-2">
          <span className="px-3 py-1 bg-emerald-700/60 backdrop-blur border border-emerald-500/30 rounded-full text-[10px] font-black tracking-widest uppercase">
            Smart Living Village
          </span>
          <h1 className="text-2xl md:text-3xl font-black leading-tight tracking-tight">
            SMART LIVING VILLAGE
          </h1>
          <p className="text-xs md:text-sm text-emerald-100 max-w-xl font-medium leading-relaxed">
            Layanan untuk Kesehatan, Pendidikan dan Kelembagaan Budaya Desa
          </p>
          <div className="flex flex-wrap gap-4 text-[10px] md:text-xs font-bold text-emerald-300 pt-1">
            <span className="px-2 py-0.5 bg-emerald-800/60 rounded-full border border-emerald-600/30">SDGs 3 • Desa Sehat</span>
            <span className="px-2 py-0.5 bg-blue-800/60 rounded-full border border-blue-600/30">SDGs 4 • Pendidikan Berkualitas</span>
            <span className="px-2 py-0.5 bg-orange-800/60 rounded-full border border-orange-600/30">SDGs 18 • Kelembagaan &amp; Budaya</span>
          </div>
        </div>
      </div>

      {/* ── 6 KEY METRICS ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {keyMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="hover:shadow-md transition-shadow border border-slate-200">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.bg}`}>
                  <Icon size={16} style={{ color: m.color }} />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                    {m.label}
                  </p>
                  <p className="text-lg font-black text-slate-800 mt-0.5 leading-none">
                    {m.value}
                  </p>
                </div>
                <Link href={m.href} className="text-[10px] font-black text-slate-400 hover:text-emerald-700 flex items-center gap-0.5 transition-colors">
                  Lihat Detail <ChevronRight size={10} />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── 3 KOLOM TENGAH ──────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ── KOLOM 1: Jadwal & Kegiatan Mendatang ─── */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-sm font-bold text-slate-800">Jadwal &amp; Kegiatan Mendatang</CardTitle>
            <Link href="/layanan-slv/jadwal-kesehatan" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5">
              Lihat Semua <ChevronRight size={10} />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 pb-4 px-4">
            {jadwalMendatang.map((j, i) => {
              const Icon = j.icon;
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${j.color}`}>
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-tight">{j.title}</p>
                    <p className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">{j.sub}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">{j.tgl}</span>
                      <span className="text-[9px] font-semibold text-slate-400">{j.jam}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* ── KOLOM 2: Layanan Populer + Riwayat Layanan ─── */}
        <div className="space-y-4">
          {/* Layanan Populer */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-sm font-bold text-slate-800">Layanan Populer</CardTitle>
              <Link href="/layanan-slv" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5">
                Lihat Semua <ChevronRight size={10} />
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-2 pb-4 px-4">
              {layananPopuler.map((lp, i) => {
                const Icon = lp.icon;
                return (
                  <Link
                    key={i}
                    href={lp.href}
                    className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border hover:opacity-80 transition-all ${lp.color}`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <Icon size={20} />
                    </div>
                    <span className="text-[9px] font-bold text-center leading-tight text-slate-700">{lp.label}</span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Riwayat Layanan Terbaru */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-sm font-bold text-slate-800">Riwayat Layanan Terbaru</CardTitle>
              <Link href="/layanan-slv/riwayat-layanan" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5">
                Lihat Semua <ChevronRight size={10} />
              </Link>
            </CardHeader>
            <CardContent className="space-y-2.5 pb-4 px-4">
              {riwayatLayanan.map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${r.color}`}>
                      <Icon size={13} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-slate-800 leading-tight truncate">{r.title}</p>
                    </div>
                    <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
                      <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wide ${r.statusColor}`}>
                        {r.status}
                      </span>
                      <span className="text-[8px] text-slate-400 font-medium">{r.tgl}</span>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* ── KOLOM 3: Informasi & Pengumuman ─── */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-sm font-bold text-slate-800">Informasi &amp; Pengumuman</CardTitle>
            <Link href="/layanan-slv/edukasi-kesehatan" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5">
              Lihat Semua <ChevronRight size={10} />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 pb-4 px-4">
            {informasi.map((info, i) => {
              const Icon = info.icon;
              return (
                <div key={i} className="flex items-start gap-2.5 pb-3 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="mt-0.5 flex-shrink-0">
                    <Icon size={14} className={info.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold text-slate-800 leading-snug">{info.title}</p>
                    <p className="text-[9px] text-slate-500 font-medium leading-tight mt-0.5">{info.sub}</p>
                    <span className="text-[8px] text-slate-400 font-semibold block mt-0.5">{info.tgl}</span>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* ── 3 KOLOM BAWAH ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Progress Pembelajaran */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-sm font-bold text-slate-800">Progress Pembelajaran</CardTitle>
            <Link href="/layanan-slv/pelatihan-online" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5">
              Lihat Semua <ChevronRight size={10} />
            </Link>
          </CardHeader>
          <CardContent className="space-y-4 pb-4 px-4">
            {progressBelajar.map((p, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-700">{p.label}</span>
                  <span className="text-[11px] font-black text-slate-600">{p.val}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${p.color}`}
                    style={{ width: `${p.val}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Riwayat Layanan Terbaru (tabel detail) */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-sm font-bold text-slate-800">Riwayat Layanan Terbaru</CardTitle>
            <Link href="/layanan-slv/riwayat-layanan" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5">
              Lihat Semua <ChevronRight size={10} />
            </Link>
          </CardHeader>
          <CardContent className="space-y-3 pb-4 px-4">
            {riwayatLayanan.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${r.color}`}>
                    <Icon size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-slate-800 leading-tight truncate">{r.title}</p>
                    <span className="text-[8px] text-slate-400 font-medium">{r.tgl}</span>
                  </div>
                  <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wide flex-shrink-0 ${r.statusColor}`}>
                    {r.status}
                  </span>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Kalender Adat Juni 2026 */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
            <CardTitle className="text-sm font-bold text-slate-800">Kalender Adat</CardTitle>
            <Link href="/layanan-slv/kalender-adat" className="text-[10px] font-bold text-emerald-700 hover:underline flex items-center gap-0.5">
              Lihat Kalender Lengkap <ChevronRight size={10} />
            </Link>
          </CardHeader>
          <CardContent className="pb-4 px-4">
            <p className="text-[10px] font-black text-slate-600 text-center mb-2 uppercase tracking-widest">Juni 2026</p>
            {/* Header hari */}
            <div className="grid grid-cols-7 mb-1">
              {kalenderHeader.map((h) => (
                <div key={h} className="text-center text-[8px] font-black text-slate-400 uppercase py-1">
                  {h}
                </div>
              ))}
            </div>
            {/* Grid tanggal */}
            <div className="grid grid-cols-7 gap-y-0.5">
              {kalenderDaysFixed.map((day, i) => {
                const isEvent = day !== null && adatDates.includes(day);
                const isToday = day === today;
                return (
                  <div
                    key={i}
                    className={`text-center text-[10px] font-semibold py-1 rounded cursor-default transition-all
                      ${day === null ? '' : isToday ? 'bg-emerald-600 text-white font-black rounded-full' : isEvent ? 'bg-orange-100 text-orange-700 font-black rounded-full' : 'text-slate-600 hover:bg-slate-100 rounded-full'}`}
                  >
                    {day ?? ''}
                  </div>
                );
              })}
            </div>
            {/* Legend events */}
            <div className="mt-3 space-y-1.5 border-t border-slate-100 pt-3">
              {Object.entries(adatEvents).map(([tgl, nama]) => (
                <div key={tgl} className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-[9px] font-black flex items-center justify-center flex-shrink-0">
                    {tgl}
                  </span>
                  <span className="text-[9px] font-semibold text-slate-600 leading-tight">{nama}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── AKSES CEPAT LAYANAN (Full Width Bottom Bar) ──────────────────── */}
      <Card className="border border-slate-200">
        <CardContent className="px-4 py-3">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Akses Cepat Layanan</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {aksesCepat.map((a, i) => {
              const Icon = a.icon;
              return (
                <Link
                  key={i}
                  href={a.href}
                  className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-200 transition-all group"
                >
                  <div className="relative">
                    <Icon size={16} className="text-slate-600 group-hover:text-emerald-700 transition-colors" />
                    {a.badge && (
                      <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 text-white rounded-full text-[8px] flex items-center justify-center font-black">
                        {a.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 group-hover:text-emerald-800 transition-colors leading-tight">
                    {a.label}
                  </span>
                  <ChevronRight size={12} className="ml-auto text-slate-300 group-hover:text-emerald-500 flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>

    </div>
  );
}
