'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { DESA_BAB4 } from '@/lib/bab4-data';

const COLOR = '#1a237e';

const sdgDetails = [
  {
    num: 'SDGs Desa 3',
    title: 'Desa Sehat dan Sejahtera',
    desc: 'Pemantauan 18 unit KPI kesehatan lintas 3 desa (Posyandu, ANC, imunisasi, rujukan, pemantauan balita/stunting, dan respons peringatan dini).',
    awal: 74.70,
    achieved: 82.24,
    color: '#2e7d32',
    indicators: [
      { name: 'Desa Jonggon Jaya (Pasca Uji 4 Minggu)', pct: DESA_BAB4[0].sdgKPI.sdg3 },
      { name: 'Desa Kedang Ipil (Pasca Uji 4 Minggu)', pct: DESA_BAB4[1].sdgKPI.sdg3 },
      { name: 'Desa Lung Anai (Pasca Uji 4 Minggu)', pct: DESA_BAB4[2].sdgKPI.sdg3 },
      { name: 'Rerata Gabungan SDGs 3 (Awal 74,70% → Akhir 82,24%)', pct: 82.24 },
    ],
  },
  {
    num: 'SDGs Desa 4',
    title: 'Pendidikan Desa Berkualitas',
    desc: 'Pemantauan 18 unit KPI pendidikan & literasi digital lintas 3 desa. Memerlukan penguatan pendampingan guru dan panduan tugas sederhana.',
    awal: 66.68,
    achieved: 74.90,
    color: '#1565c0',
    indicators: [
      { name: 'Desa Jonggon Jaya (Pasca Uji 4 Minggu)', pct: DESA_BAB4[0].sdgKPI.sdg4 },
      { name: 'Desa Kedang Ipil (Pasca Uji 4 Minggu)', pct: DESA_BAB4[1].sdgKPI.sdg4 },
      { name: 'Desa Lung Anai (Pasca Uji 4 Minggu)', pct: DESA_BAB4[2].sdgKPI.sdg4 },
      { name: 'Rerata Gabungan SDGs 4 (Awal 66,68% → Akhir 74,90%)', pct: 74.90 },
    ],
  },
  {
    num: 'SDGs Desa 18',
    title: 'Kelembagaan Desa Dinamis & Budaya Desa Adaptif',
    desc: 'Pemantauan 18 unit KPI kelembagaan adat, persetujuan & klasifikasi data budaya (publik/terbatas/rahasia), serta musyawarah multiaktor.',
    awal: 76.92,
    achieved: 84.86,
    color: '#6a1b9a',
    indicators: [
      { name: 'Desa Jonggon Jaya (Pasca Uji 4 Minggu)', pct: DESA_BAB4[0].sdgKPI.sdg18 },
      { name: 'Desa Kedang Ipil (Pasca Uji 4 Minggu)', pct: DESA_BAB4[1].sdgKPI.sdg18 },
      { name: 'Desa Lung Anai (Pasca Uji 4 Minggu)', pct: DESA_BAB4[2].sdgKPI.sdg18 },
      { name: 'Rerata Gabungan SDGs 18 (Awal 76,92% → Akhir 84,86%)', pct: 84.86 },
    ],
  },
];

export default function SDGsDesaPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Capaian SDGs Desa 3, 4, dan 18 (54 Unit KPI)" modul="Pemantauan SDGs Desa — Bab IV" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="SDGs 3 — Kesehatan" value="82,24%" satuan="Awal 74,70% (+7,55 poin)" barColor="green" progress={82} />
        <StatCard label="SDGs 4 — Pendidikan" value="74,90%" satuan="Awal 66,68% (+8,22 poin)" barColor="blue" progress={75} />
        <StatCard label="SDGs 18 — Budaya & Adat" value="84,86%" satuan="Awal 76,92% (+7,94 poin)" barColor="purple" progress={85} />
        <StatCard label="Rerata 54 Unit KPI" value="80,67%" satuan="Awal 72,76% (+7,90 poin)" barColor="orange" progress={81} />
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
                  <span className="text-2xl font-black" style={{ color: sdg.color }}>{sdg.achieved.toFixed(2)}%</span>
                  <span className="text-[10px] text-slate-500 block font-medium">Awal: {sdg.awal.toFixed(2)}% (Δ +{(sdg.achieved - sdg.awal).toFixed(2)}%)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sdg.indicators.map((ind, idx) => (
                  <div key={idx} className="p-3 border rounded-lg bg-slate-50 flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-slate-700">{ind.name}</span>
                      <span className="text-xs font-extrabold" style={{ color: sdg.color }}>{ind.pct.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.min(100, ind.pct)}%`, backgroundColor: sdg.color }} />
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
