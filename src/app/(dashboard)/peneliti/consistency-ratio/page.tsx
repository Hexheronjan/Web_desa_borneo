'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { CheckCircle2, Award, ListOrdered } from 'lucide-react';

const COLOR = '#37474f';

const calculations = [
  { no: 1, kriteria: 'Kesiapan Infrastruktur (C1)', vector: 0.320, sum: 1.632, ratio: 5.10 },
  { no: 2, kriteria: 'Dampak Kualitas Hidup (C2)', vector: 0.245, sum: 1.286, ratio: 5.25 },
  { no: 3, kriteria: 'Pelestarian Budaya Adat (C3)', vector: 0.180, sum: 0.945, ratio: 5.25 },
  { no: 4, kriteria: 'Keberlanjutan Lingkungan (C4)', vector: 0.155, sum: 0.822, ratio: 5.30 },
  { no: 5, kriteria: 'Efisiensi Anggaran (C5)', vector: 0.100, sum: 0.530, ratio: 5.30 }
];

export default function ConsistencyRatioPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Consistency Ratio (CR) Verification" modul="DSS Analytics (AHP)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Consistency Ratio" value="0.08" satuan="CR &lt; 0.10 (Konsisten)" barColor="green" progress={80} />
        <StatCard label="Lambda Max (λ max)" value="5.24" satuan="eigenvalue max" barColor="blue" progress={90} />
        <StatCard label="Consistency Index (CI)" value="0.06" satuan="index penyimpangan" barColor="teal" progress={80} />
        <StatCard label="Random Index (RI)" value="1.12" satuan="n = 5 kriteria" barColor="purple" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Calc table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Tabel Pengujian Konsistensi Pembobotan Kriteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Nama Kriteria</th>
                    <th className="pb-2 pr-4 text-right">Priority Vector (w)</th>
                    <th className="pb-2 pr-4 text-right">Weighted Sum Vector (Ws)</th>
                    <th className="pb-2 text-right">Consistency Ratio (Ws/w)</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.map((c, i) => (
                    <tr key={c.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{c.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{c.kriteria}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-slate-600">{c.vector.toFixed(3)}</td>
                      <td className="py-2.5 pr-4 text-right font-mono text-xs text-indigo-700">{c.sum.toFixed(3)}</td>
                      <td className="py-2.5 text-right font-bold font-mono text-xs text-slate-800">{c.ratio.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Verdict */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Hasil Konsistensi AHP
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-2">
              <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                <CheckCircle2 size={10} /> KONSISTEN
              </span>
              <p className="font-bold text-green-950">CR = 0,08 &lt; 0,10</p>
              <p className="text-[11px] text-green-800">
                Nilai CR di bawah ambang batas 10% (0.10) membuktikan secara matematis bahwa preferensi perbandingan berpasangan kriteria AHP valid dan konsisten.
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-slate-50 space-y-1 font-mono text-[10px]">
              <p className="font-bold text-slate-700">Langkah Penghitungan:</p>
              <p>1. λ max = Rerata (Ws/w) = 5.24</p>
              <p>2. CI = (λ max - n) / (n - 1) = (5.24 - 5) / 4 = 0.06</p>
              <p>3. CR = CI / RI = 0.06 / 1.12 = 0.08</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
