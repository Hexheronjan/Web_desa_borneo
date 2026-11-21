'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Award, ListOrdered } from 'lucide-react';
import { DESA_BAB4, RUBRIK_KEMATANGAN_DIMENSI } from '@/lib/bab4-data';

const COLOR = '#37474f';

const maturityStages = [
  { level: 1, name: 'Rintisan (1,00–1,79)', desc: 'Proses belum terdokumentasi dan berjalan ad-hoc di masing-masing unit.' },
  { level: 2, name: 'Berkembang (1,80–2,79)', desc: 'Dasbor lintas peran, standar data, dan pemantauan SDGs mulai digunakan rutin; masih perlu penguatan konsistensi SOP & konektivitas.', current: true },
  { level: 3, name: 'Terdefinisi (2,80–3,59)', desc: 'Prosedur, integrasi data, dan perlindungan data budaya terdokumentasi dan berjalan konsisten.' },
  { level: 4, name: 'Terkelola Kuantitatif (3,60–4,39)', desc: 'Layanan dan SDGs diukur kuantitatif secara berkala untuk pengendalian kinerja.' },
  { level: 5, name: 'Optimum (4,40–5,00)', desc: 'Inovasi berkelanjutan berbasis bukti, inklusif, dan berdaulat adat.' },
];

export default function PenilaianMaturityPage() {
  const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-purple-600', 'bg-teal-600', 'bg-amber-600', 'bg-green-600'];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Penilaian Tingkat Kematangan Digital (M1–M6)" modul="Evaluasi RQ3 — Dataset SLV 3" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kematangan Individu (N=121)" value="2,53" satuan="Pra 1,94 (+0,59) · Berkembang" barColor="yellow" progress={51} />
        <StatCard label="Jonggon Jaya" value="2,68" satuan="Pra 2,21 → Pasca 2,68 (+0,47)" barColor="blue" progress={54} />
        <StatCard label="Kedang Ipil" value="2,40" satuan="Pra 1,90 → Pasca 2,40 (+0,51)" barColor="green" progress={48} />
        <StatCard label="Lung Anai" value="2,43" satuan="Pra 1,80 → Pasca 2,43 (+0,63)" barColor="purple" progress={49} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Skala Kematangan Digital Smart Living Village (Level 1–5)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {maturityStages.map((stage) => (
              <div
                key={stage.level}
                className={`p-3 border rounded-xl flex gap-4 items-center ${
                  stage.current ? 'bg-amber-50/50 border-amber-300 shadow-sm' : 'bg-white border-slate-200'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                    stage.current ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  L{stage.level}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800">{stage.name}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-normal">{stage.desc}</p>
                </div>
                {stage.current && (
                  <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
                    Posisi 3 Desa
                  </span>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ListOrdered size={16} /> Skor Rubrik Pasca per Dimensi (M1–M6)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {RUBRIK_KEMATANGAN_DIMENSI.map((item, i) => {
              const avg = (item.jonggonJaya + item.kedangIpil + item.lungAnai) / 3;
              return (
                <div key={item.kode}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 font-medium">{item.kode} — {item.nama}</span>
                    <span className="font-bold text-slate-800 font-mono">{avg.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${colors[i]}`} style={{ width: `${(avg / 5) * 100}%` }} />
                  </div>
                </div>
              );
            })}
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-[11px] text-indigo-950 leading-normal mt-2">
              <strong>Kesimpulan Bab IV:</strong> Ketiga desa ({DESA_BAB4.map(d => `${d.nama.replace('Desa ', '')} ${d.kematanganPasca.toFixed(2)}`).join(', ')}) naik signifikan (<em>p</em> Holm = 2,56×10⁻¹⁶) namun tetap pada tahap <strong>Berkembang</strong> dan memerlukan pendampingan lanjutan menuju tahap <em>Terdefinisi</em>.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
