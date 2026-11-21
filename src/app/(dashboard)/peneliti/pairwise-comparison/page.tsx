'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, ListOrdered } from 'lucide-react';
import { DIMENSI_BAB4 } from '@/lib/bab4-data';

const COLOR = '#37474f';

// Matriks agregasi rata-rata geometrik 3 pakar (P1–P3) sesuai bobot D1–D6 Bab IV
const matrixRows = [
  { kode: 'D1', name: 'D1 — Tata Kelola & Kepemimpinan', vals: ['1,00', '1,00', '1,04', '1,04', '1,04', '1,12'], gm: '1,039259', weight: '17,31%' },
  { kode: 'D2', name: 'D2 — Infrastruktur & Akses Digital', vals: ['1,00', '1,00', '1,04', '1,04', '1,04', '1,12'], gm: '1,039259', weight: '17,31%' },
  { kode: 'D3', name: 'D3 — Kapasitas SDM & Literasi', vals: ['0,96', '0,96', '1,00', '1,00', '1,00', '1,08'], gm: '1,000000', weight: '16,65%' },
  { kode: 'D4', name: 'D4 — Integrasi Data & Layanan', vals: ['0,96', '0,96', '1,00', '1,00', '1,00', '1,08'], gm: '1,000000', weight: '16,65%' },
  { kode: 'D5', name: 'D5 — Partisipasi & Tata Kelola Adat', vals: ['0,96', '0,96', '1,00', '1,00', '1,00', '1,08'], gm: '1,000000', weight: '16,65%' },
  { kode: 'D6', name: 'D6 — SDGs, DSS & Kualitas Hidup', vals: ['0,89', '0,89', '0,93', '0,93', '0,93', '1,00'], gm: '0,925875', weight: '15,42%' },
];

export default function PairwiseComparisonPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pairwise Comparison Matrix (6 Dimensi AHP)" modul="Pembobotan AHP RQ1 (Dataset SLV 1)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Consistency Ratio (CR)" value="0,00144" satuan="CR < 0,10 (Konsisten)" barColor="green" progress={99} />
        <StatCard label="Ukuran Matriks" value="6 × 6" satuan="Dimensi D1–D6 (RI = 1,24)" barColor="blue" progress={100} />
        <StatCard label="Prioritas Tertinggi" value="D1 & D2" satuan="masing-masing 17,31%" barColor="teal" progress={100} />
        <StatCard label="Eigenvalue Maks (λ)" value="6,0089" satuan="CI = 0,001781 · 3 Pakar" barColor="purple" progress={99} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Matriks Perbandingan Berpasangan Agregat 3 Pakar (D1–D6)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-center font-bold text-slate-600">
                    <th className="p-2 text-left">Dimensi</th>
                    <th className="p-2">D1</th>
                    <th className="p-2">D2</th>
                    <th className="p-2">D3</th>
                    <th className="p-2">D4</th>
                    <th className="p-2">D5</th>
                    <th className="p-2">D6</th>
                    <th className="p-2 text-right">GM</th>
                    <th className="p-2 text-right">Bobot</th>
                  </tr>
                </thead>
                <tbody>
                  {matrixRows.map((r) => (
                    <tr key={r.kode} className="border-b last:border-0 hover:bg-slate-50/50 text-center font-mono">
                      <td className="p-2.5 text-left font-sans font-semibold text-slate-700 whitespace-nowrap">{r.name}</td>
                      {r.vals.map((v, idx) => (
                        <td key={idx} className="p-2 text-slate-600">{v}</td>
                      ))}
                      <td className="p-2 text-right text-slate-500">{r.gm}</td>
                      <td className="p-2.5 text-right font-sans font-black text-indigo-700">{r.weight}</td>
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
              <ListOrdered size={16} /> Urutan Bobot 6 Dimensi (Tabel 4.13)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Agregasi rata-rata geometrik Panel 3 Pakar (P1–P3) menempatkan bobot relatif seimbang lintas enam dimensi:</p>
            <div className="space-y-2 font-semibold">
              {DIMENSI_BAB4.map((d) => (
                <div key={d.kode} className="flex justify-between items-center border-b pb-1.5 gap-2">
                  <span>#{d.peringkat} {d.kode} — {d.singkat.replace(`${d.kode} `, '')}</span>
                  <span className="text-indigo-700 font-mono">{(d.bobot * 100).toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
