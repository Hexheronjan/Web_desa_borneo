'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Calendar, Clock, MapPin, User, Tag, HelpCircle, Info
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface AgendaItem {
  id: string;
  nama: string;
  waktu: string;
  lokasi: string;
  pj: string;
  kategori: 'Musyawarah' | 'Kesehatan' | 'Budaya' | 'Pendidikan' | 'Pembangunan';
  status: 'Akan Datang' | 'Sedang Berlangsung' | 'Selesai';
}

const MOCK_AGENDA: AgendaItem[] = [
  { id: 'AG-01', nama: 'Musdes Penetapan Rencana Kerja Pemerintah Desa (RKPDes) 2027', waktu: 'Kamis, 25 Juli 2026, 09:00 WITA - Selesai', lokasi: 'Balai Desa Lung Anai', pj: 'Sekdes Herman', kategori: 'Musyawarah', status: 'Akan Datang' },
  { id: 'AG-02', nama: 'Festival Budaya Dayak & Ritual Panen Adat', waktu: 'Sabtu-Minggu, 1-2 Agustus 2026', lokasi: 'Halaman Huma Betang Adat', pj: 'Lembaga Adat', kategori: 'Budaya', status: 'Akan Datang' },
  { id: 'AG-03', nama: 'Posyandu Ibu & Balita Serentak RT 01-04', waktu: 'Senin, 20 Juli 2026, 08:00 - 12:00 WITA', lokasi: 'Gedung Posyandu Utama', pj: 'Bidan Rina', kategori: 'Kesehatan', status: 'Akan Datang' },
  { id: 'AG-04', nama: 'Pelatihan Literasi Digital & Pembuatan Akun SID', waktu: 'Kamis, 23 Juli 2026, 14:00 WITA', lokasi: 'Ruang TIK Balai Desa', pj: 'Operator SID (Rian)', kategori: 'Pendidikan', status: 'Akan Datang' },
  { id: 'AG-05', nama: 'Gotong Royong Kebersihan Saluran Pembuangan Air (STBM)', waktu: 'Jumat, 17 Juli 2026, 07:30 WITA', lokasi: 'Dusun B & C', pj: 'Kader PHBS', kategori: 'Pembangunan', status: 'Selesai' },
];

export default function AgendaKegiatanPage() {
  const [agendas] = useState<AgendaItem[]>(MOCK_AGENDA);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Agenda dan Kegiatan" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER SIMULASI */}
      <div className="p-3 rounded bg-slate-50 border border-slate-200 text-slate-650 text-xs">
        ℹ️ Jadwal kegiatan di bawah sinkron dengan sistem perencanaan (RKPDes) dan kalender adat desa.
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Agenda" value={agendas.length} satuan="Kegiatan Terdaftar" barColor="purple" progress={100} />
        <StatCard label="Agenda Mendatang" value={agendas.filter(a => a.status === 'Akan Datang').length} satuan="Dalam Waktu Dekat" barColor="orange" progress={80} />
        <StatCard label="Kegiatan Selesai" value={agendas.filter(a => a.status === 'Selesai').length} satuan="Dokumentasi Siap" barColor="green" progress={20} />
        <StatCard label="Kategori Terbanyak" value="Budaya &amp; Adat" satuan="Prioritas Kelembagaan" barColor="blue" progress={90} />
      </div>

      <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Jadwal Agenda Publik</h2>

      <div className="space-y-3.5 text-xs">
        {agendas.map(a => (
          <Card key={a.id} className="border border-slate-200 shadow-none">
            <CardContent className="p-4 space-y-3">
              
              <div className="flex justify-between items-start gap-2 flex-wrap">
                <div>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border mr-2 ${
                    a.kategori === 'Musyawarah' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    a.kategori === 'Kesehatan' ? 'bg-red-50 text-red-750 border-red-200' :
                    a.kategori === 'Budaya' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    'bg-blue-50 text-blue-700 border-blue-200'
                  }`}>{a.kategori}</span>
                  <span className="text-[9px] font-mono text-slate-400 font-bold">{a.id}</span>
                </div>
                <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                  a.status === 'Akan Datang' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'
                }`}>{a.status}</span>
              </div>

              <h3 className="font-bold text-slate-805 text-sm">{a.nama}</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t pt-2.5 text-slate-600">
                <p className="flex items-center gap-1.5"><Calendar size={13} /> {a.waktu}</p>
                <p className="flex items-center gap-1.5"><MapPin size={13} /> {a.lokasi}</p>
                <p className="flex items-center gap-1.5"><User size={13} /> PJ: <strong>{a.pj}</strong></p>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
