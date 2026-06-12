'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search, Filter, Plus, Activity } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#00695c';

const initialKesehatan = [
  { nik: '6401010101010001', nama: 'Balita Muhammad Alif', kategori: 'Balita', statusGizi: 'Normal', imunisasi: 'Lengkap' },
  { nik: '6401010101010002', nama: 'Ibu Fatimah Zahra', kategori: 'Ibu Hamil', statusRisiko: 'Risiko Rendah', usiaKandungan: '4 Bulan' },
  { nik: '6401010101010008', nama: 'Lansia Buyung', kategori: 'Lansia', statusKesehatan: 'Hipertensi Ringan', kontrolTerakhir: '10 Jun 2026' },
  { nik: '6401010101010011', nama: 'Balita Clara Dayak', kategori: 'Balita', statusGizi: 'Stunting', imunisasi: 'Belum Lengkap' },
  { nik: '6401010101010012', nama: 'Ibu Kartini Sari', kategori: 'Ibu Hamil', statusRisiko: 'Risiko Tinggi', usiaKandungan: '8 Bulan' },
  { nik: '6401010101010015', nama: 'Lansia Hasan', kategori: 'Lansia', statusKesehatan: 'Sehat', kontrolTerakhir: '08 Jun 2026' }
];

export default function DataKesehatanPage() {
  const [search, setSearch] = useState('');
  const [kategoriFilter, setKategoriFilter] = useState('Semua');

  const filtered = initialKesehatan.filter(k => {
    const matchSearch = k.nama.toLowerCase().includes(search.toLowerCase()) || k.nik.includes(search);
    const matchKategori = kategoriFilter === 'Semua' || k.kategori === kategoriFilter;
    return matchSearch && matchKategori;
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Kesehatan" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pasien Terpantau" value={620} satuan="warga" barColor="teal" progress={75} />
        <StatCard label="Total Balita" value={120} satuan="balita" barColor="blue" progress={20} />
        <StatCard label="Ibu Hamil" value={25} satuan="ibu" barColor="red" progress={4} />
        <StatCard label="Lansia Pantauan" value={84} satuan="lansia" barColor="purple" progress={13} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Activity size={16} /> Data Pantauan Kesehatan Posyandu
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari nama/NIK..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-36 md:w-48"
                  />
                </div>
                <select
                  value={kategoriFilter}
                  onChange={e => setKategoriFilter(e.target.value)}
                  className="px-2 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="Semua">Semua Kategori</option>
                  <option value="Balita">Balita</option>
                  <option value="Ibu Hamil">Ibu Hamil</option>
                  <option value="Lansia">Lansia</option>
                </select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b">
                    <th className="pb-2 pr-4">No</th>
                    <th className="pb-2 pr-4">Nama Warga</th>
                    <th className="pb-2 pr-4">Kategori</th>
                    <th className="pb-2 pr-4">Status Utama</th>
                    <th className="pb-2">Info Tambahan</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((k, i) => (
                    <tr key={i} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-slate-400 text-xs">{i + 1}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{k.nama}</td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          k.kategori === 'Balita' ? 'bg-blue-100 text-blue-700' :
                          k.kategori === 'Ibu Hamil' ? 'bg-red-100 text-red-700' : 'bg-purple-100 text-purple-700'
                        }`}>
                          {k.kategori}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          k.statusGizi === 'Stunting' || k.statusRisiko === 'Risiko Tinggi' ? 'bg-red-100 text-red-700' :
                          k.statusGizi === 'Normal' || k.statusKesehatan === 'Sehat' || k.statusRisiko === 'Risiko Rendah' ? 'bg-green-100 text-green-700' :
                          'bg-amber-100 text-amber-700'
                        }`}>
                          {k.statusGizi || k.statusRisiko || k.statusKesehatan}
                        </span>
                      </td>
                      <td className="py-2.5 text-slate-600 text-xs font-mono">
                        {k.imunisasi ? `Imunisasi: ${k.imunisasi}` :
                         k.usiaKandungan ? `Kandungan: ${k.usiaKandungan}` :
                         `Kontrol: ${k.kontrolTerakhir}`}
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
              <Heart size={16} /> SDGs 3 Indikator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-700 mb-1">
                <span>Rerata Capaian SDGs Kesehatan</span>
                <span className="text-green-700">82.00%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-green-700 rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
            <div className="pt-3 border-t">
              <p className="font-bold text-slate-700 mb-2">Pantauan Stunting</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Stunting Rate Desa</span>
                  <span className="font-bold text-red-600">14%</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">Target Nasional</span>
                  <span className="font-bold text-slate-700">&lt; 14%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
