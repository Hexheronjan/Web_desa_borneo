'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart3, ListOrdered, CheckCircle2 } from 'lucide-react';

const COLOR = '#283593';

const programs = [
  { rank: 1, name: 'Peningkatan Layanan Kesehatan', score: 0.232, status: 'Sangat Tinggi', cost: 'Rp 45.000.000' },
  { rank: 2, name: 'Pengembangan Literasi Digital', score: 0.198, status: 'Tinggi', cost: 'Rp 15.000.000' },
  { rank: 3, name: 'Peningkatan Infrastruktur Internet', score: 0.175, status: 'Tinggi', cost: 'Rp 80.000.000' },
  { rank: 4, name: 'Pelestarian Budaya Adat', score: 0.116, status: 'Sedang', cost: 'Rp 25.000.000' },
  { rank: 5, name: 'Peningkatan Lingkungan Sehat', score: 0.098, status: 'Sedang', cost: 'Rp 50.000.000' }
];

export default function PemdesDSSPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Prioritas Program (DSS)" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Consistency Ratio" value="0.08" satuan="Valid (CR &lt; 0.1)" barColor="green" progress={80} />
        <StatCard label="Total Alternatif" value={5} satuan="program dievaluasi" barColor="blue" progress={100} />
        <StatCard label="Skor Tertinggi" value="0.232" satuan="layanan kesehatan" barColor="purple" progress={92} />
        <StatCard label="Kriteria AHP" value={5} satuan="faktor penentu" barColor="green" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Rekomendasi Program Pembangunan Desa Prioritas (AHP SAW Engine)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">Rank</th>
                    <th className="pb-2 pr-4">Nama Alternatif Program</th>
                    <th className="pb-2 pr-4">Estimasi Anggaran</th>
                    <th className="pb-2 pr-4">Prioritas</th>
                    <th className="pb-2 text-right">Skor Bobot</th>
                  </tr>
                </thead>
                <tbody>
                  {programs.map((p, i) => (
                    <tr key={p.rank} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center">
                        <span className="w-6 h-6 rounded-md bg-indigo-700 text-white flex items-center justify-center text-xs font-bold mx-auto">
                          {p.rank}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{p.name}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono text-slate-600">{p.cost}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'Sangat Tinggi' ? 'bg-red-100 text-red-700' :
                          p.status === 'Tinggi' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-2.5 text-right font-black text-indigo-700 font-mono text-xs md:text-sm">{p.score.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Konsistensi & Validitas AHP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
              <p className="font-semibold text-green-800">Skor CR = 0,08 (Valid)</p>
            </div>
            <p>Konsistensi pembobotan kriteria di bawah batas 0,10 membuktikan bahwa preferensi prioritas program stabil dan siap digunakan sebagai dasar penentuan APBDesa.</p>
            <div className="pt-2 border-t">
              <p className="font-bold text-slate-700 mb-1.5">Kriteria Penentu AHP:</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-500">
                <li>Infrastruktur Jaringan (32.0%)</li>
                <li>Peningkatan Kualitas Hidup (24.5%)</li>
                <li>Pelestarian Adat Dayak (18.0%)</li>
                <li>Keberlanjutan Lingkungan (15.5%)</li>
                <li>Ketersediaan Anggaran (10.0%)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
