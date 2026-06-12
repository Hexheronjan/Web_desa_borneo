'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { BarChart3, TrendingUp, CheckCircle } from 'lucide-react';

const COLOR = '#1565c0';

const apkList = [
  { level: 'Sekolah Dasar (SD) / Sederajat', score: 110.0, target: 100.0, status: 'Melampaui Target' },
  { level: 'Sekolah Menengah Pertama (SMP) / Sederajat', score: 100.0, target: 100.0, status: 'Tercapai' },
  { level: 'Sekolah Menengah Atas (SMA) / Sederajat', score: 95.0, target: 98.0, status: 'Mendekati Target' }
];

export default function APKPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="APK (Angka Partisipasi Kasar)" modul="Guru / Fasilitator Belajar" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Skor Rerata APK" value="104.2%" satuan="tingkat kapasitas" barColor="blue" progress={95} />
        <StatCard label="Kapasitas SD" value="110.0%" satuan="melampaui" barColor="green" progress={100} />
        <StatCard label="Kapasitas SMP" value="100.0%" satuan="terpenuhi" barColor="green" progress={100} />
        <StatCard label="Kapasitas SMA" value="95.0%" satuan="cukup" barColor="blue" progress={95} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Grafik APK Angka Tampung Sekolah Menurut Jenjang Belajar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {apkList.map((item, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50">
                <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
                  <span>{item.level}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                    item.score >= 100 ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>{item.status}</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: item.score > 100 ? '100%' : `${item.score}%` }} />
                  </div>
                  <div className="w-20 text-right text-xs">
                    <span className="text-slate-400 font-medium">Target: {item.target}%</span>
                    <span className="block font-black text-slate-800">{item.score}%</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle size={16} /> Interpretasi Angka APK
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>APK di atas 100% (pada jenjang SD & SMP) menunjukkan adanya siswa luar usia sekolah atau siswa pindahan luar desa yang tertampung di fasilitas belajar desa adat.</p>
            <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
              <p className="font-bold text-blue-800 mb-1">Catatan Analitis</p>
              <p>Daya tampung sekolah dasar tergolong sangat mencukupi, namun perlu diimbangi dengan kualitas guru dan buku ajar budaya Kalimantan Tengah.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
