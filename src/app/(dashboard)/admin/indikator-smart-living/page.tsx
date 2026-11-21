'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ShieldCheck, Wifi, GraduationCap, Database, Landmark, BarChart3 } from 'lucide-react';
import { DESA_BAB4, DIMENSI_BAB4, INDIKATOR_24_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a237e';

const DIM_META = [
  { kode: 'D1' as const, icon: ShieldCheck, color: 'bg-indigo-600', text: 'text-indigo-600', bar: 'purple' as const },
  { kode: 'D2' as const, icon: Wifi, color: 'bg-blue-600', text: 'text-blue-600', bar: 'blue' as const },
  { kode: 'D3' as const, icon: GraduationCap, color: 'bg-teal-600', text: 'text-teal-600', bar: 'teal' as const },
  { kode: 'D4' as const, icon: Database, color: 'bg-cyan-600', text: 'text-cyan-600', bar: 'blue' as const },
  { kode: 'D5' as const, icon: Landmark, color: 'bg-emerald-600', text: 'text-emerald-600', bar: 'green' as const },
  { kode: 'D6' as const, icon: BarChart3, color: 'bg-amber-600', text: 'text-amber-600', bar: 'orange' as const },
];

export default function IndikatorSmartLivingPage() {
  const dimensions = DIMENSI_BAB4.map((dim, idx) => {
    const meta = DIM_META[idx];
    const avgScore =
      (DESA_BAB4[0].dimensi[dim.kode] + DESA_BAB4[1].dimensi[dim.kode] + DESA_BAB4[2].dimensi[dim.kode]) / 3;
    const indicators = INDIKATOR_24_BAB4.filter((ind) => ind.dimensiKode === dim.kode);
    return {
      ...dim,
      ...meta,
      avgScore,
      indicators,
    };
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Indikator Smart Living (6 Dimensi · 24 Indikator)" modul="Kerangka Kesiapan Bab IV (v1.2)" color={COLOR} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {dimensions.map((d) => (
          <StatCard
            key={d.kode}
            label={`${d.kode} · ${(d.bobot * 100).toFixed(1)}%`}
            value={d.avgScore.toFixed(1)}
            satuan={d.singkat.replace(`${d.kode} `, '')}
            barColor={d.bar}
            progress={Math.round(d.avgScore)}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dimensions.map((dim) => {
          const Icon = dim.icon;
          return (
            <Card key={dim.kode} className="hover:shadow-md transition-shadow">
              <CardHeader className="border-b">
                <div className="flex items-center gap-2.5">
                  <div className={`p-2 rounded-lg bg-slate-50 ${dim.text}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-sm font-bold text-slate-800">{dim.kode} — {dim.nama}</CardTitle>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] text-slate-500">
                      <span>Bobot AHP: <strong>{(dim.bobot * 100).toFixed(2)}%</strong></span>
                      <span>•</span>
                      <span>CR: <strong>{dim.cr.toFixed(6)}</strong></span>
                      <span>•</span>
                      <span>JJ {DESA_BAB4[0].dimensi[dim.kode].toFixed(1)} · KI {DESA_BAB4[1].dimensi[dim.kode].toFixed(1)} · LA {DESA_BAB4[2].dimensi[dim.kode].toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-black ${dim.text}`}>{dim.avgScore.toFixed(1)}</span>
                    <span className="block text-[9px] text-slate-400">Rerata 3 Desa</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-3">
                  {dim.indicators.map((ind) => (
                    <div key={ind.kode}>
                      <div className="flex justify-between text-xs mb-1 gap-2">
                        <span className="text-slate-700 font-medium">
                          <span className="font-mono font-bold text-indigo-700 mr-1.5">{ind.kode}</span>
                          {ind.nama}
                        </span>
                        <span className="font-mono font-bold text-slate-800 whitespace-nowrap">
                          {(ind.bobotGlobal * 100).toFixed(2)}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${dim.color}`} style={{ width: `${Math.min(100, ind.bobotLokal * 250)}%` }} />
                      </div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{ind.definisi}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
