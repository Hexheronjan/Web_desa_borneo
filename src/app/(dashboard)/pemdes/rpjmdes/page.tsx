"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import {
  FileText,
  Calendar,
  Target,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";

const COLOR = "#283593";

const programs = [
  {
    no: 1,
    bidang: "Kesehatan",
    program: "Peningkatan Layanan Posyandu",
    target: "8 Posyandu Aktif",
    anggaran: "Rp 120.000.000",
    tahun: "2024-2026",
    status: "Berjalan",
  },
  {
    no: 2,
    bidang: "Pendidikan",
    program: "Pengembangan E-Learning Desa",
    target: "3 Pusat Belajar",
    anggaran: "Rp 95.000.000",
    tahun: "2024-2025",
    status: "Berjalan",
  },
  {
    no: 3,
    bidang: "Infrastruktur",
    program: "Pembangunan Jaringan Internet Desa",
    target: "24 Titik Akses",
    anggaran: "Rp 250.000.000",
    tahun: "2024-2028",
    status: "Berjalan",
  },
  {
    no: 4,
    bidang: "Budaya",
    program: "Pelestarian Budaya Adat Dayak",
    target: "5 Program Budaya",
    anggaran: "Rp 80.000.000",
    tahun: "2024-2026",
    status: "Rencana",
  },
  {
    no: 5,
    bidang: "Ekonomi",
    program: "Pengembangan UMKM Lokal",
    target: "50 UMKM Terbina",
    anggaran: "Rp 150.000.000",
    tahun: "2025-2028",
    status: "Rencana",
  },
  {
    no: 6,
    bidang: "Lingkungan",
    program: "Program Lingkungan Sehat",
    target: "90% Rumah Sehat",
    anggaran: "Rp 110.000.000",
    tahun: "2024-2027",
    status: "Berjalan",
  },
  {
    no: 7,
    bidang: "Governance",
    program: "Digitalisasi Pelayanan Desa",
    target: "100% Layanan Online",
    anggaran: "Rp 75.000.000",
    tahun: "2024-2026",
    status: "Berjalan",
  },
  {
    no: 8,
    bidang: "Sosial",
    program: "Pemberdayaan Pemuda Adat",
    target: "100 Pemuda Terbina",
    anggaran: "Rp 65.000.000",
    tahun: "2025-2027",
    status: "Rencana",
  },
];

const documents = [
  { name: "Dokumen RPJMDes 2024-2028", date: "15 Jan 2024", type: "PDF", size: "2.4 MB", status: "Final" },
  { name: "Lampiran Visi & Misi Desa", date: "15 Jan 2024", type: "PDF", size: "850 KB", status: "Final" },
  { name: "Berita Acara Musrenbang", date: "20 Des 2023", type: "PDF", size: "1.2 MB", status: "Final" },
  { name: "Matriks Program Prioritas", date: "10 Jan 2024", type: "XLSX", size: "560 KB", status: "Final" },
  { name: "Peta Potensi & Masalah Desa", date: "05 Jan 2024", type: "PDF", size: "3.1 MB", status: "Draft" },
];

export default function RPJMDesPage() {
  const totalAnggaran = 945000000;
  const programBerjalan = programs.filter((p) => p.status === "Berjalan").length;
  const programRencana = programs.filter((p) => p.status === "Rencana").length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle
        fitur="RPJMDes — Rencana Pembangunan Jangka Menengah Desa"
        modul="Pemdes / Kepala Desa"
        color={COLOR}
      />

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Program" value={programs.length} satuan="program" barColor="blue" progress={100} />
        <StatCard label="Sedang Berjalan" value={programBerjalan} satuan="program" barColor="green" progress={(programBerjalan / programs.length) * 100} />
        <StatCard label="Rencana" value={programRencana} satuan="program" barColor="orange" progress={(programRencana / programs.length) * 100} />
        <StatCard label="Total Anggaran" value="945 Jt" satuan="rupiah" barColor="purple" progress={72} />
      </div>

      {/* Timeline Visual */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Calendar size={16} /> Timeline RPJMDes 2024–2028
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            {["2024", "2025", "2026", "2027", "2028"].map((year, i) => (
              <div key={year} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                    i <= 1 ? "bg-indigo-600" : "bg-slate-300"
                  }`}
                >
                  {year.slice(2)}
                </div>
                <span className="text-[10px] text-slate-500 mt-1">{year}</span>
                {i <= 1 && <span className="text-[9px] text-indigo-600 font-semibold mt-0.5">Aktif</span>}
              </div>
            ))}
          </div>
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-indigo-600" style={{ width: "35%" }} />
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center">Progres keseluruhan: <strong className="text-indigo-700">35%</strong> dari target 5 tahun</p>
        </CardContent>
      </Card>

      {/* Program Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <Target size={16} /> Matriks Program RPJMDes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-white" style={{ backgroundColor: COLOR }}>
                  <th className="p-3 rounded-tl-lg">No</th>
                  <th className="p-3">Bidang</th>
                  <th className="p-3">Program</th>
                  <th className="p-3">Target</th>
                  <th className="p-3">Anggaran</th>
                  <th className="p-3">Periode</th>
                  <th className="p-3 rounded-tr-lg">Status</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p, i) => (
                  <tr key={p.no} className={`border-b border-slate-100 ${i % 2 === 0 ? "bg-white" : "bg-indigo-50/30"}`}>
                    <td className="p-3 font-bold text-indigo-700">{p.no}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-bold">
                        {p.bidang}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-700">{p.program}</td>
                    <td className="p-3 text-slate-600">{p.target}</td>
                    <td className="p-3 font-mono text-xs text-slate-600">{p.anggaran}</td>
                    <td className="p-3 text-xs text-slate-500">{p.tahun}</td>
                    <td className="p-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          p.status === "Berjalan"
                            ? "bg-green-100 text-green-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {p.status === "Berjalan" ? <CheckCircle2 size={10} /> : <Clock size={10} />}
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Document Listing */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
            <FileText size={16} /> Dokumen RPJMDes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documents.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 border border-slate-100 rounded-lg hover:bg-indigo-50/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                    <FileText size={18} className="text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700">{doc.name}</p>
                    <p className="text-[10px] text-slate-400">{doc.date} · {doc.type} · {doc.size}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      doc.status === "Final" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {doc.status}
                  </span>
                  <button className="p-1.5 hover:bg-indigo-100 rounded-lg transition-colors">
                    <Download size={14} className="text-indigo-600" />
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
