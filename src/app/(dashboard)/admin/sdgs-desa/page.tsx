'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Award, Target, Heart, BookOpen, Landmark, ChevronRight } from 'lucide-react';

const COLOR = '#1a237e';

const sdgDetails = [
  {
    num: 'SDGs 3',
    title: 'Kehidupan Sehat dan Sejahtera',
    desc: 'Memastikan kehidupan yang sehat dan mendukung kesejahteraan bagi semua usia di desa.',
    achieved: 82,
    color: '#2e7d32',
    indicators: [
      { name: 'Akses Layanan Posyandu Balita', pct: 90 },
      { name: 'Ketersediaan Tenaga Kesehatan Desa', pct: 85 },
      { name: 'Persentase Ibu Hamil Terpantau', pct: 92 },
      { name: 'Penurunan Angka Stunting Balita', pct: 61 }
    ]
  },
  {
    num: 'SDGs 4',
    title: 'Pendidikan Berkualitas',
    desc: 'Menjamin pendidikan berkualitas yang inklusif dan merata serta meningkatkan kesempatan belajar sepanjang hayat.',
    achieved: 75,
    color: '#1565c0',
    indicators: [
      { name: 'Angka Partisipasi Sekolah (APS)', pct: 92.5 },
      { name: 'Angka Partisipasi Kasar (APK)', pct: 104.2 },
      { name: 'Fasilitas Pendidikan yang Layak', pct: 70 },
      { name: 'Tingkat Literasi Digital Penduduk', pct: 48 }
    ]
  },
  {
    num: 'SDGs 18',
    title: 'Kelembagaan Adat & Kelestarian Budaya',
    desc: 'Melestarikan kebudayaan Dayak lokal, arsitektur adat, serta memperkokoh peran kelembagaan adat desa.',
    achieved: 80,
    color: '#e65100',
    indicators: [
      { name: 'Pelestarian Rumah Adat (Huma Betang)', pct: 85 },
      { name: 'Ketersediaan Arsip Adat & Digital Budaya', pct: 78 },
      { name: 'Musyawarah Adat yang Aktif', pct: 90 },
      { name: 'Kegiatan Adat & Festival Tahunan', pct: 67 }
    ]
  }
];

export default function SDGsDesaPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Capaian SDGs Desa" modul="Modul 5: SDGs Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="SDGs 3 — Sehat" value="82%" satuan="kesehatan" barColor="green" progress={82} />
        <StatCard label="SDGs 4 — Belajar" value="75%" satuan="pendidikan" barColor="blue" progress={75} />
        <StatCard label="SDGs 18 — Budaya" value="80%" satuan="kearifan lokal" barColor="orange" progress={80} />
        <StatCard label="Rerata Capaian" value="79%" satuan="target 85%" barColor="purple" progress={79} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        {sdgDetails.map((sdg, i) => (
          <Card key={i}>
            <CardHeader className="border-b">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-md text-white" style={{ backgroundColor: sdg.color }}>
                      {sdg.num}
                    </span>
                    <CardTitle className="text-base font-bold text-slate-800">{sdg.title}</CardTitle>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{sdg.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black" style={{ color: sdg.color }}>{sdg.achieved}%</span>
                  <span className="text-[10px] text-slate-400 block font-medium">terpenuhi</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sdg.indicators.map((ind, idx) => (
                  <div key={idx} className="p-3 border rounded-lg bg-slate-50 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-700">{ind.name}</span>
                      <span className="text-xs font-extrabold" style={{ color: sdg.color }}>{ind.pct}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${ind.pct}%`, backgroundColor: sdg.color }} />
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
