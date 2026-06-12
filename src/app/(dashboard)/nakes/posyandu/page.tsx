'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Calendar, Clock, MapPin, CheckCircle } from 'lucide-react';

const COLOR = '#e65100';

const posyanduLocations = [
  { id: 'POS001', nama: 'Posyandu Nyahu RT 01', jadwal: 'Senin, 15 Jun 2026', nakes: 'Bidan Kartini', target: '24 Balita', status: 'Terjadwal' },
  { id: 'POS002', nama: 'Posyandu Betang RT 02', jadwal: 'Rabu, 17 Jun 2026', nakes: 'Bidan Kartini', target: '32 Balita', status: 'Terjadwal' },
  { id: 'POS003', nama: 'Posyandu Mahakam RT 03', jadwal: 'Jumat, 19 Jun 2026', nakes: 'Perawat Joko', target: '18 Balita', status: 'Terjadwal' },
  { id: 'POS004', nama: 'Posyandu Kahayan RT 04', jadwal: 'Senin, 22 Jun 2026', nakes: 'Bidan Kartini', target: '28 Balita', status: 'Terjadwal' }
];

export default function PosyanduPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Posyandu & KIA" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pos Pelayanan" value={8} satuan="pos aktif" barColor="orange" progress={100} />
        <StatCard label="Bidan Desa" value={2} satuan="nakes aktif" barColor="green" progress={100} />
        <StatCard label="Timbangan Balita" value="100%" satuan="alat tera ulang" barColor="green" progress={100} />
        <StatCard label="Cakupan Imunisasi" value="92%" satuan="target 95%" barColor="blue" progress={92} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Jadwal Operasional Posyandu Bulan Berjalan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {posyanduLocations.map((pos, i) => (
              <div key={pos.id} className="p-4 border rounded-xl bg-slate-50/50 hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-bold text-orange-700 font-mono block mb-1">{pos.jadwal}</span>
                    <p className="font-bold text-slate-800 text-sm md:text-base">{pos.nama}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                    {pos.status}
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-500 text-[11px] mt-2 font-mono">
                  <span>Nakes: {pos.nakes}</span>
                  <span className="hidden md:inline">•</span>
                  <span>Target: {pos.target}</span>
                </div>
              </div>
            ))}
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
