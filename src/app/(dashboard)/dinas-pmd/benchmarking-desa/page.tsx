'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Award, BarChart3, TrendingUp, Medal } from 'lucide-react';

const COLOR = '#0d47a1';

const benchmarkList = [
  { rank: 1, name: 'Desa Borneo Adat', index: 78.45, status: 'Mandiri', color: '#2e7d32' },
  { rank: 2, name: 'Desa Loksado Adat', index: 77.10, status: 'Mandiri', color: '#1565c0' },
  { rank: 3, name: 'Desa Betang Jaya', index: 75.60, status: 'Maju', color: '#00838f' },
  { rank: 4, name: 'Desa Rungan Sari', index: 74.20, status: 'Maju', color: '#e65100' },
  { rank: 5, name: 'Desa Mentaya Hulu', index: 70.80, status: 'Berkembang', color: '#6a1b9a' }
];

export default function BenchmarkingDesaPage() {
  const maxIndex = Math.max(...benchmarkList.map(b => b.index));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Ranking & Benchmarking Desa" modul="Benchmarking Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Desa Terbaik" value="Borneo Adat" satuan="rank 1" barColor="green" progress={100} />
        <StatCard label="Skor Tertinggi" value="78.45" satuan="index SLV" barColor="blue" progress={78} />
        <StatCard label="Skor Terendah" value="70.80" satuan="pantauan 5 besar" barColor="orange" progress={70} />
        <StatCard label="Gap Indeks" value="7.65" satuan="gap max-min" barColor="red" progress={10} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Benchmarking list */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Medal size={16} /> Pembandingan Lintas Indeks Smart Living Village (SLV)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {benchmarkList.map((item, i) => (
                <div key={item.rank} className={`p-4 border rounded-xl ${
                  item.rank === 1 ? 'bg-amber-50/50 border-amber-300 shadow-sm' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold ${
                        item.rank === 1 ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {item.rank}
                      </span>
                      <p className="font-bold text-slate-800 text-sm md:text-base">{item.name}</p>
                      {item.rank === 1 && (
                        <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          🏆 Peringkat Utama
                        </span>
                      )}
                    </div>
                    <span className="text-sm font-black text-indigo-700 font-mono">{item.index.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700" style={{ width: `${(item.index / maxIndex) * 100}%`, backgroundColor: item.color }} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 w-16 text-right uppercase tracking-wider">{item.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analisis Benchmarking */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Analisis Kesenjangan Regional
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Berdasarkan perbandingan indeks SLV, diperoleh analisis kesenjangan pembangunan berikut:</p>
            <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg">
              <p className="font-bold text-amber-800 mb-1">Gap Teknologi & Literasi</p>
              <p>Desa Rungan Sari dan Mentaya Hulu memiliki gap indeks terbesar pada kesiapan prasarana internet dan literasi digital siswa.</p>
            </div>
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <p className="font-bold text-green-800 mb-1">Keunggulan Budaya & Adat</p>
              <p>Hampir seluruh desa terpantau memiliki skor kelestarian budaya di atas 75%, didorong kepatuhan hukum adat.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
