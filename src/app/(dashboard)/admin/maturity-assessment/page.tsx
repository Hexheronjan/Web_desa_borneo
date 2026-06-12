'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Award, ShieldAlert, Sparkles, TrendingUp } from 'lucide-react';

const COLOR = '#1a237e';

const maturityLevels = [
  { level: 1, name: 'Initial (Rintisan)', desc: 'Proses smart village bersifat ad-hoc, tidak terdokumentasi, dan dilakukan secara reaktif.', current: false },
  { level: 2, name: 'Managed (Terkelola)', desc: 'Proses mulai terencana dan terpantau dasar. Data dikumpulkan namun masih terisolasi.', current: false },
  { level: 3, name: 'Defined (Terdefinisi)', desc: 'Standardisasi proses smart village telah terdokumentasi di seluruh level desa. Integrasi data SID berjalan.', current: true },
  { level: 4, name: 'Quantitatively Managed (Terkontrol)', desc: 'Kinerja layanan diukur secara kuantitatif melalui indikator/KPI dashboard terstruktur.', current: false },
  { level: 5, name: 'Optimizing (Optimum)', desc: 'Fokus pada inovasi berkelanjutan dan optimalisasi otomatis melalui teknologi AI / DSS cerdas.', current: false }
];

export default function MaturityAssessmentPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Maturity Assessment" modul="Modul 10: Kematangan Smart Living" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Maturity Level" value="3.25" satuan="Level 3 (Defined)" barColor="yellow" progress={65} />
        <StatCard label="Target 2027" value="Level 4.0" satuan="Terkontrol" barColor="blue" progress={80} />
        <StatCard label="Indikator Terisi" value="38 / 60" satuan="modul tercover" barColor="purple" progress={63} />
        <StatCard label="Tingkat Kemajuan" value="+15%" satuan="vs tahun lalu" barColor="green" progress={75} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Skala Tingkat Kematangan Smart Village (CMMI-Based)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative border-l-2 border-slate-200 pl-6 ml-4 space-y-6">
              {maturityLevels.map((ml) => (
                <div key={ml.level} className="relative">
                  {/* node dot */}
                  <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    ml.current 
                      ? 'bg-amber-500 border-amber-500 scale-125' 
                      : ml.level < 3 
                        ? 'bg-indigo-700 border-indigo-700' 
                        : 'bg-white border-slate-300'
                  }`}>
                    {ml.current && <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />}
                  </div>
                  
                  <div className={`p-4 rounded-xl border ${
                    ml.current 
                      ? 'bg-amber-50/50 border-amber-300 shadow-sm' 
                      : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between items-center mb-1">
                      <p className={`text-xs font-black uppercase tracking-wide ${ml.current ? 'text-amber-700' : 'text-slate-500'}`}>
                        Level {ml.level} — {ml.name}
                      </p>
                      {ml.current && (
                        <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Sparkles size={10} /> Posisi Saat Ini
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
              <TrendingUp size={16} /> Skor Kematangan Per Kategori
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { cat: 'Governance (Tata Kelola)', score: 3.50, color: 'bg-indigo-600' },
              { cat: 'Technology (Teknologi)', score: 3.00, color: 'bg-blue-600' },
              { cat: 'Infrastructure (Prasarana)', score: 3.20, color: 'bg-purple-600' },
              { cat: 'Human Capital (SDM)', score: 3.40, color: 'bg-teal-600' },
              { cat: 'Culture (Budaya Local)', score: 3.15, color: 'bg-green-600' }
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600 font-medium">{item.cat}</span>
                  <span className="font-bold text-slate-800 font-mono">{item.score.toFixed(2)}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${(item.score / 5) * 100}%` }} />
                </div>
              </div>
            ))}
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg text-xs mt-2 text-slate-600 leading-normal">
              Rata-rata tertimbang kematangan adalah <strong>3.25</strong>. Untuk naik ke Level 4, desa harus mengimplementasikan SOP digitalisasi berdasar pengukuran metrik berkala pada semua layanan.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
