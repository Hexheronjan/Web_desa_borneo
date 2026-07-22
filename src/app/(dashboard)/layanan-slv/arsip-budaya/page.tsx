'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  FileText, Image, Play, Download, ShieldCheck, Landmark, Info
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface ArsipBudaya {
  id: string;
  nama: string;
  tipe: 'Foto' | 'Video' | 'Dokumen';
  ukuran: string;
  tanggalUnggah: string;
  deskripsi: string;
  sumber: string;
  fileName: string;
}

const MOCK_ARSIP: ArsipBudaya[] = [
  { id: 'ARS-01', nama: 'Foto Dokumentasi Mecaq Undat 2025', tipe: 'Foto', ukuran: '4.2 MB', tanggalUnggah: '10 Agustus 2025', deskripsi: 'Dokumentasi foto tari menyambut tamu adat dan penumbukan beras baru oleh tetua desa.', sumber: 'Dokumentasi Pemdes', fileName: 'MecaqUndat_2025_01.jpg' },
  { id: 'ARS-02', nama: 'Rekaman Pertunjukan Musik Sampe Huma Betang', tipe: 'Video', ukuran: '45.8 MB', tanggalUnggah: '22 Mei 2026', deskripsi: 'Video penampilan Sampe secara kolaboratif oleh pemuda adat di teras Rumah Panjang.', sumber: 'Sanggar Seni Adat', fileName: 'Pertunjukan_Sampe_May2026.mp4' },
  { id: 'ARS-03', nama: 'Kamus Bahasa Dayak Kenyah Dialek Umaq Jalan v1', tipe: 'Dokumen', ukuran: '2.8 MB', tanggalUnggah: '01 Juli 2026', deskripsi: 'Kamus terjemahan kosakata dasar Dayak Kenyah ke Bahasa Indonesia untuk pelestarian bahasa ibu.', sumber: 'Lembaga Adat Lung Anai', fileName: 'Kamus_Bahasa_DayakKenyah_v1.pdf' },
];

export default function ArsipBudayaPublikPage() {
  const [data] = useState<ArsipBudaya[]>(MOCK_ARSIP);

  const handleDownload = (fileName: string) => {
    alert(`📥 Mengunduh arsip budaya: ${fileName}\n(Simulasi Unduh Terproteksi)`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Arsip Budaya Publik" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER PRIVASI */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Seluruh berkas arsip budaya di bawah ini merupakan dokumen publik yang bebas diakses untuk keperluan edukasi dan penelitian.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Arsip Publik" value={data.length} satuan="Berkas Tersedia" barColor="purple" progress={100} />
        <StatCard label="Dokumen PDF" value={data.filter(a => a.tipe === 'Dokumen').length} satuan="Berkas Bahasa &amp; Sastra" barColor="green" progress={33} />
        <StatCard label="Media Foto &amp; Video" value={data.filter(a => ['Foto', 'Video'].includes(a.tipe)).length} satuan="Berkas Dokumentasi Fisik" barColor="orange" progress={67} />
        <StatCard label="Bandwidth Unduhan" value="Aman" satuan="Server Lokal SID" barColor="blue" progress={90} />
      </div>

      <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Koleksi Arsip Kebudayaan Terbuka</h2>

      <div className="space-y-3 text-xs">
        {data.map(a => (
          <Card key={a.id} className="border border-slate-200 shadow-none">
            <CardContent className="p-4 space-y-3.5">
              
              <div className="flex justify-between items-start gap-2 flex-wrap text-[10px]">
                <div>
                  <span className="font-mono text-slate-400 font-bold mr-2">{a.id}</span>
                  <span className={`font-bold px-1.5 py-0.5 rounded border ${
                    a.tipe === 'Dokumen' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                    a.tipe === 'Video' ? 'bg-red-50 text-red-650 border-red-200' :
                    'bg-green-50 text-green-700 border-green-200'
                  }`}>{a.tipe}</span>
                </div>
                <span className="text-slate-400 font-semibold">{a.tanggalUnggah}</span>
              </div>

              <div className="flex items-start gap-2.5">
                {a.tipe === 'Dokumen' ? <FileText size={24} className="text-slate-400 flex-shrink-0" /> :
                 a.tipe === 'Video' ? <Play size={24} className="text-red-500 flex-shrink-0" /> :
                 <Image size={24} className="text-green-600 flex-shrink-0" />}
                
                <div>
                  <h3 className="font-bold text-slate-805 text-sm">{a.nama}</h3>
                  <p className="text-slate-550 leading-relaxed mt-1 text-[11px]">{a.deskripsi}</p>
                </div>
              </div>

              <div className="border-t pt-2.5 flex justify-between items-center text-[10px]">
                <span className="text-slate-450">Sumber Kontributor: <strong>{a.sumber}</strong> ({a.ukuran})</span>
                <button
                  onClick={() => handleDownload(a.fileName)}
                  className="px-2.5 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-800 flex items-center gap-1"
                >
                  <Download size={11} /> Unduh Berkas
                </button>
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

    </div>
  );
}
