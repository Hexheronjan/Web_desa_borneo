'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Info, Users, MapPin, Landmark, Calendar, ShieldCheck, Heart, GraduationCap, Award
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

export default function InformasiDesaPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Informasi Desa" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER PRIVASI */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Seluruh data profil dan statistik di bawah merupakan data agregat publik resmi Pemerintah Desa Lung Anai untuk transparansi informasi.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Penduduk" value="1.240 Warga" satuan="320 Kepala Keluarga" barColor="purple" progress={100} />
        <StatCard label="Luas Wilayah" value="4.820 Ha" satuan="Hutan &amp; Pertanian Adat" barColor="green" progress={100} />
        <StatCard label="Skor SLV Desa" value="53,50" satuan="Cukup Siap" barColor="orange" progress={53.5} />
        <StatCard label="Batas Administrasi" value="Kab. Kutai Kartanegara" satuan="Provinsi Kalimantan Timur" barColor="blue" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* PROFIL UMUM DESA */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Landmark size={14} className="text-indigo-700" /> Profil &amp; Sejarah Singkat Desa
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 leading-relaxed text-slate-700">
            <p>
              Desa Adat **Lung Anai** terletak di Kecamatan Loa Kulu, Kabupaten Kutai Kartanegara. Mayoritas penduduk merupakan masyarakat keturunan suku Dayak Kenyah yang menetap dan menjaga kelestarian adat istiadat leluhur di tengah arus modernisasi.
            </p>
            <p>
              Sebagai salah satu desa percontohan **Smart Living Village (SLV)**, Lung Anai berkomitmen untuk mengintegrasikan teknologi informasi guna mempermudah akses layanan kesehatan dasar (SDG 3), kelas pendidikan berkelanjutan (SDG 4), serta pemeliharaan adat istiadat dan kearifan lokal (SDG 18).
            </p>

            <div className="border-t pt-4 space-y-2.5">
              <p className="font-bold text-slate-800 text-xs">Struktur Organisasi Pemerintahan Desa:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
                <div className="p-2 border rounded-lg bg-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold">Kepala Desa</p>
                  <p className="font-bold text-slate-800 mt-0.5">Kepala Desa Lung Anai</p>
                </div>
                <div className="p-2 border rounded-lg bg-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold">Sekretaris Desa</p>
                  <p className="font-bold text-slate-800 mt-0.5">Pak Herman</p>
                </div>
                <div className="p-2 border rounded-lg bg-slate-50">
                  <p className="text-[10px] text-slate-400 font-bold">Operator TIK/SID</p>
                  <p className="font-bold text-slate-800 mt-0.5">Rian</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DEMOGRAFI & GEOGRAFIS */}
        <div className="space-y-4">
          
          <Card>
            <CardHeader className="py-2.5">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <MapPin size={13} className="text-red-500" /> Geografis Wilayah
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Sebelah Utara</span>
                <span className="font-bold text-slate-800">Hutan Lindung / PT Kelian</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Sebelah Selatan</span>
                <span className="font-bold text-slate-800">Sungai Belayan</span>
              </div>
              <div className="flex justify-between py-1 border-b">
                <span className="text-slate-500">Sebelah Timur</span>
                <span className="font-bold text-slate-800">Desa Margahayu</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Sebelah Barat</span>
                <span className="font-bold text-slate-800">Kecamatan Loa Kulu</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-2.5">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider">Kontak &amp; Layanan Pengaduan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1.5 leading-normal">
              <p className="font-bold text-slate-800">Sekretariat Balai Desa Lung Anai</p>
              <p className="text-slate-500">Jl. Mulawarman No. 01, Lung Anai</p>
              <p className="text-slate-500">Email: pemdes@lunganai.desa.id</p>
              <p className="text-slate-500">HP/WA: +62 813-9080-7766</p>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
