'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Award, Sparkles, TrendingUp } from 'lucide-react';
import { DESA_BAB4, RUBRIK_KEMATANGAN_DIMENSI } from '@/lib/bab4-data';

const COLOR = '#1a237e';

const maturityLevels = [
  { level: 1, name: 'Rintisan (Initial)', range: '1,00 – 1,79', desc: 'Proses digital bersifat ad-hoc, data terpisah, dan belum terdokumentasi.', current: false },
  { level: 2, name: 'Berkembang (Developing)', range: '1,80 – 2,79', desc: 'Pengelolaan mulai terstruktur lintas peran, standar data dan dasbor SDGs mulai dipakai, namun masih memerlukan penguatan konektivitas & konsistensi SOP.', current: true },
  { level: 3, name: 'Terdefinisi (Defined)', range: '2,80 – 3,59', desc: 'Prosedur, integrasi data lintas sektor, dan persetujuan adat terdokumentasi serta berjalan konsisten di seluruh desa.', current: false },
  { level: 4, name: 'Terkelola Kuantitatif (Managed)', range: '3,60 – 4,39', desc: 'Kinerja layanan dan SDGs Desa dipantau secara kuantitatif berkelanjutan untuk perbaikan keputusan.', current: false },
  { level: 5, name: 'Optimum (Optimizing)', range: '4,40 – 5,00', desc: 'Inovasi berkelanjutan berbasis bukti, tata kelola adat terjaga, dan layanan terpadu inklusif.', current: false },
];

export default function MaturityAssessmentPage() {
  const colors = ['bg-indigo-600', 'bg-blue-600', 'bg-purple-600', 'bg-teal-600', 'bg-amber-600', 'bg-green-600'];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Maturity Assessment (Rubrik 6 Dimensi M1–M6)" modul="Evaluasi Kematangan Digital (Dataset SLV 3)" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kematangan Individu (N=121)" value="2,53" satuan="Pra 1,94 → Pasca 2,53 (+0,59)" barColor="yellow" progress={51} />
        <StatCard label="Jonggon Jaya (Rubrik)" value="2,68" satuan="Pra 2,21 → Pasca 2,68 (+0,47)" barColor="blue" progress={54} />
        <StatCard label="Kedang Ipil (Rubrik)" value="2,40" satuan="Pra 1,90 → Pasca 2,40 (+0,51)" barColor="purple" progress={48} />
        <StatCard label="Lung Anai (Rubrik)" value="2,43" satuan="Pra 1,80 → Pasca 2,43 (+0,63)" barColor="green" progress={49} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Tingkat Kematangan Digital Smart Living Village (Skala 1–5)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative border-l-2 border-slate-200 pl-6 ml-4 space-y-4">
              {maturityLevels.map((ml) => (
                <div key={ml.level} className="relative">
                  <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    ml.current
                      ? 'bg-amber-500 border-amber-500 scale-125'
                      : ml.level < 2
                        ? 'bg-indigo-700 border-indigo-700'
                        : 'bg-white border-slate-300'
                  }`}>
                    {ml.current && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                  </div>

                  <div className={`p-3.5 rounded-xl border ${
                    ml.current ? 'bg-amber-50/50 border-amber-300 shadow-sm' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between items-center mb-1">
                      <p className={`text-xs font-black uppercase tracking-wide ${ml.current ? 'text-amber-700' : 'text-slate-500'}`}>
                        Level {ml.level} — {ml.name} ({ml.range})
                      </p>
                      {ml.current && (
                        <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles size={10} /> Posisi 3 Desa (Pasca RQ3)
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{ml.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Skor Rubrik Pasca per Dimensi (M1–M6)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3.5">
            {RUBRIK_KEMATANGAN_DIMENSI.map((item, i) => {
              const avg = (item.jonggonJaya + item.kedangIpil + item.lungAnai) / 3;
              return (
                <div key={item.kode}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-700 font-semibold">{item.kode} — {item.nama}</span>
                    <span className="font-bold text-slate-800 font-mono">{avg.toFixed(2)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${colors[i]}`} style={{ width: `${(avg / 5) * 100}%` }} />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    JJ: {item.jonggonJaya.toFixed(2)} · KI: {item.kedangIpil.toFixed(2)} · LA: {item.lungAnai.toFixed(2)}
                  </p>
                </div>
              );
            })}
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-[11px] text-slate-700 leading-normal mt-2">
              <strong>Ringkasan Bab IV:</strong> Ketiga desa meningkat signifikan pada fase pasca-uji 4 minggu (<em>p</em> Holm = 2,56 × 10⁻¹⁶; N=121 complete-case), namun seluruhnya masih berada pada tahap <strong>Berkembang</strong> ({DESA_BAB4.map(d => `${d.nama.replace('Desa ', '')} ${d.kematanganPasca.toFixed(2)}`).join('; ')}).
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
