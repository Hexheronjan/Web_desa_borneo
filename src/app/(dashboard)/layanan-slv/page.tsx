'use client';

import Link from 'next/link';
import {
  Heart, BookOpen, GraduationCap, Award, Landmark,
  MessageSquare, Star, ArrowRight, Stethoscope, ChevronRight,
  Bell, Calendar, User, History, HelpCircle, Download,
  FileText, CheckCircle, Clock, AlertCircle, ShieldAlert,
  Sliders, Activity, ShieldCheck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LayananSLVDashboard() {
  const userName = 'Pengguna Masyarakat Desa';
  const userEmail = 'masyarakat@contoh.id';

  // ─── KEY METRICS ──────────────────────────────────────────────────────────
  const keyMetrics = [
    { label: 'Layanan Diakses', value: '16 Kali', href: '/layanan-slv/riwayat-layanan', icon: Stethoscope, color: '#e53935', bg: 'bg-red-50', period: 'Periode Jan–Jun 2026' },
    { label: 'Pelatihan Diikuti', value: '7 Program', href: '/layanan-slv/pelatihan-online', icon: GraduationCap, color: '#1e88e5', bg: 'bg-blue-50', period: 'Periode Jan–Jun 2026' },
    { label: 'Sertifikat Saya', value: '3 Sertifikat', href: '/layanan-slv/sertifikasi', icon: Award, color: '#8e24aa', bg: 'bg-purple-50', period: 'Kumulatif' },
    { label: 'Kegiatan Adat Diikuti', value: '5 Kegiatan', href: '/layanan-slv/kalender-adat', icon: Landmark, color: '#f4511e', bg: 'bg-orange-50', period: 'Periode Jan–Jun 2026' },
    { label: 'Forum Diikuti', value: '4 Forum', href: '/layanan-slv/forum-desa', icon: MessageSquare, color: '#00897b', bg: 'bg-teal-50', period: 'Periode Jan–Jun 2026' },
    { label: 'Kepuasan Layanan', value: '4,7 dari 5', href: '#', icon: Star, color: '#fdd835', bg: 'bg-yellow-50', period: 'Survei Mei 2026' },
  ];

  // ─── JADWAL & KEGIATAN MENDATANG ──────────────────────────────────────────
  const jadwalMendatang = [
    { type: 'Kesehatan', color: 'bg-red-100 text-red-700 border-red-200', title: 'Posyandu Balita Bulan Juli', sub: 'Posyandu Manunggal • 08:00 WITA', tgl: '18 Jul' },
    { type: 'Pendidikan', color: 'bg-blue-100 text-blue-700 border-blue-200', title: 'Pelatihan Komputer Dasar', sub: 'Balai Desa • 09:00 WITA', tgl: '20 Jul' },
    { type: 'Budaya', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', title: 'Rapat Adat Bersama', sub: 'Rumah Betang • 13:00 WITA', tgl: '25 Jul' },
  ];

  // ─── LAYANAN POPULER ──────────────────────────────────────────────────────
  const layananPopuler = [
    { label: 'Pendaftaran Posyandu Digital', desc: '124 pengguna', href: '/layanan-slv/posyandu-digital' },
    { label: 'Pelatihan Online Desa', desc: '96 pengguna', href: '/layanan-slv/pelatihan-online' },
    { label: 'Layanan Surat Keterangan', desc: '51 pengguna', href: '/layanan-slv/layanan-publik' },
  ];

  // ─── FORUM & MUSYAWARAH ───────────────────────────────────────────────────
  const forumMusyawarah = [
    { title: 'Musyawarah Desa Bulan Juli 2026', tgl: '22 Jul 2026', badge: 'Terdaftar', color: 'bg-green-150 text-green-700 border-green-200' },
    { title: 'Forum Aspirasi Masyarakat', tgl: '15 Jul 2026', badge: 'Ikut', color: 'bg-blue-150 text-blue-700 border-blue-200' },
    { title: 'Pembahasan RKPDes 2026-2031', tgl: '10 Jul 2026', badge: 'Selesai', color: 'bg-slate-100 text-slate-600 border-slate-200' },
  ];

  // ─── INFORMASI & PENGUMUMAN ───────────────────────────────────────────────
  const informasi = [
    { title: 'Musyawarah Desa Bulan Juli 2026', tgl: '16 Jul 2026' },
    { title: 'Pembayaran Pajak PBB Desa', tgl: '15 Jul 2026' },
    { title: 'Festival Budaya Dayak 2026', tgl: '14 Jul 2026' },
  ];

  return (
    <div className="flex flex-col gap-5 pb-6">

      {/* ── WELCOME & HEADER ─────────────────────────────────────────────── */}
      <div className="flex justify-between items-start flex-wrap gap-3 border-b pb-4">
        <div>
          <h1 className="text-xl font-black text-slate-800 tracking-tight">MASYARAKAT UMUM</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Portal Informasi, Layanan, dan Partisipasi Desa | Smart Living Village</p>
        </div>
        <div className="text-right text-[11px] text-slate-400 font-semibold bg-slate-50 p-2 border rounded-xl flex items-center gap-2">
          <span>Periode 2026</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>Kamis, 16 Juli 2026</span>
          <span className="w-1 h-1 bg-slate-300 rounded-full" />
          <span>10:23 WIB</span>
        </div>
      </div>

      {/* ── BANNER UTAMA ─────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm bg-emerald-950 text-white min-h-[160px] flex flex-col justify-center px-6 md:px-10 py-6">
        <div
          className="absolute inset-0 z-0 opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-900/90 to-emerald-800/50 z-0" />
        
        <div className="relative z-10 space-y-3">
          <p className="text-xs font-bold text-emerald-300 tracking-wider">Selamat datang,</p>
          <h2 className="text-xl md:text-2xl font-black leading-tight tracking-tight text-white">
            Portal Masyarakat Smart Living Village 👋
          </h2>
          <p className="text-xs md:text-sm text-emerald-100 max-w-2xl font-medium leading-relaxed">
            Akses layanan kesehatan, pendidikan, budaya, dan partisipasi desa dalam satu pintu. Bersama membangun desa yang sehat, cerdas, dan berbudaya.
          </p>
          
          <div className="flex flex-wrap gap-2 text-[10px] font-bold text-emerald-300 pt-1">
            <span className="px-2.5 py-1 bg-emerald-800/80 rounded-full border border-emerald-600/30">SDG Desa 3 — Kesehatan</span>
            <span className="px-2.5 py-1 bg-emerald-800/80 rounded-full border border-emerald-600/30">SDG Desa 4 — Pendidikan</span>
            <span className="px-2.5 py-1 bg-emerald-800/80 rounded-full border border-emerald-600/30">SDG Desa 18 — Kelembagaan &amp; Budaya</span>
          </div>
        </div>
      </div>

      {/* ── KEY METRICS (6 Cards) ────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {keyMetrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className="hover:shadow-md transition-shadow border border-slate-200 bg-white">
              <CardContent className="p-4 flex flex-col justify-between h-full gap-2.5">
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
                  <p className="text-[8px] text-slate-405 font-bold mt-1 leading-none">{m.period}</p>
                </div>
                <Link href={m.href} className="text-[10px] font-black text-slate-400 hover:text-emerald-700 flex items-center gap-0.5 transition-colors">
                  Lihat Detail <ChevronRight size={10} />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* ── AKSI CEPAT (4 Buttons Grid) ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Ajukan Layanan', desc: 'Gunakan layanan desa', href: '/layanan-slv/layanan-publik', color: 'hover:bg-red-50 hover:border-red-200' },
          { label: 'Sampaikan Aspirasi', desc: 'Suarakan pendapat Anda', href: '/layanan-slv/aspirasi-pengaduan', color: 'hover:bg-blue-50 hover:border-blue-200' },
          { label: 'Lihat Status Usulan', desc: 'Pantau usulan Anda', href: '/layanan-slv/status-usulan', color: 'hover:bg-purple-50 hover:border-purple-200' },
          { label: 'Lihat Jadwal Desa', desc: 'Agenda &amp; kegiatan desa', href: '/layanan-slv/agenda-kegiatan', color: 'hover:bg-emerald-50 hover:border-emerald-200' },
        ].map((act, i) => (
          <Link
            key={i}
            href={act.href}
            className={`p-3.5 bg-white border border-slate-200 rounded-2xl flex flex-col justify-between gap-1 shadow-sm transition-all group ${act.color}`}
          >
            <p className="text-xs font-black text-slate-800 group-hover:text-indigo-700 transition-colors">{act.label}</p>
            <p className="text-[10px] text-slate-400 font-semibold">{act.desc}</p>
          </Link>
        ))}
      </div>

      {/* ── TWO COLUMN LAYOUT ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-xs">

        {/* KOLOM KIRI: Jadwal & Status Usulan */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Jadwal & Kegiatan Mendatang */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-805 uppercase tracking-wider">Jadwal &amp; Kegiatan Mendatang</CardTitle>
              <Link href="/layanan-slv/agenda-kegiatan" className="text-[10px] font-bold text-emerald-700 hover:underline">
                Lihat Semua
              </Link>
            </CardHeader>
            <CardContent className="space-y-3.5 pb-4 px-4">
              {jadwalMendatang.map((j, i) => (
                <div key={i} className="flex items-center gap-3.5 pb-3 border-b last:border-0 last:pb-0">
                  <div className="text-center bg-slate-50 border p-2 rounded-xl min-w-[45px]">
                    <p className="text-[10px] font-bold text-slate-500 leading-none">2026</p>
                    <p className="text-xs font-black text-slate-805 leading-none mt-1">{j.tgl}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${j.color}`}>{j.type}</span>
                    <p className="font-bold text-slate-800 mt-1 leading-snug">{j.title}</p>
                    <p className="text-[9px] text-slate-450 mt-0.5 font-semibold">{j.sub}</p>
                  </div>
                  <span className="text-[9px] text-green-700 font-bold bg-green-50 px-2 py-0.5 rounded border border-green-200">Terdaftar</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Status Usulan Saya */}
          <Card>
            <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
              <CardTitle className="text-xs font-bold text-slate-805 uppercase tracking-wider">Status Usulan Saya</CardTitle>
              <Link href="/layanan-slv/status-usulan" className="text-[10px] font-bold text-emerald-700 hover:underline">
                Lihat Semua Usulan
              </Link>
            </CardHeader>
            <CardContent className="pb-4 px-4 space-y-4">
              <div className="grid grid-cols-5 gap-1.5 text-center font-bold text-[10px]">
                {[
                  { label: 'Baru', val: '2', color: 'bg-slate-100 text-slate-700 border-slate-200' },
                  { label: 'Diperiksa', val: '1', color: 'bg-orange-50 text-orange-700 border-orange-200' },
                  { label: 'Dibahas', val: '1', color: 'bg-purple-50 text-purple-700 border-purple-200' },
                  { label: 'Diproses', val: '1', color: 'bg-blue-50 text-blue-700 border-blue-200' },
                  { label: 'Selesai', val: '1', color: 'bg-green-50 text-green-700 border-green-200' },
                ].map((st, i) => (
                  <div key={i} className={`p-2 border rounded-xl ${st.color}`}>
                    <p className="text-xs font-black">{st.val}</p>
                    <p className="text-[8px] uppercase mt-0.5 tracking-wide leading-none">{st.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400 font-semibold border-t pt-2.5">
                <span>Total: 6 Usulan</span>
                <span>Pembaruan terakhir: Hari ini, 10:20 WIB</span>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* KOLOM KANAN: Layanan Populer, Forum & Musyawarah, Informasi */}
        <div className="space-y-4">

          {/* Layanan Populer */}
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-805 uppercase tracking-wider">Layanan Populer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 pb-4 px-4">
              {layananPopuler.map((lp, i) => (
                <Link
                  key={i}
                  href={lp.href}
                  className="flex justify-between items-center p-2.5 bg-slate-50 border rounded-xl hover:border-indigo-300 hover:bg-slate-100/50 transition-all group"
                >
                  <span className="font-bold text-slate-800 group-hover:text-indigo-700">{lp.label}</span>
                  <span className="text-[9px] text-slate-450 font-semibold">{lp.desc}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Forum & Musyawarah */}
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-805 uppercase tracking-wider">Forum &amp; Musyawarah</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4 px-4">
              {forumMusyawarah.map((f, i) => (
                <div key={i} className="flex justify-between items-center gap-2">
                  <div>
                    <p className="font-bold text-slate-800 leading-snug">{f.title}</p>
                    <p className="text-[9px] text-slate-450 mt-0.5">{f.tgl}</p>
                  </div>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border flex-shrink-0 ${f.color}`}>{f.badge}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Informasi & Pengumuman */}
          <Card>
            <CardHeader className="py-3 px-4">
              <CardTitle className="text-xs font-bold text-slate-805 uppercase tracking-wider">Informasi &amp; Pengumuman</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 pb-4 px-4">
              {informasi.map((info, i) => (
                <div key={i} className="flex justify-between items-start gap-2 pb-2.5 border-b last:border-0 last:pb-0">
                  <p className="font-bold text-slate-800 leading-snug">{info.title}</p>
                  <span className="text-[9px] text-slate-450 font-semibold flex-shrink-0">{info.tgl}</span>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </div>

      {/* ── PRIVACY BANNER & DATA ADVISORY (Footer) ──────────────────────── */}
      <Card className="border border-slate-200 shadow-none">
        <CardContent className="p-3.5 flex justify-between items-center flex-wrap gap-2 text-[10px]">
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0" />
            <p>🔒 <strong>Privasi Anda Dilindungi.</strong> Data pribadi, kesehatan, dan budaya yang bersifat terbatas hanya diakses sesuai hak akses dan persetujuan Anda.</p>
          </div>
          <span className="text-slate-400 italic font-semibold">Catatan: Data yang ditampilkan adalah data simulasi terkendali.</span>
        </CardContent>
      </Card>

    </div>
  );
}
