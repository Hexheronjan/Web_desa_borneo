'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Landmark, ShieldCheck, MapPin, Eye } from 'lucide-react';

const COLOR = '#2e7d32';

const humaBetangList = [
  { id: 'BET001', nama: 'Huma Betang RT 02 Dusun Hulu', dibangun: 'Tahun 1924 (Restorasi 2018)', spesifikasi: 'Kayu Ulin Murni, 24 Tiang Utama, Panjang 40m', status: 'Terlestarikan' },
  { id: 'BET002', nama: 'Huma Betang Singa Kenting', dibangun: 'Tahun 1932', spesifikasi: 'Kayu Ulin, 18 Tiang Utama, Panjang 30m', status: 'Terlestarikan' },
  { id: 'BET003', nama: 'Huma Betang Rungan Sari', dibangun: 'Tahun 1956', spesifikasi: 'Kayu Campuran & Ulin, 12 Tiang, Panjang 25m', status: 'Restorasi Diperlukan' }
];

export default function HumaBetangPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Huma Betang & Arsitektur Adat" modul="Lembaga Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Huma Betang Tercatat" value={3} satuan="bangunan situs" barColor="green" progress={100} />
        <StatCard label="Kondisi Terawat" value={2} satuan="situs" barColor="green" progress={67} />
        <StatCard label="Butuh Restorasi" value={1} satuan="situs" barColor="orange" progress={33} />
        <StatCard label="SDGs 18 Target" value="85%" satuan="kelestarian" barColor="teal" progress={85} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Landmark size={16} /> Dokumentasi Rumah Adat Huma Betang Desa
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              {humaBetangList.map((hb, i) => (
                <div key={hb.id} className="p-4 border rounded-xl bg-slate-50/50 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-bold text-slate-800 text-sm md:text-base">{hb.nama}</p>
                      <span className="text-[10px] text-indigo-700 font-mono font-bold">{hb.id} • Dibangun {hb.dibangun}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      hb.status === 'Terlestarikan' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {hb.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mb-3 font-mono">{hb.spesifikasi}</p>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-white hover:bg-slate-50 border rounded text-slate-600 text-xs font-semibold flex items-center gap-1">
                      <MapPin size={12} /> Lihat Lokasi Peta
                    </button>
                    <button className="px-3 py-1 bg-white hover:bg-slate-50 border rounded text-slate-600 text-xs font-semibold flex items-center gap-1">
                      <Eye size={12} /> Galeri Foto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <ShieldCheck size={16} /> Cagar Budaya Terlindungi
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs text-slate-600 leading-normal">
            <p>Huma Betang merupakan lambang kebersamaan, kerukunan, dan gotong royong (Handep Hapakat) suku Dayak:</p>
            <div className="p-3 bg-green-50 border border-green-100 rounded-lg">
              <p className="font-bold text-green-800 mb-1">Status Proteksi Hukum</p>
              <p>Dilindungi secara hukum adat melalui Keputusan Damang No. 04/KD-ADAT/2021 dan diakui secara nasional sebagai Cagar Budaya Kelas B.</p>
            </div>
            <p className="pt-2 text-[10px] text-slate-400">
              *Tiap pembangunan di radius 100m dari situs harus mendapatkan ijin khusus dari Tetua Adat.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
