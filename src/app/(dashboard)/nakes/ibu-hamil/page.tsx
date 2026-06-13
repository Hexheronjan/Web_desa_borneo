'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search } from 'lucide-react';

const COLOR = '#e65100';

interface Monitoring {
  id: string;
  wargaId: string;
  tanggal: Date;
  beratBadan?: number;
  tinggiBadan?: number;
  tensiSistolik?: number;
  tensiDiastolik?: number;
  suhu?: number;
  alert: boolean;
  warga?: {
    id: string;
    nik: string;
    nama: string;
  };
}

export default function IbuHamilPage() {
  const [search, setSearch] = useState('');
  const [dataIbu, setDataIbu] = useState<Monitoring[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/monitoring');
      const result = await res.json();
      if (result.success) setDataIbu(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = dataIbu.filter(i =>
    i.warga?.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const alertCount = filtered.filter(i => i.alert).length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pantauan Ibu Hamil" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ibu Hamil Terdaftar" value={filtered.length} satuan="ibu" barColor="orange" progress={80} />
        <StatCard label="Normal" value={filtered.length - alertCount} satuan="ibu" barColor="green" progress={filtered.length > 0 ? ((filtered.length - alertCount) / filtered.length) * 100 : 0} />
        <StatCard label="Risiko Tinggi" value={alertCount} satuan="pantauan intensif" barColor="red" progress={filtered.length > 0 ? (alertCount / filtered.length) * 100 : 0} />
        <StatCard label="Monitoring Bulan Ini" value={filtered.length} satuan="catatan" barColor="blue" progress={50} />
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
            {loading ? (
              <div className="text-center py-8 text-slate-400">Memuat data...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                      <th className="pb-2 pr-4 text-center">No</th>
                      <th className="pb-2 pr-4">Nama Ibu</th>
                      <th className="pb-2 pr-4">Tanggal</th>
                      <th className="pb-2 pr-4">BB/TB</th>
                      <th className="pb-2 pr-4">Tensi</th>
                      <th className="pb-2 pr-4">Suhu</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, i) => (
                      <tr key={item.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 pr-4 font-semibold text-slate-700">{item.warga?.nama || '-'}</td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {new Date(item.tanggal).toLocaleDateString('id-ID')}
                        </td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {item.beratBadan && item.tinggiBadan ? `${item.beratBadan}kg / ${item.tinggiBadan}cm` : '-'}
                        </td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {item.tensiSistolik && item.tensiDiastolik ? `${item.tensiSistolik}/${item.tensiDiastolik}` : '-'}
                        </td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {item.suhu ? `${item.suhu}°C` : '-'}
                        </td>
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
      </div>
    </div>
  );
}
