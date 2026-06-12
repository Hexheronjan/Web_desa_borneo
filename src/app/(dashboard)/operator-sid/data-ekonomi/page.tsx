'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Wallet, Search, Filter, Download, Plus, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#00695c';

const initialUmkm = [
  { id: 'UMKM001', nama: 'Kerajinan Anyaman Rotan Dayak', pemilik: 'Ibu Buyung', bidang: 'Kerajinan', omset: 'Rp 4.500.000 / bln', status: 'Aktif' },
  { id: 'UMKM002', nama: 'Tenun Ikat Benang Bintik', pemilik: 'Ibu Kartini Sari', bidang: 'Tekstil', omset: 'Rp 6.200.000 / bln', status: 'Aktif' },
  { id: 'UMKM003', nama: 'Kuliner Khas Borneo Lestari', pemilik: 'Bapak Rudi', bidang: 'Kuliner', omset: 'Rp 3.800.000 / bln', status: 'Aktif' },
  { id: 'UMKM004', nama: 'Obat Herbal Pasak Bumi', pemilik: 'Bapak Hasan', bidang: 'Kesehatan', omset: 'Rp 8.500.000 / bln', status: 'Aktif' },
  { id: 'UMKM005', nama: 'Budidaya Madu Kelulut Adat', pemilik: 'Rudi Hartono', bidang: 'Pertanian', omset: 'Rp 2.900.000 / bln', status: 'Aktif' }
];

export default function DataEkonomiPage() {
  const [search, setSearch] = useState('');

  const filtered = initialUmkm.filter(u =>
    u.nama.toLowerCase().includes(search.toLowerCase()) ||
    u.pemilik.toLowerCase().includes(search.toLowerCase()) ||
    u.bidang.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Ekonomi & UMKM" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total UMKM" value={36} satuan="unit usaha" barColor="teal" progress={80} />
        <StatCard label="Omset Rata-rata" value="4.8M" satuan="Rp per bulan" barColor="green" progress={75} />
        <StatCard label="Pekerja Terserap" value={142} satuan="warga desa" barColor="blue" progress={68} />
        <StatCard label="Bantuan Modal" value="12" satuan="UMKM penerima" barColor="purple" progress={33} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <ShoppingBag size={16} /> Registrasi & Database UMKM Desa
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari UMKM..."
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
                    <th className="pb-2 pr-4">Nama Usaha</th>
                    <th className="pb-2 pr-4">Pemilik</th>
                    <th className="pb-2 pr-4">Bidang</th>
                    <th className="pb-2 pr-4">Estimasi Omset</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u, i) => (
                    <tr key={u.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs text-indigo-700 font-bold">{u.id}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{u.nama}</td>
                      <td className="py-2.5 pr-4 text-slate-600 text-xs">{u.pemilik}</td>
                      <td className="py-2.5 pr-4">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600">
                          {u.bidang}
                        </span>
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-xs text-slate-700">{u.omset}</td>
                      <td className="py-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700">
                          {u.status}
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
              <Wallet size={16} /> Pendapatan Perkapita & Ekonomi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg">
              <p className="font-bold text-teal-800 mb-1">Rata-rata Pendapatan Keluarga</p>
              <p className="text-lg font-black text-teal-900">Rp 3.250.000 <span className="text-xs font-normal text-slate-500">/ bulan</span></p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg">
              <p className="font-bold text-slate-700 mb-2">Sebaran Lapangan Pekerjaan</p>
              <div className="space-y-2">
                {[
                  { job: 'Pertanian & Perkebunan', pct: 58 },
                  { job: 'Karyawan / Buruh Swasta', pct: 22 },
                  { job: 'PNS & Aparatur Desa', pct: 8 },
                  { job: 'UMKM & Perdagangan', pct: 12 }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-0.5 text-[10px]">
                      <span>{item.job}</span>
                      <span className="font-bold">{item.pct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-teal-600 rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
