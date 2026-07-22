'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BookOpen, Eye, Play, FileText, CheckCircle, Info, Calendar, Filter
} from 'lucide-react';
import { useState, useMemo } from 'react';

const COLOR = '#2e7d32';

interface MateriEdukasi {
  id: string;
  judul: string;
  format: 'Artikel' | 'Video' | 'Infografis';
  topik: 'Kesehatan Ibu dan Anak' | 'Gizi & Nutrisi' | 'Sanitasi' | 'Pencegahan Penyakit' | 'Kesehatan Lansia';
  deskripsi: string;
  sumber: string;
  sudahDibaca: boolean;
}

const MOCK_MATERI: MateriEdukasi[] = [
  { id: 'E-01', judul: 'Pemberian ASI Eksklusif 6 Bulan Pertama', format: 'Artikel', topik: 'Kesehatan Ibu dan Anak', deskripsi: 'Pentingnya ASI eksklusif bagi daya tahan tubuh bayi dan tumbuh kembang optimal.', sumber: 'Kementerian Kesehatan RI', sudahDibaca: true },
  { id: 'E-02', judul: 'Memilih Pangan Lokal Bergizi Tinggi di Kalimantan', format: 'Video', topik: 'Gizi & Nutrisi', deskripsi: 'Video edukasi memanfaatkan sayur-mayur dan ikan sungai lokal untuk mencegah anemia.', sumber: 'Puskesmas Kecamatan', sudahDibaca: false },
  { id: 'E-03', judul: 'Pilar STBM: Sanitasi Total Berbasis Masyarakat', format: 'Infografis', topik: 'Sanitasi', deskripsi: 'Infografis langkah praktis menjaga kebersihan lingkungan rumah tangga dari kuman penyakit.', sumber: 'Pokja PHBS Desa', sudahDibaca: true },
  { id: 'E-04', judul: 'Mengenal Gejala Awal DBD & Langkah Tanggap Darurat', format: 'Artikel', topik: 'Pencegahan Penyakit', deskripsi: 'Deteksi demam berdarah dan langkah penanganan mandiri sebelum dirujuk ke faskes.', sumber: 'Kemenkes RI', sudahDibaca: false },
  { id: 'E-05', judul: 'Tips Menjaga Kebugaran di Usia Senja (Lansia)', format: 'Video', topik: 'Kesehatan Lansia', deskripsi: 'Senam ringan dan pola konsumsi sehat bagi lansia di lingkungan pedesaan.', sumber: 'Bidan Desa', sudahDibaca: false },
  { id: 'E-06', judul: 'Pencegahan Stunting Sejak Masa Kehamilan', format: 'Artikel', topik: 'Kesehatan Ibu dan Anak', deskripsi: 'Pola makan 1000 Hari Pertama Kehidupan (HPK) untuk mencegah stunting.', sumber: 'Kader Gizi Desa', sudahDibaca: true },
];

export default function EdukasiKesehatanPage() {
  const [list, setList] = useState<MateriEdukasi[]>(MOCK_MATERI);
  const [filterTopik, setFilterTopik] = useState<string>('Semua');

  const filteredMateri = useMemo(() => {
    if (filterTopik === 'Semua') return list;
    return list.filter(m => m.topik === filterTopik);
  }, [list, filterTopik]);

  const handleRead = (id: string) => {
    setList(prev => prev.map(m => m.id === id ? { ...m, sudahDibaca: true } : m));
    alert('📖 Materi ditandai telah dibaca/ditonton.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Edukasi Kesehatan" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER NOTIFICATION */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <Info size={16} className="text-indigo-600 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Konten edukasi menggunakan sumber yang dapat ditelusuri dan tidak menggantikan konsultasi tenaga kesehatan.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Materi Edukasi" value={list.length} satuan="Artikel / Video / Grafis" barColor="purple" progress={100} />
        <StatCard label="Materi Sudah Dibaca" value={list.filter(m => m.sudahDibaca).length} satuan="Progres Membaca Anda" barColor="green" progress={(list.filter(m => m.sudahDibaca).length / list.length) * 100} />
        <StatCard label="Jadwal Penyuluhan" value="2 Kegiatan" satuan="Minggu Ini" barColor="orange" progress={50} />
        <StatCard label="Kontributor Ahli" value="3 Institusi" satuan="Kemenkes, Puskesmas, Pemdes" barColor="blue" progress={80} />
      </div>

      {/* FILTER TOPIC */}
      <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border rounded-xl">
        {['Semua', 'Kesehatan Ibu dan Anak', 'Gizi & Nutrisi', 'Sanitasi', 'Pencegahan Penyakit', 'Kesehatan Lansia'].map(t => (
          <button
            key={t}
            onClick={() => setFilterTopik(t)}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold transition-colors border ${filterTopik === t ? 'bg-indigo-700 border-indigo-700 text-white' : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100'}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* GRID MATERI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredMateri.map(m => (
          <Card key={m.id} className={`border transition-all flex flex-col justify-between ${m.sudahDibaca ? 'border-slate-200 bg-slate-50/50' : 'border-indigo-200 bg-white'}`}>
            <CardContent className="p-4 space-y-3 text-xs flex-1 flex flex-col justify-between">
              
              <div className="space-y-2">
                <div className="flex justify-between items-center flex-wrap gap-1">
                  <span className="text-[9px] font-bold text-slate-400">{m.topik}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                    m.format === 'Artikel' ? 'bg-indigo-50 text-indigo-700 border border-indigo-150' :
                    m.format === 'Video' ? 'bg-red-50 text-red-650 border border-red-150' :
                    'bg-green-50 text-green-700 border border-green-150'
                  }`}>
                    {m.format}
                  </span>
                </div>

                <h3 className="font-bold text-slate-800 text-xs leading-snug">{m.judul}</h3>
                <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-3">{m.deskripsi}</p>
              </div>

              <div className="border-t pt-3 mt-3 flex justify-between items-center text-[9px] text-slate-450">
                <span>Sumber: <strong>{m.sumber}</strong></span>
                {m.sudahDibaca ? (
                  <span className="flex items-center gap-0.5 text-green-700 font-bold"><CheckCircle size={10} /> Sudah Dibaca</span>
                ) : (
                  <button onClick={() => handleRead(m.id)} className="px-2 py-0.5 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-800">
                    Buka {m.format === 'Video' ? 'Tonton' : 'Baca'}
                  </button>
                )}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* MATERI YANG TELAH DIBACA */}
      <Card className="border border-slate-200 shadow-none">
        <CardHeader className="py-2.5 bg-slate-50 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle size={14} className="text-green-600" /> Riwayat Materi yang Telah Diselesaikan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3.5 space-y-2 text-xs">
          {list.filter(m => m.sudahDibaca).map(m => (
            <div key={m.id} className="flex justify-between items-center p-2 bg-slate-55/30 border border-slate-200 rounded-lg text-slate-650">
              <div className="flex items-center gap-2">
                <FileText size={13} className="text-slate-400" />
                <div>
                  <p className="font-semibold text-slate-800">{m.judul}</p>
                  <p className="text-[9px] text-slate-400">{m.topik} • Penerbit: {m.sumber}</p>
                </div>
              </div>
              <span className="text-[9px] font-bold text-green-700">Tuntas</span>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}
