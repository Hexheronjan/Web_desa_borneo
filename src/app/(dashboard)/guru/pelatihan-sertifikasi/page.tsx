'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BookOpen, CheckCircle, Clock, Edit2, Play, Users } from 'lucide-react';

const COLOR = '#1565c0';

interface PelatihanItem {
  id: number;
  namaPelatihan: string;
  penyelenggara: string;
  peserta: string;
  kehadiranPct: number;
  evaluasiHasil: string;
  sertifikasiJenis: string;
  status: 'Direncanakan' | 'Pendaftaran' | 'Berjalan' | 'Selesai' | 'Dievaluasi';
}

const INITIAL_PELATIHAN: PelatihanItem[] = [
  {
    id: 1,
    namaPelatihan: 'Pelatihan Komputer Dasar & Office',
    penyelenggara: 'Relawan TIK + BPD',
    peserta: '24 Siswa & Warga',
    kehadiranPct: 92,
    evaluasiHasil: 'Rata-rata Post-test: 82.50/100',
    sertifikasiJenis: 'Sertifikat Kompetensi Dasar',
    status: 'Selesai',
  },
  {
    id: 2,
    namaPelatihan: 'Workshop Literasi Informasi & Keamanan Digital',
    penyelenggara: 'Guru Fasilitator',
    peserta: '30 Ibu Rumah Tangga',
    kehadiranPct: 88,
    evaluasiHasil: 'Post-test: 78.00/100',
    sertifikasiJenis: 'Pernyataan Kehadiran',
    status: 'Dievaluasi',
  },
  {
    id: 3,
    namaPelatihan: 'Desain Grafis Praktis Canva Budaya',
    penyelenggara: 'Pemerintah Desa',
    peserta: '18 Warga Pemuda',
    kehadiranPct: 0,
    evaluasiHasil: 'Belum Uji',
    sertifikasiJenis: 'Sertifikat Kompetensi Desain',
    status: 'Pendaftaran',
  },
];

export default function PelatihanSertifikasiPage() {
  const [items] = useState<PelatihanItem[]>(INITIAL_PELATIHAN);

  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Pelatihan dan Sertifikasi" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Warga Terlatih" value="72" satuan="peserta" barColor="blue" progress={90} />
        <StatCard label="Sertifikat Diterbitkan" value="58" satuan="lembar" barColor="green" progress={80} />
        <StatCard label="Pelatihan Berjalan" value="1" satuan="program" barColor="orange" progress={50} />
        <StatCard label="Pendaftaran Aktif" value="1" satuan="program" barColor="purple" progress={100} />
      </div>

      <Card>
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-sm font-bold text-slate-700 uppercase">Daftar Program Pelatihan &amp; Sertifikasi</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {items.map(item => (
            <div key={item.id} className="p-3 border rounded-xl hover:border-blue-300 transition-all bg-white shadow-sm flex flex-col md:flex-row justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-800 text-xs">{item.namaPelatihan}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    item.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' :
                    item.status === 'Dievaluasi' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                    item.status === 'Berjalan' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    item.status === 'Pendaftaran' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-slate-50 text-slate-600 border-slate-200'
                  }`}>
                    {item.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-1 gap-x-4 text-[10px] text-slate-500">
                  <div><strong>Penyelenggara:</strong> {item.penyelenggara}</div>
                  <div><strong>Peserta:</strong> {item.peserta}</div>
                  <div><strong>Kehadiran:</strong> {item.kehadiranPct}%</div>
                  <div><strong>Sertifikasi:</strong> {item.sertifikasiJenis}</div>
                </div>
                <p className="text-[10px] text-slate-700 font-bold bg-slate-50 p-2 rounded border mt-2">
                  Hasil Evaluasi: {item.evaluasiHasil}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
