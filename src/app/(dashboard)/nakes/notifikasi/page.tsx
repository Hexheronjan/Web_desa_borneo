'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bell, CheckCircle2, AlertTriangle, Info, Clock, ShieldAlert, Calendar, FileText, BarChart2, RefreshCw } from 'lucide-react';

const CLR = '#0369a1';

type NotifType = 'warning' | 'info' | 'success' | 'security';

interface Notif {
  id: number;
  tipe: NotifType;
  judul: string;
  deskripsi: string;
  waktu: string;
  sumber: string;
  prioritas: 'Tinggi' | 'Sedang' | 'Rendah';
  status: 'Belum Dibaca' | 'Dibaca' | 'Ditindaklanjuti';
  penangungJawab: string;
}

const NOTIFIKASI: Notif[] = [
  {
    id: 1,
    tipe: 'warning',
    judul: 'Data Posyandu Juni 2026 Perlu Diverifikasi',
    deskripsi: '28 rekaman data Posyandu Juni 2026 belum diverifikasi. Batas waktu verifikasi: 25 Juli 2026.',
    waktu: '22 Jul 2026, 08:15',
    sumber: 'Sistem Posyandu Digital',
    prioritas: 'Tinggi',
    status: 'Belum Dibaca',
    penangungJawab: 'Tenaga Kesehatan',
  },
  {
    id: 2,
    tipe: 'info',
    judul: 'Jadwal Posyandu Balita — 25 Juli 2026',
    deskripsi: 'Posyandu Balita dijadwalkan Jumat, 25 Juli 2026 pukul 08.00–12.00 di Balai Dusun 2.',
    waktu: '21 Jul 2026, 14:00',
    sumber: 'Kalender Kesehatan',
    prioritas: 'Sedang',
    status: 'Dibaca',
    penangungJawab: 'Kader Posyandu',
  },
  {
    id: 3,
    tipe: 'warning',
    judul: 'Program Sweeping Imunisasi Melewati Jadwal',
    deskripsi: 'Sweeping imunisasi yang dijadwalkan 20 Jul 2026 belum dilaksanakan. 4 bayi masih belum IDL.',
    waktu: '21 Jul 2026, 09:30',
    sumber: 'Program Kesehatan Desa',
    prioritas: 'Tinggi',
    status: 'Belum Dibaca',
    penangungJawab: 'Bidan Desa',
  },
  {
    id: 4,
    tipe: 'info',
    judul: 'Rekomendasi DSS Baru: Penambahan Jadwal Posyandu Lansia',
    deskripsi: 'Sistem DSS menghasilkan rekomendasi baru untuk menambah frekuensi Posyandu Lansia menjadi 2x per bulan.',
    waktu: '20 Jul 2026, 16:45',
    sumber: 'DSS Rekomendasi Kesehatan',
    prioritas: 'Sedang',
    status: 'Belum Dibaca',
    penangungJawab: 'Tenaga Kesehatan',
  },
  {
    id: 5,
    tipe: 'success',
    judul: 'Permintaan Laporan Bulanan Juli Diterima',
    deskripsi: 'Kepala Desa telah meminta laporan kesehatan bulanan Juli 2026. Batas waktu penyerahan: 31 Juli 2026.',
    waktu: '19 Jul 2026, 10:00',
    sumber: 'Sistem Laporan',
    prioritas: 'Sedang',
    status: 'Ditindaklanjuti',
    penangungJawab: 'Tenaga Kesehatan',
  },
  {
    id: 6,
    tipe: 'security',
    judul: 'Peringatan Keamanan: Akses Data di Luar Jam Kerja',
    deskripsi: 'Terdeteksi akses ke data kesehatan desa pada 18 Jul 2026 pukul 23:45. Harap verifikasi jika bukan Anda.',
    waktu: '19 Jul 2026, 07:00',
    sumber: 'Sistem Keamanan Akses',
    prioritas: 'Tinggi',
    status: 'Belum Dibaca',
    penangungJawab: 'Administrator Sistem',
  },
  {
    id: 7,
    tipe: 'warning',
    judul: 'Kelengkapan Data Kesehatan Rendah — Dusun 3',
    deskripsi: 'Data kesehatan Dusun 3 hanya 62% lengkap. 15 rekaman memerlukan pembaruan dan 3 rekaman duplikat terdeteksi.',
    waktu: '18 Jul 2026, 11:00',
    sumber: 'Pemantauan Kualitas Data',
    prioritas: 'Sedang',
    status: 'Belum Dibaca',
    penangungJawab: 'Tenaga Kesehatan',
  },
];

const TIPE_CONFIG: Record<NotifType, { icon: typeof Bell; bgCard: string; borderCard: string; badge: string; textBadge: string }> = {
  warning: { icon: AlertTriangle, bgCard: 'bg-orange-50/40', borderCard: 'border-orange-200', badge: 'bg-orange-100 text-orange-700 border-orange-300', textBadge: '⚠️' },
  info: { icon: Info, bgCard: 'bg-blue-50/40', borderCard: 'border-blue-200', badge: 'bg-blue-100 text-blue-700 border-blue-300', textBadge: 'ℹ️' },
  success: { icon: CheckCircle2, bgCard: 'bg-green-50/40', borderCard: 'border-green-200', badge: 'bg-green-100 text-green-700 border-green-300', textBadge: '✅' },
  security: { icon: ShieldAlert, bgCard: 'bg-red-50/40', borderCard: 'border-red-200', badge: 'bg-red-100 text-red-700 border-red-300', textBadge: '🔐' },
};

const PRIORITAS_COLOR: Record<string, string> = {
  'Tinggi': 'text-red-700 bg-red-50 border-red-200',
  'Sedang': 'text-amber-700 bg-amber-50 border-amber-200',
  'Rendah': 'text-green-700 bg-green-50 border-green-200',
};

export default function NotifikasiNakesPage() {
  const [filter, setFilter] = useState<'Semua' | 'Belum Dibaca' | 'Dibaca' | 'Ditindaklanjuti'>('Semua');
  const [tipeFilter, setTipeFilter] = useState<'Semua' | NotifType>('Semua');

  const belumDibaca = NOTIFIKASI.filter(n => n.status === 'Belum Dibaca').length;

  const filtered = NOTIFIKASI.filter(n => {
    const statusMatch = filter === 'Semua' || n.status === filter;
    const tipeMatch = tipeFilter === 'Semua' || n.tipe === tipeFilter;
    return statusMatch && tipeMatch;
  });

  return (
    <div className="flex flex-col gap-4 pb-8 text-xs">

      {/* HEADER */}
      <div className="border-b pb-3 flex justify-between items-center flex-wrap gap-2">
        <div>
          <h1 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <Bell size={20} className="text-sky-600" /> Notifikasi
          </h1>
          <p className="text-[10px] text-slate-500 font-semibold mt-0.5">Tenaga Kesehatan — Pusat Notifikasi dan Peringatan Kesehatan</p>
        </div>
        {belumDibaca > 0 && (
          <div className="px-3 py-1.5 bg-red-600 text-white rounded-full font-black text-sm">
            {belumDibaca} Belum Dibaca
          </div>
        )}
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Belum Dibaca', val: NOTIFIKASI.filter(n => n.status === 'Belum Dibaca').length, color: '#dc2626' },
          { label: 'Prioritas Tinggi', val: NOTIFIKASI.filter(n => n.prioritas === 'Tinggi').length, color: '#ea580c' },
          { label: 'Keamanan Akses', val: NOTIFIKASI.filter(n => n.tipe === 'security').length, color: '#7c3aed' },
          { label: 'Ditindaklanjuti', val: NOTIFIKASI.filter(n => n.status === 'Ditindaklanjuti').length, color: '#16a34a' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-3xl font-black" style={{ color: s.color }}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* FILTER */}
      <Card>
        <CardHeader className="py-2.5 border-b flex flex-row items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Semua Notifikasi ({filtered.length})</CardTitle>
          <div className="flex gap-1 flex-wrap">
            {(['Semua', 'Belum Dibaca', 'Dibaca', 'Ditindaklanjuti'] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)}
                className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold transition-all ${filter === f ? 'bg-sky-700 text-white border-sky-700' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-400'}`}>
                {f}
              </button>
            ))}
            <div className="w-px bg-slate-200 mx-1" />
            {(['Semua', 'warning', 'info', 'success', 'security'] as const).map(t => (
              <button key={t} onClick={() => setTipeFilter(t)}
                className={`text-[10px] px-2.5 py-1 rounded-lg border font-bold transition-all capitalize ${tipeFilter === t ? 'bg-slate-700 text-white border-slate-700' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
                {t === 'Semua' ? 'Semua Tipe' : t === 'warning' ? '⚠️ Peringatan' : t === 'info' ? 'ℹ️ Info' : t === 'success' ? '✅ Laporan' : '🔐 Keamanan'}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-8 text-slate-400 font-semibold">Tidak ada notifikasi untuk filter ini.</div>
          )}
          {filtered.map(n => {
            const conf = TIPE_CONFIG[n.tipe];
            const Icon = conf.icon;
            return (
              <div key={n.id} className={`border rounded-xl p-3 transition-all ${conf.bgCard} ${conf.borderCard} ${n.status === 'Belum Dibaca' ? 'ring-2 ring-offset-1 ring-sky-200' : ''}`}>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <div className="flex items-start gap-2 flex-1">
                    <Icon size={14} className="flex-shrink-0 mt-0.5" style={{ color: n.tipe === 'warning' ? '#d97706' : n.tipe === 'security' ? '#7c3aed' : n.tipe === 'success' ? '#16a34a' : '#0369a1' }} />
                    <div className="flex-1">
                      <p className={`font-bold leading-snug ${n.status === 'Belum Dibaca' ? 'text-slate-900' : 'text-slate-700'}`}>{n.judul}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5 leading-relaxed">{n.deskripsi}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${PRIORITAS_COLOR[n.prioritas]}`}>{n.prioritas}</span>
                    {n.status === 'Belum Dibaca' && (
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-red-600 text-white">Baru</span>
                    )}
                  </div>
                </div>
                <div className="flex justify-between items-center flex-wrap gap-2 text-[9px] text-slate-400">
                  <div className="flex gap-3">
                    <span><strong>Sumber:</strong> {n.sumber}</span>
                    <span><strong>PJ:</strong> {n.penangungJawab}</span>
                  </div>
                  <span className="font-mono">{n.waktu}</span>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

    </div>
  );
}
