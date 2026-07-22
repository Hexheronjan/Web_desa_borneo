'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  AlertTriangle, Send, CheckCircle2, ChevronRight, RefreshCw, MapPin, Paperclip,
  Eye, EyeOff, ArrowRight, Search, FileCheck
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

type StatusMasalah = 'Dilaporkan' | 'Diverifikasi' | 'Diteruskan' | 'Ditangani' | 'Selesai';

const STATUS_ALUR: StatusMasalah[] = ['Dilaporkan', 'Diverifikasi', 'Diteruskan', 'Ditangani', 'Selesai'];
const STATUS_COLOR: Record<StatusMasalah, string> = {
  Dilaporkan: 'bg-sky-100 text-sky-700',
  Diverifikasi: 'bg-yellow-100 text-yellow-700',
  Diteruskan: 'bg-orange-100 text-orange-700',
  Ditangani: 'bg-blue-100 text-blue-700',
  Selesai: 'bg-green-100 text-green-700',
};

const KATEGORI = ['Infrastruktur', 'Lingkungan', 'Kesehatan', 'Pendidikan', 'Keamanan', 'Sosial & Budaya', 'Lainnya'];

const DUMMY_MASALAH = [
  { id: 'MSL-001', judul: 'Jalan Utama Dusun B Berlubang Besar', kategori: 'Infrastruktur', lokasi: 'Jl. Poros Dusun B, RT 03', status: 'Ditangani' as StatusMasalah, publik: true, bukti: '3 foto kondisi jalan', responsdes: 'Sudah dikordinasikan dengan Dinas PU Kab. Juli 2025', tgl: '10 Jul 2025' },
  { id: 'MSL-002', judul: 'Tumpukan Sampah di TPS Dusun C Tak Diangkut', kategori: 'Lingkungan', lokasi: 'TPS RT 05 Dusun C', status: 'Diteruskan' as StatusMasalah, publik: true, bukti: '2 foto TPS', responsdes: 'Diteruskan ke Karang Taruna & LPM', tgl: '8 Jul 2025' },
  { id: 'MSL-003', judul: 'Posyandu Tidak Aktif 2 Bulan Terakhir', kategori: 'Kesehatan', lokasi: 'Gedung Posyandu Dusun A', status: 'Diverifikasi' as StatusMasalah, publik: false, bukti: 'Surat Keterangan Kader', responsdes: 'Sedang diverifikasi oleh Sekdes', tgl: '5 Jul 2025' },
  { id: 'MSL-004', judul: 'Lampu Jalan Mati di 5 Titik', kategori: 'Infrastruktur', lokasi: 'Jl. Poros Desa RT 01-05', status: 'Selesai' as StatusMasalah, publik: true, bukti: '-', responsdes: 'Sudah diperbaiki Tim Teknis Pemdes', tgl: '1 Jul 2025' },
  { id: 'MSL-005', judul: 'Air PAM Desa Keruh & Berbau', kategori: 'Lingkungan', lokasi: 'SPAM Desa, Dusun A', status: 'Dilaporkan' as StatusMasalah, publik: true, bukti: '1 foto sampel air', responsdes: '-', tgl: '3 Jul 2025' },
];

export default function PemantauanMasalahPage() {
  const [judul, setJudul] = useState('');
  const [kategori, setKategori] = useState('Infrastruktur');
  const [lokasi, setLokasi] = useState('');
  const [bukti, setBukti] = useState('');
  const [isPubik, setIsPublik] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [forwardSuccess, setForwardSuccess] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !lokasi) { alert('Judul masalah dan lokasi harus diisi.'); return; }
    setSubmitted(true);
  };

  const handleForward = (id: string, judulM: string) => {
    if (confirm(`Teruskan laporan masalah "${judulM}" ke Pemerintah Desa untuk ditangani?`)) {
      setForwardSuccess(prev => ({ ...prev, [id]: true }));
      alert('✅ Masalah berhasil diteruskan ke Pemerintah Desa. Status: Diteruskan.');
    }
  };

  const filtered = filterStatus === 'Semua' ? DUMMY_MASALAH : DUMMY_MASALAH.filter(m => m.status === filterStatus);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pemantauan Masalah dan Kebutuhan Masyarakat" modul="Tokoh Masyarakat" color={COLOR} />

      {/* STATUS ALUR */}
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <p className="text-[10px] font-bold text-slate-500 mb-2 uppercase tracking-wider">Alur Status Laporan Masalah:</p>
        <div className="flex items-center flex-wrap gap-1">
          {STATUS_ALUR.map((s, i) => (
            <div key={s} className="flex items-center gap-1">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${STATUS_COLOR[s]}`}>{s}</span>
              {i < STATUS_ALUR.length - 1 && <ChevronRight size={12} className="text-slate-300" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Laporan" value={DUMMY_MASALAH.length} satuan="Masalah Dicatat" barColor="purple" progress={100} />
        <StatCard label="Dilaporkan Baru" value={DUMMY_MASALAH.filter(m => m.status === 'Dilaporkan').length} satuan="Menunggu Verifikasi" barColor="orange" progress={20} />
        <StatCard label="Ditangani" value={DUMMY_MASALAH.filter(m => ['Ditangani', 'Selesai'].includes(m.status)).length} satuan="Dalam Proses & Selesai" barColor="green" progress={40} />
        <StatCard label="Laporan Publik" value={DUMMY_MASALAH.filter(m => m.publik).length} satuan="Terlihat Umum" barColor="blue" progress={80} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* FORM LAPORAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <AlertTriangle size={16} /> Catat Masalah / Kebutuhan Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto"><CheckCircle2 size={24} /></div>
                <p className="font-bold text-sm text-slate-800">Laporan Masalah Dikirim!</p>
                <p className="text-xs text-slate-500">Status: <strong>Dilaporkan</strong>. Sekretaris Desa akan memverifikasi laporan Anda.</p>
                <button onClick={() => { setSubmitted(false); setJudul(''); setLokasi(''); setBukti(''); }} className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-600">Buat Laporan Baru</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">JUDUL MASALAH:</label>
                  <input type="text" value={judul} onChange={e => setJudul(e.target.value)} placeholder="Contoh: Jalan berlubang di RT 03..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">KATEGORI:</label>
                  <select value={kategori} onChange={e => setKategori(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                    {KATEGORI.map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><MapPin size={11} /> LOKASI:</label>
                  <input type="text" value={lokasi} onChange={e => setLokasi(e.target.value)} placeholder="Contoh: RT 03, Jl. Poros Dusun B" className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 flex items-center gap-1"><Paperclip size={11} /> BUKTI / LAMPIRAN:</label>
                  <input type="text" value={bukti} onChange={e => setBukti(e.target.value)} placeholder="Nama file foto atau deskripsi bukti" className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="flex items-center justify-between p-2.5 border rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2">
                    {isPubik ? <Eye size={14} className="text-blue-600" /> : <EyeOff size={14} className="text-slate-400" />}
                    <div>
                      <p className="font-bold text-slate-700">Jenis Laporan</p>
                      <p className="text-[10px] text-slate-400">{isPubik ? 'Laporan publik — terlihat semua warga' : 'Laporan terbatas — hanya Pemdes'}</p>
                    </div>
                  </div>
                  <button type="button" onClick={() => setIsPublik(!isPubik)} className={`w-10 h-5 rounded-full transition-colors ${isPubik ? 'bg-purple-700' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform mx-0.5 ${isPubik ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
                <button type="submit" className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                  <Send size={12} /> Kirim Laporan Masalah
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* DAFTAR LAPORAN */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <FileCheck size={16} /> Daftar Laporan & Tindak Lanjut
              </CardTitle>
              <div className="flex flex-wrap gap-1">
                {['Semua', ...STATUS_ALUR].map(s => (
                  <button key={s} onClick={() => setFilterStatus(s)} className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors ${filterStatus === s ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{s}</button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto rounded-lg border border-slate-100">
              <table className="w-full text-xs">
                <thead className="bg-slate-50 text-slate-500 font-bold text-left">
                  <tr>
                    <th className="p-2.5">ID</th>
                    <th className="p-2.5 min-w-[150px]">Judul Masalah</th>
                    <th className="p-2.5">Kategori</th>
                    <th className="p-2.5">Lokasi</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Visibilitas</th>
                    <th className="p-2.5">Bukti</th>
                    <th className="p-2.5">Respons Pemdes</th>
                    <th className="p-2.5">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map(m => {
                    const isForwarded = forwardSuccess[m.id];
                    return (
                      <tr key={m.id} className="align-top hover:bg-slate-50/50">
                        <td className="p-2.5 font-mono text-[10px] text-slate-400">{m.id}</td>
                        <td className="p-2.5">
                          <p className="font-semibold text-slate-800 max-w-[160px] leading-snug">{m.judul}</p>
                          <p className="text-[10px] text-slate-400">{m.tgl}</p>
                        </td>
                        <td className="p-2.5"><span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600 whitespace-nowrap">{m.kategori}</span></td>
                        <td className="p-2.5 text-[10px] text-slate-600 max-w-[100px] leading-snug">{m.lokasi}</td>
                        <td className="p-2.5"><span className={`px-1.5 py-0.5 rounded text-[9px] font-bold whitespace-nowrap ${STATUS_COLOR[m.status]}`}>{m.status}</span></td>
                        <td className="p-2.5">
                          <span className={`flex items-center gap-1 text-[10px] font-semibold ${m.publik ? 'text-blue-600' : 'text-slate-400'}`}>
                            {m.publik ? <Eye size={11} /> : <EyeOff size={11} />}
                            {m.publik ? 'Publik' : 'Terbatas'}
                          </span>
                        </td>
                        <td className="p-2.5 text-[10px] text-slate-500">{m.bukti}</td>
                        <td className="p-2.5 text-[10px] text-slate-500 max-w-[130px] leading-snug">{m.responsdes}</td>
                        <td className="p-2.5">
                          <button
                            onClick={() => handleForward(m.id, m.judul)}
                            disabled={isForwarded || m.status === 'Selesai' || m.status === 'Ditangani'}
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[9px] font-bold transition-colors whitespace-nowrap ${isForwarded || m.status === 'Selesai' || m.status === 'Ditangani' ? 'bg-green-50 text-green-700 cursor-default' : 'bg-purple-700 text-white hover:bg-purple-800'}`}
                          >
                            {isForwarded || m.status === 'Selesai' || m.status === 'Ditangani'
                              ? <><CheckCircle2 size={9} /> Diteruskan</>
                              : <><ArrowRight size={9} /> Teruskan</>}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data masalah tersinkronisasi dengan Sistem Informasi Desa</span>
        <span>Periode: Semester I 2026</span>
      </div>
    </div>
  );
}
