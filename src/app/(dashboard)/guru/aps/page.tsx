'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart3, TrendingUp, CheckCircle } from 'lucide-react';

const COLOR = '#1565c0';

const apsList = [
  { level: 'Sekolah Dasar (SD) / Sederajat', score: 98.0, target: 99.0, status: 'Mendekati Target' },
  { level: 'Sekolah Menengah Pertama (SMP) / Sederajat', score: 90.0, target: 95.0, status: 'Perlu Usaha' },
  { level: 'Sekolah Menengah Atas (SMA) / Sederajat', score: 85.0, target: 90.0, status: 'Perlu Usaha' }
];

export default function APSPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="APS (Angka Partisipasi Sekolah)" modul="Guru / Fasilitator Belajar" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Rerata APS" value="92.5%" satuan="tingkat kehadiran" barColor="blue" progress={92} />
        <StatCard label="Partisipasi SD" value="98.0%" satuan="tertinggi" barColor="green" progress={98} />
        <StatCard label="Partisipasi SMP" value="90.0%" satuan="sedang" barColor="yellow" progress={90} />
        <StatCard label="Partisipasi SMA" value="85.0%" satuan="terendah" barColor="orange" progress={85} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Grafik Partisipasi Pendidikan Berdasarkan Jenjang Sekolah
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {apsList.map((item, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>{item.level}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    item.score >= 95 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                  }`}>{item.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${item.score}%` }} />
                  </div>
                  <div className="w-20 text-right text-xs">
                    <span className="text-slate-400">Target: {item.target}%</span>
                    <span className="block font-black text-slate-800">{item.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle size={16} /> Faktor Penentu Partisipasi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Beberapa kendala utama bagi partisipasi pelajar tingkat menengah (SMP/SMA) di desa adat:</p>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="font-bold text-blue-800 mb-1">Analisis Kendala</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Jarak sekolah menengah cukup jauh (luar desa).</li>
                <li>Transportasi darat/sungai terbatas saat musim hujan.</li>
                <li>Sebagian anak ikut berladang membantu keluarga.</li>
              </ul>
            </div>
            <p className="pt-2 text-[10px] text-slate-400">
              *Evaluasi ini diteruskan ke Dinas PMD Regional sebagai rekomendasi DSS.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
