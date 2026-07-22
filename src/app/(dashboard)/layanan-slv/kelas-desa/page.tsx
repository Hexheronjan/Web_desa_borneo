'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  GraduationCap, Calendar, Clock, MapPin, User, Users,
  BookOpen, CheckCircle, Info, Filter, Award
} from 'lucide-react';
import { useState, useMemo } from 'react';

const COLOR = '#2e7d32';

interface KelasDesa {
  id: string;
  nama: string;
  topik: 'Pendidikan Keluarga' | 'Literasi' | 'Keterampilan' | 'Kebudayaan' | 'Layanan Desa';
  fasilitator: string;
  jadwal: string;
  lokasi: string;
  kapasitas: number;
  kuotaTerisi: number;
  statusPendaftaran: 'Tersedia' | 'Penuh';
  materiList: string[];
}

const MOCK_KELAS: KelasDesa[] = [
  { id: 'KD-01', nama: 'Kelas Membaca & Menulis untuk Orang Tua', topik: 'Pendidikan Keluarga', fasilitator: 'Ibu Guru Wahyuni', jadwal: 'Setiap Sabtu, 09:00 - 11:00 WITA', lokasi: 'Gedung TBM Lestari Dusun A', kapasitas: 20, kuotaTerisi: 12, statusPendaftaran: 'Tersedia', materiList: ['Pengenalan Huruf & Angka', 'Membaca Kalimat Sederhana', 'Menulis Buku Harian'] },
  { id: 'KD-02', nama: 'Keterampilan Memasak Kuliner Adat Kenyah', topik: 'Keterampilan', fasilitator: 'Ibu Martha (Tokoh Adat)', jadwal: 'Minggu, 26 Juli 2026, 13:00 - 16:00 WITA', lokasi: 'Dapur Bersama Huma Betang', kapasitas: 15, kuotaTerisi: 15, statusPendaftaran: 'Penuh', materiList: ['Pengenalan Rempah Adat', 'Teknik Memasak Tradisional', 'Penyajian Hidangan Festival'] },
  { id: 'KD-03', nama: 'Sosialisasi & Praktik Aplikasi Layanan Desa', topik: 'Layanan Desa', fasilitator: 'Operator SID (Rian)', jadwal: 'Kamis, 23 Juli 2026, 14:00 - 16:00 WITA', lokasi: 'Ruang TIK Kantor Desa', kapasitas: 25, kuotaTerisi: 18, statusPendaftaran: 'Tersedia', materiList: ['Membuat Akun Layanan', 'Mengajukan Dokumen Mandiri', 'Mengirim Aspirasi & Aduan'] },
  { id: 'KD-04', nama: 'Kelas Sejarah & Budaya Dayak Kalimantan', topik: 'Kebudayaan', fasilitator: 'Ketua Lembaga Adat', jadwal: 'Sabtu, 01 Agustus 2026, 15:00 - 17:00 WITA', lokasi: 'Balai Adat Dusun C', kapasitas: 40, kuotaTerisi: 32, statusPendaftaran: 'Tersedia', materiList: ['Silsilah & Hukum Adat', 'Makna Ornamen Huma Betang', 'Musik Sampe Tradisional'] },
  { id: 'KD-05', nama: 'Kewirausahaan Desa & Manajemen BUMDes', topik: 'Keterampilan', fasilitator: 'Direktur BUMDes Borneo', jadwal: 'Senin, 27 Juli 2026, 10:00 - 12:00 WITA', lokasi: 'Ruang Rapat Desa', kapasitas: 20, kuotaTerisi: 19, statusPendaftaran: 'Tersedia', materiList: ['Peluang Bisnis Desa', 'Manajemen Keuangan Sederhana', 'Pemasaran Produk Lokal'] },
];

export default function KelasDesaPage() {
  const [list] = useState<KelasDesa[]>(MOCK_KELAS);
  const [registered, setRegistered] = useState<string[]>(['KD-03']); // Mock user terdaftar di KD-03
  const [filterTopik, setFilterTopik] = useState<string>('Semua');

  const filteredKelas = useMemo(() => {
    if (filterTopik === 'Semua') return list;
    return list.filter(k => k.topik === filterTopik);
  }, [list, filterTopik]);

  const handleDaftar = (id: string) => {
    if (registered.includes(id)) return;
    setRegistered(prev => [...prev, id]);
    alert('✅ Pendaftaran kelas berhasil dikirim.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Kelas Desa" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER INFORMASI */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <Info size={16} className="text-indigo-650 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Kelas desa merupakan sarana belajar gratis terintegrasi yang mencakup pendidikan keluarga, literasi, keterampilan, kebudayaan, dan pelayanan desa.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kelas Desa Tersedia" value={list.length} satuan="Pilihan Topik Aktif" barColor="purple" progress={100} />
        <StatCard label="Kelas Diikuti" value={`${registered.length} Kelas`} satuan="Pendaftaran Anda" barColor="green" progress={registered.length * 20} />
        <StatCard label="Kehadiran Anda" value="95%" satuan="Keaktifan Belajar" barColor="blue" progress={95} />
        <StatCard label="Sertifikat Diperoleh" value="1 Sertifikat" satuan="Kelulusan Kompetensi" barColor="orange" progress={40} />
      </div>

      {/* FILTER TOPIK */}
      <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border rounded-xl">
        {['Semua', 'Pendidikan Keluarga', 'Literasi', 'Keterampilan', 'Kebudayaan', 'Layanan Desa'].map(t => (
          <button
            key={t}
            onClick={() => setFilterTopik(t)}
            className={`px-3 py-1.5 rounded-lg text-[9px] font-bold transition-colors border ${filterTopik === t ? 'bg-indigo-700 border-indigo-700 text-white' : 'bg-white border-slate-200 text-slate-650 hover:bg-slate-100'}`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* LIST KELAS TERSEDIA */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Kelas Pilihan yang Dapat Diikuti</h2>

          <div className="space-y-3">
            {filteredKelas.map(k => {
              const isReg = registered.includes(k.id);
              return (
                <Card key={k.id} className={`border transition-all ${isReg ? 'border-green-500 bg-green-50/10' : 'border-slate-200'}`}>
                  <CardContent className="p-4 space-y-3.5">
                    
                    <div className="flex justify-between items-start gap-2 flex-wrap">
                      <div className="space-y-1">
                        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150 mr-2">{k.topik}</span>
                        <h3 className="font-bold text-slate-800 text-sm mt-1">{k.nama}</h3>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        k.statusPendaftaran === 'Tersedia' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-750'
                      }`}>
                        {k.statusPendaftaran}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t pt-2.5 text-slate-650">
                      <p className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-400" /> {k.jadwal}</p>
                      <p className="flex items-center gap-1.5"><MapPin size={13} className="text-slate-400" /> {k.lokasi}</p>
                      <p className="flex items-center gap-1.5"><User size={13} className="text-slate-400" /> Fasilitator: <strong>{k.fasilitator}</strong></p>
                    </div>

                    <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
                      <p className="font-bold text-slate-700 flex items-center gap-1 mb-1">
                        <BookOpen size={12} /> Kurikulum / Materi Pembahasan:
                      </p>
                      <ul className="list-disc list-inside text-[10px] text-slate-600 space-y-0.5 font-semibold">
                        {k.materiList.map((m, idx) => <li key={idx}>{m}</li>)}
                      </ul>
                    </div>

                    <div className="border-t pt-2.5 flex justify-between items-center text-[10px]">
                      <span className="text-slate-500 font-bold">Kapasitas: {k.kuotaTerisi} / {k.kapasitas} Peserta</span>
                      
                      {isReg ? (
                        <span className="text-[10px] font-bold text-green-700 flex items-center gap-0.5"><CheckCircle size={12} /> Anda Terdaftar</span>
                      ) : k.statusPendaftaran === 'Tersedia' ? (
                        <button onClick={() => handleDaftar(k.id)} className="px-3.5 py-1.5 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800 transition-colors">
                          Daftar Kelas
                        </button>
                      ) : (
                        <span className="text-[10px] text-slate-450 italic font-semibold">Kuota Penuh</span>
                      )}
                    </div>

                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* PANEL KANAN: KELAS SAYA */}
        <div>
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-4">Kelas yang Saya Ikuti</h2>
          
          <div className="space-y-3.5">
            {registered.map(regId => {
              const k = list.find(item => item.id === regId);
              if (!k) return null;
              return (
                <Card key={k.id} className="border-l-4 border-l-green-500">
                  <CardHeader className="py-2.5 px-3">
                    <CardTitle className="text-xs font-bold text-slate-800 leading-snug">{k.nama}</CardTitle>
                  </CardHeader>
                  <CardContent className="px-3 pb-3 space-y-2.5">
                    <div className="space-y-1 text-[10px] text-slate-500">
                      <p>Jadwal: {k.jadwal}</p>
                      <p>Lokasi: {k.lokasi}</p>
                      <p>Fasilitator: {k.fasilitator}</p>
                    </div>

                    <div className="p-2 bg-green-50/50 border border-green-200 rounded text-[10px] text-green-800 font-bold space-y-0.5">
                      <p>✔️ Status Kehadiran: Hadir (Pertemuan 1 &amp; 2)</p>
                      <p>✔️ Sertifikat: Tersedia Setelah Selesai</p>
                    </div>

                    <button className="w-full py-1 bg-indigo-700 text-white font-bold rounded hover:bg-indigo-800 text-[10px]">
                      Akses Modul Belajar
                    </button>
                  </CardContent>
                </Card>
              );
            })}
            {registered.length === 0 && (
              <p className="text-slate-400 italic text-center py-6">Anda belum mendaftar kelas apa pun.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
