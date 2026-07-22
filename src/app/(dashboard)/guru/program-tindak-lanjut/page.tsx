'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ShieldAlert, CheckCircle, Clock, Play, AlertTriangle } from 'lucide-react';

const COLOR = '#1565c0';

interface ProgramTindakLanjut {
  id: number;
  programPrioritas: string;
  dasarProgram: string;
  targetKondisi: string;
  pj: string;
  jadwal: string;
  progresPct: number;
  buktiPelaksanaan: string;
  status: 'Direncanakan' | 'Berjalan' | 'Selesai' | 'Tertunda';
  evaluasi: string;
}

const INITIAL_PROGRAMS: ProgramTindakLanjut[] = [
  {
    id: 1,
    programPrioritas: 'Penyediaan Chromebook Mandiri UNBK',
    dasarProgram: 'Kesenjangan Sarpras TIK Dusun 3',
    targetKondisi: 'Siswa SMP Filial dapat ujian mandiri di desa tanpa menyeberang sungai.',
    pj: 'Pemerintah Desa + Kepala Sekolah',
    jadwal: 'Agustus – September 2026',
    progresPct: 75,
    buktiPelaksanaan: 'Pengadaan 5 unit Chromebook dari dana desa disetujui dalam Musrenbangdes.',
    status: 'Berjalan',
    evaluasi: 'Menunggu pengiriman unit dari vendor regional.',
  },
  {
    id: 2,
    programPrioritas: 'Sweeping Imunisasi Dasar Warga Sekolah',
    dasarProgram: 'Rekomendasi Nakes & Kesenjangan Imunisasi',
    targetKondisi: '100% siswa PAUD & Kelas 1 SD terimunisasi rubella.',
    pj: 'Bidan Desa + Guru Fasilitator',
    jadwal: '15 – 20 Juli 2026',
    progresPct: 100,
    buktiPelaksanaan: 'Dilaksanakan sweeping bersama posyandu ke 4 sekolah/PAUD.',
    status: 'Selesai',
    evaluasi: 'Hasil: Seluruh sasaran (15 anak) berhasil divaksin lengkap.',
  },
];

export default function ProgramTindakLanjutPage() {
  const [items] = useState<ProgramTindakLanjut[]>(INITIAL_PROGRAMS);

  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Program dan Tindak Lanjut" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Rencana Tindak Lanjut" value="2" satuan="program" barColor="blue" progress={100} />
        <StatCard label="Tindak Lanjut Berjalan" value="1" satuan="program" barColor="orange" progress={50} />
        <StatCard label="Tindak Lanjut Selesai" value="1" satuan="program" barColor="green" progress={100} />
        <StatCard label="Program Tertunda" value="0" satuan="program" barColor="red" progress={0} />
      </div>

      <Card>
        <CardHeader className="py-3 border-b">
          <CardTitle className="text-sm font-bold text-slate-700 uppercase">Daftar Rencana Tindak Lanjut &amp; Resolusi Pendidikan</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {items.map(item => (
            <div key={item.id} className="p-3 border rounded-xl hover:border-blue-300 transition-all bg-white shadow-sm space-y-2">
              <div className="flex justify-between items-start gap-2 flex-wrap">
                <div>
                  <h4 className="font-bold text-slate-800 text-xs">{item.programPrioritas}</h4>
                  <p className="text-[10px] text-slate-400">Dasar: {item.dasarProgram}</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                  item.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' :
                  item.status === 'Berjalan' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                  'bg-slate-50 text-slate-600 border-slate-200'
                }`}>{item.status}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 gap-x-4 text-[10px] text-slate-500 border-t pt-2">
                <div><strong>Target Kondisi:</strong> {item.targetKondisi}</div>
                <div><strong>PJ Program:</strong> {item.pj}</div>
                <div><strong>Jadwal:</strong> {item.jadwal}</div>
                <div><strong>Bukti Pelaksanaan:</strong> {item.buktiPelaksanaan}</div>
              </div>

              <div className="space-y-1 mt-2">
                <div className="flex justify-between text-[9px] font-semibold text-slate-500">
                  <span>Progres Rencana:</span>
                  <span>{item.progresPct}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.progresPct}%` }} />
                </div>
              </div>

              <div className="p-2 rounded bg-slate-50 border text-[9px] italic text-slate-550">
                <strong>Evaluasi Terkini:</strong> {item.evaluasi}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
