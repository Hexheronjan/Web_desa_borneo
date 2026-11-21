'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, CheckCircle2 } from 'lucide-react';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

const healthIndicators = [
  { name: 'Desa Jonggon Jaya — Capaian KPI SDGs Desa 3 (6 KPI)', target: '100%', actual: `${DESA_BAB4[0].sdgKPI.sdg3.toFixed(1)}%`, pct: DESA_BAB4[0].sdgKPI.sdg3, status: 'Tinggi', color: 'bg-green-500' },
  { name: 'Desa Kedang Ipil — Capaian KPI SDGs Desa 3 (6 KPI)', target: '100%', actual: `${DESA_BAB4[1].sdgKPI.sdg3.toFixed(1)}%`, pct: DESA_BAB4[1].sdgKPI.sdg3, status: 'Baik', color: 'bg-emerald-500' },
  { name: 'Desa Lung Anai — Capaian KPI SDGs Desa 3 (6 KPI)', target: '100%', actual: `${DESA_BAB4[2].sdgKPI.sdg3.toFixed(1)}%`, pct: DESA_BAB4[2].sdgKPI.sdg3, status: 'Baik', color: 'bg-teal-500' },
  { name: 'Rerata Gabungan SDGs Desa 3 (18 Unit KPI — Awal 74,70%)', target: '100%', actual: '82,24%', pct: 82.24, status: '+7,55 poin', color: 'bg-indigo-600' },
];

export default function SDGs3Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="SDGs Desa 3 — Desa Sehat dan Sejahtera (Bab IV)" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian Akhir SDGs 3" value="82,24%" satuan="Awal 74,70% (+7,55 poin)" barColor="green" progress={82} />
        <StatCard label="Jonggon Jaya" value="85,5%" satuan="Puskesmas Jonggon Jaya" barColor="blue" progress={86} />
        <StatCard label="Kedang Ipil / Lung Anai" value="80,9% / 80,4%" satuan="Pustu/Polindes & Posyandu" barColor="teal" progress={81} />
        <StatCard label="UAT Tenaga Kesehatan" value="91,30%" satuan="SUS 69,72 · F-029 retest" barColor="orange" progress={91} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} className="text-red-500" /> Capaian 18 Unit KPI SDGs Desa 3 (Tabel 4.45 &amp; Gambar 4.23)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthIndicators.map((ind, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>{ind.name}</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-green-100 text-green-700">{ind.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${ind.color}`} style={{ width: `${ind.pct}%` }} />
                  </div>
                  <div className="w-24 text-right text-xs">
                    <span className="text-slate-400 font-medium">Target: {ind.target}</span>
                    <span className="block font-black text-slate-800">{ind.actual}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle2 size={16} /> Fasilitas &amp; Catatan Bab IV
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <div className="space-y-2">
              {[
                { name: 'Desa Jonggon Jaya', status: 'Puskesmas Jonggon Jaya' },
                { name: 'Desa Kedang Ipil', status: 'Pustu & Polindes' },
                { name: 'Desa Lung Anai', status: 'Posyandu & Layanan Dasar' },
              ].map((pos, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-1.5">
                  <span className="font-semibold text-slate-700">{pos.name}</span>
                  <span className="text-emerald-700 font-bold text-[11px]">{pos.status}</span>
                </div>
              ))}
            </div>
            <p className="p-2.5 bg-amber-50 border border-amber-200 rounded-lg text-[11px] text-amber-900">
              <strong>Tindak Lanjut Kritis (F-029):</strong> Fitur validasi data agregat kesehatan masih memerlukan perbaikan aturan dan uji ulang (retest) sebelum dinyatakan lulus penuh.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
