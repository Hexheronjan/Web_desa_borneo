'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { ShieldCheck, Globe, Calendar, Bookmark, AlertTriangle, RefreshCw, Lock } from 'lucide-react';

const COLOR = '#6a1b9a';

const AGENDA_BUDAYA = [
  { nama: 'Festival Adat Dayak Kenyah Tahun 2025', tgl: '20–22 Agustus 2025', status: 'Terbuka', keterangan: 'Kegiatan adat tahunan yang terbuka untuk masyarakat umum dan wisatawan.' },
  { nama: 'Musyawarah Adat Penentuan Batas Wilayah', tgl: '5 Juli 2025', status: 'Terbuka', keterangan: 'Koordinasi batas wilayah adat dengan desa tetangga — dapat dihadiri tokoh masyarakat.' },
  { nama: 'Upacara Adat Belian (Pengobatan Tradisional)', tgl: '15 Juli 2025', status: 'Terbatas', keterangan: 'Upacara sakral yang hanya boleh dihadiri oleh anggota yang berhak.' },
];

const LEMBAGA = [
  { nama: 'Lembaga Adat Dayak Kenyah Lung Anai', peran: 'Pelestari adat, hukum, dan norma adat desa', kontak: 'Ketua: Bapak Yohanes Lung' },
  { nama: 'Sanggar Budaya Bintang Borneo', peran: 'Pelatihan dan pertunjukan seni tari, musik tradisional', kontak: 'Ketua Sanggar: Ibu Maria Seli' },
  { nama: 'Komite Pelestarian Bahasa Kenyah', peran: 'Dokumentasi dan pengajaran bahasa Kenyah kepada generasi muda', kontak: 'Koordinator: Bapak David Tekang' },
];

const PROGRAM_PELESTARIAN = [
  { nama: 'Digitalisasi Arsip Adat & Hukum Adat', status: 'Berjalan', sdg: 'SDG Desa 18', ket: 'Dokumentasi 120+ dokumen adat dalam arsip digital terenkripsi.' },
  { nama: 'Pameran Seni Anyaman Rotan Online', status: 'Selesai', sdg: 'SDG Desa 18', ket: 'Platform marketplace anyaman rotan khas Dayak Kenyah telah diluncurkan.' },
  { nama: 'Sekolah Budaya Digital Anak Desa', status: 'Persiapan', sdg: 'SDG Desa 4 & 18', ket: 'Kurikulum literasi budaya digital dalam tahap finalisasi.' },
];

export default function InformasiBudayaPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Informasi Budaya Publik" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Batasan Akses Data Sakral & Terbatas</p>
          <p className="text-amber-700 mt-0.5 font-medium leading-relaxed">
            Data sakral, ritual khusus, atau informasi adat yang belum disetujui Lembaga Adat <strong>tidak akan ditampilkan</strong> pada halaman ini. Hanya informasi budaya publik yang dapat diakses.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Agenda Budaya" value={AGENDA_BUDAYA.filter(a => a.status === 'Terbuka').length} satuan="Terbuka Publik" barColor="purple" progress={67} />
        <StatCard label="Lembaga Adat" value={LEMBAGA.length} satuan="Lembaga Aktif" barColor="blue" progress={100} />
        <StatCard label="Program Pelestarian" value={PROGRAM_PELESTARIAN.length} satuan="Program Aktif" barColor="green" progress={100} />
        <StatCard label="SDG Desa 18" value="On Track" satuan="Kelembagaan Adat" barColor="orange" progress={78} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* AGENDA BUDAYA */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Calendar size={16} /> Agenda Budaya & Kegiatan Adat Terbuka
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {AGENDA_BUDAYA.map((a, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50 space-y-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-bold text-slate-800 text-xs">{a.nama}</p>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded whitespace-nowrap ${a.status === 'Terbuka' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{a.status}</span>
                </div>
                <p className="text-[10px] text-purple-600 font-semibold">{a.tgl}</p>
                <p className="text-[10px] text-slate-500 leading-snug">{a.keterangan}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* KELEMBAGAAN PUBLIK */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Globe size={16} /> Informasi Kelembagaan Publik
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {LEMBAGA.map((l, i) => (
              <div key={i} className="p-3 border rounded-xl bg-slate-50/50 space-y-1">
                <p className="font-bold text-slate-800 text-xs">{l.nama}</p>
                <p className="text-[10px] text-slate-500">{l.peran}</p>
                <p className="text-[10px] font-semibold text-purple-700">{l.kontak}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* PROGRAM PELESTARIAN */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Bookmark size={16} /> Program Pelestarian Budaya & SDG Desa 18
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">Nama Program</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">SDG Desa</th>
                    <th className="p-2.5">Keterangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {PROGRAM_PELESTARIAN.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-semibold text-slate-800">{p.nama}</td>
                      <td className="p-2.5"><span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${p.status === 'Selesai' ? 'bg-green-100 text-green-700' : p.status === 'Berjalan' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span></td>
                      <td className="p-2.5 text-purple-600 font-semibold whitespace-nowrap">{p.sdg}</td>
                      <td className="p-2.5 text-slate-500 leading-snug">{p.ket}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3 p-2.5 bg-slate-50 rounded-lg border border-dashed text-[10px] text-slate-400 flex items-center gap-2">
              <AlertTriangle size={12} className="text-amber-500" /> Arsip yang belum disetujui Lembaga Adat tidak akan ditampilkan di sini.
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data dikelola bersama Lembaga Adat & Operator Desa</span>
        <span>SDG Desa 18 — Kelembagaan & Kemitraan</span>
      </div>
    </div>
  );
}
