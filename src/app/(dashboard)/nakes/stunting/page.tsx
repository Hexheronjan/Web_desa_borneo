'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, CheckCircle2, TrendingUp, AlertTriangle, Search } from 'lucide-react';

const COLOR = '#e65100';

interface Stunting {
  id: string;
  wargaId: string;
  tanggal: Date;
  bb: number;
  tb: number;
  umurBulan: number;
  zScore: number;
  kategori: string;
  rekomendasi?: string;
  warga?: {
    id: string;
    nik: string;
    nama: string;
  };
}

export default function StuntingPage() {
  const [search, setSearch] = useState('');
  const [dataStunting, setDataStunting] = useState<Stunting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stunting');
      const result = await res.json();
      if (result.success) setDataStunting(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = dataStunting.filter(s =>
    s.warga?.nama?.toLowerCase().includes(search.toLowerCase()) ||
    s.kategori?.toLowerCase().includes(search.toLowerCase())
  );

  const stuntingCount = filtered.filter(s => s.kategori === 'RisikoTinggi').length;
  const riskCount = filtered.filter(s => s.kategori === 'RisikoSedang').length;
  const normalCount = filtered.filter(s => s.kategori === 'Normal').length;
  const stuntingRate = filtered.length > 0 ? (stuntingCount / filtered.length) * 100 : 0;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pantauan Stunting" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Stunting Rate" value={`${stuntingRate.toFixed(1)}%`} satuan="skor pencapaian" barColor={stuntingRate <= 14 ? 'green' : 'red'} progress={stuntingRate <= 14 ? 100 : stuntingRate} />
        <StatCard label="Target Nasional" value="< 14%" satuan="memenuhi target" barColor="green" progress={stuntingRate <= 14 ? 100 : (stuntingRate / 14) * 100} />
        <StatCard label="Balita Terpantau" value={filtered.length} satuan="balita" barColor="orange" progress={90} />
        <StatCard label="Kasus Ditangani" value={stuntingCount + riskCount} satuan="balita" barColor="blue" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <AlertTriangle size={16} /> Daftar Balita Kategori Stunting & Kurang Gizi
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
            {loading ? (
              <div className="text-center py-8 text-slate-400">Memuat data...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                      <th className="pb-2 pr-4 text-center">No</th>
                      <th className="pb-2 pr-4">Nama Balita</th>
                      <th className="pb-2 pr-4">Umur</th>
                      <th className="pb-2 pr-4 text-center">Tinggi / Berat</th>
                      <th className="pb-2 pr-4">Status Gizi</th>
                      <th className="pb-2 pr-4">Rekomendasi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c, i) => (
                      <tr key={c.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 pr-4 font-semibold text-slate-700">{c.warga?.nama || '-'}</td>
                        <td className="py-2.5 pr-4 text-xs font-mono text-slate-600">{c.umurBulan} bulan</td>
                        <td className="py-2.5 pr-4 text-center text-xs font-mono text-slate-500">{c.tb} cm / {c.bb} kg</td>
                        <td className="py-2.5 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            c.kategori === 'Normal' ? 'bg-green-100 text-green-700' :
                            c.kategori === 'RisikoSedang' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                          }`}>
                            {c.kategori === 'RisikoTinggi' ? 'Stunting' : c.kategori === 'RisikoSedang' ? 'Risiko Sedang' : 'Normal'}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4 text-xs text-slate-600 leading-normal">{c.rekomendasi || '-'}</td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">Data tidak ditemukan</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
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
              <p className="font-semibold text-green-800">Skor Stunting Desa = {stuntingRate.toFixed(1)}%</p>
            </div>
            <p>Pemberian Makanan Tambahan (PMT) rutin dan pendataan digital terstruktur berhasil menekan angka stunting.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
