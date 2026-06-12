'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { CheckCircle2, AlertTriangle, Crosshair, ArrowUpRight } from 'lucide-react';

const COLOR = '#283593';

const kpis = [
  { name: 'Governance (Tata Kelola)', score: 78, target: 80, status: 'Mendekati Target', color: 'bg-indigo-600', textColor: 'text-indigo-600' },
  { name: 'Technology (Teknologi)', score: 72, target: 85, status: 'Butuh Peningkatan', color: 'bg-blue-600', textColor: 'text-blue-600' },
  { name: 'Culture (Kebudayaan Adat)', score: 80, target: 75, status: 'Melampaui Target', color: 'bg-emerald-600', textColor: 'text-emerald-600' },
  { name: 'Sustainability (Lingkungan)', score: 75, target: 80, status: 'Mendekati Target', color: 'bg-green-600', textColor: 'text-green-600' },
  { name: 'Quality of Life (Kualitas Hidup)', score: 77, target: 80, status: 'Mendekati Target', color: 'bg-amber-600', textColor: 'text-amber-600' }
];

export default function KPIAppPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="KPI Smart Living" modul="Pemdes / Kepala Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Governance" value="78%" satuan="aktual" barColor="purple" progress={78} />
        <StatCard label="Technology" value="72%" satuan="aktual" barColor="blue" progress={72} />
        <StatCard label="Culture" value="80%" satuan="aktual" barColor="teal" progress={80} />
        <StatCard label="Sustainability" value="75%" satuan="aktual" barColor="green" progress={75} />
        <StatCard label="Quality of Life" value="77%" satuan="aktual" barColor="orange" progress={77} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Crosshair size={16} /> Lembar KPI Smart Living Desa Adat Borneo (Target vs Realisasi)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {kpis.map((k, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-2">
                  <span>{k.name}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    k.status === 'Melampaui Target' ? 'bg-green-100 text-green-700' :
                    k.status === 'Mendekati Target' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>{k.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden relative">
                    <div className={`h-full rounded-full ${k.color} transition-all`} style={{ width: `${k.score}%` }} />
                    <div className="absolute top-0 h-full w-0.5 bg-red-500" style={{ left: `${k.target}%` }} title={`Target: ${k.target}%`} />
                  </div>
                  <div className="w-20 text-right text-xs">
                    <span className="text-slate-400">Target: {k.target}%</span>
                    <span className="block font-black text-slate-800">{k.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Rencana Tindak Lanjut
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Rekomendasi peningkatan berdasarkan evaluasi KPI:</p>
            <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
              <p className="font-bold text-red-800 mb-1">Dimensi Smart Tech (72% / 85%)</p>
              <p>Diperlukan pengadaan program training komputer dan website warga bagi aparatur desa & guru.</p>
            </div>
            <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-lg">
              <p className="font-bold text-emerald-800 mb-1">Dimensi Smart Culture (80% / 75%)</p>
              <p>Target terlampaui. Pertahankan kegiatan musyawarah adat bulanan dan pelihara dokumen hukum adat.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
