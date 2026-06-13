'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search } from 'lucide-react';

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
    tempatLahir: string;
    tanggalLahir: Date;
  };
}

export default function DataBalitaPage() {
  const [search, setSearch] = useState('');
  const [dataBalita, setDataBalita] = useState<Stunting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stunting');
      const result = await res.json();
      if (result.success) setDataBalita(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = dataBalita.filter(b =>
    b.warga?.nama?.toLowerCase().includes(search.toLowerCase()) ||
    b.kategori?.toLowerCase().includes(search.toLowerCase())
  );

  const normalCount = filtered.filter(b => b.kategori === 'Normal').length;
  const stuntingCount = filtered.filter(b => b.kategori === 'RisikoTinggi').length;
  const riskCount = filtered.filter(b => b.kategori === 'RisikoSedang').length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Balita" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Balita Terdaftar" value={filtered.length} satuan="anak" barColor="orange" progress={90} />
        <StatCard label="Kondisi Normal" value={normalCount} satuan="anak" barColor="green" progress={filtered.length > 0 ? (normalCount / filtered.length) * 100 : 0} />
        <StatCard label="Risiko Stunting" value={stuntingCount} satuan="anak" barColor="red" progress={filtered.length > 0 ? (stuntingCount / filtered.length) * 100 : 0} />
        <StatCard label="Risiko Sedang" value={riskCount} satuan="anak" barColor="yellow" progress={filtered.length > 0 ? (riskCount / filtered.length) * 100 : 0} />
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
            {loading ? (
              <div className="text-center py-8 text-slate-400">Memuat data...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                      <th className="pb-2 pr-4 text-center">No</th>
                      <th className="pb-2 pr-4">Nama Lengkap</th>
                      <th className="pb-2 pr-4">Tempat, Tanggal Lahir</th>
                      <th className="pb-2 pr-4">Berat Badan</th>
                      <th className="pb-2 pr-4">Tinggi Badan</th>
                      <th className="pb-2 pr-4">Umur</th>
                      <th className="pb-2 pr-4">Status Gizi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b, i) => (
                      <tr key={b.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 pr-4 font-semibold text-slate-700">{b.warga?.nama || '-'}</td>
                        <td className="py-2.5 pr-4 text-xs text-slate-500 font-mono">
                          {b.warga?.tempatLahir || '-'}, {b.warga?.tanggalLahir ? new Date(b.warga.tanggalLahir).toLocaleDateString('id-ID') : '-'}
                        </td>
                        <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{b.bb} kg</td>
                        <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{b.tb} cm</td>
                        <td className="py-2.5 pr-4 text-xs font-mono text-slate-600">{b.umurBulan} bulan</td>
                        <td className="py-2.5 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.kategori === 'Normal' ? 'bg-green-100 text-green-700' :
                            b.kategori === 'RisikoTinggi' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {b.kategori === 'RisikoTinggi' ? 'Stunting' : b.kategori === 'RisikoSedang' ? 'Risiko Sedang' : 'Normal'}
                          </span>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={7} className="py-8 text-center text-slate-400 text-sm">Data tidak ditemukan</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
