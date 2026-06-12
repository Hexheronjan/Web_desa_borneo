'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, CheckCircle2, TrendingUp, AlertTriangle } from 'lucide-react';

const COLOR = '#e65100';

const stuntingCases = [
  { no: 1, nama: 'Clara Dayak', usia: '25 Bulan', bb: '9.2 kg', tb: '76 cm', gizi: 'Stunting', penanganan: 'Pemberian Makanan Tambahan (PMT) Susu & Telur' },
  { no: 2, nama: 'Dewi Lestari', usia: '30 Bulan', bb: '9.8 kg', tb: '79 cm', gizi: 'Gizi Kurang', penanganan: 'Konseling Bidan Desa & Pantauan Ibu' },
  { no: 3, nama: 'Rudi Hartono', usia: '18 Bulan', bb: '8.4 kg', tb: '69 cm', gizi: 'Stunting', penanganan: 'PMT Susu, Vitamin, & Pantauan Puskesmas' }
];

export default function StuntingPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pantauan Stunting" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Stunting Rate" value="14.0%" satuan="skor pencapaian" barColor="green" progress={86} />
        <StatCard label="Target Nasional" value="&lt; 14%" satuan="memenuhi target" barColor="green" progress={100} />
        <StatCard label="Balita Terpantau" value={120} satuan="balita" barColor="orange" progress={90} />
        <StatCard label="Kasus Ditangani" value={3} satuan="balita" barColor="blue" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Daftar Balita Kategori Stunting & Kurang Gizi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Nama Balita</th>
                    <th className="pb-2 pr-4">Usia</th>
                    <th className="pb-2 pr-4 text-center">Tinggi / Berat</th>
                    <th className="pb-2 pr-4">Status Gizi</th>
                    <th className="pb-2">Rencana Tindakan / PMT</th>
                  </tr>
                </thead>
                <tbody>
                  {stuntingCases.map((c, i) => (
                    <tr key={c.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{c.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{c.nama}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono text-slate-600">{c.usia}</td>
                      <td className="py-2.5 pr-4 text-center text-xs font-mono text-slate-500">{c.tb} / {c.bb}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          c.gizi === 'Stunting' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {c.gizi}
                        </span>
                      </td>
                      <td className="py-2.5 text-xs text-slate-600 leading-normal">{c.penanganan}</td>
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
              <TrendingUp size={16} /> Tren Penurunan Stunting
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600">
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-600 flex-shrink-0" />
              <p className="font-semibold text-green-800">Skor Stunting Desa = 14%</p>
            </div>
            <p>Pemberian Makanan Tambahan (PMT) rutin dan pendataan digital terstruktur berhasil memotong angka stunting dari 18% di 2024 menjadi 14% di 2026.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
