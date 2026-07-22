'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Bell, CheckCircle2, AlertCircle, Calendar, ArrowRight, RefreshCw, Info, Clock } from 'lucide-react';
import { useState } from 'react';

const COLOR = '#6a1b9a';

type JenisNotif = 'aspirasi_baru' | 'perubahan_status' | 'agenda' | 'permintaan_masukan' | 'hasil_keputusan' | 'program_terlambat' | 'laporan_ditanggapi' | 'info_publik_baru';

const JENIS_META: Record<JenisNotif, { label: string; icon: React.ReactNode; color: string }> = {
  aspirasi_baru:       { label: 'Aspirasi Baru', icon: <Bell size={12} />, color: 'bg-sky-100 text-sky-700 border-sky-200' },
  perubahan_status:    { label: 'Perubahan Status Aspirasi', icon: <ArrowRight size={12} />, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  agenda:              { label: 'Agenda Musyawarah', icon: <Calendar size={12} />, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  permintaan_masukan:  { label: 'Permintaan Masukan', icon: <AlertCircle size={12} />, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  hasil_keputusan:     { label: 'Hasil Keputusan', icon: <CheckCircle2 size={12} />, color: 'bg-teal-100 text-teal-700 border-teal-200' },
  program_terlambat:   { label: 'Program Terlambat', icon: <Clock size={12} />, color: 'bg-red-100 text-red-700 border-red-200' },
  laporan_ditanggapi:  { label: 'Laporan Masalah Ditanggapi', icon: <CheckCircle2 size={12} />, color: 'bg-green-100 text-green-700 border-green-200' },
  info_publik_baru:    { label: 'Informasi Publik Baru', icon: <Info size={12} />, color: 'bg-slate-100 text-slate-600 border-slate-200' },
};

const NOTIF_DATA = [
  { id: 'N-001', jenis: 'agenda' as JenisNotif, judul: 'Musyawarah Desa RKPDes 2026 — 25 Juli 2025', isi: 'Anda diundang untuk hadir dalam Musyawarah Desa penyusunan RKPDes 2026. Harap daftarkan kehadiran sebelum 22 Juli 2025.', tgl: '18 Jul 2025, 09:00', dibaca: false, aksi: 'Lihat Agenda' },
  { id: 'N-002', jenis: 'perubahan_status' as JenisNotif, judul: 'Aspirasi "Pembangunan Jembatan Dusun C" berubah status → Dibahas', isi: 'Usulan Anda mengenai jembatan gantung Dusun C telah memasuki tahap Dibahas dalam forum musyawarah desa.', tgl: '17 Jul 2025, 14:30', dibaca: false, aksi: 'Lihat Aspirasi' },
  { id: 'N-003', jenis: 'permintaan_masukan' as JenisNotif, judul: 'Diminta Masukan: Pengembangan SPAM Desa', isi: 'Tim perencanaan SPAM Desa meminta masukan Tokoh Masyarakat terkait rencana perluasan jaringan air bersih ke Dusun D.', tgl: '15 Jul 2025, 10:15', dibaca: false, aksi: 'Beri Masukan' },
  { id: 'N-004', jenis: 'aspirasi_baru' as JenisNotif, judul: '3 Aspirasi Baru Masuk dari Warga RT 02 & RT 05', isi: 'Ada 3 aspirasi baru yang masuk dari warga RT 02 dan RT 05 mengenai lampu jalan, air bersih, dan pelatihan kerja. Silakan tinjau.', tgl: '14 Jul 2025, 07:45', dibaca: true, aksi: 'Lihat Aspirasi' },
  { id: 'N-005', jenis: 'program_terlambat' as JenisNotif, judul: 'Program Pengelolaan Sampah Terpadu Tertunda', isi: 'Program pengadaan gerobak sampah motor Dusun C mengalami keterlambatan 2 bulan karena pencairan ADD Tahap II belum terealisasi.', tgl: '13 Jul 2025, 16:00', dibaca: true, aksi: 'Pantau Program' },
  { id: 'N-006', jenis: 'laporan_ditanggapi' as JenisNotif, judul: 'Laporan Masalah "Lampu Jalan Mati" sudah ditangani', isi: 'Laporan 5 titik lampu jalan mati telah selesai diperbaiki oleh Tim Teknis Pemdes pada 1 Juli 2025.', tgl: '1 Jul 2025, 17:00', dibaca: true, aksi: 'Lihat Detail' },
  { id: 'N-007', jenis: 'hasil_keputusan' as JenisNotif, judul: 'Keputusan Musdes: Prioritas Infrastruktur 2026 Disetujui', isi: 'Forum musyawarah desa telah menetapkan prioritas infrastruktur sebagai program utama APBDes 2026, termasuk jembatan Dusun C.', tgl: '28 Jun 2025, 12:00', dibaca: true, aksi: 'Lihat Keputusan' },
  { id: 'N-008', jenis: 'info_publik_baru' as JenisNotif, judul: 'Laporan Realisasi APBDes Semester I 2025 Dipublikasikan', isi: 'Laporan realisasi keuangan APBDes Semester I 2025 telah dipublikasikan di papan informasi desa dan portal SID.', tgl: '20 Jun 2025, 08:30', dibaca: true, aksi: 'Baca Laporan' },
];

export default function NotifikasiTindakLanjutPage() {
  const [notifs, setNotifs] = useState(NOTIF_DATA);
  const [filterJenis, setFilterJenis] = useState<'Semua' | JenisNotif>('Semua');

  const belumDibaca = notifs.filter(n => !n.dibaca).length;

  const handleBaca = (id: string) => {
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, dibaca: true } : n));
  };

  const handleBacaSemua = () => {
    setNotifs(prev => prev.map(n => ({ ...n, dibaca: true })));
  };

  const filtered = filterJenis === 'Semua' ? notifs : notifs.filter(n => n.jenis === filterJenis);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Notifikasi dan Tindak Lanjut" modul="Tokoh Masyarakat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Notifikasi" value={notifs.length} satuan="Semua Jenis" barColor="purple" progress={100} />
        <StatCard label="Belum Dibaca" value={belumDibaca} satuan="Memerlukan Perhatian" barColor="orange" progress={belumDibaca * 12} />
        <StatCard label="Sudah Dibaca" value={notifs.length - belumDibaca} satuan="Ditinjau" barColor="green" progress={((notifs.length - belumDibaca) / notifs.length) * 100} />
        <StatCard label="Permintaan Masukan" value={notifs.filter(n => n.jenis === 'permintaan_masukan' && !n.dibaca).length} satuan="Perlu Respons" barColor="blue" progress={50} />
      </div>

      {/* JENIS FILTER */}
      <div className="flex flex-wrap gap-1.5">
        <button onClick={() => setFilterJenis('Semua')} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${filterJenis === 'Semua' ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
          Semua ({notifs.length})
        </button>
        {(Object.keys(JENIS_META) as JenisNotif[]).map(j => (
          <button key={j} onClick={() => setFilterJenis(j)} className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-colors ${filterJenis === j ? 'bg-purple-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
            {JENIS_META[j].label} ({notifs.filter(n => n.jenis === j).length})
          </button>
        ))}
        {belumDibaca > 0 && (
          <button onClick={handleBacaSemua} className="ml-auto px-3 py-1 border rounded-lg text-[10px] font-bold text-slate-600 hover:bg-slate-50">
            Tandai Semua Dibaca
          </button>
        )}
      </div>

      {/* LIST NOTIFIKASI */}
      <div className="space-y-3">
        {filtered.map(n => {
          const meta = JENIS_META[n.jenis];
          return (
            <div key={n.id} className={`bg-white p-4 rounded-xl border shadow-sm transition-all ${!n.dibaca ? 'border-purple-300 bg-purple-50/20' : 'border-slate-200'}`}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border text-sm ${meta.color}`}>
                  {meta.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded border ${meta.color}`}>{meta.label}</span>
                      {!n.dibaca && <span className="w-2 h-2 rounded-full bg-purple-600" title="Belum dibaca" />}
                    </div>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">{n.tgl}</span>
                  </div>
                  <p className="font-bold text-slate-800 text-xs mt-1.5 leading-snug">{n.judul}</p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">{n.isi}</p>
                  <div className="flex gap-2 mt-2.5">
                    <button onClick={() => handleBaca(n.id)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                      <ArrowRight size={10} /> {n.aksi}
                    </button>
                    {!n.dibaca && (
                      <button onClick={() => handleBaca(n.id)} className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-purple-700 text-white text-[10px] font-bold hover:bg-purple-800 transition-colors">
                        <CheckCircle2 size={10} /> Tandai Dibaca
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="py-10 text-center text-slate-400 border border-dashed rounded-2xl bg-white">
            <Bell size={32} className="mx-auto mb-2 text-slate-300" />
            <p className="font-bold text-slate-500">Tidak ada notifikasi pada jenis ini</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Notifikasi real-time dari SID Desa & Sistem Partisipasi</span>
        <span>Terakhir diperbarui: 18 Juli 2025</span>
      </div>
    </div>
  );
}
