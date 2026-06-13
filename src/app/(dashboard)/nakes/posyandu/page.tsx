'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Calendar, Search, CheckCircle } from 'lucide-react';

const COLOR = '#e65100';

interface Posyandu {
  id: string;
  tanggal: Date;
  lokasi: string;
  jumlahBalita: number;
  jumlahImunisasi: number;
  catatan?: string;
}

export default function PosyanduPage() {
  const [search, setSearch] = useState('');
  const [dataPosyandu, setDataPosyandu] = useState<Posyandu[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posyandu');
      const result = await res.json();
      if (result.success) setDataPosyandu(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = dataPosyandu.filter(p =>
    p.lokasi?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Posyandu & KIA" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Jadwal Posyandu" value={filtered.length} satuan="kegiatan" barColor="orange" progress={100} />
        <StatCard label="Total Balita" value={filtered.reduce((sum, p) => sum + p.jumlahBalita, 0)} satuan="balita" barColor="green" progress={100} />
        <StatCard label="Total Imunisasi" value={filtered.reduce((sum, p) => sum + p.jumlahImunisasi, 0)} satuan="imunisasi" barColor="blue" progress={92} />
        <StatCard label="Cakupan Imunisasi" value={filtered.length > 0 ? Math.round((filtered.reduce((sum, p) => sum + p.jumlahImunisasi, 0) / filtered.reduce((sum, p) => sum + p.jumlahBalita, 1)) * 100) : 0} satuan="%" barColor="purple" progress={filtered.length > 0 ? Math.round((filtered.reduce((sum, p) => sum + p.jumlahImunisasi, 0) / filtered.reduce((sum, p) => sum + p.jumlahBalita, 1)) * 100) : 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Calendar size={16} /> Jadwal Operasional Posyandu Bulan Berjalan
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari lokasi..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 w-48"
                  />
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-slate-400">Memuat data...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-8 text-slate-400">Data tidak ditemukan</div>
            ) : (
              filtered.map((pos, i) => (
                <div key={pos.id} className="p-4 border rounded-xl bg-slate-50/50 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-orange-700 font-mono block mb-1">
                        {new Date(pos.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <p className="font-bold text-slate-800 text-sm md:text-base">{pos.lokasi}</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-500 text-[11px] mt-2 font-mono">
                    <span>Balita: {pos.jumlahBalita}</span>
                    <span className="hidden md:inline">•</span>
                    <span>Imunisasi: {pos.jumlahImunisasi}</span>
                    {pos.catatan && (
                      <>
                        <span className="hidden md:inline">•</span>
                        <span className="text-slate-600">{pos.catatan}</span>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle size={16} /> Alat Ukur Terstandar (SDGs)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Untuk menekan stunting secara presisi, Posyandu dilengkapi alat ukur berstandar Kemenkes RI:</p>
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <p className="font-bold text-orange-800 mb-1">Daftar Alat</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Antropometri Kit Digital</li>
                <li>Timbangan Bayi (Baby Scale)</li>
                <li>Alat Ukur Tinggi Badan (Stadiometer)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
