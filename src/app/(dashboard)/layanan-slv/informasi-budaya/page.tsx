'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Landmark, Info, ShieldCheck, Heart, Sparkles, BookOpen, Calendar, HelpCircle
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface KebudayaanItem {
  id: string;
  nama: string;
  deskripsi: string;
  PJ: string;
  status: 'Publik' | 'Terbatas';
  sumber: string;
}

const MOCK_BUDAYA: KebudayaanItem[] = [
  { id: 'BDY-01', nama: 'Sistem Hukum Adat & Denda Pelanggaran Desa', deskripsi: 'Hukum adat publik mengenai tata kelola hutan adat, pelarangan penebangan pohon sembarangan, serta sanksi denda adat (singit).', PJ: 'Kepala Adat Lung Anai', status: 'Publik', sumber: 'Buku Lembaga Adat Jilid II' },
  { id: 'BDY-02', nama: 'Seni Musik Sampe Tradisional', deskripsi: 'Sejarah, filosofi melodi, dan petunjuk dasar memainkan instrumen musik petik Sampe Dayak Kenyah.', PJ: 'Pemuda Adat & Pengrajin Sampe', status: 'Publik', sumber: 'Dinas Kebudayaan' },
  { id: 'BDY-03', nama: 'Upacara Mecaq Undat (Ritual Syukur Panen)', deskripsi: 'Jadwal, tata cara ritual, serta pemaknaan festival Mecaq Undat yang diadakan tahunan pasca-panen padi gunung.', PJ: 'Lembaga Adat & Pemdes', status: 'Publik', sumber: 'Dokumen Adat Desa' },
];

export default function InformasiBudayaPublikPage() {
  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Informasi Budaya Publik dan SDG Desa 18" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER NOTIFIKASI */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          🔒 <strong>Batas Hak Akses Adat:</strong> Halaman ini hanya menyajikan data budaya publik yang telah disetujui Lembaga Adat. Dokumen rahasia atau hukum adat internal yang terbatas tidak dipublikasikan di sini.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Dokumentasi Budaya" value={MOCK_BUDAYA.length} satuan="Materi Terdaftar" barColor="purple" progress={100} />
        <StatCard label="SDG Desa 18 Skor" value="55,1" satuan="Kategori Cukup Baik" barColor="green" progress={55.1} />
        <StatCard label="Kegiatan Adat Tahun Ini" value="6 Upacara" satuan="Tingkat Partisipasi Warga" barColor="orange" progress={90} />
        <StatCard label="Persetujuan Publikasi" value="100%" satuan="Divalidasi Kepala Adat" barColor="blue" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* LIST DOKUMEN BUDAYA PUBLIK */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Katalog Adat &amp; Kebudayaan Terbuka</h2>

          <div className="space-y-3.5">
            {MOCK_BUDAYA.map(b => (
              <Card key={b.id} className="border border-slate-200 shadow-none">
                <CardContent className="p-4 space-y-3">
                  
                  <div className="flex justify-between items-center text-[10px] border-b pb-1.5">
                    <span className="font-mono font-bold text-slate-400">{b.id}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{b.status}</span>
                  </div>

                  <h3 className="font-bold text-slate-805 text-sm">{b.nama}</h3>
                  <p className="text-slate-650 leading-relaxed">{b.deskripsi}</p>

                  <div className="border-t pt-2 mt-2 flex justify-between items-center text-[9px] text-slate-450">
                    <span>Penanggung Jawab: {b.PJ}</span>
                    <span>Sumber: {b.sumber}</span>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* PROFIL HUMA BETANG */}
        <div className="space-y-4">
          
          <Card>
            <CardHeader className="py-2.5">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Landmark size={13} className="text-indigo-700" /> Huma Betang Adat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-slate-600 leading-relaxed text-[11px]">
              <p>Huma Betang (Rumah Panjang) merupakan pusat kegiatan sosial, kebudayaan, dan musyawarah adat masyarakat Lung Anai.</p>
              <p>Pengunjung umum diperbolehkan datang dengan mengikuti aturan kepatutan berpakaian dan meminta izin terlebih dahulu kepada penjaga Huma Betang.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="py-2.5">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                <Calendar size={13} className="text-orange-500" /> Kalender Upacara Terdekat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-[11px]">
              <div className="p-2 bg-slate-50 border rounded-lg">
                <p className="font-bold text-slate-800">Mecaq Undat 2026</p>
                <p className="text-slate-500">Tanggal: 1-2 Agustus 2026</p>
                <p className="text-slate-500">Tempat: Halaman Huma Betang</p>
              </div>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}
