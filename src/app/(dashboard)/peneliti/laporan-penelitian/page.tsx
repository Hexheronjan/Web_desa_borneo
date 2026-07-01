'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { FileText, Download, Printer, FileSpreadsheet, CheckCircle2, Clock, RefreshCw } from 'lucide-react';

const COLOR = '#1a365d';

const laporanList = [
  {
    nama: 'Laporan Readiness Assessment Desa Lung Anai 2025',
    dataset: 'Dataset Readiness 146 Responden',
    format: 'PDF',
    tanggal: '2025-12-31',
    ukuran: '4.2 MB',
    halaman: 68,
    status: 'Siap Unduh',
    color: '#2b6cb0',
  },
  {
    nama: 'Laporan Analisis Maturity Smart Living Village 2025',
    dataset: 'Dataset Maturity Assessment',
    format: 'PDF',
    tanggal: '2025-12-31',
    ukuran: '3.8 MB',
    halaman: 52,
    status: 'Siap Unduh',
    color: '#276749',
  },
  {
    nama: 'Laporan Quality of Life Masyarakat Desa 2025',
    dataset: 'Dataset QoL Indicators',
    format: 'PDF',
    tanggal: '2025-12-31',
    ukuran: '3.5 MB',
    halaman: 45,
    status: 'Siap Unduh',
    color: '#c05621',
  },
  {
    nama: 'Laporan DSS Recommendation & Ranking Program',
    dataset: 'Dataset DSS AHP & Bobot',
    format: 'PDF',
    tanggal: '2025-12-28',
    ukuran: '2.9 MB',
    halaman: 38,
    status: 'Siap Unduh',
    color: '#553c9a',
  },
  {
    nama: 'Laporan Validasi Artefak & Expert Review',
    dataset: 'Dataset Validasi & Expert Review',
    format: 'PDF',
    tanggal: '2025-11-15',
    ukuran: '2.4 MB',
    halaman: 34,
    status: 'Siap Unduh',
    color: '#c53030',
  },
  {
    nama: 'Dataset Lengkap Penelitian Smart Living Village',
    dataset: 'All Datasets (Readiness, Maturity, QoL, DSS)',
    format: 'Excel',
    tanggal: '2025-12-31',
    ukuran: '42.8 MB',
    halaman: 0,
    status: 'Siap Unduh',
    color: '#276749',
  },
  {
    nama: 'Laporan Akhir Penelitian (Full Report)',
    dataset: 'Semua Dataset & Analisis',
    format: 'PDF',
    tanggal: '2025-12-31',
    ukuran: '12.5 MB',
    halaman: 142,
    status: 'Siap Unduh',
    color: COLOR,
  },
];

const templateGenerate = [
  { nama: 'Template Laporan Readiness', format: 'PDF', icon: FileText },
  { nama: 'Template Laporan Maturity', format: 'PDF', icon: FileText },
  { nama: 'Template Laporan QoL', format: 'PDF', icon: FileText },
  { nama: 'Template Laporan DSS', format: 'PDF', icon: FileText },
  { nama: 'Template Dataset Excel', format: 'Excel', icon: FileSpreadsheet },
  { nama: 'Laporan Akhir Komprehensif', format: 'PDF', icon: FileText },
];

function FormatIcon({ format }: { format: string }) {
  if (format === 'Excel') return <FileSpreadsheet size={18} className="text-green-600" />;
  return <FileText size={18} className="text-red-600" />;
}

export default function LaporanPenelitianPage() {
  const totalLaporan = laporanList.length;
  const formatPDF = laporanList.filter(l => l.format === 'PDF').length;
  const formatExcel = laporanList.filter(l => l.format === 'Excel').length;
  const totalHalaman = laporanList.reduce((s, l) => s + l.halaman, 0);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Generate Laporan" modul="Repository & Publikasi" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Laporan', value: `${totalLaporan}`, sub: 'Siap Diunduh', color: COLOR, icon: FileText },
          { label: 'Format PDF', value: `${formatPDF}`, sub: 'Laporan Utama', color: '#c53030', icon: FileText },
          { label: 'Format Excel', value: `${formatExcel}`, sub: 'Dataset Lengkap', color: '#276749', icon: FileSpreadsheet },
          { label: 'Total Halaman', value: `${totalHalaman}`, sub: 'Seluruh Laporan', color: '#553c9a', icon: FileText },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Daftar Laporan */}
        <Card className="lg:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center justify-between" style={{ color: COLOR }}>
              <div className="flex items-center gap-2"><FileText size={16} /> Daftar Laporan Penelitian</div>
              <button className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: COLOR }}>
                <RefreshCw size={12} /> Generate Baru
              </button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {laporanList.map((lap, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl border hover:shadow-sm transition-all group" style={{ borderColor: lap.color + '30' }}>
                  <div className="flex-shrink-0 mt-0.5">
                    <FormatIcon format={lap.format} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-slate-800 leading-snug">{lap.nama}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{lap.dataset}</p>
                    <div className="flex flex-wrap gap-2 mt-1.5 text-[10px]">
                      <span className="font-semibold px-1.5 py-0.5 rounded text-white" style={{ backgroundColor: lap.color }}>{lap.format}</span>
                      <span className="text-slate-500">{lap.tanggal}</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500">{lap.ukuran}</span>
                      {lap.halaman > 0 && (
                        <>
                          <span className="text-slate-400">·</span>
                          <span className="text-slate-500">{lap.halaman} hal.</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <div className="flex items-center gap-1">
                      <CheckCircle2 size={12} className="text-green-600" />
                      <span className="text-[10px] font-bold text-green-700">{lap.status}</span>
                    </div>
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Unduh">
                        <Download size={13} className="text-slate-600" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors" title="Cetak">
                        <Printer size={13} className="text-slate-600" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Panel Generate */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
              <RefreshCw size={16} /> Generate PDF / Excel
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Generate laporan penelitian secara otomatis dari dataset yang tersedia dalam format PDF atau Excel.
            </p>

            {/* Template */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold text-gray-500 uppercase">Pilih Template</p>
              {templateGenerate.map((t, i) => {
                const Icon = t.icon;
                return (
                  <label key={i} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input type="checkbox" className="rounded" defaultChecked={i < 2} />
                    <Icon size={14} className={t.format === 'Excel' ? 'text-green-600' : 'text-red-600'} />
                    <span className="text-[11px] text-slate-700">{t.nama}</span>
                    <span className={`ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded ${t.format === 'Excel' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {t.format}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Periode */}
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase mb-1.5">Periode Laporan</p>
              <select className="w-full text-[12px] p-2 border border-gray-200 rounded-lg bg-white text-slate-700">
                <option>Tahun 2025 (Lengkap)</option>
                <option>Semester 1 (Jan–Jun 2025)</option>
                <option>Semester 2 (Jul–Des 2025)</option>
              </select>
            </div>

            <button className="w-full py-2.5 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 hover:opacity-90 transition-opacity" style={{ backgroundColor: COLOR }}>
              <RefreshCw size={14} />
              Generate Laporan
            </button>

            <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
              <p className="text-[11px] font-bold text-blue-700 mb-1">Terakhir di-generate</p>
              <p className="text-[10px] text-blue-600">27/06/2026 · 07.45 WIB</p>
              <p className="text-[10px] text-blue-500">7 laporan berhasil dibuat</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
