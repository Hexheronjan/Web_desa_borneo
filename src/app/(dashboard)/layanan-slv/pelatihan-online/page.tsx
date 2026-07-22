'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  BookOpen, Search, Filter, Play, CheckCircle, Award,
  Download, Clock, AlignLeft, Info
} from 'lucide-react';
import { useState, useMemo } from 'react';

const COLOR = '#2e7d32';

interface Pelatihan {
  id: string;
  nama: string;
  kategori: 'Kesehatan' | 'Pertanian' | 'Teknologi' | 'Kerajinan' | 'Pendidikan';
  tingkat: 'Pemula' | 'Menengah' | 'Mahir';
  deskripsi: string;
  durasi: number; // Jam
  jumlahModul: number;
  progres: number; // % progres pengguna
  status: 'Belum' | 'Dalam Proses' | 'Selesai';
  materiFile: string;
}

const MOCK_PELATIHAN: Pelatihan[] = [
  { id: 'PL-01', nama: 'E-Commerce untuk Penjualan Kerajinan Tangan', kategori: 'Teknologi', tingkat: 'Pemula', deskripsi: 'Belajar membuat akun toko online, mengambil foto produk yang menarik, dan menjangkau pembeli kota.', durasi: 12, jumlahModul: 5, progres: 60, status: 'Dalam Proses', materiFile: 'Modul_ECommerce_Lokal.pdf' },
  { id: 'PL-02', nama: 'Pembuatan Pupuk Organik Cair Mandiri', kategori: 'Pertanian', tingkat: 'Pemula', deskripsi: 'Pemanfaatan sisa limbah organik dapur dan pertanian untuk pembuatan pupuk bernilai guna tinggi.', durasi: 8, jumlahModul: 4, progres: 100, status: 'Selesai', materiFile: 'Modul_Pupuk_Organik.pdf' },
  { id: 'PL-03', nama: 'Pencegahan Demam Berdarah & Malaria Sektoral', kategori: 'Kesehatan', tingkat: 'Pemula', deskripsi: 'Langkah taktis keluarga dalam pencegahan penyakit menular berbasis ekologi pemukiman.', durasi: 6, jumlahModul: 3, progres: 100, status: 'Selesai', materiFile: 'Brosur_Pencegahan_DBD.pdf' },
  { id: 'PL-04', nama: 'Dasar Pemrograman Web & Aplikasi Desa', kategori: 'Teknologi', tingkat: 'Menengah', deskripsi: 'Pelatihan lanjutan bagi pemuda desa untuk berkontribusi mengelola website Sistem Informasi Desa.', durasi: 24, jumlahModul: 8, progres: 25, status: 'Dalam Proses', materiFile: 'Draf_Dasar_Web_SID.pdf' },
  { id: 'PL-05', nama: 'Pembuatan Anyaman Rotan Motif Khas Dayak', kategori: 'Kerajinan', tingkat: 'Mahir', deskripsi: 'Teknik merajut dan merancang motif tenun rotan warisan leluhur bernilai seni premium.', durasi: 16, jumlahModul: 6, progres: 0, status: 'Belum', materiFile: 'Katalog_Anyaman_Rotan.pdf' },
];

export default function PelatihanOnlinePage() {
  const [list, setList] = useState<Pelatihan[]>(MOCK_PELATIHAN);
  const [search, setSearch] = useState('');
  const [kategori, setKategori] = useState('Semua');
  const [tingkat, setTingkat] = useState('Semua');

  const filteredPelatihan = useMemo(() => {
    return list.filter(p => {
      const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase()) || p.deskripsi.toLowerCase().includes(search.toLowerCase());
      const matchKategori = kategori === 'Semua' || p.kategori === kategori;
      const matchTingkat = tingkat === 'Semua' || p.tingkat === tingkat;
      return matchSearch && matchKategori && matchTingkat;
    });
  }, [list, search, kategori, tingkat]);

  const handleDaftar = (id: string) => {
    setList(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, status: 'Dalam Proses', progres: 10 };
      }
      return p;
    }));
    alert('✅ Pendaftaran pelatihan berhasil. Silakan akses modul belajar.');
  };

  const handleDownloadMateri = (filename: string) => {
    alert(`📥 Mengunduh berkas materi: ${filename}`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pelatihan Online" modul="Masyarakat Umum" color={COLOR} />

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pelatihan Diikuti" value={`${list.filter(p => p.status !== 'Belum').length} Kelas`} satuan="Progres Belajar Aktif" barColor="purple" progress={80} />
        <StatCard label="Pelatihan Selesai" value={`${list.filter(p => p.status === 'Selesai').length} Program`} satuan="Telah Lulus Evaluasi" barColor="green" progress={40} />
        <StatCard label="Sertifikat Diperoleh" value={`${list.filter(p => p.status === 'Selesai').length} Berkas`} satuan="Sertifikat Digital" barColor="orange" progress={40} />
        <StatCard label="Progres Rata-rata" value="61%" satuan="Belajar Mandiri Warga" barColor="blue" progress={61} />
      </div>

      {/* SEARCH AND FILTERS */}
      <Card className="border border-slate-200">
        <CardContent className="p-4 space-y-3 text-xs">
          
          <div className="flex gap-2 items-center bg-slate-50 border rounded-lg px-2.5 py-1.5">
            <Search size={14} className="text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari pelatihan online..."
              className="bg-transparent flex-1 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-550 uppercase">Filter Bidang Kategori:</label>
              <select value={kategori} onChange={e => setKategori(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                <option value="Semua">Semua Kategori</option>
                <option value="Kesehatan">Kesehatan</option>
                <option value="Pertanian">Pertanian</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Kerajinan">Kerajinan</option>
                <option value="Pendidikan">Pendidikan</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-550 uppercase">Filter Tingkat Kesulitan:</label>
              <select value={tingkat} onChange={e => setTingkat(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                <option value="Semua">Semua Tingkat</option>
                <option value="Pemula">Pemula</option>
                <option value="Menengah">Menengah</option>
                <option value="Mahir">Mahir</option>
              </select>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* SECTION 1: PELATIHAN SAYA (AKTIF / SELESAI) */}
      <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Pelatihan Saya</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {list.filter(p => p.status !== 'Belum').map(p => (
          <Card key={p.id} className="border border-green-500 bg-green-50/10">
            <CardContent className="p-4 space-y-3.5 text-xs">
              
              <div className="flex justify-between items-start gap-2">
                <div>
                  <span className="text-[9px] font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded border border-green-200 mr-2">{p.kategori}</span>
                  <span className="text-[9px] font-bold text-slate-400">{p.tingkat}</span>
                  <h3 className="font-bold text-slate-800 text-sm mt-1">{p.nama}</h3>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${
                  p.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {p.status === 'Selesai' ? 'Lulus' : 'Berjalan'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-500 font-bold">Progres Pembelajaran:</span>
                  <span className="font-black text-indigo-700">{p.progres}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-indigo-700 h-full rounded-full" style={{ width: `${p.progres}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-500 border-t pt-2.5">
                <p>Durasi: <strong>{p.durasi} Jam</strong></p>
                <p>Modul: <strong>{p.jumlahModul} Pembahasan</strong></p>
              </div>

              <div className="border-t pt-2.5 flex justify-between items-center flex-wrap gap-2 text-[10px]">
                <button
                  onClick={() => handleDownloadMateri(p.materiFile)}
                  className="px-2.5 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-bold rounded flex items-center gap-1"
                >
                  <Download size={11} /> Unduh Modul
                </button>

                {p.status === 'Selesai' ? (
                  <span className="text-green-700 font-bold flex items-center gap-0.5"><Award size={13} /> Sertifikat Siap</span>
                ) : (
                  <button className="px-3 py-1 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded">
                    Lanjutkan Belajar
                  </button>
                )}
              </div>

            </CardContent>
          </Card>
        ))}
      </div>

      {/* SECTION 2: PELATIHAN TERSEDIA */}
      <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Rekomendasi Pelatihan Baru</h2>
      <div className="space-y-3">
        {filteredPelatihan.filter(p => p.status === 'Belum').map(p => (
          <Card key={p.id} className="border border-slate-200">
            <CardContent className="p-4 space-y-3 text-xs">
              
              <div className="flex justify-between items-start gap-2 flex-wrap">
                <div>
                  <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150 mr-2">{p.kategori}</span>
                  <span className="text-[9px] font-bold text-slate-400 mr-2">{p.tingkat}</span>
                  <span className="text-[9px] text-slate-450">⏱️ {p.durasi} Jam • {p.jumlahModul} Modul</span>
                  <h3 className="font-bold text-slate-805 text-sm mt-1">{p.nama}</h3>
                </div>
                
                <button onClick={() => handleDaftar(p.id)} className="px-3.5 py-1 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg shadow-sm">
                  Ikuti Pelatihan
                </button>
              </div>

              <p className="text-slate-550 leading-relaxed">{p.deskripsi}</p>

            </CardContent>
          </Card>
        ))}
        {filteredPelatihan.filter(p => p.status === 'Belum').length === 0 && (
          <p className="text-center text-slate-400 italic py-4">Semua kelas pelatihan dalam kategori ini sudah didaftarkan.</p>
        )}
      </div>

    </div>
  );
}
