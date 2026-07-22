'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  FileText, ArrowDownToLine, RefreshCw, CheckCircle2,
  Calendar, Lock, Settings, Clock, BarChart2, ShieldCheck
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const LAPORAN_TYPES = [
  { id: 'rep-01', nama: 'Laporan Penilaian Kesiapan (Readiness)', file: 'Laporan_Kesiapan_LungAnai_2026.pdf', size: '2.4 MB', tgl: '18 Juli 2026' },
  { id: 'rep-02', nama: 'Laporan Penilaian Kematangan (Maturity)', file: 'Laporan_Kematangan_LungAnai_2026.pdf', size: '1.8 MB', tgl: '15 Juli 2026' },
  { id: 'rep-03', nama: 'Laporan Skor Kualitas Hidup (QoL)', file: 'Laporan_Skor_QoL_LungAnai_2026.pdf', size: '3.1 MB', tgl: '10 Juli 2026' },
  { id: 'rep-04', nama: 'Laporan SDGs Desa (SDG 3, 4, 18)', file: 'Laporan_SDGs_Tiga_Empat_Delapanbelas.pdf', size: '4.5 MB', tgl: '08 Juli 2026' },
  { id: 'rep-05', nama: 'Laporan Kualitas & Keterbaruan Data', file: 'Laporan_Kualitas_Data_Desa.pdf', size: '1.2 MB', tgl: '12 Juli 2026' },
  { id: 'rep-06', nama: 'Laporan Rekomendasi & Keputusan DSS', file: 'Laporan_DSS_AHP_Musyawarah.pdf', size: '2.9 MB', tgl: '17 Juli 2026' },
];

export default function LaporanDesaPage() {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (id: string, name: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`✅ Berhasil mengunduh dokumen "${name}" ke komputer Anda.`);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Laporan Desa" modul="Pemerintah Desa" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Laporan Tersedia" value={LAPORAN_TYPES.length} satuan="Jenis Dokumen PDF" barColor="purple" progress={100} />
        <StatCard label="Laporan Terakhir" value="18 Juli 2026" satuan="Tanggal Ekspor" barColor="blue" progress={100} />
        <StatCard label="Status Dokumen" value="Siap Unduh" satuan="Tanda Tangan Elektronik" barColor="green" progress={100} />
        <StatCard label="Akurasi Data" value="100%" satuan="Sinkron dengan SID" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* LIST DOKUMEN LAPORAN */}
        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-xs font-bold text-slate-605 uppercase tracking-wider mb-2">Daftar Dokumen Laporan Resmi Desa</h2>
          
          {LAPORAN_TYPES.map(l => (
            <Card key={l.id} className="border border-slate-200 hover:shadow-md transition-shadow">
              <CardContent className="p-4 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 flex-shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 leading-snug">{l.nama}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{l.file} • {l.size}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-0.5"><Clock size={9} /> Terakhir diperbarui: {l.tgl}</p>
                  </div>
                </div>

                <button
                  onClick={() => handleDownload(l.id, l.file)}
                  className={`px-3 py-2 text-xs font-bold rounded-lg shadow-sm border transition-colors flex items-center gap-1.5 ${downloading === l.id ? 'bg-slate-100 text-slate-400 cursor-default' : 'bg-indigo-700 hover:bg-indigo-800 text-white'}`}
                >
                  <ArrowDownToLine size={13} /> {downloading === l.id ? 'Mengunduh...' : 'Unduh PDF'}
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* METADATA GENERATION */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Settings size={16} /> Konfigurasi Ekspor Laporan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <p className="text-slate-500 leading-relaxed">
              Seluruh laporan resmi desa diintegrasikan secara langsung dengan Tanda Tangan Elektronik (TTE) Kepala Desa Lung Anai yang sah.
            </p>
            
            <div className="p-3 bg-slate-50 border rounded-xl space-y-2">
              <p className="font-bold text-slate-650 flex items-center gap-1"><ShieldCheck size={12} className="text-indigo-700" /> TTE Kepala Desa: <strong>Terverifikasi</strong></p>
              <p className="text-[10px] text-slate-500">Sertifikat BSrE Balai Sertifikasi Elektronik Kemendagri aktif hingga 2028.</p>
            </div>

            <button
              onClick={() => alert('🔄 Menghubungkan ke server Dinas PMD untuk pembaruan format template laporan terbaru...')}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 border border-slate-350 text-slate-700 font-bold rounded-lg text-xs flex items-center justify-center gap-1"
            >
              <RefreshCw size={12} /> Sinkronisasi Template Kabupaten
            </button>
          </CardContent>
        </Card>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Seluruh data laporan disahkan secara hukum oleh Balai Sertifikasi Elektronik</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
