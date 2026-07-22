'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { ShieldAlert, CheckCircle, Clock, BookOpen, AlertTriangle, Users } from 'lucide-react';

const COLOR = '#1565c0';

export default function KompetensiSDMPage() {
  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Kompetensi dan Pengembangan SDM Pendidikan" modul="Guru/Tenaga Pendidikan" color={COLOR} />

      {/* Batasan Kewenangan */}
      <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-955 flex items-start gap-2">
        <ShieldAlert size={14} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          <strong>Batasan Kewenangan Penting:</strong> Guru/Tenaga Pendidikan hanya berwenang memantau kompetensi dan kebutuhan peningkatan kependidikan. Menu ini tidak memberi guru kewenangan mengelola seluruh data SDM pemerintahan desa atau data aparatur desa.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* KIRI (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profil Kemampuan Guru / Fasilitator */}
          <Card>
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase">Profil Kemampuan Guru / Fasilitator</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="p-3 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">Kompetensi Pedagogik Dasar</p>
                <p className="text-slate-500 mt-0.5">Rata-rata skor: 78.50% | Status: Baik. Penguasaan metode belajar interaktif sudah merata.</p>
              </div>
              <div className="p-3 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">Keterampilan TIK &amp; Media Pembelajaran Digital</p>
                <p className="text-slate-500 mt-0.5">Rata-rata skor: 64.20% | Status: Perlu Peningkatan. 6 dari 16 guru memerlukan pelatihan classroom management tool.</p>
              </div>
            </CardContent>
          </Card>

          {/* Kebutuhan Peningkatan Kompetensi */}
          <Card>
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase">Kebutuhan Peningkatan Kompetensi</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2">
              <ul className="list-disc pl-4 space-y-2 text-slate-650 font-medium">
                <li><strong>Kurikulum Merdeka Mandiri:</strong> 4 guru kelas rendah SDN 006 memerlukan modul pendampingan lanjutan.</li>
                <li><strong>Keamanan Informasi &amp; Password:</strong> Pelatihan pengenalan sandi aman bagi seluruh pengelola tata usaha SMP Filial.</li>
                <li><strong>Keterampilan Coding Anak:</strong> Guru pembimbing memerlukan training basic scratch &amp; python.</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* KANAN (1/3) */}
        <div className="space-y-4">
          {/* Sertifikasi & Masa Berlaku */}
          <Card>
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase">Sertifikasi Pendidikan</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {[
                { sertifikasi: 'Pendidik Profesional (Kemendikbud)', count: '6 Guru', status: 'Aktif' },
                { sertifikasi: 'Google Certified Educator Level 1', count: '3 Guru', status: 'Aktif' },
                { sertifikasi: 'Pelatihan Keamanan Digital Dasar', count: '12 Guru', status: 'Kedaluwarsa' },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-2 last:border-0 last:pb-0">
                  <div>
                    <p className="font-bold text-slate-800">{item.sertifikasi}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{item.count}</p>
                  </div>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                    item.status === 'Aktif' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'
                  }`}>{item.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Regenerasi & Distribusi SDM */}
          <Card>
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase">Regenerasi &amp; Distribusi</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              <p className="text-slate-500">Ketersediaan pendamping guru &amp; relawan:</p>
              <div className="text-[10px] space-y-1 text-slate-700">
                <div><strong>Dusun 1:</strong> 10 Guru (Terpenuhi)</div>
                <div><strong>Dusun 2:</strong> 4 Guru (Terpenuhi)</div>
                <div><strong>Dusun 3:</strong> 2 Guru (Butuh Pendamping Tambahan)</div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
