'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Bell, AlertTriangle, ShieldCheck, Info, Clock, CheckCircle2 } from 'lucide-react';

const COLOR = '#1565c0';

interface NotifItem {
  id: number;
  judul: string;
  tipe: 'warning' | 'info' | 'security' | 'success';
  deskripsi: string;
  waktu: string;
}

const INITIAL_NOTIF: NotifItem[] = [
  {
    id: 1,
    judul: 'Data Siswa SDN 006 Perlu Diverifikasi',
    tipe: 'warning',
    deskripsi: 'Siti Aminah (Kelas 5) memerlukan verifikasi data primer sebelum diajukan ke Dapodik.',
    waktu: '22 Jul 2026, 08:30',
  },
  {
    id: 2,
    judul: 'Jadwal Workshop Literasi Digital Guru',
    tipe: 'info',
    deskripsi: 'Workshop dijadwalkan besok 23 Juli 2026 di Lab Komputer SMP Filial pukul 09.00 WITA.',
    waktu: '22 Jul 2026, 07:00',
  },
  {
    id: 3,
    judul: 'Program Chromebook Mandiri UNBK Terlambat',
    tipe: 'warning',
    deskripsi: 'Target pengadaan unit melampaui jadwal semula (Tenggat: 20 Juli 2026).',
    waktu: '21 Jul 2026, 16:45',
  },
  {
    id: 4,
    judul: 'Rekomendasi Baru DSS Pendidikan',
    tipe: 'success',
    deskripsi: 'Sistem DSS menerbitkan rekomendasi baru: Pengadaan Chromebook Mandiri di Dusun 3.',
    waktu: '20 Jul 2026, 11:30',
  },
  {
    id: 5,
    judul: 'Peringatan Keamanan Akses Data Siswa',
    tipe: 'security',
    deskripsi: 'Terdeteksi akses log ke database data siswa pada jam tidak aktif (18 Jul 2026, 23:45).',
    waktu: '19 Jul 2026, 08:00',
  },
];

export default function NotifikasiPendidikanPage() {
  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Notifikasi Pendidikan" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      <Card>
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-sm font-bold text-slate-700 uppercase">Pusat Notifikasi &amp; Peringatan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {INITIAL_NOTIF.map(n => (
            <div key={n.id} className={`p-3 border rounded-xl hover:border-blue-300 transition-all flex gap-3 items-start ${
              n.tipe === 'warning' ? 'bg-orange-50/30 border-orange-200' :
              n.tipe === 'security' ? 'bg-red-50/30 border-red-200' :
              n.tipe === 'success' ? 'bg-green-50/30 border-green-200' :
              'bg-blue-50/30 border-blue-200'
            }`}>
              <span className="text-base flex-shrink-0">
                {n.tipe === 'warning' ? '⚠️' : n.tipe === 'security' ? '🔐' : n.tipe === 'success' ? '💡' : '📢'}
              </span>
              <div className="space-y-1 flex-1">
                <p className="font-bold text-slate-800 text-xs leading-snug">{n.judul}</p>
                <p className="text-[10px] text-slate-500 leading-relaxed">{n.deskripsi}</p>
                <p className="text-[9px] text-slate-400 font-mono">{n.waktu}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
