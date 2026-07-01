'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { BookOpen, Award, FileText, Star, ExternalLink, Plus, Search, Download } from 'lucide-react';

const COLOR = '#1a365d';

const artikelJurnal = [
  {
    judul: 'Smart Living Village Readiness Framework: A Design Science Research Approach for Indigenous Villages in Borneo',
    penulis: 'Peneliti Andi, et al.',
    jurnal: 'Journal of Rural Development and Technology',
    volume: 'Vol. 12, No. 3',
    tahun: 2025,
    halaman: 'pp. 145–168',
    doi: '10.1234/jrdt.2025.0312',
    status: 'Published',
    sitasi: 3,
    indeks: 'Scopus Q2',
    color: '#2b6cb0',
  },
  {
    judul: 'Decision Support System for Smart Village Program Priority: AHP-Based Approach with Consistency Analysis',
    penulis: 'Peneliti Andi, Bambang S.',
    jurnal: 'International Journal of Information Systems',
    volume: 'Vol. 8, No. 1',
    tahun: 2025,
    halaman: 'pp. 22–41',
    doi: '10.5678/ijis.2025.0801',
    status: 'Published',
    sitasi: 1,
    indeks: 'SINTA 2',
    color: '#276749',
  },
];

const prosiding = [
  {
    judul: 'Evaluating Quality of Life in Smart Village: A Multi-Dimensional Assessment Framework',
    penulis: 'Peneliti Andi, et al.',
    konferensi: 'International Conference on Smart Communities (ICSC 2025)',
    kota: 'Samarinda, Indonesia',
    tahun: 2025,
    halaman: 'pp. 78–86',
    doi: '10.9012/icsc.2025.0078',
    status: 'Published',
    sitasi: 0,
    color: '#c05621',
  },
];

const laporanPenelitian = [
  {
    judul: 'Laporan Akhir Penelitian: Pengembangan Framework SLV Readiness',
    tipe: 'Laporan Akhir',
    tanggal: '2025-12-31',
    halaman: 142,
    status: 'Final',
    color: '#553c9a',
  },
  {
    judul: 'Laporan Kemajuan Penelitian Tahap I (Jan–Jun 2025)',
    tipe: 'Laporan Kemajuan',
    tanggal: '2025-06-30',
    halaman: 68,
    status: 'Final',
    color: '#553c9a',
  },
  {
    judul: 'Laporan Kemajuan Penelitian Tahap II (Jul–Des 2025)',
    tipe: 'Laporan Kemajuan',
    tanggal: '2025-12-15',
    halaman: 74,
    status: 'Final',
    color: '#553c9a',
  },
];

function StatusBadge({ status }: { status: string }) {
  const cls = status === 'Published' ? 'bg-green-100 text-green-700' : status === 'Final' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700';
  return <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cls}`}>{status}</span>;
}

export default function PublikasiSitasiPage() {
  const totalSitasi = [...artikelJurnal, ...prosiding].reduce((s, p) => s + p.sitasi, 0);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Daftar Publikasi & Sitasi" modul="Repository & Publikasi" color={COLOR} />

      {/* KPI */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Total Publikasi', value: `${artikelJurnal.length + prosiding.length}`, sub: 'Jurnal & Prosiding', color: COLOR, icon: BookOpen },
          { label: 'Artikel Jurnal', value: `${artikelJurnal.length}`, sub: 'Internasional & Nasional', color: '#276749', icon: Award },
          { label: 'Laporan', value: `${laporanPenelitian.length}`, sub: 'Dokumen Resmi', color: '#553c9a', icon: FileText },
          { label: 'Total Sitasi', value: `${totalSitasi}`, sub: 'Google Scholar', color: '#c05621', icon: Star },
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

      {/* Artikel Jurnal */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center justify-between" style={{ color: COLOR }}>
            <div className="flex items-center gap-2"><BookOpen size={16} /> Artikel Jurnal</div>
            <button className="flex items-center gap-1 text-[11px] font-semibold px-3 py-1.5 rounded-lg text-white" style={{ backgroundColor: COLOR }}>
              <Plus size={12} /> Tambah
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {artikelJurnal.map((art, i) => (
              <div key={i} className="p-4 rounded-xl border hover:shadow-sm transition-shadow" style={{ borderColor: art.color + '40', backgroundColor: art.color + '05' }}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-bold text-slate-800 leading-snug">{art.judul}</p>
                    <p className="text-[11px] text-slate-500 mt-1">{art.penulis}</p>
                  </div>
                  <StatusBadge status={art.status} />
                </div>
                <div className="flex flex-wrap gap-2 text-[10px] text-slate-500 mb-2">
                  <span className="font-semibold" style={{ color: art.color }}>{art.jurnal}</span>
                  <span>·</span>
                  <span>{art.volume}, {art.tahun}</span>
                  <span>·</span>
                  <span>{art.halaman}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">{art.indeks}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                      ⭐ {art.sitasi} Sitasi
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg border hover:bg-gray-100 transition-colors">
                      <ExternalLink size={10} /> DOI
                    </button>
                    <button className="flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-lg border hover:bg-gray-100 transition-colors">
                      <Download size={10} /> PDF
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prosiding */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <Award size={16} /> Prosiding Konferensi
          </CardTitle>
        </CardHeader>
        <CardContent>
          {prosiding.map((pros, i) => (
            <div key={i} className="p-4 rounded-xl border hover:shadow-sm transition-shadow" style={{ borderColor: pros.color + '40', backgroundColor: pros.color + '05' }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="text-[13px] font-bold text-slate-800 leading-snug flex-1">{pros.judul}</p>
                <StatusBadge status={pros.status} />
              </div>
              <p className="text-[11px] text-slate-500 mb-1">{pros.penulis}</p>
              <div className="flex flex-wrap gap-2 text-[10px]">
                <span className="font-semibold" style={{ color: pros.color }}>{pros.konferensi}</span>
                <span className="text-slate-400">· {pros.kota}, {pros.tahun}</span>
                <span className="text-slate-400">· {pros.halaman}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Laporan Penelitian */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm font-bold flex items-center gap-2" style={{ color: COLOR }}>
            <FileText size={16} /> Laporan Penelitian (Metadata Artikel)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {laporanPenelitian.map((lap, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-purple-200 bg-purple-50 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-600 flex-shrink-0">
                    <FileText size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[12px] font-bold text-slate-800">{lap.judul}</p>
                    <div className="flex gap-2 mt-0.5">
                      <span className="text-[10px] text-slate-500">{lap.tanggal}</span>
                      <span className="text-[10px] text-slate-400">·</span>
                      <span className="text-[10px] font-semibold text-purple-700">{lap.halaman} halaman</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <StatusBadge status={lap.status} />
                  <button className="p-1.5 rounded-lg hover:bg-purple-100 transition-colors">
                    <Download size={14} className="text-purple-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
