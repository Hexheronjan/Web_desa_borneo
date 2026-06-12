'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search, Plus, Download } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#e65100';

const initialBalita = [
  { no: 1, nama: 'Muhammad Alif', ttl: 'Borneo, 12 Feb 2024', bb: '10.5 kg', tb: '82 cm', gizi: 'Normal', imun: 'Lengkap' },
  { no: 2, nama: 'Clara Dayak', ttl: 'Borneo, 05 Mei 2023', bb: '9.2 kg', tb: '76 cm', gizi: 'Stunting', imun: 'Belum Lengkap' },
  { no: 3, nama: 'Budi Hartono', ttl: 'Borneo, 28 Jan 2024', bb: '11.0 kg', tb: '85 cm', gizi: 'Normal', imun: 'Lengkap' },
  { no: 4, nama: 'Dewi Lestari', ttl: 'Borneo, 14 Nov 2023', bb: '9.8 kg', tb: '79 cm', gizi: 'Gizi Kurang', imun: 'Lengkap' },
  { no: 5, nama: 'Rudi Hartono', ttl: 'Borneo, 02 Des 2024', bb: '8.4 kg', tb: '69 cm', gizi: 'Normal', imun: 'Belum Lengkap' }
];

export default function DataBalitaPage() {
  const [search, setSearch] = useState('');

  const filtered = initialBalita.filter(b =>
    b.nama.toLowerCase().includes(search.toLowerCase()) ||
    b.gizi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Balita" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Balita Terdaftar" value={120} satuan="anak" barColor="orange" progress={90} />
        <StatCard label="Kondisi Normal" value={103} satuan="anak" barColor="green" progress={86} />
        <StatCard label="Risiko Stunting" value={17} satuan="anak" barColor="red" progress={14} />
        <StatCard label="Imunisasi Lengkap" value={110} satuan="anak" barColor="green" progress={92} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Heart size={16} className="text-red-500" /> Database Gizi & Tumbuh Kembang Balita Desa
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari balita..."
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
                    <th className="pb-2 pr-4">Nama Lengkap</th>
                    <th className="pb-2 pr-4">Tempat, Tanggal Lahir</th>
                    <th className="pb-2 pr-4">Berat Badan</th>
                    <th className="pb-2 pr-4">Tinggi Badan</th>
                    <th className="pb-2 pr-4">Status Gizi</th>
                    <th className="pb-2">Imunisasi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((b, i) => (
                    <tr key={b.no} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{b.no}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{b.nama}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-500 font-mono">{b.ttl}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{b.bb}</td>
                      <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{b.tb}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.gizi === 'Normal' ? 'bg-green-100 text-green-700' :
                          b.gizi === 'Stunting' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {b.gizi}
                        </span>
                      </td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.imun === 'Lengkap' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {b.imun}
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
