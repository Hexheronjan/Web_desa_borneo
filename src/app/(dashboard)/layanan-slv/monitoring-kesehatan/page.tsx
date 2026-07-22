'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import {
  Heart, AlertTriangle, ShieldCheck, Calendar, Activity, MapPin, Phone, CheckCircle
} from 'lucide-react';

const COLOR = '#2e7d32';

// Grafik Data Tren Agregat Bulanan (Tanpa Identitas Individu)
const TREN_DATA = [
  { bulan: 'Jan', stunting: 16.5, imunisasi: 88, jaminan: 80 },
  { bulan: 'Feb', stunting: 16.0, imunisasi: 89, jaminan: 81 },
  { bulan: 'Mar', stunting: 15.2, imunisasi: 90, jaminan: 82 },
  { bulan: 'Apr', stunting: 14.8, imunisasi: 91, jaminan: 82 },
  { bulan: 'Mei', stunting: 14.2, imunisasi: 92, jaminan: 84 },
  { bulan: 'Jun', stunting: 14.0, imunisasi: 92, jaminan: 84 },
];

// Capaian Sektoral Agregat SDG 3
const CAPAIAN_DATA = [
  { nama: 'Imunisasi Balita', capaian: 92, target: 95 },
  { nama: 'KB Aktif', capaian: 78, target: 80 },
  { nama: 'Bebas Jentik', capaian: 88, target: 90 },
  { nama: 'Akses Sanitasi', capaian: 85, target: 90 },
];

export default function MonitoringKesehatanPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Informasi Kesehatan Desa dan SDG Desa 3" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER AMBER - PEMBATASAN KEWENANGAN */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Masyarakat tidak dapat mengubah atau memverifikasi data monitoring kesehatan. Halaman ini hanya menyajikan data agregat tingkat desa tanpa identitas individu.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Imunisasi Lengkap" value="92%" satuan="Balita Tercover" barColor="green" progress={92} />
        <StatCard label="Skor Stunting Desa" value="14,0%" satuan="Kategori Rendah/Aman" barColor="orange" progress={14} />
        <StatCard label="Warga ber-BPJS" value="84%" satuan="Jaminan Kesehatan" barColor="blue" progress={84} />
        <StatCard label="SDG 3 Status" value="ON TRACK" satuan="Kesehatan Baik" barColor="purple" progress={85} />
      </div>

      {/* GRAFIK & TREN */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Tren Agregat */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Tren Indikator Kesehatan Bulanan (Agregat)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={TREN_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 9 }} />
                  <Line name="Tingkat Stunting (%)" type="monotone" dataKey="stunting" stroke="#f59e0b" strokeWidth={2} />
                  <Line name="Cakupan Imunisasi (%)" type="monotone" dataKey="imunisasi" stroke="#10b981" strokeWidth={2} />
                  <Line name="Kepesertaan BPJS (%)" type="monotone" dataKey="jaminan" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Capaian SDG 3 */}
        <Card>
          <CardHeader className="py-3">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Perbandingan Capaian vs Target SDG Desa 3</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[220px] w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={CAPAIAN_DATA}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nama" tick={{ fontSize: 9 }} />
                  <YAxis tick={{ fontSize: 9 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 9 }} />
                  <Bar name="Capaian Saat Ini (%)" dataKey="capaian" fill="#10b981" />
                  <Bar name="Target SDG (%)" dataKey="target" fill="#94a3b8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* PROGRAM KESEHATAN AKTIF */}
        <Card className="lg:col-span-2">
          <CardHeader className="py-3">
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Program Kerja Kesehatan Desa (SDG 3)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { nama: 'Pemberantasan Stunting Melalui PMT & Kelas Ibu Hamil', progres: 75, target: 'Mengurangi angka stunting hingga di bawah 10%', PJ: 'Bidan Rina & Kader Gizi' },
              { nama: 'Sanitasi Total Berbasis Masyarakat (STBM)', progres: 60, target: '100% Rumah Tangga memiliki jamban sehat', PJ: 'Kasi Pelayanan & Sanitarian Puskesmas' },
              { nama: 'Penyuluhan Posyandu Lansia Huma Betang', progres: 90, target: 'Skrining kesehatan berkala lansia di 3 Dusun', PJ: 'Perawat Dedi' },
            ].map((p, idx) => (
              <div key={idx} className="p-3 border rounded-lg bg-slate-50/50 space-y-2">
                <div className="flex justify-between items-start gap-2 flex-wrap">
                  <p className="font-bold text-slate-800">{p.nama}</p>
                  <span className="text-[10px] font-black text-indigo-750">{p.progres}% Selesai</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-indigo-700 h-full rounded-full" style={{ width: `${p.progres}%` }} />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-500">
                  <span>Target: {p.target}</span>
                  <span>PJ: {p.PJ}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* INFO FASILITAS & INFO PENCEGAHAN */}
        <div className="space-y-4">
          
          {/* Peringatan Kesehatan Publik */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <AlertTriangle size={13} className="text-orange-600" /> Peringatan Publik
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="p-2.5 bg-orange-50 border border-orange-200 rounded-lg text-orange-850">
                <p className="font-bold">⚠️ Waspada DBD & Malaria</p>
                <p className="text-[10px] mt-0.5 leading-relaxed">Menjelang musim pancaroba, masyarakat dihimbau melakukan 3M Plus. Kerja bakti desa dijadwalkan Minggu ini.</p>
              </div>
            </CardContent>
          </Card>

          {/* Kontak Fasilitas Kesehatan */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Fasilitas Kesehatan Terdekat</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5">
              <div className="space-y-1">
                <p className="font-bold text-slate-800">Puskesmas Pembantu Lung Anai</p>
                <p className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin size={11} /> Dusun A, Desa Lung Anai (200m)</p>
                <p className="flex items-center gap-1 text-[10px] text-slate-500"><Phone size={11} /> +62 812-3456-7890 (Bidan Rina)</p>
              </div>
              <div className="space-y-1 border-t pt-2">
                <p className="font-bold text-slate-800">Puskesmas Kecamatan</p>
                <p className="flex items-center gap-1 text-[10px] text-slate-500"><MapPin size={11} /> Jl. Raya Trans Borneo Km 14 (12km)</p>
                <p className="flex items-center gap-1 text-[10px] text-slate-500"><Phone size={11} /> +62 853-9988-7766 (Ambulans Siaga)</p>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
}
