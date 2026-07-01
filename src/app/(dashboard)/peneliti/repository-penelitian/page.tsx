'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { FolderOpen, FileText, Download, Upload, Search, Filter, Eye, Trash2, Database, Shield, ClipboardList } from 'lucide-react';

const COLOR = '#1a365d';

const kategoriRepo = [
  {
    nama: 'Instrumen Penelitian',
    deskripsi: 'Questionnaire, Panduan Wawancara, Pedoman FGD',
    jumlah: 12,
    ukuran: '45.2 MB',
    icon: ClipboardList,
    color: '#2b6cb0',
    files: [
      { nama: 'Kuesioner Readiness Assessment.pdf', ukuran: '2.1 MB', tanggal: '2025-03-15', tipe: 'PDF' },
      { nama: 'Panduan Wawancara Mendalam.docx', ukuran: '1.5 MB', tanggal: '2025-03-10', tipe: 'DOCX' },
      { nama: 'Pedoman Focus Group Discussion.pdf', ukuran: '1.8 MB', tanggal: '2025-03-10', tipe: 'PDF' },
      { nama: 'Kuesioner Maturity Assessment.pdf', ukuran: '1.9 MB', tanggal: '2025-04-01', tipe: 'PDF' },
    ],
  },
  {
    nama: 'Dataset Penelitian',
    deskripsi: 'Data Assessment, QoL, Maturity, DSS',
    jumlah: 8,
    ukuran: '128.5 MB',
    icon: Database,
    color: '#276749',
    files: [
      { nama: 'Dataset_Readiness_146resp.xlsx', ukuran: '12.4 MB', tanggal: '2025-06-30', tipe: 'XLSX' },
      { nama: 'Dataset_Maturity_Assessment.xlsx', ukuran: '10.8 MB', tanggal: '2025-06-30', tipe: 'XLSX' },
      { nama: 'Dataset_QoL_Indicators.xlsx', ukuran: '11.2 MB', tanggal: '2025-06-30', tipe: 'XLSX' },
      { nama: 'Dataset_DSS_AHP_Bobot.xlsx', ukuran: '8.6 MB', tanggal: '2025-07-15', tipe: 'XLSX' },
    ],
  },
  {
    nama: 'Dokumen Validasi',
    deskripsi: 'Hasil Validasi Ahli, UAT, SUS',
    jumlah: 6,
    ukuran: '22.8 MB',
    icon: Shield,
    color: '#553c9a',
    files: [
      { nama: 'Lembar_Validasi_Expert_V1.pdf', ukuran: '3.2 MB', tanggal: '2025-08-10', tipe: 'PDF' },
      { nama: 'Lembar_Validasi_Expert_V2.pdf', ukuran: '3.1 MB', tanggal: '2025-08-12', tipe: 'PDF' },
      { nama: 'Lembar_Validasi_Expert_V3.pdf', ukuran: '3.4 MB', tanggal: '2025-08-15', tipe: 'PDF' },
      { nama: 'Hasil_UAT_SUS_Evaluation.pdf', ukuran: '5.2 MB', tanggal: '2025-10-20', tipe: 'PDF' },
    ],
  },
  {
    nama: 'Dokumentasi Lapangan',
    deskripsi: 'Foto, Video, Catatan Observasi',
    jumlah: 15,
    ukuran: '2.1 GB',
    icon: FolderOpen,
    color: '#c05621',
    files: [
      { nama: 'Foto_Survey_Lapangan_April2025.zip', ukuran: '458 MB', tanggal: '2025-04-30', tipe: 'ZIP' },
      { nama: 'Video_FGD_Desa_Lung_Anai.mp4', ukuran: '1.2 GB', tanggal: '2025-05-15', tipe: 'MP4' },
      { nama: 'Catatan_Observasi_Lapangan.pdf', ukuran: '4.8 MB', tanggal: '2025-06-01', tipe: 'PDF' },
      { nama: 'Transkrip_Wawancara_Lengkap.docx', ukuran: '18.5 MB', tanggal: '2025-05-30', tipe: 'DOCX' },
    ],
  },
];

const tipeBadge: Record<string, string> = {
  PDF: 'bg-red-100 text-red-700',
  DOCX: 'bg-blue-100 text-blue-700',
  XLSX: 'bg-green-100 text-green-700',
  ZIP: 'bg-orange-100 text-orange-700',
  MP4: 'bg-purple-100 text-purple-700',
};

export default function RepositoryPenelitianPage() {
  const totalDokumen = kategoriRepo.reduce((s, k) => s + k.jumlah, 0);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Arsip — Repository Penelitian" modul="Repository & Publikasi" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Dokumen', value: `${totalDokumen}`, sub: 'File Penelitian', color: COLOR, icon: FolderOpen },
          { label: 'Kategori', value: '4', sub: 'Jenis Arsip', color: '#276749', icon: Database },
          { label: 'Ukuran Total', value: '~2.3 GB', sub: 'Semua File', color: '#2b6cb0', icon: FileText },
          { label: 'Status Arsip', value: 'Lengkap', sub: '100% Terdokumentasi', color: '#553c9a', icon: Shield },
        ].map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: kpi.color + '18' }}>
                <Icon size={18} style={{ color: kpi.color }} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-semibold uppercase">{kpi.label}</p>
                <p className="text-base font-black text-gray-900 leading-tight">{kpi.value}</p>
                <p className="text-[10px] text-gray-500">{kpi.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
          <Search size={14} className="text-gray-400" />
          <input className="flex-1 text-sm text-slate-700 outline-none placeholder-gray-400" placeholder="Cari dokumen penelitian..." />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 shadow-sm hover:bg-gray-50 transition-colors">
          <Filter size={14} />
          Filter
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white shadow-sm transition-colors" style={{ backgroundColor: COLOR }}>
          <Upload size={14} />
          Upload
        </button>
      </div>

      {/* Repository per Kategori */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {kategoriRepo.map((kat, i) => {
          const Icon = kat.icon;
          return (
            <Card key={i} className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-sm font-bold flex items-center justify-between" style={{ color: kat.color }}>
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    {kat.nama}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: kat.color }}>
                      {kat.jumlah} file
                    </span>
                    <span className="text-[10px] text-gray-400">{kat.ukuran}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-[11px] text-gray-400 mb-3">{kat.deskripsi}</p>
                <div className="space-y-2">
                  {kat.files.map((file, j) => (
                    <div key={j} className="flex items-center justify-between p-2.5 rounded-lg border border-gray-100 bg-gray-50/50 hover:bg-gray-50 transition-colors group">
                      <div className="flex items-center gap-2 min-w-0">
                        <FileText size={14} style={{ color: kat.color }} className="flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold text-slate-700 truncate">{file.nama}</p>
                          <p className="text-[10px] text-gray-400">{file.tanggal} · {file.ukuran}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${tipeBadge[file.tipe] || 'bg-gray-100 text-gray-600'}`}>
                          {file.tipe}
                        </span>
                        <div className="hidden group-hover:flex gap-1">
                          <button className="p-1 rounded hover:bg-gray-200 transition-colors" title="Lihat">
                            <Eye size={12} className="text-gray-500" />
                          </button>
                          <button className="p-1 rounded hover:bg-gray-200 transition-colors" title="Download">
                            <Download size={12} className="text-gray-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {kat.jumlah > kat.files.length && (
                    <button className="w-full text-center text-[11px] font-bold py-2 rounded-lg border border-dashed hover:bg-gray-50 transition-colors" style={{ color: kat.color, borderColor: kat.color + '60' }}>
                      + {kat.jumlah - kat.files.length} file lainnya
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
