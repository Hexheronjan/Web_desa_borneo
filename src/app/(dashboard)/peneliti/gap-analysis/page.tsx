'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart3, TrendingUp, AlertTriangle } from 'lucide-react';

const COLOR = '#37474f';

const gapData = [
  { no: 1, dim: 'Technology (Teknologi)', target: 85.0, actual: 72.0, gap: 13.0, priority: 'Tinggi', rec: 'Upgrade VSAT internet ke Fiber Optic, lakukan training TIK untuk guru.' },
  { no: 2, dim: 'Infrastructure (Prasarana)', target: 85.0, actual: 73.2, gap: 11.8, priority: 'Tinggi', rec: 'Alokasikan solar panel backup 3KVA untuk mencegah downtime server.' },
  { no: 3, dim: 'Governance (Tata Kelola)', target: 80.0, actual: 78.4, gap: 1.6, priority: 'Rendah', rec: 'Susun regulasi tertulis formal mengenai standardisasi SOP pelayanan.' },
  { no: 4, dim: 'Human Capital (SDM)', target: 80.0, actual: 75.0, gap: 5.0, priority: 'Sedang', rec: 'Adakan kelas pelatihan komputer untuk kader Posyandu PKK.' },
  { no: 5, dim: 'Culture (Budaya Adat)', target: 75.0, actual: 80.0, gap: -5.0, priority: 'Terpenuhi', rec: 'Skor melampaui target. Pertahankan keaktifan musyawarah adat.' }
];

export default function GapAnalysisPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Gap Analysis Kesiapan" modul="Readiness Assessment" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Gap Rerata Regional" value="24.80" satuan="poin gap" barColor="red" progress={25} />
        <StatCard label="Gap Terbesar" value="13.00" satuan="Teknologi" barColor="red" progress={45} />
        <StatCard label="Gap Terkecil" value="-5.00" satuan="Budaya (Melampaui)" barColor="green" progress={0} />
        <StatCard label="Fokus Prioritas" value="2 Aspek" satuan="tinggi" barColor="orange" progress={40} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Table gap */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart3 size={16} /> Lembar Analisis Kesenjangan (Target vs Aktual) Per Dimensi Kesiapan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Dimensi Aspek</th>
                    <th className="pb-2 pr-4 text-right">Target</th>
                    <th className="pb-2 pr-4 text-right">Aktual</th>
                    <th className="pb-2 pr-4 text-right">Gap</th>
                    <th className="pb-2">Prioritas</th>
                  </tr>
                </thead>
                <tbody>
                  {gapData.map((g, i) => (
                    <tr key={g.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-3 pr-4 text-center text-slate-400 font-mono text-xs">{g.no}</td>
                      <td className="py-3 pr-4 font-semibold text-slate-700 text-xs md:text-sm">{g.dim}</td>
                      <td className="py-3 pr-4 text-right font-mono text-xs text-slate-600">{g.target.toFixed(1)}</td>
                      <td className="py-3 pr-4 text-right font-mono text-xs text-slate-800">{g.actual.toFixed(1)}</td>
                      <td className="py-3 pr-4 text-right font-mono text-xs font-bold text-red-600">{g.gap.toFixed(1)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          g.priority === 'Tinggi' ? 'bg-red-100 text-red-700' :
                          g.priority === 'Sedang' ? 'bg-amber-100 text-amber-700' :
                          g.priority === 'Terpenuhi' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
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

        {/* Recommendations */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Rekomendasi Pembangunan Peneliti
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {gapData.filter(g => g.priority === 'Tinggi' || g.priority === 'Sedang').map((item, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50 text-xs">
                <p className="font-bold text-slate-800 mb-1">{item.dim}</p>
                <p className="text-slate-600 leading-normal">{item.rec}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
