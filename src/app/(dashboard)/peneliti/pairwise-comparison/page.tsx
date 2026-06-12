'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, CheckCircle, ListOrdered } from 'lucide-react';

const COLOR = '#37474f';

const matrixRows = [
  { name: 'Infrastruktur (C1)', vals: ['1.00', '2.00', '3.00', '3.00', '4.00'], weight: '32.0%' },
  { name: 'Kualitas Hidup (C2)', vals: ['0.50', '1.00', '2.00', '2.00', '3.00'], weight: '24.5%' },
  { name: 'Budaya Adat (C3)', vals: ['0.33', '0.50', '1.00', '2.00', '2.00'], weight: '18.0%' },
  { name: 'Lingkungan (C4)', vals: ['0.33', '0.50', '0.50', '1.00', '2.00'], weight: '15.5%' },
  { name: 'Anggaran (C5)', vals: ['0.25', '0.33', '0.50', '0.50', '1.00'], weight: '10.0%' }
];

export default function PairwiseComparisonPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pairwise Comparison Matrix" modul="DSS Analytics (AHP)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Consistency Ratio" value="0.08" satuan="CR &lt; 0.10 (Konsisten)" barColor="green" progress={80} />
        <StatCard label="Ukuran Matriks" value="5 x 5" satuan="kriteria utama" barColor="blue" progress={100} />
        <StatCard label="Kriteria Dominan" value="Infrastruktur" satuan="bobot 32%" barColor="green" progress={100} />
        <StatCard label="Eigenvalue Max (λ)" value="5.24" satuan="n = 5" barColor="purple" progress={85} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Matrix Table */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Matriks Perbandingan Berpasangan (Pairwise Comparison) Kriteria AHP
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-xs text-center font-bold text-slate-600">
                    <th className="p-2.5 text-left">Kriteria</th>
                    <th className="p-2.5">C1</th>
                    <th className="p-2.5">C2</th>
                    <th className="p-2.5">C3</th>
                    <th className="p-2.5">C4</th>
                    <th className="p-2.5">C5</th>
                    <th className="p-2.5 text-right">Bobot Prioritas</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((r, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-slate-50/50 text-center font-mono text-xs">
                      <td className="p-3 text-left font-sans font-semibold text-slate-700">{r.name}</td>
                      {r.vals.map((v, idx) => (
                        <td key={idx} className="p-3 text-slate-600">{v}</td>
                      ))}
                      <td className="p-3 text-right font-sans font-black text-indigo-700">{r.weight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Priority list */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Urutan Prioritas Kriteria
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Berdasarkan perhitungan nilai Eigenvector AHP, urutan kepentingan kriteria adalah:</p>
            <div className="space-y-2 font-semibold">
              {[
                { r: 1, name: 'Kesiapan Infrastruktur (C1)', val: '32.0%' },
                { r: 2, name: 'Dampak Kualitas Hidup (C2)', val: '24.5%' },
                { r: 3, name: 'Pelestarian Budaya Adat (C3)', val: '18.0%' },
                { r: 4, name: 'Keberlanjutan Lingkungan (C4)', val: '15.5%' },
                { r: 5, name: 'Efisiensi Anggaran (C5)', val: '10.0%' }
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-1">
                  <span>{item.r}. {item.name}</span>
                  <span className="text-indigo-700">{item.val}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
