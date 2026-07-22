'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  Bell, CheckCircle2, AlertTriangle, Calendar, Clock,
  ArrowRight, Info, RefreshCw, Landmark, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

type NotifType = 'rekomendasi_baru' | 'agenda_musyawarah' | 'keputusan_baru' | 'program_terlambat' | 'data_belum_diperbarui' | 'bukti_belum_diverifikasi' | 'aspirasi_baru' | 'capaian_menurun' | 'laporan_belum_disampaikan';

const TYPE_CONFIG: Record<NotifType, { label: string; icon: React.ReactNode; color: string }> = {
  rekomendasi_baru:        { label: 'Rekomendasi Baru', icon: <Bell size={13} />, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  agenda_musyawarah:       { label: 'Agenda Musyawarah', icon: <Calendar size={13} />, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  keputusan_baru:          { label: 'Keputusan Baru', icon: <CheckCircle2 size={13} />, color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  program_terlambat:       { label: 'Program Terlambat', icon: <Clock size={13} />, color: 'bg-red-100 text-red-700 border-red-200' },
  data_belum_diperbarui:   { label: 'Data Belum Diperbarui', icon: <AlertTriangle size={13} />, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  bukti_belum_diverifikasi: { label: 'Bukti Belum Diverifikasi', icon: <ShieldCheck size={13} />, color: 'bg-yellow-100 text-yellow-750 border-yellow-250' },
  aspirasi_baru:           { label: 'Aspirasi Baru', icon: <Info size={13} />, color: 'bg-sky-100 text-sky-755 border-sky-200' },
  capaian_menurun:         { label: 'Capaian Menurun', icon: <AlertTriangle size={13} />, color: 'bg-rose-100 text-rose-700 border-rose-200' },
  laporan_belum_disampaikan: { label: 'Laporan Belum Disampaikan', icon: <FileTextIcon size={13} />, color: 'bg-slate-100 text-slate-650 border-slate-200' },
};

function FileTextIcon({ size }: { size: number }) {
  return <Clock size={size} />;
}

const MOCK_NOTIF = [
  { id: 'NTF-01', type: 'rekomendasi_baru' as NotifType, judul: 'Rekomendasi DSS Baru Terkait Penurunan Stunting', isi: 'Analisis AHP SAW menyarankan program "Pemberian PMT Balita RT 03" dengan skor bobot 0.234.', tgl: '18 Juli 2026, 10:15', dibaca: false },
  { id: 'NTF-02', type: 'agenda_musyawarah' as NotifType, judul: 'Agenda Rapat Musdes RKPDes 2027', isi: 'Rapat dijadwalkan pada 25 Juli 2026 pukul 09:00 WITA bertempat di Balai Desa Lung Anai.', tgl: '17 Juli 2026, 09:00', dibaca: false },
  { id: 'NTF-03', type: 'keputusan_baru' as NotifType, judul: 'Keputusan Rapat BUMDes Adat Disahkan', isi: 'Status keputusan untuk "Digitalisasi Layanan BUMDes Adat" disahkan dengan status DITERIMA.', tgl: '16 Juli 2026, 14:00', dibaca: true },
  { id: 'NTF-04', type: 'program_terlambat' as NotifType, judul: 'Program Pembangunan Tower Internet Dusun C Terlambat', isi: 'Pengerjaan fisik terhambat 2 minggu karena kendala pengiriman komponen besi tower.', tgl: '15 Juli 2026, 11:30', dibaca: false },
  { id: 'NTF-05', type: 'data_belum_diperbarui' as NotifType, judul: 'Pembaruan Data Kesehatan Ibu & Balita Terlambat', isi: 'Pembaruan bulanan data posyandu Dusun B belum diinput oleh Bidan Desa (melewati tenggat 10 Juli).', tgl: '12 Juli 2026, 16:30', dibaca: true },
  { id: 'NTF-06', type: 'bukti_belum_diverifikasi' as NotifType, judul: 'Bukti Program Literasi Digital Belum Diverifikasi', isi: 'Draf Dokumen "SK_Pembentukan_TBM_Digital.pdf" menunggu validasi Sekdes.', tgl: '11 Juli 2026, 10:00', dibaca: false },
  { id: 'NTF-07', type: 'aspirasi_baru' as NotifType, judul: '3 Aspirasi Baru dari Warga Dusun B', isi: 'Aspirasi masuk terkait perbaikan jalan poros RT 03 Dusun B dan penerangan lampu jalan.', tgl: '10 Juli 2026, 08:30', dibaca: true },
  { id: 'NTF-08', type: 'capaian_menurun' as NotifType, judul: 'Penurunan Skor Kesiapan Dimensi Ekonomi', isi: 'Hasil assessment menunjukkan penurunan skor dimensi ekonomi sebesar 2.1% dibanding periode lalu.', tgl: '08 Juli 2026, 13:00', dibaca: true },
  { id: 'NTF-09', type: 'laporan_belum_disampaikan' as NotifType, judul: 'Laporan SDGs Semester I 2026 Belum Disampaikan', isi: 'Dokumen kompilasi laporan SDG Desa 3, 4, dan 18 belum diunggah ke portal PMD.', tgl: '05 Juli 2026, 09:00', dibaca: true },
];

export default function NotifikasiPeringatanPage() {
  const [list, setList] = useState(MOCK_NOTIF);
  const [filterType, setFilterType] = useState<'Semua' | NotifType>('Semua');

  const handleRead = (id: string) => {
    setList(prev => prev.map(n => n.id === id ? { ...n, dibaca: true } : n));
  };

  const handleReadAll = () => {
    setList(prev => prev.map(n => ({ ...n, dibaca: true })));
    alert('✅ Semua notifikasi telah ditandai dibaca.');
  };

  const filtered = filterType === 'Semua' ? list : list.filter(n => n.type === filterType);
  const unreadCount = list.filter(n => !n.dibaca).length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Notifikasi dan Peringatan" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Notifikasi" value={list.length} satuan="Notifikasi" barColor="purple" progress={100} />
        <StatCard label="Belum Dibaca" value={unreadCount} satuan="Memerlukan Respons" barColor="orange" progress={unreadCount * 11} />
        <StatCard label="Peringatan Kritis" value={list.filter(n => ['program_terlambat', 'capaian_menurun', 'laporan_belum_disampaikan'].includes(n.type) && !n.dibaca).length} satuan="Perlu Tindakan Segera" barColor="red" progress={30} />
        <StatCard label="Data & Bukti Pending" value={list.filter(n => ['data_belum_diperbarui', 'bukti_belum_diverifikasi'].includes(n.type) && !n.dibaca).length} satuan="Menunggu Validasi" barColor="blue" progress={40} />
      </div>

      {/* FILTER BUTTONS */}
      <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border rounded-xl">
        <button onClick={() => setFilterType('Semua')} className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-colors ${filterType === 'Semua' ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-600 hover:bg-slate-100'}`}>
          Semua ({list.length})
        </button>
        {(Object.keys(TYPE_CONFIG) as NotifType[]).map(t => (
          <button
            key={t}
            onClick={() => setFilterType(t)}
            className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold transition-colors ${filterType === t ? 'bg-indigo-700 text-white' : 'bg-white border text-slate-650 hover:bg-slate-100'}`}
          >
            {TYPE_CONFIG[t].label} ({list.filter(n => n.type === t).length})
          </button>
        ))}
        {unreadCount > 0 && (
          <button onClick={handleReadAll} className="ml-auto px-3 py-1.5 bg-white border border-slate-350 text-slate-700 font-bold hover:bg-slate-50 rounded-lg text-[9px]">
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* LIST NOTIFIKASI */}
      <div className="space-y-3">
        {filtered.map(n => {
          const cfg = TYPE_CONFIG[n.type];
          return (
            <div key={n.id} className={`p-4 border rounded-xl shadow-sm transition-all bg-white ${!n.dibaca ? 'border-indigo-300 bg-indigo-50/10' : 'border-slate-200'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg border flex items-center justify-center flex-shrink-0 text-sm ${cfg.color}`}>
                  {cfg.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${cfg.color}`}>{cfg.label}</span>
                      {!n.dibaca && <span className="w-2 h-2 rounded-full bg-indigo-700" title="Belum dibaca" />}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{n.tgl}</span>
                  </div>
                  <h3 className="font-bold text-slate-800 text-xs mt-1.5 leading-snug">{n.judul}</h3>
                  <p className="text-[11px] text-slate-550 mt-1 leading-relaxed">{n.isi}</p>
                  
                  {!n.dibaca && (
                    <div className="flex gap-2 mt-2.5">
                      <button onClick={() => handleRead(n.id)} className="px-2.5 py-1 bg-indigo-700 text-white rounded text-[10px] font-bold hover:bg-indigo-800 transition-colors">
                        Tandai Dibaca
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <p className="text-center text-sm text-slate-400 py-10">Tidak ada notifikasi pada kategori ini.</p>}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Peringatan dan notifikasi real-time terintegrasi dengan pusat data kabupaten</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
