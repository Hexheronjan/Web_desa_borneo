'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Award, Landmark, TrendingUp } from 'lucide-react';

const COLOR = '#0d47a1';

const maturityList = [
  { rank: 1, name: 'Desa Borneo Adat', score: 3.25, status: 'Level 3 (Defined)' },
  { rank: 2, name: 'Desa Loksado Adat', score: 3.10, status: 'Level 3 (Defined)' },
  { rank: 3, name: 'Desa Betang Jaya', score: 3.00, status: 'Level 3 (Defined)' },
  { rank: 4, name: 'Desa Rungan Sari', score: 2.95, status: 'Level 2 (Managed)' },
  { rank: 5, name: 'Desa Mentaya Hulu', score: 2.80, status: 'Level 2 (Managed)' }
];

export default function MaturityDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Maturity Dashboard Regional" modul="Maturity Assessment" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Rerata Maturity" value="3.25" satuan="level regional" barColor="purple" progress={65} />
        <StatCard label="Maturity Status" value="Defined" satuan="Level 3" barColor="blue" progress={60} />
        <StatCard label="Desa Terunggul" value="Borneo Adat" satuan="skor 3.25" barColor="green" progress={100} />
        <StatCard label="Target Regional" value="Level 4.0" satuan="Terkontrol" barColor="blue" progress={80} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Award size={16} /> Pembandingan Tingkat Kematangan (Maturity Level) Lintas Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">Rank</th>
                    <th className="pb-2 pr-4">Nama Desa Adat</th>
                    <th className="pb-2 pr-4 text-right">Maturity Score</th>
                    <th className="pb-2 text-center">Status Kelayakan</th>
                  </tr>
                </thead>
                <tbody>
                  {maturityList.map((d, i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center">
                        <span className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold mx-auto">
                          {d.rank}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{d.name}</td>
                      <td className="py-2.5 pr-4 text-right font-bold font-mono text-xs text-indigo-700">{d.score.toFixed(2)}</td>
                      <td className="py-2.5 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          d.status.includes('Level 3') ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Standardisasi Mutu
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Dinas PMD memonitoring tata kelola standardisasi agar tercapai kematangan optimal:</p>
            <div className="p-3 bg-purple-50 border border-purple-100 rounded-lg">
              <p className="font-bold text-purple-800 mb-1">Standardisasi SOP Digital</p>
              <p>Mendorong desa-desa tingkat 2 untuk menyusun regulasi tertulis operasional sistem informasi desa agar naik ke tingkat 3.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
