'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  MessageSquare, Send, ShieldAlert, CheckCircle2, Clock, Trash2, HelpCircle, Info
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#2e7d32';

interface Aspirasi {
  id: string;
  kategori: 'Infrastruktur' | 'Kesehatan' | 'Pendidikan' | 'Budaya' | 'Layanan Publik';
  judul: string;
  deskripsi: string;
  tanggalInput: string;
  status: 'Baru' | 'Diperiksa' | 'Dibahas' | 'Diproses' | 'Selesai';
  tanggapan: string | null;
}

const MOCK_ASPIRASI: Aspirasi[] = [
  { id: 'ASP-01', kategori: 'Infrastruktur', judul: 'Perbaikan Lampu Jalan Poros RT 03', deskripsi: 'Jalan poros gelap gulita saat malam hari, mohon dipasang tiang lampu penerangan jalan baru.', tanggalInput: '12 Juli 2026', status: 'Diproses', tanggapan: 'Telah dimasukkan ke prioritas RKPDes tahun depan.' },
  { id: 'ASP-02', kategori: 'Layanan Publik', judul: 'Sinyal WiFi Balai Adat Terputus', deskripsi: 'Akses WiFi gratis di Balai Adat mati total sejak kemarin, mohon diperbaiki bagi anak sekolah.', tanggalInput: '15 Juli 2026', status: 'Baru', tanggapan: null },
];

export default function AspirasiPengaduanPage() {
  const [data, setData] = useState<Aspirasi[]>(MOCK_ASPIRASI);
  
  // Form states
  const [kategori, setKategori] = useState('Infrastruktur');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');

  const handleAjukan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !deskripsi) {
      alert('Judul dan Deskripsi wajib diisi.');
      return;
    }

    const baru: Aspirasi = {
      id: `ASP-0${data.length + 1}`,
      kategori: kategori as any,
      judul,
      deskripsi,
      tanggalInput: '18 Juli 2026',
      status: 'Baru',
      tanggapan: null
    };

    setData(prev => [baru, ...prev]);
    setJudul('');
    setDeskripsi('');
    alert('✅ Aspirasi/Pengaduan Anda berhasil dikirim ke Pemerintah Desa.');
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Aspirasi dan Pengaduan" modul="Masyarakat Umum" color={COLOR} />

      {/* BANNER PRIVASI */}
      <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-950 text-xs flex items-start gap-2.5 shadow-sm">
        <ShieldAlert size={16} className="text-red-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          Masyarakat hanya dapat melihat riwayat aspirasi miliknya sendiri demi menjaga privasi dan keamanan identitas pengadu.
        </p>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Aspirasi Diajukan" value={data.length} satuan="Laporan" barColor="purple" progress={100} />
        <StatCard label="Status Baru" value={data.filter(a => a.status === 'Baru').length} satuan="Menunggu Tanggapan" barColor="orange" progress={50} />
        <StatCard label="Telah Ditanggapi" value={data.filter(a => a.tanggapan !== null).length} satuan="Realisasi Tindak Lanjut" barColor="green" progress={50} />
        <StatCard label="Tingkat Respons" value="92%" satuan="Oleh Pemerintah Desa" barColor="blue" progress={92} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 text-xs">
        
        {/* FORM AJUKAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Send size={14} className="text-indigo-700" /> Sampaikan Aspirasi / Aduan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAjukan} className="space-y-3.5">
              
              <div className="space-y-1">
                <label className="font-bold text-slate-750">BIDANG KATEGORI:</label>
                <select value={kategori} onChange={e => setKategori(e.target.value)} className="w-full p-2 border rounded-lg bg-white focus:outline-none">
                  <option value="Infrastruktur">Infrastruktur &amp; Jalan</option>
                  <option value="Kesehatan">Kesehatan &amp; Posyandu</option>
                  <option value="Pendidikan">Pendidikan &amp; Sekolah</option>
                  <option value="Budaya">Budaya &amp; Adat</option>
                  <option value="Layanan Publik">Layanan Kantor Desa</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-750">JUDUL LAPORAN / KELUHAN:</label>
                <input
                  type="text"
                  required
                  value={judul}
                  onChange={e => setJudul(e.target.value)}
                  placeholder="Ringkasan aduan..."
                  className="w-full p-2 border rounded-lg focus:outline-none bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-750">DESKRIPSI PERMASALAHAN:</label>
                <textarea
                  required
                  value={deskripsi}
                  onChange={e => setDeskripsi(e.target.value)}
                  placeholder="Detail lokasi kejadian, kronologi permasalahan secara jelas..."
                  rows={5}
                  className="w-full p-2 border rounded-lg focus:outline-none bg-white"
                />
              </div>

              <button type="submit" className="w-full py-2 bg-indigo-700 hover:bg-indigo-800 text-white font-bold rounded-lg flex items-center justify-center gap-1.5 shadow-sm">
                Kirim Laporan Aspirasi
              </button>

            </form>
          </CardContent>
        </Card>

        {/* LIST RIWAYAT LAPORAN SAYA */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold text-slate-650 uppercase tracking-wider">Laporan Aspirasi Anda</h2>

          <div className="space-y-3.5">
            {data.map(a => (
              <Card key={a.id} className="border border-slate-200 shadow-none">
                <CardContent className="p-4 space-y-3">
                  
                  <div className="flex justify-between items-start gap-2 flex-wrap border-b pb-2 text-[10px]">
                    <span className="font-mono text-slate-450 font-bold mr-2">{a.id} • Kategori: {a.kategori}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 font-semibold">{a.tanggalInput}</span>
                      <span className={`font-bold px-1.5 py-0.5 rounded border ${
                        a.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' :
                        'bg-orange-50 text-orange-700 border-orange-200'
                      }`}>{a.status}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-805 text-sm">{a.judul}</h3>
                    <p className="text-slate-550 leading-relaxed mt-1 text-[11px]">{a.deskripsi}</p>
                  </div>

                  {/* Tanggapan */}
                  <div className="p-2.5 bg-slate-50 border rounded-lg text-[10px]">
                    <p className="font-bold text-slate-700">Tanggapan Pemerintah Desa:</p>
                    <p className="text-slate-600 font-semibold mt-0.5">{a.tanggapan ?? '⌛ Menunggu pemeriksaan verifikasi dan pembahasan Sekdes.'}</p>
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
