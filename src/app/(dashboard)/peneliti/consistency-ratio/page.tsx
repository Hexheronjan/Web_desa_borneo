'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { CheckCircle2, Award, ListOrdered } from 'lucide-react';
import { DIMENSI_BAB4 } from '@/lib/bab4-data';

const COLOR = '#37474f';

const sevenMatrices = [
  { no: 1, matriks: 'Antardimensi (D1–D6)', n: 6, lambdaMax: 6.008904, ci: 0.001781, ri: 1.24, cr: 0.001436 },
  { no: 2, matriks: 'Indikator D1 (I01–I04)', n: 4, lambdaMax: 4.046940, ci: 0.015647, ri: 0.90, cr: 0.017385 },
  { no: 3, matriks: 'Indikator D2 (I05–I08)', n: 4, lambdaMax: 4.033467, ci: 0.011156, ri: 0.90, cr: 0.012395 },
  { no: 4, matriks: 'Indikator D3 (I09–I12)', n: 4, lambdaMax: 4.046940, ci: 0.015647, ri: 0.90, cr: 0.017385 },
  { no: 5, matriks: 'Indikator D4 (I13–I16)', n: 4, lambdaMax: 4.026764, ci: 0.008921, ri: 0.90, cr: 0.009913 },
  { no: 6, matriks: 'Indikator D5 (I17–I20)', n: 4, lambdaMax: 4.046940, ci: 0.015647, ri: 0.90, cr: 0.017385 },
  { no: 7, matriks: 'Indikator D6 (I21–I24)', n: 4, lambdaMax: 4.046940, ci: 0.015647, ri: 0.90, cr: 0.017385 },
];

export default function ConsistencyRatioPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Consistency Ratio (CR) Verification — 7 Matriks AHP" modul="Pembobotan AHP RQ1 (Tabel 4.13C)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="CR Matriks Dimensi (n=6)" value="0,00144" satuan="CR < 0,10 (Sangat Konsisten)" barColor="green" progress={99} />
        <StatCard label="Lambda Max (λ maks)" value="6,008904" satuan="eigenvalue maks (n=6)" barColor="blue" progress={98} />
        <StatCard label="Consistency Index (CI)" value="0,001781" satuan="(λ maks − 6) / 5" barColor="teal" progress={99} />
        <StatCard label="CR Maks Indikator (n=4)" value="0,01739" satuan="RI = 1,24 (n=6) · 0,90 (n=4)" barColor="purple" progress={98} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Table 7 Matriks AHP */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Rekapitulasi Uji Konsistensi 7 Matriks AHP (Dimensi &amp; Indikator)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[11px] text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-3 text-center">No</th>
                    <th className="pb-2 pr-3">Matriks AHP</th>
                    <th className="pb-2 pr-3 text-center">n</th>
                    <th className="pb-2 pr-3 text-right">λ maks</th>
                    <th className="pb-2 pr-3 text-right">CI</th>
                    <th className="pb-2 pr-3 text-right">RI</th>
                    <th className="pb-2 text-right">CR</th>
                  </tr>
                </thead>
                <tbody>
                  {sevenMatrices.map((m, i) => (
                    <tr key={m.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-3 text-center text-slate-400 font-mono">{m.no}</td>
                      <td className="py-2.5 pr-3 font-semibold text-slate-700">{m.matriks}</td>
                      <td className="py-2.5 pr-3 text-center font-mono text-slate-600">{m.n}</td>
                      <td className="py-2.5 pr-3 text-right font-mono text-slate-600">{m.lambdaMax.toFixed(6)}</td>
                      <td className="py-2.5 pr-3 text-right font-mono text-indigo-700">{m.ci.toFixed(6)}</td>
                      <td className="py-2.5 pr-3 text-right font-mono text-slate-500">{m.ri.toFixed(2)}</td>
                      <td className="py-2.5 text-right font-bold font-mono text-emerald-700">{m.cr.toFixed(6)}</td>
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
              <Award size={16} /> Hasil Konsistensi AHP Bab IV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <div className="p-4 bg-green-50 border border-green-200 rounded-xl space-y-2">
              <span className="bg-green-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                <CheckCircle2 size={10} /> SELURUH 7 MATRIKS KONSISTEN
              </span>
              <p className="font-bold text-green-950">CR Dimensi = 0,001436 &lt; 0,10</p>
              <p className="text-[11px] text-green-800">
                Agregasi penilaian Panel 3 Pakar (P1–P3) menggunakan rata-rata geometrik menghasilkan bobot 6 dimensi dan 24 indikator yang sangat konsisten (CR maks indikator = 0,017385).
              </p>
            </div>
            <div className="p-3 border rounded-lg bg-slate-50 space-y-1 font-mono text-[10px]">
              <p className="font-bold text-slate-700">Verifikasi Matriks Dimensi (n=6):</p>
              <p>1. λ maks = 6,008904</p>
              <p>2. CI = (6,008904 − 6) / 5 = 0,001781</p>
              <p>3. CR = 0,001781 / 1,24 = 0,001436</p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-slate-700">Bobot Prioritas 6 Dimensi:</p>
              {DIMENSI_BAB4.map((d) => (
                <div key={d.kode} className="flex justify-between text-[11px] border-b py-0.5 last:border-0">
                  <span>{d.kode} — {d.singkat.replace(`${d.kode} `, '')}</span>
                  <span className="font-mono font-bold text-indigo-700">{(d.bobot * 100).toFixed(2)}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
