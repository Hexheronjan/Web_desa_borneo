'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Calendar, Activity, AlertTriangle, Lock, RefreshCw } from 'lucide-react';

const COLOR = '#6a1b9a';

const JADWAL_LAYANAN = [
  { nama: 'Posyandu Balita Dusun A', jadwal: 'Setiap Senin I/III, 08:00–12:00', lokasi: 'Gedung Posyandu Dusun A', status: 'Aktif' },
  { nama: 'Posyandu Lansia Dusun B', jadwal: 'Setiap Selasa II, 09:00–12:00', lokasi: 'Balai RT 04 Dusun B', status: 'Aktif' },
  { nama: 'Konsultasi Gizi & Stunting', jadwal: 'Setiap Rabu, 10:00–12:00', lokasi: 'Puskesmas Pembantu Desa', status: 'Aktif' },
  { nama: 'Pelayanan BPJS & Administrasi Kesehatan', jadwal: 'Setiap hari kerja, 08:00–14:00', lokasi: 'Kantor Desa Lung Anai', status: 'Aktif' },
];

const PROGRAM_KESEHATAN = [
  { nama: 'Gerakan 1000 HPK (Gizi Ibu Hamil & Balita)', tujuan: 'Penurunan stunting 20% per tahun', pj: 'Kader Posyandu & Nakes', progres: 68, status: 'Berjalan' },
  { nama: 'PHBS Desa (Perilaku Hidup Bersih & Sehat)', tujuan: 'Edukasi sanitasi 100% KK', pj: 'Pokja PHBS', progres: 82, status: 'Berjalan' },
  { nama: 'Surveilans Penyakit DBD & Malaria', tujuan: 'Zero kasus fatal', pj: 'Bidan & Nakes Desa', progres: 100, status: 'Selesai' },
  { nama: 'Sanitasi Air Bersih SPAM Desa', tujuan: 'Air bersih 100% RT', pj: 'Pemdes & PAMSIMAS', progres: 55, status: 'Berjalan' },
];

const CAPAIAN_AGREGAT = [
  { label: 'Imunisasi Lengkap Balita', val: '92%', sdg: 'SDG 3' },
  { label: 'Penurunan Stunting', val: '14% (Aman)', sdg: 'SDG 3' },
  { label: 'Cakupan KB Aktif', val: '78%', sdg: 'SDG 3' },
  { label: 'Warga ber-BPJS', val: '84%', sdg: 'SDG 3' },
];

const PERINGATAN = [
  { judul: 'Waspada Nyamuk Aedes — Musim Hujan', penting: true, ket: 'Lakukan 3M Plus di sekitar rumah. Pemberantasan sarang nyamuk dilakukan serentak tanggal 20 Juli 2025.' },
  { judul: 'Imunisasi MR Anak 5–15 Tahun', penting: false, ket: 'Jadwal imunisasi di SDN Lung Anai 01: 25 Juli 2025. Wajib bawa buku KIA.' },
];

export default function InformasiKesehatanPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Informasi Kesehatan dan SDG Desa 3" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed text-amber-700">
          Halaman ini hanya menampilkan data <strong>agregat kesehatan tingkat desa</strong>. Identitas pasien, rekam medis individual, atau data kelompok kecil yang dapat dikenali <strong>tidak akan ditampilkan</strong> untuk melindungi privasi warga.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Imunisasi Lengkap" value="92%" satuan="Balita Desa" barColor="green" progress={92} />
        <StatCard label="Stunting" value="14%" satuan="Masih Kategori Aman" barColor="orange" progress={14} />
        <StatCard label="Warga ber-BPJS" value="84%" satuan="Cakupan JKN" barColor="blue" progress={84} />
        <StatCard label="Target SDG 3" value="On Track" satuan="Kesehatan & Kesejahteraan" barColor="purple" progress={80} />
      </div>

      {/* PERINGATAN KESEHATAN */}
      {PERINGATAN.map((p, i) => (
        <div key={i} className={`p-3.5 rounded-xl border text-xs flex items-start gap-2.5 ${p.penting ? 'bg-red-50 border-red-200 text-red-800' : 'bg-sky-50 border-sky-200 text-sky-800'}`}>
          <AlertTriangle size={16} className={`flex-shrink-0 mt-0.5 ${p.penting ? 'text-red-600' : 'text-sky-600'}`} />
          <div>
            <p className="font-bold">{p.penting ? '⚠️ ' : 'ℹ️ '}{p.judul}</p>
            <p className="mt-0.5 font-medium">{p.ket}</p>
          </div>
        </div>
      ))}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* JADWAL PELAYANAN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Jadwal Pelayanan Kesehatan Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2.5">
            {JADWAL_LAYANAN.map((j, i) => (
              <div key={i} className="flex items-start gap-3 p-2.5 border rounded-lg bg-slate-50/50">
                <div className="w-9 h-9 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0"><Heart size={16} className="text-red-600" /></div>
                <div className="text-xs">
                  <p className="font-semibold text-slate-800">{j.nama}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{j.jadwal}</p>
                  <p className="text-[10px] text-purple-600 font-medium">📍 {j.lokasi}</p>
                </div>
                <span className="ml-auto text-[9px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded whitespace-nowrap">{j.status}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PROGRAM KESEHATAN */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Program Kesehatan Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {PROGRAM_KESEHATAN.map((p, i) => (
              <div key={i} className="space-y-1.5 p-2.5 border rounded-lg bg-slate-50/50">
                <div className="flex justify-between items-start gap-2">
                  <p className="font-semibold text-slate-800 leading-snug">{p.nama}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap ${p.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{p.status}</span>
                </div>
                <p className="text-[10px] text-slate-500">PJ: {p.pj}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full bg-purple-600" style={{ width: `${p.progres}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-purple-700">{p.progres}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* CAPAIAN AGREGAT SDG 3 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Heart size={16} /> Capaian Agregat Kesehatan & SDG Desa 3
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {CAPAIAN_AGREGAT.map((c, i) => (
                <div key={i} className="p-3 border rounded-xl bg-slate-50 text-center space-y-1">
                  <p className="font-bold text-2xl text-purple-700">{c.val}</p>
                  <p className="text-xs font-semibold text-slate-700 leading-snug">{c.label}</p>
                  <span className="text-[9px] font-bold bg-purple-100 text-purple-600 px-1.5 py-0.5 rounded">{c.sdg}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-slate-400 mt-3 border-t pt-2">* Data capaian bersumber dari laporan Nakes Desa dan Kader Posyandu — disajikan secara agregat tanpa mengidentifikasi individu.</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data kesehatan agregat diperbarui oleh Nakes & Kader Posyandu Desa</span>
        <span>SDG Desa 3 — Kesehatan & Kesejahteraan</span>
      </div>
    </div>
  );
}
