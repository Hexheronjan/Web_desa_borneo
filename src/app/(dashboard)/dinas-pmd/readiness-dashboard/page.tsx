'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Layers, Landmark, TrendingUp } from 'lucide-react';

const COLOR = '#0d47a1';

const readinessList = [
  { rank: 1, name: 'Desa Borneo Adat', score: 75.20, status: 'Sangat Siap' },
  { rank: 2, name: 'Desa Loksado Adat', score: 74.00, status: 'Sangat Siap' },
  { rank: 3, name: 'Desa Betang Jaya', score: 73.15, status: 'Siap' },
  { rank: 4, name: 'Desa Rungan Sari', score: 71.50, status: 'Siap' },
  { rank: 5, name: 'Desa Mentaya Hulu', score: 68.20, status: 'Cukup Siap' }
];

export default function ReadinessDashboardPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Readiness Dashboard Regional" modul="Readiness Assessment" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Rerata Kesiapan" value="75.20" satuan="skor regional" barColor="teal" progress={75} />
        <StatCard label="Status Kesiapan" value="Siap" satuan="menengah-tinggi" barColor="green" progress={80} />
        <StatCard label="Desa Terunggul" value="Borneo Adat" satuan="skor 75.20" barColor="blue" progress={100} />
        <StatCard label="Desa Perlu Dukungan" value="Mentaya Hulu" satuan="skor 68.20" barColor="orange" progress={68} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Layers size={16} /> Pembandingan Skor Kesiapan (Readiness Assessment) Lintas Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">Rank</th>
                    <th className="pb-2 pr-4">Nama Desa Adat</th>
                    <th className="pb-2 pr-4 text-right">Skor Kesiapan</th>
                    <th className="pb-2 text-center">Status Kelayakan</th>
                  </tr>
                </thead>
                <tbody>
                  {readinessList.map((d, i) => (
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
                          d.status === 'Sangat Siap' ? 'bg-green-100 text-green-700' :
                          d.status === 'Siap' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
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
              <TrendingUp size={16} /> Intervensi Dinas PMD
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Rencana peningkatan kesiapan infrastruktur untuk desa-desa di bawah 70.00:</p>
            <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg">
              <p className="font-bold text-indigo-800 mb-1">Bantuan VSAT 2026/2027</p>
              <p>Prioritaskan pemasangan satelit VSAT cadangan untuk Desa Mentaya Hulu dan Tewah Baru menggunakan dana APBD Provinsi.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
