'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  ShieldAlert, Stethoscope, Video, Calendar, Send,
  User, CheckCircle, Clock, AlertTriangle, ExternalLink
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface KonsultasiRiwayat {
  id: string;
  layanan: string;
  tanggal: string;
  petugas: string;
  pertanyaan: string;
  tindakLanjut: string;
  status: 'Selesai' | 'Menunggu' | 'Dalam Proses';
}

export default function TelekonsultasiPage() {
  // Alur Telekonsultasi State
  const [layanan, setLayanan] = useState('');
  const [jadwal, setJadwal] = useState('');
  const [pertanyaan, setPertanyaan] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Mock Antrian Aktif
  const [antrian, setAntrian] = useState({
    posisi: 3,
    estimasiWaktu: '45 Menit',
    petugas: 'dr. Rina Sp.GK',
    tautan: 'https://telehealth.kalbar.go.id/room/slv-lunganai-03'
  });

  // Mock Riwayat
  const [riwayat] = useState<KonsultasiRiwayat[]>([
    {
      id: 'TK-01',
      layanan: 'Konsultasi Gizi & Stunting Anak',
      tanggal: '05 Juli 2026',
      petugas: 'dr. Rina Sp.GK',
      pertanyaan: 'Bagaimana cara menaikkan berat badan balita umur 2 tahun yang menolak makan sayur?',
      tindakLanjut: 'Berikan variasi makanan berbasis ikan sungai lokal, tambahkan vitamin zat besi, dan ukur berat badan ulang dalam 2 minggu.',
      status: 'Selesai'
    },
    {
      id: 'TK-02',
      layanan: 'Konsultasi Kesehatan Ibu Hamil (Kandungan)',
      tanggal: '20 Juni 2026',
      petugas: 'Bidan Sarah',
      pertanyaan: 'Sering pusing di trimester kedua kehamilan.',
      tindakLanjut: 'Perbanyak istirahat, minum suplemen penambah darah (Fe) secara rutin, dan cek tekanan darah 3 hari sekali.',
      status: 'Selesai'
    }
  ]);

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!layanan || !jadwal || !pertanyaan) {
      alert('Semua bidang formulir wajib diisi.');
      return;
    }
    setSubmitted(true);
    alert('✅ Permintaan telekonsultasi berhasil dikirim. Antrean Anda sedang diproses.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Telekonsultasi" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER KEAMANAN - MERAH */}
      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldAlert size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Telekonsultasi tidak boleh menjadi ruang terbuka. Seluruh komunikasi harus mengikuti autentikasi, persetujuan, dan perlindungan data kesehatan.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Antrian Saya" value={submitted ? 'No. 4' : 'Tidak Ada'} satuan={submitted ? 'Menunggu Panggilan' : 'Belum Ada Pengajuan'} barColor="orange" progress={submitted ? 75 : 0} />
        <StatCard label="Konsultasi Selesai" value={`${riwayat.length} Kegiatan`} satuan="Tahun 2026" barColor="green" progress={100} />
        <StatCard label="Jadwal Berikutnya" value="28 Juli 2026" satuan="dr. Rina Sp.GK" barColor="blue" progress={50} />
        <StatCard label="Dokumen Hasil" value="2 Rekomendasi" satuan="Tindak Lanjut Medis" barColor="purple" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* PANEL KIRI: FORM AJUKAN KONSULTASI */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Stethoscope size={14} className="text-indigo-700" /> Ajukan Konsultasi Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-3 text-center">
                <CheckCircle size={24} className="text-indigo-700 mx-auto" />
                <p className="font-bold text-slate-800">Permintaan Konsultasi Aktif</p>
                <div className="text-[11px] text-slate-600 space-y-1 text-left border-t pt-2 mt-2">
                  <p>Layanan: <strong>{layanan}</strong></p>
                  <p>Jadwal: <strong>{jadwal}</strong></p>
                  <p>Posisi Antrian: <strong>No. {antrian.posisi + 1}</strong></p>
                </div>
                <div className="bg-white p-2 border rounded-lg flex items-center gap-1.5 justify-center">
                  <Video size={13} className="text-red-600" />
                  <a href={antrian.tautan} target="_blank" rel="noreferrer" className="text-[10px] text-indigo-700 font-bold hover:underline flex items-center gap-0.5">
                    Masuk Ruang Konsultasi <ExternalLink size={10} />
                  </a>
                </div>
                <button onClick={() => setSubmitted(false)} className="w-full mt-2 py-1.5 border border-slate-300 text-slate-700 font-bold hover:bg-slate-50 rounded">
                  Ajukan Baru
                </button>
              </div>
            ) : (
              <form onSubmit={handleAjukan} className="space-y-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">PILIH BIDANG LAYANAN:</label>
                  <select value={layanan} onChange={e => setLayanan(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                    <option value="">-- Pilih Layanan --</option>
                    <option value="Konsultasi Umum">Konsultasi Dokter Umum</option>
                    <option value="Konsultasi Gizi & Stunting">Konsultasi Gizi & Stunting</option>
                    <option value="Konsultasi Ibu Hamil & Balita">Konsultasi Ibu Hamil & Balita</option>
                    <option value="Konsultasi Lansia">Konsultasi Kesehatan Lansia</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">PILIH JADWAL TELEKONSULTASI:</label>
                  <select value={jadwal} onChange={e => setJadwal(e.target.value)} className="w-full p-2 border rounded-lg bg-white">
                    <option value="">-- Pilih Jadwal --</option>
                    <option value="Rabu, 22 Juli 2026 - 14:00 WITA">Rabu, 22 Juli 2026 - 14:00 WITA (Bidan Sarah)</option>
                    <option value="Kamis, 23 Juli 2026 - 10:00 WITA">Kamis, 23 Juli 2026 - 10:00 WITA (Perawat Dedi)</option>
                    <option value="Selasa, 28 Juli 2026 - 14:00 WITA">Selasa, 28 Juli 2026 - 14:00 WITA (dr. Rina Sp.GK)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-700">PERTANYAAN AWAL / KELUHAN FISIK:</label>
                  <textarea
                    value={pertanyaan}
                    onChange={e => setPertanyaan(e.target.value)}
                    placeholder="Tuliskan keluhan atau pertanyaan awal Anda secara singkat..."
                    rows={4}
                    className="w-full p-2 border rounded-lg focus:outline-none"
                  />
                </div>

                <button type="submit" className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm">
                  <Send size={12} /> Kirim Permintaan Konsultasi
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* PANEL KANAN: STATUS ANTRIAN AKTIF & RIWAYAT KONSULTASI SAYA */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Status Antrean Aktif */}
          {submitted && (
            <Card className="border border-indigo-300 bg-indigo-50/10">
              <CardHeader className="py-2.5">
                <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock size={13} className="text-indigo-700" /> Pemantauan Antrean Telekonsultasi Anda
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
                <div className="p-2 border rounded-lg bg-white">
                  <p className="text-[10px] text-slate-400 font-bold">Nomor Antrean</p>
                  <p className="text-base font-black text-slate-800">4</p>
                </div>
                <div className="p-2 border rounded-lg bg-white">
                  <p className="text-[10px] text-slate-400 font-bold">Posisi Saat Ini</p>
                  <p className="text-base font-black text-indigo-700">No. 3</p>
                </div>
                <div className="p-2 border rounded-lg bg-white">
                  <p className="text-[10px] text-slate-400 font-bold">Estimasi Tunggu</p>
                  <p className="text-base font-black text-slate-800">{antrian.estimasiWaktu}</p>
                </div>
                <div className="p-2 border rounded-lg bg-white">
                  <p className="text-[10px] text-slate-400 font-bold">Konsultan Medis</p>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight mt-0.5">{antrian.petugas}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Riwayat Konsultasi */}
          <h2 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Riwayat Konsultasi &amp; Tindak Lanjut Medis</h2>

          <div className="space-y-3">
            {riwayat.map(r => (
              <Card key={r.id} className="border border-slate-200">
                <CardContent className="p-4 space-y-3.5">
                  
                  <div className="flex justify-between items-center text-[10px] border-b pb-1.5">
                    <span className="font-bold text-slate-400">{r.id} • {r.layanan}</span>
                    <span className="text-slate-500 font-semibold">{r.tanggal}</span>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-slate-700">Pertanyaan Awal:</p>
                    <p className="text-slate-650 italic bg-slate-50 p-2 rounded">"{r.pertanyaan}"</p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-bold text-slate-700">Tindak Lanjut Rekomendasi (Medis):</p>
                    <p className="text-slate-800 font-medium">{r.tindakLanjut}</p>
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-slate-400 border-t pt-2">
                    <span>Dokter Pemeriksa: <strong>{r.petugas}</strong></span>
                    <span className="text-green-700 font-bold flex items-center gap-0.5"><CheckCircle size={10} /> Selesai</span>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}
