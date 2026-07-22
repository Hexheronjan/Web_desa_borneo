'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Heart, Calendar, Clock, MapPin, User, AlertTriangle,
  CheckCircle2, Bell, BookOpen, AlertCircle, Trash2, ArrowRight
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const COLOR = '#2e7d32';

interface JadwalPosyandu {
  id: string;
  nama: string;
  waktu: string;
  lokasi: string;
  petugas: string;
  jenis: string;
  status: 'Tersedia' | 'Penuh' | 'Selesai';
}

const MOCK_JADWAL: JadwalPosyandu[] = [
  { id: '1', nama: 'Posyandu Balita Melati', waktu: 'Senin, 20 Juli 2026, 08:00 - 11:00 WITA', lokasi: 'Gedung Posyandu Dusun A', petugas: 'Bidan Rina & Ibu Ani', jenis: 'Posyandu Balita & Imunisasi', status: 'Tersedia' },
  { id: '2', nama: 'Pemeriksaan Ibu Hamil Sehat', waktu: 'Rabu, 22 Juli 2026, 09:00 - 12:00 WITA', lokasi: 'Puskesmas Pembantu Dusun B', petugas: 'Bidan Sarah', jenis: 'Pemeriksaan Ibu Hamil', status: 'Tersedia' },
  { id: '3', nama: 'Posyandu Lansia Huma Betang', waktu: 'Kamis, 23 Juli 2026, 08:30 - 11:30 WITA', lokasi: 'Balai Adat Dusun C', petugas: 'Perawat Dedi', jenis: 'Pemeriksaan Lansia', status: 'Tersedia' },
  { id: '4', nama: 'Vaksinasi & Imunisasi Anak', waktu: 'Jumat, 24 Juli 2026, 08:00 - 10:00 WITA', lokasi: 'PAUD Melati Dusun A', petugas: 'Bidan Rina', jenis: 'Imunisasi', status: 'Penuh' },
];

export default function PosyanduDigitalPage() {
  const [jadwal, setJadwal] = useState<JadwalPosyandu[]>(MOCK_JADWAL);
  const [registered, setRegistered] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJadwal, setSelectedJadwal] = useState<JadwalPosyandu | null>(null);
  
  // Form input
  const [namaInput, setNamaInput] = useState('');
  const [nikInput, setNikInput] = useState('');

  const handleDaftarClick = (j: JadwalPosyandu) => {
    setSelectedJadwal(j);
    setShowModal(true);
  };

  const handleKirimPendaftaran = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaInput || !nikInput) {
      alert('Nama dan NIK wajib diisi.');
      return;
    }
    if (selectedJadwal) {
      setRegistered(prev => [...prev, selectedJadwal.id]);
      alert(`✅ Berhasil mendaftar ke ${selectedJadwal.nama}`);
      setShowModal(false);
      setNamaInput('');
      setNikInput('');
    }
  };

  const handleBatalPendaftaran = (id: string) => {
    if (confirm('Apakah Anda yakin ingin membatalkan pendaftaran ini?')) {
      setRegistered(prev => prev.filter(item => item !== id));
      alert('❌ Pendaftaran dibatalkan.');
    }
  };

  const handleTerimaPengingat = (namaKegiatan: string) => {
    alert(`🔔 Pengingat SMS & WhatsApp untuk "${namaKegiatan}" telah diaktifkan!`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Posyandu Digital" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER PERINGATAN PENTING */}
      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5 shadow-sm">
        <AlertTriangle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Masyarakat tidak boleh melihat data peserta lain. Data ibu, anak, dan keluarga hanya ditampilkan kepada pengguna yang sah.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Jadwal Aktif Bulan Ini" value="4 Jadwal" satuan="Posyandu & Pemeriksaan" barColor="green" progress={100} />
        <StatCard label="Pendaftaran Anda" value={`${registered.length} Kegiatan`} satuan="Telah Terdaftar" barColor="teal" progress={registered.length * 25} />
        <StatCard label="Petugas Posyandu" value="3 Bidan & Perawat" satuan="Siaga Layanan" barColor="blue" progress={85} />
        <StatCard label="Tindak Lanjut Mandiri" value="2 Rencana" satuan="Jadwal Mendatang" barColor="purple" progress={60} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LIST JADWAL POSYANDU */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Jadwal Pelayanan Aktif</h2>
          
          <div className="space-y-3">
            {jadwal.map(j => {
              const isReg = registered.includes(j.id);
              return (
                <Card key={j.id} className={`border transition-all ${isReg ? 'border-green-400 bg-green-50/10' : 'border-slate-200'}`}>
                  <CardContent className="p-4 space-y-3 text-xs">
                    <div className="flex justify-between items-start flex-wrap gap-2">
                      <div>
                        <span className="text-[9px] font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-150 mr-2">{j.jenis}</span>
                        <h3 className="font-bold text-slate-800 text-sm mt-1">{j.nama}</h3>
                      </div>
                      
                      {isReg ? (
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded border border-green-200">Terdaftar</span>
                      ) : j.status === 'Penuh' ? (
                        <span className="text-[10px] font-bold text-red-650 bg-red-50 px-2 py-0.5 rounded">Penuh</span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-105 px-2 py-0.5 rounded">Tersedia</span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t pt-2.5 text-slate-600">
                      <p className="flex items-center gap-1.5"><Calendar size={13} className="text-slate-400" /> {j.waktu}</p>
                      <p className="flex items-center gap-1.5"><MapPin size={13} className="text-slate-400" /> {j.lokasi}</p>
                      <p className="flex items-center gap-1.5"><User size={13} className="text-slate-400" /> PJ: {j.petugas}</p>
                    </div>

                    <div className="flex justify-between items-center gap-2 border-t pt-2.5">
                      <button onClick={() => handleTerimaPengingat(j.nama)} className="text-[10px] font-bold text-indigo-700 hover:text-indigo-900 flex items-center gap-1">
                        <Bell size={12} /> Terima Pengingat
                      </button>

                      {isReg ? (
                        <button onClick={() => handleBatalPendaftaran(j.id)} className="px-2.5 py-1 bg-red-50 text-red-650 rounded border border-red-200 font-bold hover:bg-red-100 flex items-center gap-1">
                          <Trash2 size={11} /> Batalkan
                        </button>
                      ) : j.status === 'Tersedia' ? (
                        <button onClick={() => handleDaftarClick(j)} className="px-3 py-1 bg-emerald-700 text-white rounded font-bold hover:bg-emerald-800">
                          Daftar Layanan
                        </button>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* SIDE PANEL: TINDAK LANJUT & MATERI */}
        <div className="space-y-4">
          
          {/* Tindak Lanjut Saya */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-emerald-700" /> Tindak Lanjut Saya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-amber-55/30 border rounded-lg border-amber-200">
                <p className="font-bold text-slate-800">1. Imunisasi BCG Lanjutan</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Jadwal: Agustus 2026 (Usia 1 Bulan)</p>
                <p className="text-[10px] text-amber-700 font-semibold mt-1">Status: Menunggu Jadwal Rilis</p>
              </div>
              <div className="p-2.5 bg-blue-55/30 border rounded-lg border-blue-200">
                <p className="font-bold text-slate-800">2. Kelas Edukasi Makanan Sehat Ibu Hamil</p>
                <p className="text-[10px] text-slate-500 mt-0.5">Jadwal: Sabtu, 25 Juli 2026, 09:00 WITA</p>
                <p className="text-[10px] text-blue-700 font-semibold mt-1">Status: Terdaftar (Penyuluh: Bidan Rina)</p>
              </div>
            </CardContent>
          </Card>

          {/* Materi Edukasi Terkait */}
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} className="text-emerald-700" /> Materi Edukasi Terkait
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-xs">
              {[
                { judul: 'Panduan Gizi Ibu Menyusui di Huma Betang', format: 'Artikel', pj: 'Bidan Sarah' },
                { judul: 'Tata Cara Imunisasi Dasar Lengkap Balita', format: 'Video', pj: 'Puskesmas' },
                { judul: 'Mencegah Stunting dengan Pangan Lokal Kalbar', format: 'Artikel', pj: 'Kader Gizi' }
              ].map((m, i) => (
                <div key={i} className="p-2 border rounded hover:bg-slate-50 transition-colors flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-slate-800 text-[11px] leading-snug">{m.judul}</p>
                    <span className="text-[9px] text-slate-400">{m.format} • PJ: {m.pj}</span>
                  </div>
                  <Link href="/layanan-slv/edukasi-kesehatan">
                    <ArrowRight size={13} className="text-slate-400 hover:text-emerald-700" />
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>

        </div>

      </div>

      {/* MODAL PENDAFTARAN */}
      {showModal && selectedJadwal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-sm font-bold text-slate-800">Form Pendaftaran Layanan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleKirimPendaftaran} className="space-y-3.5 text-xs">
                <div className="p-2.5 bg-slate-50 rounded-lg space-y-1 text-[11px]">
                  <p className="font-bold text-slate-700">Kegiatan:</p>
                  <p className="font-semibold text-slate-800">{selectedJadwal.nama}</p>
                  <p className="text-slate-500">{selectedJadwal.waktu}</p>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">NAMA LENGKAP PENDAFTAR / SASARAN:</label>
                  <input
                    type="text"
                    required
                    value={namaInput}
                    onChange={e => setNamaInput(e.target.value)}
                    placeholder="Masukkan nama lengkap..."
                    className="w-full p-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">NIK (NOMOR INDUK KEPENDUDUKAN):</label>
                  <input
                    type="text"
                    required
                    value={nikInput}
                    onChange={e => setNikInput(e.target.value)}
                    placeholder="Masukkan 16 digit NIK..."
                    maxLength={16}
                    className="w-full p-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 border-t pt-3">
                  <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg">
                    Batal
                  </button>
                  <button type="submit" className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg">
                    Kirim Pendaftaran
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
