'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Layers, ShieldCheck, Cpu, Landmark, Leaf, Smile } from 'lucide-react';

const COLOR = '#1a237e';

const dimensions = [
  {
    name: 'Smart Governance (Tata Kelola)',
    icon: ShieldCheck,
    score: 78.4,
    target: 80.0,
    color: 'bg-indigo-600',
    text: 'text-indigo-600',
    indicators: [
      { name: 'Kesiapan Regulasi Adat & Desa', value: 85 },
      { name: 'Akuntabilitas Transparansi Anggaran', value: 80 },
      { name: 'Partisipasi Warga dalam Musyawarah', value: 70 }
    ]
  },
  {
    name: 'Smart Technology (Teknologi)',
    icon: Cpu,
    score: 72.0,
    target: 85.0,
    color: 'bg-blue-600',
    text: 'text-blue-600',
    indicators: [
      { name: 'Ketersediaan Jaringan Internet', value: 65 },
      { name: 'Literasi Digital Pengguna Layanan', value: 48 },
      { name: 'Integrasi Aplikasi Portal Warga', value: 88 }
    ]
  },
  {
    name: 'Smart Culture (Budaya & Adat)',
    icon: Landmark,
    score: 80.0,
    target: 75.0,
    color: 'bg-teal-600',
    text: 'text-teal-600',
    indicators: [
      { name: 'Arsip Kelembagaan & Hukum Adat', value: 80 },
      { name: 'Pelestarian Kawasan Huma Betang', value: 85 },
      { name: 'Keaktifan Musyawarah & Adat', value: 90 }
    ]
  },
  {
    name: 'Smart Sustainability (Lingkungan)',
    icon: Leaf,
    score: 75.0,
    target: 80.0,
    color: 'bg-green-600',
    text: 'text-green-600',
    indicators: [
      { name: 'Penggunaan Energi Terbarukan (Solar)', value: 35 },
      { name: 'Pengelolaan Sampah Terpadu', value: 62 },
      { name: 'Akses Sanitasi & Air Bersih Layak', value: 88 }
    ]
  },
  {
    name: 'Quality of Life (Kualitas Hidup)',
    icon: Smile,
    score: 76.8,
    target: 80.0,
    color: 'bg-amber-600',
    text: 'text-amber-600',
    indicators: [
      { name: 'Layanan Kesehatan Posyandu & KIA', value: 85 },
      { name: 'Fasilitas Pendidikan Dasar Layak', pct: 70, value: 72 },
      { name: 'Tingkat Kepuasan Hidup Warga', value: 76.8 }
    ]
  }
];

export default function IndikatorSmartLivingPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Indikator Smart Living" modul="Modul 7: Indikator Smart Living" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <StatCard label="Governance" value="78.4" satuan="skor" barColor="purple" progress={78} />
        <StatCard label="Technology" value="72.0" satuan="skor" barColor="blue" progress={72} />
        <StatCard label="Culture" value="80.0" satuan="skor" barColor="teal" progress={80} />
        <StatCard label="Sustainability" value="75.0" satuan="skor" barColor="green" progress={75} />
        <StatCard label="Quality of Life" value="76.8" satuan="skor" barColor="orange" progress={77} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {dimensions.map((dim, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="border-b">
              <div className="flex items-center gap-2.5">
                <div className={`p-2 rounded-lg bg-slate-50 ${dim.text}`}>
                  <dim.icon size={18} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-sm font-bold text-slate-800">{dim.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                    <span>Target: {dim.target.toFixed(1)}</span>
                    <span>•</span>
                    <span className="font-semibold text-slate-600">Aktual: {dim.score.toFixed(1)}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`text-lg font-black ${dim.text}`}>{dim.score.toFixed(1)}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                {dim.indicators.map((ind, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-600 font-medium">{ind.name}</span>
                      <span className="font-bold text-slate-800">{ind.value}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${dim.color} transition-all duration-500`} style={{ width: `${ind.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
