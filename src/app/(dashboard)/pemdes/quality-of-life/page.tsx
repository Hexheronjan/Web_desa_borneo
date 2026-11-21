'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Heart, AlertTriangle, RefreshCw, BarChart2 } from 'lucide-react';
import { DESA_BAB4, PREPOST_6_KONSTRUK_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

export default function PenilaianKualitasHidupPage() {
  const qol = PREPOST_6_KONSTRUK_BAB4.find((c) => c.sasaran === 'Manfaat awal kualitas hidup')!;
  const konstrukChart = PREPOST_6_KONSTRUK_BAB4.filter((c) => c.sasaran !== 'Kematangan digital').map((c) => ({
    aspek: c.sasaran.replace('Manfaat awal ', ''),
    Pra: c.sebelum,
    Pasca: c.sesudah,
    delta: c.delta,
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Manfaat Awal Kualitas Hidup (QoL — Bab IV)" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs flex items-start gap-2.5">
        <AlertTriangle size={16} className="text-blue-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Batas Interpretasi Bab IV (Indikator Proksimal 4 Minggu)</p>
          <p className="text-blue-800 mt-0.5 font-medium leading-relaxed">
            Skor kualitas hidup pada evaluasi 4 minggu (Dataset SLV 3, <strong>N = 126 partisipan</strong>) dimaknai sebagai <strong>manfaat awal/proksimal</strong> (kemudahan informasi, keteraturan layanan, partisipasi, dan dukungan keputusan), bukan klaim dampak kausal jangka panjang.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Pasca QoL (N=126)" value="69,97" satuan={`Pra ${qol.sebelum.toFixed(2)} (Δ +${qol.delta.toFixed(2)})`} barColor="green" progress={70} />
        <StatCard label="Median Perubahan (Δ)" value={`+${qol.medianDelta.toFixed(2)}`} satuan="93 positif · 33 negatif (73,8%)" barColor="purple" progress={74} />
        <StatCard label="Uji Tanda Eksak (Holm)" value="Signifikan" satuan={`p Holm = ${qol.pHolm}`} barColor="blue" progress={95} />
        <StatCard label="Perubahan 3 Desa" value="+1,47 s.d. +1,68" satuan="JJ +1,47 · KI +1,68 · LA +1,47" barColor="orange" progress={80} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <BarChart2 size={16} /> Perbandingan Pra vs Pasca Konstruk RQ3 (Skala 0–100)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[290px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={konstrukChart} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                  <XAxis type="number" domain={[40, 80]} tick={{ fontSize: 9, fill: '#64748b' }} />
                  <YAxis dataKey="aspek" type="category" width={130} tick={{ fontSize: 9, fill: '#334155' }} />
                  <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8 }} />
                  <Legend wrapperStyle={{ fontSize: 10 }} />
                  <Bar dataKey="Pra" name="Pra (Baseline)" fill="#94a3b8" radius={[0, 4, 4, 0]} />
                  <Bar dataKey="Pasca" name="Pasca (Minggu 4)" fill={COLOR} radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} /> Ringkasan Perubahan per Desa (Tabel 4.43)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {DESA_BAB4.map((d) => (
              <div key={d.id} className="p-3 border rounded-lg bg-slate-50/60 space-y-1">
                <div className="flex justify-between items-center font-bold text-slate-800">
                  <span>{d.nama}</span>
                  <span className="text-emerald-700 font-mono">Δ QoL +{d.prePostDelta.qol.toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  Integrasi Data: <strong>+{d.prePostDelta.dataIntegration.toFixed(2)}</strong> · Pemantauan SDGs: <strong>+{d.prePostDelta.sdgMonitoring.toFixed(2)}</strong> · Kualitas Keputusan: <strong>+{d.prePostDelta.decisionQuality.toFixed(2)}</strong>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} /> Sumber: Dataset SLV 3 v1.2 — Tabel 4.40 s.d. 4.43 Bab IV</span>
        <span>Kab. Kutai Kartanegara · 2026</span>
      </div>
    </div>
  );
}
