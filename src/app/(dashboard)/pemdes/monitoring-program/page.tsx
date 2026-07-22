'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  RefreshCw, BarChart2, CheckCircle2, AlertTriangle, Filter, Search,
  Clock, ShieldCheck, Eye, MessageSquare, Send
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const PROGRAM_DATA = [
  {
    id: 'PRG-01',
    nama: 'Peningkatan Infrastruktur Internet Dusun C',
    bidang: 'Infrastruktur TIK',
    target: 'Jangkauan sinyal 100% di Dusun C',
    progres: 45,
    pj: 'Kasi Pemerintahan & Kominfo',
    keterlambatan: 'Terlambat 2 minggu (kendala pasokan komponen tower)',
    bukti: 'Foto_Pondasi_Tower_Dusun_C.jpg',
    tindakLanjut: 'Koordinasi dengan vendor pengadaan komponen lokal',
    rekomendasiAwal: 'Prioritas P1 AHP (Skor 0.232)',
    anggaran: 'Rp 80.000.000',
    status: 'Berjalan',
  },
  {
    id: 'PRG-02',
    nama: 'Pengembangan Literasi & PAUD Digital',
    bidang: 'Pendidikan',
    target: 'Pelatihan dasar TIK untuk 15 guru PAUD',
    progres: 80,
    pj: 'Guru Fasilitator (Bapak Ahmadi)',
    keterlambatan: 'Tidak ada',
    bukti: 'Modul_Pelatihan_Guru_PAUD.pdf',
    tindakLanjut: 'Sosialisasi aplikasi pembelajaran interaktif',
    rekomendasiAwal: 'Prioritas P2 AHP (Skor 0.198)',
    anggaran: 'Rp 15.000.000',
    status: 'Berjalan',
  },
  {
    id: 'PRG-03',
    nama: 'Digitalisasi Layanan BUMDes Adat',
    bidang: 'Ekonomi',
    target: 'Sistem POS dan e-commerce BUMDes online',
    progres: 100,
    pj: 'Direktur BUMDes',
    keterlambatan: 'Tidak ada',
    bukti: 'Screenshot_Aplikasi_BUMDes_LungAnai.png',
    tindakLanjut: 'Serah terima sistem dan go-live',
    rekomendasiAwal: 'Prioritas P3 AHP (Skor 0.175)',
    anggaran: 'Rp 25.000.000',
    status: 'Selesai',
  },
];

export default function PemantauanProgramPage() {
  const [data, setData] = useState(PROGRAM_DATA);
  const [filterBidang, setFilterBidang] = useState('Semua');
  const [search, setSearch] = useState('');
  const [showEvidence, setShowEvidence] = useState<string | null>(null);
  const [tlInput, setTlInput] = useState('');
  const [selectedProg, setSelectedProg] = useState<string | null>(null);

  const handleSaveTindakLanjut = (id: string) => {
    if (!tlInput) return;
    setData(prev => prev.map(p => p.id === id ? { ...p, tindakLanjut: tlInput } : p));
    setTlInput('');
    setSelectedProg(null);
    alert('✅ Tindak lanjut program berhasil dicatat.');
  };

  const filtered = data.filter(p => {
    const matchBidang = filterBidang === 'Semua' || p.bidang === filterBidang;
    const matchSearch = p.nama.toLowerCase().includes(search.toLowerCase());
    return matchBidang && matchSearch;
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pemantauan Program" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Program" value={data.length} satuan="Program Terdaftar" barColor="blue" progress={100} />
        <StatCard label="Program Berjalan" value={data.filter(p => p.status === 'Berjalan').length} satuan="Dalam Progres" barColor="orange" progress={67} />
        <StatCard label="Program Selesai" value={data.filter(p => p.status === 'Selesai').length} satuan="Tuntas 100%" barColor="green" progress={33} />
        <StatCard label="Keterlambatan" value={data.filter(p => p.keterlambatan !== 'Tidak ada').length + ' Program'} satuan="Butuh Tindak Lanjut" barColor="red" progress={33} />
      </div>

      {/* FILTER & CARI */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 bg-slate-50 border rounded-xl">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-650 flex items-center gap-1"><Filter size={13} /> Saring Bidang:</span>
          {['Semua', 'Infrastruktur TIK', 'Pendidikan', 'Ekonomi'].map(b => (
            <button
              key={b}
              onClick={() => setFilterBidang(b)}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${filterBidang === b ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5 bg-white border rounded-lg px-2.5 py-1 w-64">
          <Search size={13} className="text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari nama program..."
            className="text-xs focus:outline-none w-full"
          />
        </div>
      </div>

      {/* LIST PROGRAM */}
      <div className="space-y-4">
        {filtered.map(p => (
          <Card key={p.id} className={`border-l-4 ${p.keterlambatan !== 'Tidak ada' ? 'border-l-red-500' : 'border-l-indigo-700'}`}>
            <CardContent className="p-4 space-y-3.5 text-xs">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[9px] font-mono font-bold text-slate-400">{p.id}</span>
                    <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{p.bidang}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded ${p.status === 'Selesai' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-750'}`}>{p.status}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-sm leading-snug">{p.nama}</h3>
                  <p className="text-[10px] text-slate-400 font-semibold">PJ: {p.pj} • Anggaran: {p.anggaran}</p>
                </div>

                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-semibold">Progres Fisik</p>
                  <p className="font-bold text-lg text-indigo-700">{p.progres}%</p>
                </div>
              </div>

              {/* PROGRESS BAR */}
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="h-2 rounded-full bg-indigo-700" style={{ width: `${p.progres}%` }} />
              </div>

              {/* DETAILS GRID */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px] pt-1">
                <div className="p-2.5 bg-slate-50 border rounded-lg">
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Target Capaian</p>
                  <p className="text-slate-700 font-medium leading-snug mt-0.5">{p.target}</p>
                </div>
                <div className="p-2.5 bg-slate-50 border rounded-lg">
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Rekomendasi Awal DSS</p>
                  <p className="text-slate-700 font-semibold leading-snug mt-0.5">{p.rekomendasiAwal}</p>
                </div>
                <div className="p-2.5 bg-slate-50 border rounded-lg">
                  <p className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Keterlambatan / Kendala</p>
                  <p className={`font-bold leading-snug mt-0.5 ${p.keterlambatan !== 'Tidak ada' ? 'text-red-650' : 'text-slate-600'}`}>
                    {p.keterlambatan}
                  </p>
                </div>
              </div>

              {/* BUKTI & TINDAK LANJUT ACTION */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">Bukti Fisik:</span>
                  <span className="font-semibold text-indigo-700">{p.bukti}</span>
                  <button onClick={() => setShowEvidence(showEvidence === p.id ? null : p.id)} className="text-[10px] text-slate-450 hover:underline flex items-center gap-0.5">
                    <Eye size={11} /> Lihat Bukti
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-500">Tindak Lanjut:</span>
                  <span className="font-semibold text-slate-700">{p.tindakLanjut}</span>
                  <button onClick={() => setSelectedProg(selectedProg === p.id ? null : p.id)} className="text-[10px] text-indigo-700 hover:underline flex items-center gap-0.5 font-bold">
                    <MessageSquare size={11} /> Catat Tindak Lanjut
                  </button>
                </div>
              </div>

              {/* VISUAL EVIDENCE MOCK */}
              {showEvidence === p.id && (
                <div className="p-4 border rounded-xl bg-slate-50 text-center space-y-2">
                  <p className="font-bold text-slate-700">Lampiran Bukti Fisik Program:</p>
                  <div className="w-full max-w-[200px] h-[120px] bg-slate-200 border rounded mx-auto flex items-center justify-center text-slate-400">
                    [ Simulasi File: {p.bukti} ]
                  </div>
                </div>
              )}

              {/* FORM TINDAK LANJUT */}
              {selectedProg === p.id && (
                <div className="p-3 border border-indigo-200 rounded-xl bg-indigo-50/20 space-y-2">
                  <label className="font-bold text-indigo-900 block">TULIS TINDAK LANJUT KENDALA:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tlInput}
                      onChange={e => setTlInput(e.target.value)}
                      placeholder="Jelaskan langkah konkret penyelesaian masalah..."
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300"
                    />
                    <button onClick={() => handleSaveTindakLanjut(p.id)} className="px-4 py-2 bg-indigo-700 text-white rounded-lg font-bold flex items-center gap-1">
                      <Send size={11} /> Simpan
                    </button>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Terintegrasi dengan Rencana Kerja Pemerintah Desa (RKPDes)</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
