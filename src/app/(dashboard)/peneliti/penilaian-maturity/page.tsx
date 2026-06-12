'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Award, CheckCircle, ListOrdered } from 'lucide-react';

const COLOR = '#37474f';

const maturityStages = [
  { level: 1, name: 'Initial', desc: 'Proses tidak terdokumentasi, dilakukan secara reaktif (ad-hoc).' },
  { level: 2, name: 'Managed', desc: 'Proses direncanakan dan dipantau dasar, pengumpulan data terisolasi.' },
  { level: 3, name: 'Defined', desc: 'Standardisasi proses smart village telah terdokumentasi formal.', current: true },
  { level: 4, name: 'Quantitatively Managed', desc: 'Layanan diukur kuantitatif via indikator KPI terstruktur.' },
  { level: 5, name: 'Optimizing', desc: 'Fokus inovasi berkelanjutan dan optimalisasi otomatis via AI/DSS.' }
];

const dimensionScores = [
  { name: 'Governance (Tata Kelola)', score: 3.50, color: 'bg-indigo-600' },
  { name: 'Technology (Teknologi)', score: 3.00, color: 'bg-blue-600' },
  { name: 'Infrastructure (Prasarana)', score: 3.20, color: 'bg-purple-600' },
  { name: 'Human Capital (SDM)', score: 3.40, color: 'bg-teal-600' },
  { name: 'Culture (Budaya Adat)', score: 3.15, color: 'bg-green-600' }
];

export default function PenilaianMaturityPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Penilaian Maturity Level" modul="Maturity Assessment" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Maturity Level" value="3.25" satuan="Level 3 (Defined)" barColor="yellow" progress={65} />
        <StatCard label="Skor Maksimum" value="5.00" satuan="skor CMMI" barColor="blue" progress={100} />
        <StatCard label="Dimensi Dievaluasi" value={5} satuan="dimensi aspek" barColor="green" progress={100} />
        <StatCard label="Tingkat Pemenuhan" value="65%" satuan="rata-rata" barColor="purple" progress={65} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Maturity stages list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Skala Kematangan CMMI Smart Village Desa Adat
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {maturityStages.map((stage) => (
              <div key={stage.level} className={`p-3 border rounded-xl flex gap-4 items-center ${
                stage.current ? 'bg-amber-50/50 border-amber-300 shadow-sm' : 'bg-white border-slate-200'
              }`}>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                  stage.current ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  L{stage.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">{stage.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{stage.desc}</p>
                </div>
                {stage.current && (
                  <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                    Posiisi Sekarang
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Dimension scores */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Skor Kematangan Per Dimensi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dimensionScores.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{item.name}</span>
                  <span className="font-bold text-slate-800 font-mono">{item.score.toFixed(2)}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.score / 5) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-[11px] text-indigo-950 leading-normal mt-4">
              <strong>Kesimpulan Evaluator:</strong> Rata-rata kematangan di level 3.25. Aspek Teknologi (3.00) membutuhkan percepatan SOP digital untuk melangkah ke Level 4.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
