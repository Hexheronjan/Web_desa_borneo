'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, Award } from 'lucide-react';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#283593';

const culturalIndicators = [
  { name: 'Desa Lung Anai — Capaian KPI SDGs Desa 18 (Desa Budaya Dayak Kenyah)', target: '100%', actual: `${DESA_BAB4[2].sdgKPI.sdg18.toFixed(1)}%`, pct: DESA_BAB4[2].sdgKPI.sdg18, status: 'Tertinggi', color: 'bg-green-600' },
  { name: 'Desa Jonggon Jaya — Capaian KPI SDGs Desa 18 (6 KPI)', target: '100%', actual: `${DESA_BAB4[0].sdgKPI.sdg18.toFixed(1)}%`, pct: DESA_BAB4[0].sdgKPI.sdg18, status: 'Baik', color: 'bg-indigo-600' },
  { name: 'Desa Kedang Ipil — Capaian KPI SDGs Desa 18 (Kutai Adat Lawas)', target: '100%', actual: `${DESA_BAB4[1].sdgKPI.sdg18.toFixed(1)}%`, pct: DESA_BAB4[1].sdgKPI.sdg18, status: 'Baik', color: 'bg-purple-600' },
  { name: 'Rerata Gabungan SDGs Desa 18 (18 Unit KPI — Awal 76,92%)', target: '100%', actual: '84,86%', pct: 84.86, status: '+7,94 poin', color: 'bg-amber-600' },
];

export default function SDGs18Page() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="SDGs Desa 18 — Kelembagaan Desa Dinamis & Budaya Adaptif (Bab IV)" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Capaian Akhir SDGs 18" value="84,86%" satuan="Awal 76,92% (+7,94 poin)" barColor="purple" progress={85} />
        <StatCard label="Lung Anai (D5: 89,73)" value="87,4%" satuan="Desa Budaya sejak 2007" barColor="green" progress={87} />
        <StatCard label="Jonggon Jaya / Kedang Ipil" value="83,7% / 83,5%" satuan="D5: 73,05 / 86,58" barColor="blue" progress={84} />
        <StatCard label="UAT Lembaga Adat (N=18)" value="86,81%" satuan="SUS 63,61 · M6 2,60/5" barColor="orange" progress={87} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} className="text-amber-600" /> Capaian 18 Unit KPI SDGs Desa 18 (Tabel 4.45 &amp; Gambar 4.23)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {culturalIndicators.map((ind, i) => (
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
              <Award size={16} /> Perlindungan Data Budaya (D5: I17–I20)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Kewenangan adat menjadi bagian internal tata kelola data dan musyawarah pada 3 desa penelitian:</p>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg space-y-1 text-slate-700">
              <p className="font-bold text-amber-800">Mekanisme Tata Kelola Adat:</p>
              <ul className="list-disc pl-4 space-y-1">
                <li>Persetujuan komunitas &amp; verifikasi Lembaga Adat (I17)</li>
                <li>Musyawarah multiaktor penetapan prioritas (I18)</li>
                <li>Klasifikasi data: Publik / Terbatas / Rahasia + Audit Trail (I19)</li>
                <li>Dokumentasi &amp; regenerasi pengetahuan lokal Dayak Kenyah &amp; Kutai Adat Lawas (I20)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
