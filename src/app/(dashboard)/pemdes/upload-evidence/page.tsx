'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Upload, CheckCircle2, AlertTriangle, FileText, Send, Clock,
  RefreshCw, Bookmark, Plus, History, Lock, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const PROGRAM_OPTIONS = [
  { id: 'PRG-01', name: 'Peningkatan Infrastruktur Internet Dusun C', kategori: 'Infrastruktur TIK' },
  { id: 'PRG-02', name: 'Pengembangan Literasi & PAUD Digital', kategori: 'Pendidikan' },
  { id: 'PRG-03', name: 'Digitalisasi Layanan BUMDes Adat', kategori: 'Ekonomi' },
];

const JENIS_BUKTI_OPTIONS = ['Foto Dokumentasi Kegiatan', 'Surat Keputusan (SK) / Perdes', 'Berita Acara Rapat', 'Laporan Realisasi Fisik / Keuangan'];

const MOCK_BUKTI = [
  {
    id: 'EVID-01',
    program: 'Peningkatan Infrastruktur Internet Dusun C',
    kategori: 'Infrastruktur TIK',
    jenisBukti: 'Foto Dokumentasi Kegiatan',
    file: 'Foto_Pemasangan_Tiang_Internet.jpg',
    tgl: '15 Juli 2026',
    sumber: 'Kasi Pemerintahan',
    status: 'Terverifikasi',
    riwayatVersi: ['v1: Upload awal (15 Jul 2026)']
  },
  {
    id: 'EVID-02',
    program: 'Pengembangan Literasi & PAUD Digital',
    kategori: 'Pendidikan',
    jenisBukti: 'Surat Keputusan (SK) / Perdes',
    file: 'SK_Pembentukan_TBM_Digital.pdf',
    tgl: '10 Juli 2026',
    sumber: 'Sekretaris Desa',
    status: 'Pending',
    riwayatVersi: ['v1: Upload draf (08 Jul 2026)', 'v2: Upload revisi tanda tangan (10 Jul 2026)']
  }
];

export default function UnggahBuktiPage() {
  const [buktiList, setBuktiList] = useState(MOCK_BUKTI);
  const [selectedProg, setSelectedProg] = useState('Peningkatan Infrastruktur Internet Dusun C');
  const [jenisBukti, setJenisBukti] = useState('Foto Dokumentasi Kegiatan');
  const [fileName, setFileName] = useState('');
  const [sumber, setSumber] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || !sumber) { alert('Nama file dan sumber wajib diisi.'); return; }
    
    // Validasi klasifikasi akses: program kesehatan, pendidikan, budaya
    const progKategori = PROGRAM_OPTIONS.find(p => p.name === selectedProg)?.kategori || 'Umum';
    
    const baru = {
      id: `EVID-0${buktiList.length + 1}`,
      program: selectedProg,
      kategori: progKategori,
      jenisBukti,
      file: fileName,
      tgl: new Date().toLocaleDateString('id-ID'),
      sumber,
      status: 'Pending',
      riwayatVersi: [`v1: Upload awal (${new Date().toLocaleDateString('id-ID')})`]
    };

    setBuktiList(prev => [baru, ...prev]);
    setSubmitted(true);
    alert(`✅ Bukti berhasil diunggah untuk verifikasi. Kategori Akses: ${progKategori}.`);
  };

  const handleReset = () => {
    setFileName('');
    setSumber('');
    setSubmitted(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Unggah Bukti" modul="Pemerintah Desa" color={COLOR} />

      {/* CLASSIFICATION WARNING BANNER */}
      <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <Lock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Ketentuan Batas Akses Bukti</p>
          <p className="text-amber-700 mt-0.5 font-medium leading-relaxed">
            Pengunggahan bukti program **kesehatan (SDG 3), pendidikan (SDG 4), dan budaya (SDG 18)** harus mengikuti klasifikasi dan batas akses masing-masing. Informasi sensitif non-publik tidak diperkenankan diunggah secara terbuka.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Bukti Diunggah" value={buktiList.length} satuan="Dokumen" barColor="purple" progress={100} />
        <StatCard label="Menunggu Verifikasi" value={buktiList.filter(b => b.status === 'Pending').length} satuan="Pending" barColor="orange" progress={50} />
        <StatCard label="Terverifikasi" value={buktiList.filter(b => b.status === 'Terverifikasi').length} satuan="Sah oleh Dinas" barColor="green" progress={50} />
        <StatCard label="Status Kerja" value="Optimal" satuan="Data Bukti" barColor="blue" progress={90} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* FORM UPLOAD */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Upload size={16} /> Unggah Bukti Baru
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto"><CheckCircle2 size={24} /></div>
                <p className="font-bold text-sm text-slate-800">Bukti Berhasil Diunggah!</p>
                <p className="text-xs text-slate-500">Menunggu verifikasi oleh administrator.</p>
                <button onClick={handleReset} className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-600">Unggah Bukti Lain</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">PILIH PROGRAM / INDIKATOR:</label>
                  <select value={selectedProg} onChange={e => setSelectedProg(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white">
                    {PROGRAM_OPTIONS.map(p => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">JENIS BUKTI:</label>
                  <select value={jenisBukti} onChange={e => setJenisBukti(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white">
                    {JENIS_BUKTI_OPTIONS.map(j => <option key={j} value={j}>{j}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">NAMA FILE DOKUMEN:</label>
                  <input type="text" value={fileName} onChange={e => setFileName(e.target.value)} placeholder="SK_Pembangunan_Internet.pdf..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">SUMBER DATA:</label>
                  <input type="text" value={sumber} onChange={e => setSumber(e.target.value)} placeholder="Operator SID / Kasi Pembangunan..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-300" />
                </div>
                
                <button type="submit" className="w-full py-2.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm">
                  <Send size={12} /> Kirim untuk Verifikasi
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* LIST BUKTI & RIWAYAT VERSI */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Status Pemeriksaan Bukti</h2>

          {buktiList.map(b => (
            <Card key={b.id} className="border border-slate-200">
              <CardContent className="p-4 space-y-3 text-xs">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-mono font-bold text-slate-400">{b.id}</span>
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-650 px-1.5 py-0.5 rounded">{b.kategori}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${b.status === 'Terverifikasi' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-750'}`}>{b.status}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xs leading-snug">{b.program}</h3>
                    <p className="text-[10px] text-slate-450 font-semibold">Jenis: {b.jenisBukti} • File: <strong className="text-indigo-700">{b.file}</strong></p>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 border rounded-lg text-[10px] text-slate-500 space-y-1">
                  <p className="font-bold text-slate-600 flex items-center gap-1"><History size={11} /> Riwayat Versi & Pemeriksaan:</p>
                  {b.riwayatVersi.map((v, i) => (
                    <p key={i} className="pl-2 border-l-2 border-slate-300">{v}</p>
                  ))}
                </div>

              </CardContent>
            </Card>
          ))}
        </div>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Seluruh file bukti disimpan di sistem arsip digital terenkripsi</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
