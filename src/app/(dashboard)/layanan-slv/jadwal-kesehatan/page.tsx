'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Calendar, Clock, MapPin, User, Users, Filter, CheckCircle2, AlertCircle
} from 'lucide-react';
import { useState, useMemo } from 'react';

const COLOR = '#2e7d32';

interface JadwalKesehatan {
  id: string;
  nama: string;
  waktu: string; // Format ramah pengguna
  tanggalIso: string; // Untuk filter periode (YYYY-MM)
  lokasi: string;
  wilayah: 'Dusun A' | 'Dusun B' | 'Dusun C';
  jenisLayanan: 'Posyandu' | 'Imunisasi' | 'Pemeriksaan Ibu Hamil' | 'Pemeriksaan Lansia' | 'Edukasi Kesehatan' | 'Kegiatan Pencegahan Penyakit' | 'Jadwal Telekonsultasi';
  kelompokSasaran: 'Balita' | 'Ibu Hamil' | 'Lansia' | 'Umum';
  petugas: string;
  status: 'Tersedia' | 'Penuh' | 'Selesai';
}

const MOCK_JADWALS: JadwalKesehatan[] = [
  { id: 'JK-01', nama: 'Posyandu Balita Melati RT 01', waktu: 'Senin, 20 Juli 2026, 08:00 - 11:00 WITA', tanggalIso: '2026-07', lokasi: 'Gedung Posyandu Dusun A', wilayah: 'Dusun A', jenisLayanan: 'Posyandu', kelompokSasaran: 'Balita', petugas: 'Bidan Rina', status: 'Tersedia' },
  { id: 'JK-02', nama: 'Vaksinasi MR Terintegrasi', waktu: 'Selasa, 21 Juli 2026, 08:30 - 12:00 WITA', tanggalIso: '2026-07', lokasi: 'PAUD Melati Dusun A', wilayah: 'Dusun A', jenisLayanan: 'Imunisasi', kelompokSasaran: 'Balita', petugas: 'Bidan Rina & Team', status: 'Tersedia' },
  { id: 'JK-03', nama: 'Kelas Senam Ibu Hamil Sehat', waktu: 'Rabu, 22 Juli 2026, 09:00 - 11:00 WITA', tanggalIso: '2026-07', lokasi: 'Balai Pertemuan Dusun B', wilayah: 'Dusun B', jenisLayanan: 'Pemeriksaan Ibu Hamil', kelompokSasaran: 'Ibu Hamil', petugas: 'Bidan Sarah', status: 'Tersedia' },
  { id: 'JK-04', nama: 'Posyandu Lansia Dusun C', waktu: 'Kamis, 23 Juli 2026, 08:30 - 11:30 WITA', tanggalIso: '2026-07', lokasi: 'Balai Adat Dusun C', wilayah: 'Dusun C', jenisLayanan: 'Pemeriksaan Lansia', kelompokSasaran: 'Lansia', petugas: 'Perawat Dedi', status: 'Tersedia' },
  { id: 'JK-05', nama: 'Penyuluhan PHBS Kesehatan Lingkungan', waktu: 'Sabtu, 25 Juli 2026, 10:00 - 12:00 WITA', tanggalIso: '2026-07', lokasi: 'Balai Desa Lung Anai', wilayah: 'Dusun A', jenisLayanan: 'Edukasi Kesehatan', kelompokSasaran: 'Umum', petugas: 'Team Promkes Puskesmas', status: 'Tersedia' },
  { id: 'JK-06', nama: 'Pemberantasan Sarang Nyamuk (PSN)', waktu: 'Jumat, 17 Juli 2026, 08:00 - 10:00 WITA', tanggalIso: '2026-07', lokasi: 'Seluruh Wilayah Dusun B', wilayah: 'Dusun B', jenisLayanan: 'Kegiatan Pencegahan Penyakit', kelompokSasaran: 'Umum', petugas: 'Kader PHBS', status: 'Selesai' },
  { id: 'JK-07', nama: 'Telekonsultasi Gizi Anak & Ibu Hamil', waktu: 'Selasa, 28 Juli 2026, 14:00 - 16:00 WITA', tanggalIso: '2026-07', lokasi: 'Portal Online Smart Village', wilayah: 'Dusun C', jenisLayanan: 'Jadwal Telekonsultasi', kelompokSasaran: 'Umum', petugas: 'dr. Rina Sp.GK', status: 'Penuh' },
  { id: 'JK-08', nama: 'Posyandu Balita Kenanga RT 04', waktu: 'Senin, 03 Agustus 2026, 08:00 - 11:00 WITA', tanggalIso: '2026-08', lokasi: 'Pos Kesehatan Dusun B', wilayah: 'Dusun B', jenisLayanan: 'Posyandu', kelompokSasaran: 'Balita', petugas: 'Bidan Sarah', status: 'Tersedia' },
];

export default function JadwalKesehatanPage() {
  const [list] = useState<JadwalKesehatan[]>(MOCK_JADWALS);
  const [registered, setRegistered] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJadwal, setSelectedJadwal] = useState<JadwalKesehatan | null>(null);

  // States Filter
  const [periode, setPeriode] = useState('2026-07');
  const [wilayah, setWilayah] = useState<string>('Semua');
  const [jenisLayanan, setJenisLayanan] = useState<string>('Semua');
  const [kelompokSasaran, setKelompokSasaran] = useState<string>('Semua');

  // Reactive Filtering
  const filteredJadwal = useMemo(() => {
    return list.filter(item => {
      const matchPeriode = !periode || item.tanggalIso === periode;
      const matchWilayah = wilayah === 'Semua' || item.wilayah === wilayah;
      const matchJenis = jenisLayanan === 'Semua' || item.jenisLayanan === jenisLayanan;
      const matchSasaran = kelompokSasaran === 'Semua' || item.kelompokSasaran === kelompokSasaran;
      return matchPeriode && matchWilayah && matchJenis && matchSasaran;
    });
  }, [list, periode, wilayah, jenisLayanan, kelompokSasaran]);

  const handleDaftarClick = (j: JadwalKesehatan) => {
    setSelectedJadwal(j);
    setShowModal(true);
  };

  const handleConfirmDaftar = () => {
    if (selectedJadwal) {
      setRegistered(prev => [...prev, selectedJadwal.id]);
      alert(`✅ Anda berhasil terdaftar untuk kegiatan: ${selectedJadwal.nama}`);
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Jadwal Kesehatan" modul="Masyarakat Umum" color={COLOR} />

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Jadwal Bulan Ini" value={list.filter(item => item.tanggalIso === '2026-07').length} satuan="Kegiatan Terdaftar" barColor="purple" progress={80} />
        <StatCard label="Jadwal Tersedia" value={filteredJadwal.filter(j => j.status === 'Tersedia').length} satuan="Bisa Didatangi" barColor="teal" progress={75} />
        <StatCard label="Kegiatan Selesai" value={list.filter(j => j.status === 'Selesai').length} satuan="Evaluasi Rampung" barColor="blue" progress={20} />
        <StatCard label="Jadwal Anda" value={registered.length} satuan="Terdaftar Aktif" barColor="orange" progress={registered.length * 20} />
      </div>

      {/* FILTER BAR */}
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader className="py-3 bg-slate-50 border-b">
          <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
            <Filter size={14} /> Saring Jadwal Kesehatan
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 grid grid-cols-1 md:grid-cols-4 gap-3.5 text-xs">
          {/* 1. Periode */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase">Periode (Bulan/Tahun):</label>
            <input
              type="month"
              value={periode}
              onChange={e => setPeriode(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white focus:outline-none"
            />
          </div>

          {/* 2. Wilayah */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase">Wilayah Dusun/RT:</label>
            <select
              value={wilayah}
              onChange={e => setWilayah(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white focus:outline-none"
            >
              <option value="Semua">Semua Wilayah</option>
              <option value="Dusun A">Dusun A</option>
              <option value="Dusun B">Dusun B</option>
              <option value="Dusun C">Dusun C</option>
            </select>
          </div>

          {/* 3. Jenis Layanan */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase">Jenis Layanan Sektoral:</label>
            <select
              value={jenisLayanan}
              onChange={e => setJenisLayanan(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white focus:outline-none"
            >
              <option value="Semua">Semua Layanan</option>
              <option value="Posyandu">Posyandu</option>
              <option value="Imunisasi">Imunisasi</option>
              <option value="Pemeriksaan Ibu Hamil">Pemeriksaan Ibu Hamil</option>
              <option value="Pemeriksaan Lansia">Pemeriksaan Lansia</option>
              <option value="Edukasi Kesehatan">Edukasi Kesehatan</option>
              <option value="Kegiatan Pencegahan Penyakit">Kegiatan Pencegahan Penyakit</option>
              <option value="Jadwal Telekonsultasi">Jadwal Telekonsultasi</option>
            </select>
          </div>

          {/* 4. Kelompok Sasaran */}
          <div className="space-y-1">
            <label className="font-bold text-slate-600 uppercase">Kelompok Sasaran:</label>
            <select
              value={kelompokSasaran}
              onChange={e => setKelompokSasaran(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white focus:outline-none"
            >
              <option value="Semua">Semua Sasaran</option>
              <option value="Balita">Balita</option>
              <option value="Ibu Hamil">Ibu Hamil</option>
              <option value="Lansia">Lansia</option>
              <option value="Umum">Umum</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* LIST KARTU JADWAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredJadwal.map(j => {
          const isReg = registered.includes(j.id);
          return (
            <Card key={j.id} className={`border transition-all hover:shadow-sm ${isReg ? 'border-green-500 bg-green-50/10' : 'border-slate-200'}`}>
              <CardContent className="p-4 space-y-3.5 text-xs">
                
                <div className="flex justify-between items-start gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">{j.jenisLayanan}</span>
                      <span className="text-[9px] font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">{j.kelompokSasaran}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm">{j.nama}</h3>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${j.status === 'Tersedia' ? 'bg-green-50 text-green-700 border border-green-200' : j.status === 'Penuh' ? 'bg-orange-50 text-orange-700 border border-orange-200' : 'bg-slate-100 text-slate-600'}`}>
                    {j.status}
                  </span>
                </div>

                <div className="space-y-1.5 border-t pt-2.5 text-slate-600">
                  <p className="flex items-center gap-2"><Calendar size={13} className="text-slate-400" /> {j.waktu}</p>
                  <p className="flex items-center gap-2"><MapPin size={13} className="text-slate-400" /> {j.lokasi} ({j.wilayah})</p>
                  <p className="flex items-center gap-2"><User size={13} className="text-slate-400" /> Petugas/PJ: <strong>{j.petugas}</strong></p>
                </div>

                <div className="border-t pt-2.5 flex justify-end">
                  {isReg ? (
                    <span className="text-[10px] font-bold text-green-700 flex items-center gap-1"><CheckCircle2 size={12} /> Anda Terdaftar</span>
                  ) : j.status === 'Tersedia' ? (
                    <button onClick={() => handleDaftarClick(j)} className="px-3 py-1 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800">
                      Daftar
                    </button>
                  ) : j.status === 'Penuh' ? (
                    <span className="text-[10px] text-slate-450 italic font-semibold">Kapasitas Penuh</span>
                  ) : (
                    <span className="text-[10px] text-slate-450 italic font-semibold">Kegiatan Selesai</span>
                  )}
                </div>

              </CardContent>
            </Card>
          );
        })}
        {filteredJadwal.length === 0 && (
          <div className="col-span-2 text-center py-10 bg-slate-50 border rounded-xl">
            <AlertCircle size={24} className="text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-500">Tidak ada jadwal kesehatan yang cocok dengan kriteria filter.</p>
          </div>
        )}
      </div>

      {/* CONFIRMATION MODAL */}
      {showModal && selectedJadwal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-800">Konfirmasi Pendaftaran</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <p className="text-slate-600">Apakah Anda yakin ingin mendaftar ke kegiatan kesehatan berikut?</p>
              
              <div className="p-3 bg-slate-50 rounded-lg space-y-1 text-[11px] border">
                <p className="font-bold text-indigo-700">{selectedJadwal.jenisLayanan} - {selectedJadwal.kelompokSasaran}</p>
                <p className="font-bold text-slate-850">{selectedJadwal.nama}</p>
                <p className="text-slate-500">{selectedJadwal.waktu}</p>
                <p className="text-slate-500">{selectedJadwal.lokasi}</p>
              </div>

              <div className="flex justify-end gap-2 border-t pt-3">
                <button onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg">
                  Batal
                </button>
                <button onClick={handleConfirmDaftar} className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg">
                  Ya, Daftar
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
