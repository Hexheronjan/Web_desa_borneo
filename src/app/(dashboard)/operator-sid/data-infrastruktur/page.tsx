'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, Search, Filter, Download, Plus, HardDrive } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#00695c';

const initialInfrastruktur = [
  { id: 'INF001', nama: 'Pusat Server & SID Kantor Desa', tipe: 'Teknologi', spek: 'Mini PC Core i5, RAM 16GB, SSD 1TB', status: 'Baik' },
  { id: 'INF002', nama: 'VSAT Satellite Internet Balai Desa', tipe: 'Jaringan', spek: 'Bandwidth 20Mbps (Kec. Kahayan)', status: 'Baik' },
  { id: 'INF003', nama: 'Solar Panel Backup Balai Adat', tipe: 'Energi', spek: 'Kapasitas 1.5 KVA', status: 'Kurang Layak' },
  { id: 'INF004', nama: 'Jembatan Penghubung RT 03', tipe: 'Transportasi', spek: 'Konstruksi Kayu Ulin Tradisional', status: 'Baik' },
  { id: 'INF005', nama: 'Instalasi Air Bersih Huma Betang', tipe: 'Utilitas', spek: 'Pompa Filtrasi Air Sungai Mahakam', status: 'Kurang Layak' }
];

export default function DataInfrastrukturPage() {
  const [search, setSearch] = useState('');

  const filtered = initialInfrastruktur.filter(i =>
    i.nama.toLowerCase().includes(search.toLowerCase()) ||
    i.tipe.toLowerCase().includes(search.toLowerCase()) ||
    i.spek.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Infrastruktur" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Aset Fisik" value={230} satuan="data tercatat" barColor="teal" progress={45} />
        <StatCard label="Akses Air Bersih" value="88%" satuan="warga terlayani" barColor="blue" progress={88} />
        <StatCard label="Koneksi Internet" value="65%" satuan="coverage desa" barColor="purple" progress={65} />
        <StatCard label="Jalan Desa Layak" value="78%" satuan="kondisi baik" barColor="green" progress={78} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Landmark size={16} /> Database Inventaris Prasarana Desa
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari prasarana..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-500 border-b">
                    <th className="pb-2 pr-4">ID</th>
                    <th className="pb-2 pr-4">Nama Infrastruktur / Aset</th>
                    <th className="pb-2 pr-4">Tipe</th>
                    <th className="pb-2 pr-4">Spesifikasi Detail</th>
                    <th className="pb-2">Kondisi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={item.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs text-indigo-700 font-bold">{item.id}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{item.nama}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-500">{item.tipe}</td>
                      <td className="py-2.5 pr-4 text-slate-600 text-xs">{item.spek}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          item.status === 'Baik' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {item.status}
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
              <HardDrive size={16} /> Status Utilitas & Energi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600">
            <div className="p-3 bg-slate-50 rounded-lg border">
              <p className="font-bold text-slate-700 mb-2">Penetrasi Energi Terbarukan</p>
              <div className="flex justify-between items-center mb-1">
                <span>Energi Terbarukan (Solar)</span>
                <span className="font-bold text-indigo-700">35%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-700 rounded-full" style={{ width: '35%' }} />
              </div>
            </div>
            <div className="p-3 bg-slate-50 rounded-lg border">
              <p className="font-bold text-slate-700 mb-2">Pengelolaan Sampah Terpadu</p>
              <div className="flex justify-between items-center mb-1">
                <span>Layanan Angkut & TPS</span>
                <span className="font-bold text-teal-700">62%</span>
              </div>
              <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-teal-700 rounded-full" style={{ width: '62%' }} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
