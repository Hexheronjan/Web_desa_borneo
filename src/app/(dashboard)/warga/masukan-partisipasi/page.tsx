'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  MessageSquare, Send, Users, CheckCircle2, Clock, ChevronRight, RefreshCw, Filter, ThumbsUp
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

type StatusMasukan = 'Dikirim' | 'Diterima' | 'Dibahas' | 'Ditindaklanjuti';
const STATUS_COLOR: Record<StatusMasukan, string> = {
  Dikirim: 'bg-sky-100 text-sky-700',
  Diterima: 'bg-teal-100 text-teal-700',
  Dibahas: 'bg-orange-100 text-orange-700',
  Ditindaklanjuti: 'bg-purple-100 text-purple-700',
};

const KATEGORI_MASUKAN = ['Aspirasi Program', 'Evaluasi Pelaksanaan', 'Usulan Perbaikan', 'Dukungan Sosial', 'Laporan Lapangan'];
const SASARAN_OPTIONS = ['Kepala Desa', 'BPD', 'Tim Perencana RKPDes', 'Kasi Pembangunan', 'Kader Posyandu'];

const DUMMY_MASUKAN = [
  { id: 'MK-001', judul: 'Dukungan Pelaksanaan Jembatan Dusun C Segera', kategori: 'Dukungan Sosial', sasaran: 'Kepala Desa', isi: 'Mewakili warga Dusun C, saya menyatakan dukungan penuh atas rencana pembangunan jembatan gantung. Urgensi sangat tinggi karena ada ibu hamil yang terpaksa menyeberangi sungai saat banjir.', pengirim: 'Tokoh Masyarakat Dusun C', tgl: '16 Jul 2026', status: 'Dibahas' as StatusMasukan, likes: 28, dibalas: true, balasan: 'Terima kasih atas masukan Anda. Pembangunan akan dimulai September 2026 setelah penetapan pemenang lelang.' },
  { id: 'MK-002', judul: 'Usulan Perbaikan Mekanisme Posyandu Digital', kategori: 'Usulan Perbaikan', sasaran: 'Kader Posyandu', isi: 'Sistem pencatatan digital posyandu perlu disosialisasikan lebih intensif. Kader di Dusun B masih belum terbiasa menggunakan tablet yang diberikan.', pengirim: 'Ketua Kader Posyandu', tgl: '14 Jul 2026', status: 'Diterima' as StatusMasukan, likes: 12, dibalas: false, balasan: '' },
  { id: 'MK-003', judul: 'Evaluasi Program Sampah: Gerobak Motor Belum Beroperasi', kategori: 'Evaluasi Pelaksanaan', sasaran: 'Kasi Pembangunan', isi: 'Gerobak sampah motor yang dijanjikan pada program ADD Semester I masih belum beroperasi di Dusun C. Warga mulai membuang sampah sembarangan karena TPS sudah penuh.', pengirim: 'Tokoh Masyarakat', tgl: '10 Jul 2026', status: 'Ditindaklanjuti' as StatusMasukan, likes: 35, dibalas: true, balasan: 'Gerobak sudah dalam proses pengiriman. Diperkirakan beroperasi awal Agustus 2026.' },
];

export default function MasukanPartisipasiPage() {
  const [kategori, setKategori] = useState('Aspirasi Program');
  const [sasaran, setSasaran] = useState('Kepala Desa');
  const [judul, setJudul] = useState('');
  const [isi, setIsi] = useState('');
  const [pengirim, setPengirim] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [likedItems, setLikedItems] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul || !isi || !pengirim) { alert('Semua kolom wajib diisi.'); return; }
    setSubmitted(true);
  };

  const handleLike = (id: string) => {
    setLikedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const filtered = filterStatus === 'Semua' ? DUMMY_MASUKAN : DUMMY_MASUKAN.filter(m => m.status === filterStatus);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Masukan dan Partisipasi Masyarakat" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Masukan" value={DUMMY_MASUKAN.length} satuan="Kiriman Masukan" barColor="purple" progress={100} />
        <StatCard label="Ditindaklanjuti" value={DUMMY_MASUKAN.filter(m => m.status === 'Ditindaklanjuti').length} satuan="Mendapat Respons" barColor="green" progress={33} />
        <StatCard label="Dalam Pembahasan" value={DUMMY_MASUKAN.filter(m => m.status === 'Dibahas').length} satuan="Sedang Dibahas" barColor="orange" progress={33} />
        <StatCard label="Total Dukungan" value={DUMMY_MASUKAN.reduce((s, m) => s + m.likes, 0)} satuan="Like/Dukungan" barColor="blue" progress={80} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* FORM KIRIM MASUKAN */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <MessageSquare size={16} /> Kirim Masukan & Partisipasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto"><CheckCircle2 size={24} /></div>
                <p className="font-bold text-sm text-slate-800">Masukan Berhasil Dikirim!</p>
                <p className="text-xs text-slate-500">Masukan Anda akan ditinjau dan diteruskan ke {sasaran}.</p>
                <button onClick={() => { setSubmitted(false); setJudul(''); setIsi(''); setPengirim(''); }} className="px-4 py-2 border rounded-lg text-xs font-semibold hover:bg-slate-50 text-slate-600">Buat Masukan Baru</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">KATEGORI MASUKAN:</label>
                  <select value={kategori} onChange={e => setKategori(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                    {KATEGORI_MASUKAN.map(k => <option key={k}>{k}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">DITUJUKAN KEPADA:</label>
                  <select value={sasaran} onChange={e => setSasaran(e.target.value)} className="w-full p-2.5 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-300">
                    {SASARAN_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">NAMA / PERWAKILAN:</label>
                  <input type="text" value={pengirim} onChange={e => setPengirim(e.target.value)} placeholder="Nama Anda / Perwakilan dari..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">JUDUL MASUKAN:</label>
                  <input type="text" value={judul} onChange={e => setJudul(e.target.value)} placeholder="Ringkasan singkat masukan Anda..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700">ISI MASUKAN / PARTISIPASI:</label>
                  <textarea rows={4} value={isi} onChange={e => setIsi(e.target.value)} placeholder="Jelaskan masukan, pendapat, atau dukungan sosial Anda secara lengkap..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300" />
                </div>
                <button type="submit" className="w-full py-2.5 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors">
                  <Send size={12} /> Kirim Masukan
                </button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* DAFTAR MASUKAN */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Masukan Terkirim & Respons</h2>
            <div className="flex gap-1 flex-wrap">
              {['Semua', 'Dikirim', 'Diterima', 'Dibahas', 'Ditindaklanjuti'].map(s => (
                <button key={s} onClick={() => setFilterStatus(s)} className={`px-2 py-0.5 rounded text-[9px] font-bold transition-colors ${filterStatus === s ? 'bg-purple-700 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{s}</button>
              ))}
            </div>
          </div>

          {filtered.map(m => (
            <Card key={m.id} className="border border-slate-200 shadow-sm">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{m.kategori}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${STATUS_COLOR[m.status]}`}>{m.status}</span>
                      <span className="text-[10px] text-slate-400">→ {m.sasaran}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-xs leading-snug">{m.judul}</h3>
                    <p className="text-[10px] text-slate-400">{m.pengirim} • {m.tgl}</p>
                  </div>
                  <button onClick={() => handleLike(m.id)} className={`flex items-center gap-1 px-2 py-1 rounded-lg border text-[10px] font-bold transition-colors ${likedItems[m.id] ? 'bg-purple-100 border-purple-200 text-purple-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}>
                    <ThumbsUp size={11} /> {m.likes + (likedItems[m.id] ? 1 : 0)}
                  </button>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-lg border">{m.isi}</p>

                {m.dibalas && m.balasan && (
                  <div className="pl-3 border-l-2 border-purple-300">
                    <p className="text-[10px] font-bold text-purple-700 mb-0.5">Respons Resmi:</p>
                    <p className="text-xs text-slate-600 italic leading-snug">{m.balasan}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
          {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-10">Tidak ada masukan pada status ini.</p>}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Masukan diteruskan ke Pemerintah Desa dan BPD secara real-time</span>
        <span>Periode: Juli 2026</span>
      </div>
    </div>
  );
}
