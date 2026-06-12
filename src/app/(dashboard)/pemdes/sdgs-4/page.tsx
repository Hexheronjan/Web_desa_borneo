'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BookOpen, CheckCircle2, Award } from 'lucide-react';

const COLOR = '#283593';

const educationIndicators = [
  { name: 'Angka Partisipasi Sekolah (APS) SD', target: '98%', actual: '98%', status: 'Tercapai', color: 'bg-green-500' },
  { name: 'Angka Partisipasi Sekolah (APS) SMP', target: '95%', actual: '90%', status: 'Hampir Tercapai', color: 'bg-amber-500' },
  { name: 'Angka Partisipasi Sekolah (APS) SMA', target: '90%', actual: '85%', status: 'Hampir Tercapai', color: 'bg-amber-500' },
  { name: 'Tingkat Literasi Digital Guru', target: '80%', actual: '65%', status: 'Perlu Usaha', color: 'bg-amber-500' },
  { name: 'Tingkat Literasi Digital Siswa', target: '60%', actual: '48%', status: 'Perlu Usaha', color: 'bg-amber-500' }
];

export default function SDGs4Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="SDGs 4 — Pendidikan Berkualitas" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian SDGs 4" value="75%" satuan="skor pencapaian" barColor="blue" progress={75} />
        <StatCard label="Total Siswa" value={256} satuan="anak aktif" barColor="blue" progress={90} />
        <StatCard label="APS Rata-rata" value="92.5%" satuan="partisipasi sekolah" barColor="green" progress={92} />
        <StatCard label="Literasi Digital" value="48%" satuan="dasar TIK" barColor="orange" progress={48} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BookOpen size={16} className="text-blue-500" /> Detail Indikator Kinerja Pendidikan Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {educationIndicators.map((ind, i) => (
                <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                  <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                    <span>{ind.name}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                      ind.status === 'Tercapai' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>{ind.status}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${ind.color}`} style={{ width: ind.actual }} />
                    </div>
                    <div className="w-24 text-right text-xs">
                      <span className="text-slate-400 font-medium">Target: {ind.target}</span>
                      <span className="block font-black text-slate-800">{ind.actual}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Fasilitas Belajar Digital
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Kegiatan pengajaran literasi didukung oleh fasilitator/guru di Balai Belajar Desa:</p>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="font-bold text-indigo-800 mb-1">Peralatan E-Learning</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>5 Unit Komputer Mini PC</li>
                <li>Proyektor Presentasi Budaya</li>
                <li>VSAT Satellite Router</li>
              </ul>
            </div>
            <p className="pt-2 text-[10px] text-slate-400">
              *Kurikulum mencakup pelatihan TIK dasar dan pelestarian bahasa lokal Dayak.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
