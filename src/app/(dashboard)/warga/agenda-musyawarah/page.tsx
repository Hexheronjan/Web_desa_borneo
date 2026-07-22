'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Calendar, Users, BookOpen, CheckCircle2, Send, Eye, List, RefreshCw, Clock, MapPin, FileText
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

const AGENDA_DATA = [
  {
    id: 'AGD-01', judul: 'Musyawarah Desa Penyusunan RKPDes 2026',
    jenis: 'Musyawarah', tanggal: '25 Juli 2025, 09:00 WIB', lokasi: 'Balai Desa Lung Anai',
    deskripsi: 'Penyusunan Rencana Kerja Pemerintahan Desa (RKPDes) Tahun Anggaran 2026 bersama BPD, LPM, dan tokoh masyarakat.',
    bahan: ['Draf RKPDes 2026', 'Rekap Aspirasi 2025', 'Laporan Realisasi APBDes'],
    tenggat: '22 Juli 2025', hasilSebelumnya: 'Prioritas Infrastruktur disetujui forum',
    peserta: 45, terdaftar: 32, status: 'Akan Datang'
  },
  {
    id: 'AGD-02', judul: 'Konsultasi Publik Pengembangan SPAM Desa',
    jenis: 'Konsultasi Publik', tanggal: '18 Juli 2025, 13:00 WIB', lokasi: 'Aula Sekolah SDN 01',
    deskripsi: 'Konsultasi rencana peningkatan jaringan SPAM untuk memastikan distribusi air bersih ke seluruh dusun.',
    bahan: ['Peta Jaringan SPAM', 'Anggaran Rencana'],
    tenggat: '16 Juli 2025', hasilSebelumnya: '-',
    peserta: 30, terdaftar: 18, status: 'Akan Datang'
  },
  {
    id: 'AGD-03', judul: 'Pelatihan Digital Pertanian & Pemasaran Online',
    jenis: 'Kegiatan Pendidikan', tanggal: '10 Juli 2025, 08:00 WIB', lokasi: 'Gedung Serbaguna RT 02',
    deskripsi: 'Pelatihan bagi petani dan pelaku UMKM anyaman rotan untuk memanfaatkan teknologi pemasaran digital.',
    bahan: ['Modul Pelatihan PDF', 'Link Platform Marketplace'],
    tenggat: '8 Juli 2025', hasilSebelumnya: 'Sudah dilaksanakan — 28 peserta hadir',
    peserta: 30, terdaftar: 28, status: 'Selesai'
  },
  {
    id: 'AGD-04', judul: 'Posyandu Balita & Lansia Bulan Juli',
    jenis: 'Kegiatan Kesehatan', tanggal: '7 Juli 2025, 08:00 WIB', lokasi: 'Gedung Posyandu Dusun A',
    deskripsi: 'Pelayanan rutin posyandu meliputi penimbangan balita, imunisasi, pemeriksaan lansia, dan edukasi gizi.',
    bahan: ['Jadwal Imunisasi', 'Form KIA Digital'],
    tenggat: '5 Juli 2025', hasilSebelumnya: '52 balita dan 20 lansia terlayani',
    peserta: 75, terdaftar: 65, status: 'Selesai'
  },
  {
    id: 'AGD-05', judul: 'Rapat Desa Program Pembangunan Balai Adat',
    jenis: 'Rapat Desa', tanggal: '3 Juli 2025, 14:00 WIB', lokasi: 'Balai Desa Lung Anai',
    deskripsi: 'Evaluasi progres pembangunan Balai Adat Permanen dan koordinasi persiapan peresmian.',
    bahan: ['Laporan Progres Konstruksi', 'Dokumentasi Foto'],
    tenggat: '1 Juli 2025', hasilSebelumnya: 'Balai Adat 95% selesai — target 10 Okt 2025',
    peserta: 20, terdaftar: 18, status: 'Selesai'
  },
];

export default function AgendaMusyawarahPage() {
  const [selectedAgenda, setSelectedAgenda] = useState<typeof AGENDA_DATA[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'bahan' | 'masukan'>('bahan');
  const [masukan, setMasukan] = useState('');
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});
  const [daftarHadir, setDaftarHadir] = useState<Record<string, boolean>>({});

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Agenda dan Musyawarah Desa" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Agenda" value={AGENDA_DATA.length} satuan="Kegiatan Terdaftar" barColor="purple" progress={100} />
        <StatCard label="Akan Datang" value={AGENDA_DATA.filter(a => a.status === 'Akan Datang').length} satuan="Agenda Mendatang" barColor="blue" progress={40} />
        <StatCard label="Sudah Selesai" value={AGENDA_DATA.filter(a => a.status === 'Selesai').length} satuan="Telah Dilaksanakan" barColor="green" progress={60} />
        <StatCard label="Daftar Hadir" value={Object.keys(daftarHadir).length} satuan="Anda Terdaftar" barColor="orange" progress={Object.keys(daftarHadir).length * 20} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

        {/* DAFTAR AGENDA */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Daftar Agenda Kegiatan Desa</h2>
          {AGENDA_DATA.map(ag => (
            <div key={ag.id} className={`bg-white p-4 rounded-xl border shadow-sm hover:shadow-md transition-all ${selectedAgenda?.id === ag.id ? 'border-purple-400 bg-purple-50/30' : 'border-slate-200'}`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded">{ag.jenis}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${ag.status === 'Akan Datang' ? 'bg-sky-100 text-sky-700' : 'bg-green-100 text-green-700'}`}>{ag.status}</span>
                    {ag.tenggat && <span className="text-[10px] text-amber-600 font-medium">⏰ Tenggat masukan: {ag.tenggat}</span>}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">{ag.judul}</h3>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 flex-wrap">
                    <Calendar size={11} /> {ag.tanggal}
                    <span className="text-slate-300">|</span>
                    <MapPin size={11} /> {ag.lokasi}
                    <span className="text-slate-300">|</span>
                    <Users size={11} /> {ag.terdaftar}/{ag.peserta} Peserta
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">{ag.deskripsi}</p>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                <button
                  onClick={() => { setDaftarHadir(prev => ({ ...prev, [ag.id]: true })); }}
                  className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-colors border ${daftarHadir[ag.id] ? 'bg-green-50 border-green-200 text-green-700' : 'bg-white text-slate-600 hover:bg-slate-50'}`}
                >
                  <CheckCircle2 size={11} /> {daftarHadir[ag.id] ? 'Terdaftar ✓' : 'Daftar Hadir'}
                </button>
                <button
                  onClick={() => { setSelectedAgenda(ag); setActiveTab('bahan'); }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <BookOpen size={11} /> Lihat Bahan
                </button>
                <button
                  onClick={() => { setSelectedAgenda(ag); setActiveTab('masukan'); setMasukan(''); }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold bg-purple-700 text-white hover:bg-purple-800 transition-colors"
                >
                  <Send size={11} /> Kirim Masukan
                </button>
                <button
                  onClick={() => { setSelectedAgenda(ag); setActiveTab('bahan'); }}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border bg-white text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <Eye size={11} /> Lihat Hasil
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* DETAIL PANEL */}
        <div className="lg:col-span-1">
          {selectedAgenda ? (
            <Card className="border-purple-200 h-fit">
              <CardHeader className="pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded w-fit">{selectedAgenda.jenis}</span>
                <CardTitle className="text-sm font-bold text-slate-800 mt-2 leading-snug">{selectedAgenda.judul}</CardTitle>
                <div className="flex border-b mt-3">
                  <button onClick={() => setActiveTab('bahan')} className={`pb-2 text-xs font-bold transition-colors mr-4 ${activeTab === 'bahan' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-slate-400'}`}>Lihat Bahan</button>
                  <button onClick={() => setActiveTab('masukan')} className={`pb-2 text-xs font-bold transition-colors ${activeTab === 'masukan' ? 'text-purple-700 border-b-2 border-purple-700' : 'text-slate-400'}`}>Kirim Masukan</button>
                </div>
              </CardHeader>
              <CardContent className="pt-4 text-xs">
                {activeTab === 'bahan' ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-bold text-slate-700 mb-2">Bahan / Materi:</p>
                      <ul className="space-y-1.5">
                        {selectedAgenda.bahan.map((b, i) => (
                          <li key={i} className="flex items-center gap-2 p-2 bg-slate-50 rounded-lg border text-slate-700">
                            <FileText size={12} className="text-purple-700 flex-shrink-0" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-lg">
                      <p className="font-bold text-blue-700 mb-1">Hasil Sebelumnya:</p>
                      <p className="text-slate-600 leading-relaxed">{selectedAgenda.hasilSebelumnya}</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-slate-500 leading-relaxed">Kirim masukan Anda mengenai agenda ini sebelum tenggat <strong>{selectedAgenda.tenggat}</strong>.</p>
                    {submitted[selectedAgenda.id] ? (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-center">
                        <CheckCircle2 size={20} className="mx-auto text-green-600 mb-1" />
                        <p className="font-bold text-green-700">Masukan Terkirim!</p>
                      </div>
                    ) : (
                      <>
                        <textarea rows={4} value={masukan} onChange={e => setMasukan(e.target.value)} placeholder="Tuliskan masukan, saran, atau pokok pikiran Anda untuk agenda ini..." className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 text-slate-700" />
                        <button
                          onClick={() => { if (!masukan) return; setSubmitted(prev => ({ ...prev, [selectedAgenda.id]: true })); }}
                          className="w-full py-2.5 bg-purple-700 text-white rounded-lg font-bold hover:bg-purple-800 flex items-center justify-center gap-1.5"
                        >
                          <Send size={12} /> Kirim Masukan
                        </button>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="h-[280px] border border-dashed rounded-2xl flex flex-col items-center justify-center text-slate-400 bg-white shadow-sm">
              <Calendar size={28} className="mb-2 text-slate-300" />
              <p className="font-bold text-sm text-slate-600 text-center px-4">Pilih Agenda</p>
              <p className="text-xs text-slate-400 text-center mt-1 px-4">Klik tombol pada agenda di sebelah kiri untuk melihat bahan atau mengirim masukan.</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Kalender agenda terintegrasi dengan SID dan jadwal BPD</span>
        <span>Periode: Juli 2025</span>
      </div>
    </div>
  );
}
