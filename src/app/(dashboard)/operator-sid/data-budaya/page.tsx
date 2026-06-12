'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Globe, Search, Filter, Plus, Landmark } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#00695c';

const initialBudaya = [
  { id: 'BDY001', nama: 'Rumah Tradisional Huma Betang RT 02', tipe: 'Situs / Arsitektur', lokasi: 'Dusun Hulu, RT 02', status: 'Terlestarikan' },
  { id: 'BDY002', nama: 'Upacara Tiwah Adat Borneo', tipe: 'Tradisi / Upacara', lokasi: 'Kawasan Balai Adat Desa', status: 'Aktif' },
  { id: 'BDY003', nama: 'Seni Musik Kecapi Dayak Kalteng', tipe: 'Kesenian / Alat', lokasi: 'Grup Kesenian Nyahu Mandau', status: 'Terlestarikan' },
  { id: 'BDY004', nama: 'Hukum Adat & Resolusi Damang', tipe: 'Konstitusi Adat', lokasi: 'Sekretariat Lembaga Adat', status: 'Aktif' },
  { id: 'BDY005', nama: 'Kerajinan Batik Benang Bintik', tipe: 'Kriya Tradisional', lokasi: 'Sentra UMKM RT 04', status: 'Terlestarikan' }
];

export default function DataBudayaPage() {
  const [search, setSearch] = useState('');

  const filtered = initialBudaya.filter(b =>
    b.nama.toLowerCase().includes(search.toLowerCase()) ||
    b.tipe.toLowerCase().includes(search.toLowerCase()) ||
    b.lokasi.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Budaya & Adat" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Aset Budaya Terdaftar" value={120} satuan="entri" barColor="teal" progress={30} />
        <StatCard label="Capaian SDGs 18" value="80%" satuan="kearifan lokal" barColor="green" progress={80} />
        <StatCard label="Upacara Tahunan" value={12} satuan="kegiatan" barColor="blue" progress={60} />
        <StatCard label="Arsip Digital" value={156} satuan="dokumen" barColor="purple" progress={78} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Landmark size={16} /> Registri Kebudayaan & Kearifan Lokal Dayak
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari budaya..."
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
                    <th className="pb-2 pr-4">Nama Aset / Budaya</th>
                    <th className="pb-2 pr-4">Kategori Tipe</th>
                    <th className="pb-2 pr-4">Lokasi Keberadaan</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item, i) => (
                    <tr key={item.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 font-mono text-xs text-indigo-700 font-bold">{item.id}</td>
                      <td className="py-2.5 pr-4 font-semibold text-slate-700">{item.nama}</td>
                      <td className="py-2.5 pr-4 text-xs text-slate-500">{item.tipe}</td>
                      <td className="py-2.5 pr-4 text-slate-600 text-xs">{item.lokasi}</td>
                      <td className="py-2.5">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700`}>
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
              <Globe size={16} /> Target SDGs 18 Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>SDGs Desa Ke-18 mengamanatkan pelestarian lembaga adat dan kearifan lokal Kalimantan:</p>
            <div className="p-3 bg-teal-50 border border-teal-100 rounded-lg">
              <p className="font-bold text-teal-800 mb-1">Index Capaian Kebudayaan</p>
              <p className="text-2xl font-black text-teal-900">80.0% <span className="text-xs font-normal text-slate-500">terlindungi</span></p>
            </div>
            <div className="p-3 bg-slate-50 border rounded-lg space-y-2">
              <p className="font-bold text-slate-700">Dimensi Utama Pelestarian</p>
              <div className="flex justify-between items-center text-[11px] border-b pb-1">
                <span>Huma Betang (Arsitektur)</span>
                <span className="font-bold text-slate-700">85%</span>
              </div>
              <div className="flex justify-between items-center text-[11px] border-b pb-1">
                <span>Arsip Hukum Adat (Regulasi)</span>
                <span className="font-bold text-slate-700">78%</span>
              </div>
              <div className="flex justify-between items-center text-[11px]">
                <span>Musyawarah Adat (Tata Kelola)</span>
                <span className="font-bold text-slate-700">90%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
