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
  Activity,
  ArrowRight,
  Shield,
  Stethoscope,
  ChevronRight,
  PlusCircle,
  CheckCircle,
  Bell,
  Calendar,
  AlertTriangle,
  Users,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function PenggunaLayananDashboard() {
  const { data: session } = useSession();
  const userName = session?.user?.name ?? 'Andi Saputra';

  // ─── DATA MOCK SESUAI DENGAN SCREENSHOT ──────────────────────────────────────────
  
  const keyMetrics = [
    { label: 'Layanan Kesehatan Diakses', value: '12 Kali', desc: 'Lihat Detail', href: '/sehat/monitoring', icon: Heart, color: '#e53935', bg: 'bg-red-50' },
    { label: 'Pelatihan Diikuti', value: '8 Program', desc: 'Lihat Detail', href: '/belajar/platform-pembelajaran', icon: GraduationCap, color: '#1e88e5', bg: 'bg-blue-50' },
    { label: 'Sertifikat Diperoleh', value: '4 Sertifikat', desc: 'Lihat Detail', href: '/belajar/laporan-pembelajaran', icon: Award, color: '#8e24aa', bg: 'bg-purple-50' },
    { label: 'Kegiatan Adat Diikuti', value: '6 Kegiatan', desc: 'Lihat Detail', href: '/adat/kalender-adat', icon: Landmark, color: '#f4511e', bg: 'bg-orange-50' },
    { label: 'Forum Desa Diikuti', value: '5 Kegiatan', desc: 'Lihat Detail', href: '/warga/aspirasi', icon: MessageSquare, color: '#00897b', bg: 'bg-teal-50' },
    { label: 'Tingkat Kepuasan Layanan', value: '4,6 dari 5', desc: 'Lihat Detail', href: '#rating', icon: Star, color: '#fdd835', bg: 'bg-yellow-50' },
  ];

  const ringkasanLayanan = [
    { title: 'SDGs 3', subtitle: 'Desa Sehat', val: '12', label: 'Layanan Diakses', trend: '↑ 20% dari bulan lalu', icon: Heart, color: '#2e7d32', bg: '#e8f5e9' },
    { title: 'SDGs 4', subtitle: 'Pendidikan Berkualitas', val: '8', label: 'Program Diikuti', trend: '↑ 15% dari bulan lalu', icon: GraduationCap, color: '#1565c0', bg: '#e3f2fd' },
    { title: 'SDGs 18', subtitle: 'Kelembagaan & Budaya', val: '6', label: 'Kegiatan Diikuti', trend: '↑ 10% dari bulan lalu', icon: Landmark, color: '#d84315', bg: '#fbe9e7' },
  ];

  const aktivitasTerbaru = [
    { title: 'Mengikuti Posyandu Balita', sub: 'Posyandu Digital', tgl: '22 Mei 2025, 09:00', icon: Heart, color: 'text-red-600 bg-red-100' },
    { title: 'Menyelesaikan Modul "Literasi Digital Dasar"', sub: 'Pelatihan Online', tgl: '21 Mei 2025, 14:30', icon: GraduationCap, color: 'text-blue-600 bg-blue-100' },
    { title: 'Mengikuti Musyawarah Desa', sub: 'Musyawarah Desa', tgl: '21 Mei 2025, 10:00', icon: Landmark, color: 'text-orange-600 bg-orange-100' },
    { title: 'Mengikuti Kelas "Pengelolaan Keuangan Keluarga"', sub: 'Kelas Desa', tgl: '20 Mei 2025, 16:00', icon: BookOpen, color: 'text-purple-600 bg-purple-100' },
    { title: 'Mengikuti Kegiatan Adat Batagak Penghulu', sub: 'Informasi Adat', tgl: '19 Mei 2025, 11:00', icon: Landmark, color: 'text-yellow-600 bg-yellow-100' },
  ];

  const progressBelajar = [
    { label: 'Literasi Digital Dasar', val: 75, status: 'Modul Dalam Proses' },
    { label: 'Pengelolaan Keuangan Keluarga', val: 100, status: 'Modul Selesai' },
  ];

  const monitoringKesehatan = [
    { kategori: 'Balita', detail: '2 Anak', status: 'Sehat', color: 'bg-blue-100 text-blue-800' },
    { kategori: 'Ibu Hamil', detail: '1 Orang', status: 'Sehat', color: 'bg-pink-100 text-pink-800' },
    { kategori: 'Lansia', detail: '2 Orang', status: 'Sehat', color: 'bg-yellow-100 text-yellow-800' },
    { kategori: 'Imunisasi', detail: 'Lengkap', status: 'Terakhir: 20 Mei 2025', color: 'bg-green-100 text-green-800' },
  ];

  const notifikasi = [
    { id: 1, title: 'Jadwal Posyandu Balita', desc: '24 Mei 2025', isNew: true },
    { id: 2, title: 'Pelatihan Digital Marketing Desa', desc: '25 Mei 2025', isNew: true },
    { id: 3, title: 'Musyawarah Desa (Musrenbang)', desc: '28 Mei 2025', isNew: true },
    { id: 4, title: 'Kelas Literasi Keuangan', desc: '30 Mei 2025', isNew: true },
    { id: 5, title: 'Imunisasi Rutin Bulan Mei', desc: 'Jadwal di Posyandu', isNew: true },
  ];

  const aksesCepat = [
    { label: 'Posyandu Digital', href: '/sehat/posyandu', icon: Heart, color: 'text-red-600' },
    { label: 'Kelas Desa', href: '/belajar/kelas-virtual', icon: BookOpen, color: 'text-purple-600' },
    { label: 'Pelatihan Online', href: '/belajar/platform-pembelajaran', icon: GraduationCap, color: 'text-blue-600' },
    { label: 'Kalender Adat', href: '/adat/kalender-adat', icon: Calendar, color: 'text-orange-600' },
    { label: 'Telekonsultasi', href: '/sehat/telemedicine', icon: Stethoscope, color: 'text-emerald-600' },
    { label: 'Forum Desa', href: '/warga/aspirasi', icon: MessageSquare, color: 'text-cyan-600' },
  ];

  const kalender = [
    { tgl: '24', bln: 'MEI', title: 'Posyandu Balita', sub: '09:00 - 11:00 WIB', category: 'Kesehatan', bg: 'bg-green-100 text-green-700' },
    { tgl: '25', bln: 'MEI', title: 'Pelatihan Digital Marketing Desa', sub: '09:00 - 12:00 WIB', category: 'Pendidikan', bg: 'bg-blue-100 text-blue-700' },
    { tgl: '28', bln: 'MEI', title: 'Musyawarah Desa (Musrenbang)', sub: '09:00 - 12:00 WIB', category: 'Kelembagaan', bg: 'bg-orange-100 text-orange-700' },
  ];

  const ratings = [
    { star: 5, pct: 72 },
    { star: 4, pct: 21 },
    { star: 3, pct: 5 },
    { star: 2, pct: 1 },
    { star: 1, pct: 1 },
  ];

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* ── HEADER TITLE ────────────────────────────────────────── */}
      <div>
        <h2 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
          Selamat datang, Pengguna Layanan Smart Living Village 👋
        </h2>
        <p className="text-xs md:text-sm text-slate-600 font-medium">
          Manfaatkan layanan desa untuk hidup sehat, belajar bermutu dan lestarikan budaya.
        </p>
      </div>

      {/* ── BANNER UTAMA ────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg bg-emerald-950 text-white min-h-[160px] flex flex-col justify-center px-6 md:px-12 py-8">
        {/* Background Photo */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504197832061-98356e3dcdcf?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Dark Overlay */}
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
          <div className="flex gap-4 text-[10px] md:text-xs font-bold text-emerald-300 pt-1">
            <span>SDGs 3 • Desa Sehat</span>
            <span>SDGs 4 • Pendidikan Berkualitas</span>
            <span>SDGs 18 • Kelembagaan & Budaya</span>
          </div>
        </div>
      </div>

      {/* ── STATS / KEY METRICS ────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {keyMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2">
                <div className="flex items-center justify-between">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${m.bg}`}>
                    <Icon size={16} style={{ color: m.color }} />
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wide leading-tight">
                    {m.label}
                  </p>
                  <p className="text-xl font-black text-slate-800 mt-1 leading-none">
                    {m.value}
                  </p>
                </div>
                <Link href={m.href} className="text-[10px] font-black text-slate-400 hover:text-emerald-700 flex items-center gap-0.5 mt-2 transition-colors">
                  {m.desc} <ChevronRight size={10} />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── DUA KOLOM DASHBOARD ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI (LEBAR) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Ringkasan Pemanfaatan Layanan */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-sm font-bold text-slate-800">
                Ringkasan Pemanfaatan Layanan
              </CardTitle>
              <Link href="/pengguna-layanan/riwayat-layanan" className="text-xs font-bold text-emerald-700 hover:underline">
                Lihat Semua
              </Link>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 pb-5">
              {ringkasanLayanan.map((l, i) => {
                const Icon = l.icon;
                return (
                  <div key={i} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between gap-2 shadow-sm" style={{ backgroundColor: '#ffffff' }}>
                    <div className="space-y-1">
                      <span className="text-[8px] font-black uppercase tracking-widest block" style={{ color: l.color }}>
                        {l.title}
                      </span>
                      <span className="text-[10px] font-bold text-slate-500 block leading-tight">
                        {l.subtitle}
                      </span>
                      <p className="text-2xl font-black text-slate-800 pt-1">
                        {l.val}
                      </p>
                      <p className="text-[9px] font-semibold text-slate-400 leading-tight">
                        {l.label}
                      </p>
                      <span className="text-[8px] font-extrabold text-emerald-600 block pt-1">
                        {l.trend}
                      </span>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: l.bg }}>
                      <Icon size={20} style={{ color: l.color }} />
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Aktivitas Terbaru */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-sm font-bold text-slate-800">
                Aktivitas Terbaru
              </CardTitle>
              <Link href="/pengguna-layanan/riwayat-layanan" className="text-xs font-bold text-emerald-700 hover:underline">
                Lihat Semua
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {aktivitasTerbaru.map((act, i) => {
                const Icon = act.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${act.color}`}>
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate leading-tight">
                        {act.title}
                      </p>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {act.sub}
                      </span>
                    </div>
                    <span className="text-[9px] font-semibold text-slate-400 flex-shrink-0">
                      {act.tgl}
                    </span>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Progress Pembelajaran & Monitoring Kesehatan */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Progress Pembelajaran */}
            <Card>
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-800">
                    Progress Pembelajaran
                  </CardTitle>
                  <Link href="/belajar/platform-pembelajaran" className="text-xs font-bold text-emerald-700 hover:underline">
                    Lihat Semua
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {progressBelajar.map((p, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                        <span>{p.label}</span>
                        <span>{p.val}%</span>
                      </div>
                      <Progress value={p.val} className="h-1.5 bg-slate-100" />
                      <span className="text-[8px] font-extrabold text-slate-400 uppercase tracking-widest block mt-0.5">
                        {p.status}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-slate-100 pt-3 flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wide leading-tight">
                      Sertifikat Terbaru
                    </p>
                    <p className="text-xs font-black text-slate-800 truncate leading-snug">
                      Literasi Digital Dasar
                    </p>
                    <span className="text-[8px] text-slate-400 font-semibold block leading-none">
                      Diperoleh: 21 Mei 2025
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Monitoring Kesehatan Keluarga */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between py-4">
                <CardTitle className="text-sm font-bold text-slate-800">
                  Monitoring Kesehatan Keluarga
                </CardTitle>
                <Link href="/sehat/monitoring" className="text-xs font-bold text-emerald-700 hover:underline">
                  Detail
                </Link>
              </CardHeader>
              <CardContent className="space-y-3">
                {monitoringKesehatan.map((h, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-150 bg-slate-50/50">
                    <div>
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {h.kategori}
                      </p>
                      <span className="text-[9px] text-slate-400 font-medium">
                        {h.detail}
                      </span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${h.color}`}>
                      ● {h.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

          </div>

        </div>

        {/* KOLOM KANAN (RAMPING) */}
        <div className="space-y-6">
          
          {/* Notifikasi */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-sm font-bold text-slate-800">
                Notifikasi
              </CardTitle>
              <Link href="/warga/notifikasi-desa" className="text-xs font-bold text-emerald-700 hover:underline">
                Lihat Semua
              </Link>
            </CardHeader>
            <CardContent className="space-y-3.5">
              {notifikasi.map((n) => (
                <div key={n.id} className="flex gap-3 items-start">
                  <div className="w-7 h-7 bg-red-50 text-red-500 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bell size={13} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 leading-snug">
                      {n.title}
                    </p>
                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">
                      {n.desc}
                    </span>
                  </div>
                  {n.isNew && (
                    <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded text-[8px] font-black uppercase tracking-wider flex-shrink-0">
                      Baru
                    </span>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Akses Cepat */}
          <Card>
            <CardHeader className="py-4">
              <CardTitle className="text-sm font-bold text-slate-800">
                Akses Cepat
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {aksesCepat.map((a, i) => {
                const Icon = a.icon;
                return (
                  <Link
                    key={i}
                    href={a.href}
                    className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2 hover:bg-slate-100/70 hover:border-slate-300 transition-all text-left shadow-sm"
                  >
                    <Icon size={14} className={a.color} />
                    <span className="text-[10px] font-bold text-slate-700 leading-tight">
                      {a.label}
                    </span>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Kalender Smart Living Village */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-sm font-bold text-slate-800">
                Kalender Smart Living Village
              </CardTitle>
              <Link href="/adat/kalender-adat" className="text-xs font-bold text-emerald-700 hover:underline">
                Lihat Kalender
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {kalender.map((k, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-slate-200 rounded-lg flex flex-col items-center justify-center flex-shrink-0 bg-slate-50">
                    <span className="text-xs font-black text-slate-800 leading-none">{k.tgl}</span>
                    <span className="text-[7px] font-black text-slate-400 block mt-0.5 leading-none">{k.bln}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate leading-snug">
                      {k.title}
                    </p>
                    <span className="text-[9px] text-slate-400 font-medium block leading-none mt-0.5">
                      {k.sub}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider flex-shrink-0 ${k.bg}`}>
                    {k.category}
                  </span>
                </div>
              ))}
              <Link
                href="/adat/kalender-adat"
                className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold border border-slate-200 rounded-lg text-center text-[10px] flex items-center justify-center gap-1.5 transition-all mt-2"
              >
                Lihat Kalender Lengkap <ArrowRight size={10} />
              </Link>
            </CardContent>
          </Card>

          {/* Tingkat Kepuasan Layanan */}
          <Card id="rating">
            <CardHeader className="flex flex-row items-center justify-between py-4">
              <CardTitle className="text-sm font-bold text-slate-800">
                Tingkat Kepuasan Layanan
              </CardTitle>
              <Link href="/warga/survey-qol" className="text-xs font-bold text-emerald-700 hover:underline">
                Detail
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-500 bg-emerald-50 flex flex-col items-center justify-center flex-shrink-0">
                  <span className="text-lg font-black text-slate-800 leading-none">4,6</span>
                  <span className="text-[7px] font-bold text-slate-500 mt-1 leading-none">dari 5</span>
                </div>
                <div className="flex-1 space-y-1">
                  {ratings.map((r) => (
                    <div key={r.star} className="flex items-center gap-2 text-[9px] font-bold text-slate-500">
                      <span className="w-2">{r.star}★</span>
                      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: `${r.pct}%` }} />
                      </div>
                      <span className="w-6 text-right">{r.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-medium text-center">
                Total 128 Ulasan dari Warga & Pengguna Layanan
              </p>
            </CardContent>
          </Card>

        </div>

      </div>

      {/* ── BOTTOM PROMO BANNERS (3 KOLOM) ────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kesehatan */}
        <Card className="overflow-hidden relative bg-emerald-50 border border-emerald-100 hover:shadow-md transition-shadow">
          <div className="p-5 flex flex-col justify-between h-full gap-4">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Heart size={16} />
              </div>
              <h4 className="text-sm font-bold text-emerald-950">Jaga Kesehatan Keluarga</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Akses layanan kesehatan desa untuk hidup sehat dan produktif.
              </p>
            </div>
            <Link
              href="/sehat/posyandu"
              className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg text-center text-xs flex items-center justify-center gap-1 shadow-sm transition-colors mt-2"
            >
              Akses Layanan Kesehatan <ArrowRight size={12} />
            </Link>
          </div>
        </Card>

        {/* Pendidikan */}
        <Card className="overflow-hidden relative bg-blue-50 border border-blue-100 hover:shadow-md transition-shadow">
          <div className="p-5 flex flex-col justify-between h-full gap-4">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                <GraduationCap size={16} />
              </div>
              <h4 className="text-sm font-bold text-blue-950">Tingkatkan Kompetensi</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Ikuti pelatihan dan kelas virtual masa depan yang lebih baik.
              </p>
            </div>
            <Link
              href="/belajar/e-learning"
              className="py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-center text-xs flex items-center justify-center gap-1 shadow-sm transition-colors mt-2"
            >
              Akses Layanan Pendidikan <ArrowRight size={12} />
            </Link>
          </div>
        </Card>

        {/* Budaya */}
        <Card className="overflow-hidden relative bg-orange-50 border border-orange-100 hover:shadow-md transition-shadow">
          <div className="p-5 flex flex-col justify-between h-full gap-4">
            <div className="space-y-1.5">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center">
                <Landmark size={16} />
              </div>
              <h4 className="text-sm font-bold text-orange-950">Lestarikan Budaya Desa</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Kenali, pelajari dan ikut berpartisipasi dalam kegiatan adat dan budaya.
              </p>
            </div>
            <Link
              href="/adat/kelembagaan-adat"
              className="py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg text-center text-xs flex items-center justify-center gap-1 shadow-sm transition-colors mt-2"
            >
              Lestarikan Budaya Adat <ArrowRight size={12} />
            </Link>
          </div>
        </Card>

      </div>
    </div>
  );
}
