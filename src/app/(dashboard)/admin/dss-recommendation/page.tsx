'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart3, TrendingUp, CheckCircle, ListOrdered } from 'lucide-react';

const COLOR = '#1a237e';

const ahpRanking = [
  { rank: 1, program: 'Peningkatan Layanan Posyandu & KIA', score: 0.232, category: 'Smart Sehat (Kesehatan)', cost: 'Rp 45.000.000' },
  { rank: 2, program: 'Pengembangan Kelas Literasi Digital Budaya', score: 0.198, category: 'Smart Belajar (Pendidikan)', cost: 'Rp 15.000.000' },
  { rank: 3, program: 'Penyediaan Infrastruktur Internet / VSAT RT', score: 0.175, category: 'Smart SID (Infrastruktur)', cost: 'Rp 80.000.000' },
  { rank: 4, program: 'Digitalisasi Dokumen & Hukum Adat Dayak', score: 0.116, category: 'Smart Adat (Budaya)', cost: 'Rp 25.000.000' },
  { rank: 5, program: 'Pengadaan TPS Terpadu & Sanitasi Huma', score: 0.098, category: 'Sustainability (Lingkungan)', cost: 'Rp 50.000.000' },
  { rank: 6, program: 'Pemasangan Solar Panel di Balai Adat', score: 0.092, category: 'Sustainability (Energi)', cost: 'Rp 95.000.000' },
  { rank: 7, program: 'Pelatihan UMKM Kerajinan Anyaman rotan', score: 0.089, category: 'Smart Sehat (Ekonomi)', cost: 'Rp 12.000.000' }
];

const criteriaWeights = [
  { name: 'Kesiapan Infrastruktur (C1)', weight: 0.320 },
  { name: 'Dampak Kualitas Hidup (C2)', weight: 0.245 },
  { name: 'Pelestarian Budaya Adat (C3)', weight: 0.180 },
  { name: 'Keberlanjutan Lingkungan (C4)', weight: 0.155 },
  { name: 'Efisiensi Anggaran (C5)', weight: 0.100 }
];

export default function DSSRecommendationPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="DSS Program Recommendation" modul="Modul 9: DSS (AHP-SAW)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Consistency Ratio" value="0.08" satuan="CR &lt; 0.10 (Konsisten)" barColor="green" progress={80} />
        <StatCard label="Rekomendasi Utama" value="Kesehatan" satuan="skor tertinggi" barColor="blue" progress={92} />
        <StatCard label="Total Kriteria" value={5} satuan="kriteria AHP" barColor="purple" progress={100} />
        <StatCard label="Program Dievaluasi" value={7} satuan="alternatif" barColor="orange" progress={70} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* program ranking */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Peringkat Prioritas Alternatif Program Pembangunan Desa (AHP)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">Rank</th>
                    <th className="pb-2 pr-4">Alternatif Program</th>
                    <th className="pb-2 pr-4">Dimensi / Modul</th>
                    <th className="pb-2 pr-4">Perkiraan Biaya</th>
                    <th className="pb-2 text-right">Skor Prioritas</th>
                  </tr>
                </thead>
                <tbody>
                  {ahpRanking.map((p, i) => (
                    <tr key={p.rank} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                          p.rank === 1 ? 'bg-amber-500 text-white' :
                          p.rank === 2 ? 'bg-slate-400 text-white' :
                          p.rank === 3 ? 'bg-amber-700 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.rank}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{p.program}</td>
                      <td className="py-2.5 pr-4 text-slate-500 text-xs">{p.category}</td>
                      <td className="py-2.5 pr-4 text-slate-600 text-xs font-mono">{p.cost}</td>
                      <td className="py-2.5 text-right font-black text-indigo-700 font-mono text-xs md:text-sm">{p.score.toFixed(3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* criteria weights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Bobot Kriteria AHP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-slate-500">Bobot diperoleh dari matriks perbandingan berpasangan kriteria oleh para pakar & peneliti adat:</p>
            <div className="space-y-3">
              {criteriaWeights.map((cw, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{cw.name}</span>
                    <span className="font-bold text-slate-800">{(cw.weight * 100).toFixed(1)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-indigo-700" style={{ width: `${cw.weight * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2 mt-4">
              <CheckCircle size={16} className="text-green-600 flex-shrink-0" />
              <p className="text-[11px] text-green-800 leading-normal">
                Nilai <strong>CR = 0.08 &lt; 0.10</strong> membuktikan konsistensi penilaian pembobotan kriteria AHP valid untuk pengambilan keputusan.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
