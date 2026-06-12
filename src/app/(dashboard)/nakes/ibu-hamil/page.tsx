'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search, Filter } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#e65100';

const initialIbu = [
  { no: 1, nama: 'Ibu Fatimah Zahra', usia: '4 Bulan', riwayat: 'Anak Ke-2, Persalinan Normal', risiko: 'Risiko Rendah' },
  { no: 2, nama: 'Ibu Kartini Sari', usia: '8 Bulan', riwayat: 'Anak Ke-1, Riwayat Anemia', risiko: 'Risiko Tinggi' },
  { no: 3, nama: 'Ibu Clara Lestari', usia: '6 Bulan', riwayat: 'Anak Ke-3, Persalinan Normal', risiko: 'Risiko Rendah' },
  { no: 4, nama: 'Ibu Dewi Budi', usia: '2 Bulan', riwayat: 'Anak Ke-1', risiko: 'Risiko Rendah' },
  { no: 5, nama: 'Ibu Nyahu Mandau', usia: '9 Bulan', riwayat: 'Anak Ke-2, Riwayat Hipertensi', risiko: 'Risiko Tinggi' }
];

export default function IbuHamilPage() {
  const [search, setSearch] = useState('');

  const filtered = initialIbu.filter(i =>
    i.nama.toLowerCase().includes(search.toLowerCase()) ||
    i.risiko.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pantauan Ibu Hamil" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ibu Hamil Terdaftar" value={25} satuan="ibu" barColor="orange" progress={80} />
        <StatCard label="Risiko Rendah" value={21} satuan="ibu" barColor="green" progress={84} />
        <StatCard label="Risiko Tinggi" value={4} satuan="pantauan intensif" barColor="red" progress={16} />
        <StatCard label="Melahirkan Bulan Ini" value={2} satuan="estimasi lahir" barColor="blue" progress={50} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Heart size={16} className="text-red-500" /> Database Ibu Hamil & Pantauan Kesehatan Ibu-Anak (KIA)
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari ibu..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                    <th className="pb-2 pr-4 text-center">No</th>
                    <th className="pb-2 pr-4">Nama Ibu</th>
                    <th className="pb-2 pr-4">Usia Kehamilan</th>
                    <th className="pb-2 pr-4">Riwayat Persalinan / Catatan Medis</th>
                    <th className="pb-2">Risiko Kehamilan</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={item.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{item.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{item.nama}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{item.usia}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-600 leading-normal">{item.riwayat}</td>
                      <td className="py-2.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.risiko === 'Risiko Rendah' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {item.risiko}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
