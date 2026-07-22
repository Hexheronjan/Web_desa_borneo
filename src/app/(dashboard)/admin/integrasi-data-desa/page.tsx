'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { RefreshCw, Database, CheckCircle2, AlertCircle, Clock, Wifi, WifiOff, AlertTriangle } from 'lucide-react';

const COLOR = '#1a237e';

interface SumberData {
  id: string;
  namaSumber: string;
  tipe: string;
  apiEndpoint: string;
  jumlahBerhasil: number;
  jumlahGagal: number;
  belumDipetakan: number;
  konflikIdentitas: number;
  waktuRespons: string;
  pembaruanTerakhir: string;
  statusAPI: 'Aktif' | 'Gangguan' | 'Tidak Aktif';
}

const MOCK: SumberData[] = [
  { id: 'INT-01', namaSumber: 'Sistem Informasi Desa (SID)', tipe: 'REST API', apiEndpoint: 'https://api.sid.go.id/v2', jumlahBerhasil: 184, jumlahGagal: 2, belumDipetakan: 5, konflikIdentitas: 1, waktuRespons: '340ms', pembaruanTerakhir: '18 Juli 2026, 04:00 WITA', statusAPI: 'Aktif' },
  { id: 'INT-02', namaSumber: 'EHDW — Kesehatan (Kemenkes)', tipe: 'REST API', apiEndpoint: 'https://ehdw.kemkes.go.id/api', jumlahBerhasil: 110, jumlahGagal: 0, belumDipetakan: 2, konflikIdentitas: 0, waktuRespons: '220ms', pembaruanTerakhir: '18 Juli 2026, 04:05 WITA', statusAPI: 'Aktif' },
  { id: 'INT-03', namaSumber: 'Kemendikbud — Pendidikan', tipe: 'REST API', apiEndpoint: 'https://api.kemdikbud.go.id/data', jumlahBerhasil: 84, jumlahGagal: 5, belumDipetakan: 11, konflikIdentitas: 3, waktuRespons: '1200ms', pembaruanTerakhir: '17 Juli 2026, 22:00 WITA', statusAPI: 'Gangguan' },
  { id: 'INT-04', namaSumber: 'Database Lokal Lembaga Adat', tipe: 'Database', apiEndpoint: 'Internal DB Server', jumlahBerhasil: 95, jumlahGagal: 1, belumDipetakan: 0, konflikIdentitas: 0, waktuRespons: '85ms', pembaruanTerakhir: '18 Juli 2026, 03:00 WITA', statusAPI: 'Aktif' },
];

export default function IntegrasiDataDesaPage() {
  const [sources, setSources] = useState<SumberData[]>(MOCK);

  const handleSync = (id: string) => {
    setSources(prev => prev.map(s => s.id === id ? { ...s, statusAPI: 'Aktif', pembaruanTerakhir: new Date().toLocaleString('id-ID') + ' WITA' } : s));
  };

  const totalBerhasil = sources.reduce((a, s) => a + s.jumlahBerhasil, 0);
  const totalGagal = sources.reduce((a, s) => a + s.jumlahGagal, 0);
  const totalBelumDipetakan = sources.reduce((a, s) => a + s.belumDipetakan, 0);
  const totalKonflik = sources.reduce((a, s) => a + s.konflikIdentitas, 0);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Integrasi Data Desa" modul="Framework &amp; Assessment" color={COLOR} />

      {/* Dasbor Ringkasan Integrasi */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        {[
          { label: 'Sumber Aktif', value: `${sources.filter(s => s.statusAPI === 'Aktif').length} / ${sources.length}`, icon: Wifi, color: 'text-green-700', bg: 'bg-green-50 border-green-200' },
          { label: 'Jumlah Berhasil', value: totalBerhasil, icon: CheckCircle2, color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
          { label: 'Jumlah Gagal', value: totalGagal, icon: AlertCircle, color: 'text-red-700', bg: 'bg-red-50 border-red-200' },
          { label: 'Belum Dipetakan', value: totalBelumDipetakan, icon: AlertTriangle, color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
          { label: 'Konflik Identitas', value: totalKonflik, icon: WifiOff, color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
          { label: 'Pembaruan Terakhir', value: '04:05 WITA', icon: Clock, color: 'text-indigo-700', bg: 'bg-indigo-50 border-indigo-200' },
        ].map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i} className={`border ${m.bg}`}>
              <CardContent className="p-3.5 flex items-center gap-3">
                <Icon size={20} className={m.color} />
                <div>
                  <p className="text-[9px] font-bold text-slate-600 uppercase">{m.label}</p>
                  <p className={`text-lg font-black ${m.color}`}>{m.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Tabel Detail Sumber Integrasi */}
      <Card>
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Database size={14} /> Konfigurasi Sumber Data &amp; Status API
          </CardTitle>
          <Button size="sm" className="h-8 text-xs font-bold" onClick={() => setSources(MOCK)}>
            <RefreshCw size={13} className="mr-1" /> Sinkronisasi Semua
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto text-xs">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
                  {['ID', 'Nama Sumber', 'Tipe', 'Endpoint', 'Berhasil', 'Gagal', 'Blm Dipetakan', 'Konflik ID', 'Waktu Respons', 'Pembaruan Terakhir', 'Status API', 'Aksi'].map(h => (
                    <TableHead key={h} className="font-bold text-slate-700">{h}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sources.map(s => (
                  <TableRow key={s.id} className="hover:bg-slate-50/50">
                    <TableCell className="font-mono font-bold text-slate-500">{s.id}</TableCell>
                    <TableCell className="font-bold text-slate-800">{s.namaSumber}</TableCell>
                    <TableCell>{s.tipe}</TableCell>
                    <TableCell className="text-slate-500 max-w-[150px] truncate" title={s.apiEndpoint}>{s.apiEndpoint}</TableCell>
                    <TableCell className="text-green-700 font-bold">{s.jumlahBerhasil}</TableCell>
                    <TableCell className={`font-bold ${s.jumlahGagal > 0 ? 'text-red-700' : 'text-slate-400'}`}>{s.jumlahGagal}</TableCell>
                    <TableCell className={`font-bold ${s.belumDipetakan > 0 ? 'text-amber-700' : 'text-slate-400'}`}>{s.belumDipetakan}</TableCell>
                    <TableCell className={`font-bold ${s.konflikIdentitas > 0 ? 'text-orange-700' : 'text-slate-400'}`}>{s.konflikIdentitas}</TableCell>
                    <TableCell>{s.waktuRespons}</TableCell>
                    <TableCell>{s.pembaruanTerakhir}</TableCell>
                    <TableCell>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${s.statusAPI === 'Aktif' ? 'bg-green-50 text-green-700 border-green-200' : s.statusAPI === 'Gangguan' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {s.statusAPI}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button onClick={() => handleSync(s.id)} size="sm" variant="ghost" className="h-7 px-2">
                        <RefreshCw size={12} className="text-indigo-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
