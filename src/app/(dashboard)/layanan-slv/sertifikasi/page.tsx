'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Award, ShieldCheck, Download, AlertCircle, RefreshCw, Key
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface Sertifikat {
  id: string;
  nama: string;
  penerbit: string;
  tanggalDiperoleh: string;
  masaBerlaku: string;
  kodeVerifikasi: string;
  status: 'Aktif' | 'Kedaluwarsa';
}

const MOCK_SERTIFIKAT: Sertifikat[] = [
  { id: 'SRT-01', nama: 'Sertifikat Kompetensi Pembuatan Pupuk Organik Cair', penerbit: 'Balai Pelatihan Pertanian Regional', tanggalDiperoleh: '18 Juni 2026', masaBerlaku: 'Seumur Hidup', kodeVerifikasi: 'POC-29381-SLV', status: 'Aktif' },
  { id: 'SRT-02', nama: 'Sertifikat Kelulusan Literasi Keamanan Digital', penerbit: 'Kementerian Komunikasi & Informatika RI', tanggalDiperoleh: '05 Mei 2026', masaBerlaku: '05 Mei 2029', kodeVerifikasi: 'SEC-88219-KOM', status: 'Aktif' },
  { id: 'SRT-03', nama: 'Sertifikat Pelatihan Pencegahan DBD & Sanitasi Lingkungan', penerbit: 'Dinas Kesehatan Kabupaten', tanggalDiperoleh: '10 Februari 2025', masaBerlaku: '10 Februari 2026', kodeVerifikasi: 'SAN-11029-DKK', status: 'Kedaluwarsa' },
];

export default function SertifikatSayaPage() {
  const [list] = useState<Sertifikat[]>(MOCK_SERTIFIKAT);
  const [kodeInput, setKodeInput] = useState('');
  const [verifikasiHasil, setVerifikasiHasil] = useState<string | null>(null);

  const handleDownload = (nama: string) => {
    alert(`📥 Mengunduh Berkas PDF Resmi untuk:\n"${nama}"\n(Tanda Tangan Digital Tersertifikasi)`);
  };

  const handleVerifikasi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!kodeInput) {
      alert('Masukkan kode verifikasi terlebih dahulu.');
      return;
    }
    const found = list.find(s => s.kodeVerifikasi.toLowerCase() === kodeInput.toLowerCase());
    if (found) {
      setVerifikasiHasil(`✅ Sertifikat VALID & TERDAFTAR!\nNama: ${found.nama}\nPenerbit: ${found.penerbit}\nStatus: ${found.status}`);
    } else {
      setVerifikasiHasil('❌ Kode verifikasi tidak ditemukan dalam database sertifikat Anda.');
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Sertifikat Saya" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER NOTIFIKASI */}
      <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldCheck size={16} className="text-emerald-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Pengguna hanya dapat melihat sertifikat miliknya sendiri untuk menjamin keamanan credentials individu.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Sertifikat Saya" value={list.length} satuan="Dokumen Terbit" barColor="purple" progress={100} />
        <StatCard label="Sertifikat Aktif" value={list.filter(s => s.status === 'Aktif').length} satuan="Bisa Digunakan" barColor="green" progress={67} />
        <StatCard label="Sertifikat Kedaluwarsa" value={list.filter(s => s.status === 'Kedaluwarsa').length} satuan="Perlu Pelatihan Ulang" barColor="orange" progress={33} />
        <StatCard label="Status Verifikasi" value="Terkoneksi" satuan="Sistem Kode QR" barColor="blue" progress={90} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* LIST SERTIFIKAT */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Daftar Sertifikat Terbit</h2>

          <div className="space-y-3.5">
            {list.map(s => (
              <Card key={s.id} className="border border-slate-200 shadow-none">
                <CardContent className="p-4 space-y-3.5">
                  
                  <div className="flex justify-between items-start gap-2 flex-wrap border-b pb-2">
                    <div>
                      <span className="text-[9px] font-mono text-slate-400 font-bold mr-2">{s.id}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        s.status === 'Aktif' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {s.status}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-500">Kode: <strong>{s.kodeVerifikasi}</strong></span>
                  </div>

                  <div className="flex items-start gap-3">
                    <Award size={32} className={`flex-shrink-0 ${s.status === 'Aktif' ? 'text-amber-500' : 'text-slate-400'}`} />
                    <div className="space-y-1.5 flex-1">
                      <h3 className="font-bold text-slate-805 text-[13px] leading-snug">{s.nama}</h3>
                      <p className="text-[10px] text-slate-500 leading-tight">Penerbit: <strong>{s.penerbit}</strong></p>
                      
                      <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 border-t pt-2">
                        <p>Diperoleh: <strong>{s.tanggalDiperoleh}</strong></p>
                        <p>Masa Berlaku: <strong>{s.masaBerlaku}</strong></p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-2.5 flex justify-end">
                    <button
                      onClick={() => handleDownload(s.nama)}
                      className="px-2.5 py-1 bg-indigo-700 text-white rounded font-bold hover:bg-indigo-800 flex items-center gap-1.5"
                    >
                      <Download size={11} /> Unduh Sertifikat (PDF)
                    </button>
                  </div>

                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* VERIFIKASI KEASLIAN PANEL */}
        <div>
          <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider mb-4">Verifikasi Keaslian Berkas</h2>
          
          <Card>
            <CardHeader className="py-3">
              <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Key size={14} className="text-indigo-700" /> Masukkan Kode Sertifikat
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <form onSubmit={handleVerifikasi} className="space-y-2">
                <input
                  type="text"
                  value={kodeInput}
                  onChange={e => setKodeInput(e.target.value)}
                  placeholder="Contoh: POC-29381-SLV"
                  className="w-full p-2 border rounded-lg focus:outline-none bg-white text-xs font-mono font-bold"
                />
                <button type="submit" className="w-full py-1.5 bg-indigo-700 text-white font-bold rounded-lg hover:bg-indigo-800 text-xs">
                  Cek Keaslian
                </button>
              </form>

              {verifikasiHasil && (
                <div className="p-3 bg-slate-50 border rounded-lg text-[11px] text-slate-750 font-semibold whitespace-pre-line leading-relaxed">
                  {verifikasiHasil}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
