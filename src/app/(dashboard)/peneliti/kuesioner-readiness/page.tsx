'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { CheckCircle2 } from 'lucide-react';
import { INDIKATOR_24_BAB4 } from '@/lib/bab4-data';

const COLOR = '#37474f';

const DIM_BADGE: Record<string, string> = {
  D1: 'bg-indigo-100 text-indigo-700',
  D2: 'bg-blue-100 text-blue-700',
  D3: 'bg-teal-100 text-teal-700',
  D4: 'bg-cyan-100 text-cyan-700',
  D5: 'bg-emerald-100 text-emerald-700',
  D6: 'bg-amber-100 text-amber-700',
};

export default function KuesionerReadinessPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Instrumen 24 Indikator Readiness (I01–I24)" modul="Readiness Assessment v1.2 (Dataset SLV 1)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Indikator" value={24} satuan="6 Dimensi (D1–D6)" barColor="blue" progress={100} />
        <StatCard label="Validitas Isi (S-CVI/Ave)" value="1,000" satuan="Pasca revisi 6 indikator" barColor="green" progress={100} />
        <StatCard label="Reliabilitas (α Total)" value="0,9367" satuan="Cronbach's Alpha (24 item)" barColor="teal" progress={94} />
        <StatCard label="Jumlah Responden" value={126} satuan="3 desa × 42 · 7 peran × 18" barColor="purple" progress={100} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <CheckCircle2 size={16} /> Daftar 24 Indikator Operasional &amp; Bobot AHP (v1.2 Final Terkunci)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-left text-[11px] text-slate-500 uppercase tracking-wider border-b">
                  <th className="pb-2 pr-3">Kode</th>
                  <th className="pb-2 pr-3">Dimensi</th>
                  <th className="pb-2 pr-3">Nama Indikator &amp; Definisi Operasional</th>
                  <th className="pb-2 pr-3 text-right">Bobot Lokal</th>
                  <th className="pb-2 text-right">Bobot Global</th>
                </tr>
              </thead>
              <tbody>
                {INDIKATOR_24_BAB4.map((q, i) => (
                  <tr key={q.kode} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                    <td className="py-2.5 pr-3 font-mono font-bold text-indigo-700">{q.kode}</td>
                    <td className="py-2.5 pr-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${DIM_BADGE[q.dimensiKode]}`}>
                        {q.dimensiKode}
                      </span>
                    </td>
                    <td className="py-2.5 pr-3">
                      <p className="font-semibold text-slate-800">{q.nama}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{q.definisi}</p>
                    </td>
                    <td className="py-2.5 pr-3 text-right text-slate-500 font-mono">{q.bobotLokal.toFixed(6)}</td>
                    <td className="py-2.5 text-right font-bold font-mono text-slate-800">{(q.bobotGlobal * 100).toFixed(2)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
