'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart3, AlertTriangle } from 'lucide-react';
import { DESA_BAB4, DIMENSI_BAB4 } from '@/lib/bab4-data';

const COLOR = '#37474f';

export default function GapAnalysisPage() {
  const [selectedId, setSelectedId] = useState<string>(DESA_BAB4[0].id);
  const desa = DESA_BAB4.find((d) => d.id === selectedId) ?? DESA_BAB4[0];

  const gapData = DIMENSI_BAB4.map((dim, i) => {
    const actual = desa.dimensi[dim.kode];
    const gap = Number((100 - actual).toFixed(2));
    const priority = gap >= 50 ? 'Tinggi' : gap >= 35 ? 'Sedang' : 'Terkendali';
    return {
      no: i + 1,
      kode: dim.kode,
      dim: `${dim.kode} — ${dim.nama}`,
      bobot: dim.bobot,
      target: 100.0,
      actual,
      gap,
      priority,
    };
  });

  const sortedByGap = [...gapData].sort((a, b) => b.gap - a.gap);
  const largestGap = sortedByGap[0];
  const smallestGap = sortedByGap[sortedByGap.length - 1];

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <PageTitle fitur="Gap Analysis Kesiapan 6 Dimensi (RQ1)" modul="Readiness Assessment Bab IV" color={COLOR} />
        <div className="flex gap-1.5">
          {DESA_BAB4.map((d) => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors ${
                d.id === selectedId ? 'bg-slate-800 text-white border-slate-800' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {d.nama.replace('Desa ', '')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={`Gap Total ${desa.nama.replace('Desa ', '')}`} value={desa.kesenjangan.toFixed(2)} satuan={`Skor ${desa.skorKesiapan.toFixed(2)} (${desa.kategoriKesiapan})`} barColor="red" progress={Math.round(desa.kesenjangan)} />
        <StatCard label="Gap Terbesar" value={largestGap.gap.toFixed(2)} satuan={`${largestGap.kode} (Aktual ${largestGap.actual.toFixed(2)})`} barColor="red" progress={Math.round(largestGap.gap)} />
        <StatCard label="Gap Terkecil (Kekuatan)" value={smallestGap.gap.toFixed(2)} satuan={`${smallestGap.kode} (Aktual ${smallestGap.actual.toFixed(2)})`} barColor="green" progress={Math.round(smallestGap.gap)} />
        <StatCard label="Prioritas DSS SAW #1" value={desa.dssPrioritas.kode} satuan={`Skor ${desa.dssPrioritas.skorSAW.toFixed(4)}`} barColor="blue" progress={95} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Lembar Analisis Kesenjangan (100 − Skor Aktual) — {desa.nama}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-[11px] text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-3">Dimensi</th>
                    <th className="pb-2 pr-3 text-right">Bobot AHP</th>
                    <th className="pb-2 pr-3 text-right">Aktual</th>
                    <th className="pb-2 pr-3 text-right">Gap</th>
                    <th className="pb-2">Prioritas</th>
                  </tr>
                </thead>
                <tbody>
                  {gapData.map((g, i) => (
                    <tr key={g.kode} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-3 font-semibold text-slate-700">{g.dim}</td>
                      <td className="py-3 pr-3 text-right font-mono text-slate-500">{(g.bobot * 100).toFixed(2)}%</td>
                      <td className="py-3 pr-3 text-right font-mono text-slate-800">{g.actual.toFixed(2)}</td>
                      <td className="py-3 pr-3 text-right font-mono font-bold text-red-600">{g.gap.toFixed(2)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          g.priority === 'Tinggi' ? 'bg-red-100 text-red-700' :
                          g.priority === 'Sedang' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'
                        }`}>
                          {g.priority}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Implikasi &amp; Rekomendasi Bab IV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-relaxed">
            <div className="p-3 border rounded-xl bg-green-50 border-green-200">
              <p className="font-bold text-green-900 mb-1">Kekuatan Relatif</p>
              <p>{desa.kekuatanRelatif}</p>
            </div>
            <div className="p-3 border rounded-xl bg-red-50 border-red-200">
              <p className="font-bold text-red-900 mb-1">Fokus Perbaikan Utama</p>
              <p>{desa.prioritasPerbaikan}</p>
            </div>
            <div className="p-3 border rounded-xl bg-blue-50 border-blue-200">
              <p className="font-bold text-blue-900 mb-1">Rekomendasi DSS SAW #1</p>
              <p><strong>{desa.dssPrioritas.kode} — {desa.dssPrioritas.nama}</strong> (SAW {desa.dssPrioritas.skorSAW.toFixed(6)}; {desa.dssPrioritas.stabilitas}).</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
