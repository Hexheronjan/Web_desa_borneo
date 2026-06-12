"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Users, Search, Filter, Download, UserCheck, UserX, UserPlus } from "lucide-react";

const COLOR = "#00695c";

const dataWarga = [
  { nik: "6401010101010001", kk: "6401010101010100", nama: "Andi Saputra", alamat: "Jl. Mahakam No. 12, RT 01/RW 01", status: "Aktif" },
  { nik: "6401010101010002", kk: "6401010101010100", nama: "Siti Nurhaliza", alamat: "Jl. Mahakam No. 12, RT 01/RW 01", status: "Aktif" },
  { nik: "6401010101010003", kk: "6401010101010200", nama: "Budi Hartono", alamat: "Jl. Kapuas No. 5, RT 02/RW 01", status: "Aktif" },
  { nik: "6401010101010004", kk: "6401010101010200", nama: "Dewi Lestari", alamat: "Jl. Kapuas No. 5, RT 02/RW 01", status: "Pindah" },
  { nik: "6401010101010005", kk: "6401010101010300", nama: "Rahman Hidayat", alamat: "Jl. Barito No. 8, RT 03/RW 02", status: "Aktif" },
  { nik: "6401010101010006", kk: "6401010101010300", nama: "Fatimah Zahra", alamat: "Jl. Barito No. 8, RT 03/RW 02", status: "Aktif" },
  { nik: "6401010101010007", kk: "6401010101010400", nama: "Joko Widodo", alamat: "Jl. Kahayan No. 15, RT 04/RW 02", status: "Meninggal" },
  { nik: "6401010101010008", kk: "6401010101010500", nama: "Kartini Sari", alamat: "Jl. Mentaya No. 3, RT 05/RW 03", status: "Aktif" },
  { nik: "6401010101010009", kk: "6401010101010500", nama: "Agus Pratama", alamat: "Jl. Mentaya No. 3, RT 05/RW 03", status: "Aktif" },
  { nik: "6401010101010010", kk: "6401010101010600", nama: "Putri Dayak", alamat: "Jl. Rungan No. 7, RT 01/RW 04", status: "Aktif" },
];

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Aktif: "bg-green-100 text-green-700",
    Pindah: "bg-yellow-100 text-yellow-700",
    Meninggal: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

export default function DataPendudukPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");

  const filtered = dataWarga.filter((w) => {
    const matchSearch = w.nama.toLowerCase().includes(search.toLowerCase()) || w.nik.includes(search);
    const matchStatus = filterStatus === "Semua" || w.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Penduduk" modul="Operator SID" color={COLOR} />

      {/* STAT CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Penduduk" value="2.345" satuan="jiwa" barColor="teal" progress={100} />
        <StatCard label="Penduduk Aktif" value="2.180" satuan="jiwa" barColor="green" progress={93} />
        <StatCard label="Pindah / Keluar" value="120" satuan="jiwa" barColor="orange" progress={5} />
        <StatCard label="Meninggal" value="45" satuan="jiwa" barColor="red" progress={2} />
      </div>

      {/* DEMOGRAFI */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Distribusi Usia
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: "0–5 tahun (Balita)", value: 120, persen: 5 },
                { label: "6–17 tahun (Anak/Remaja)", value: 480, persen: 20 },
                { label: "18–40 tahun (Dewasa Muda)", value: 890, persen: 38 },
                { label: "41–60 tahun (Dewasa)", value: 610, persen: 26 },
                { label: ">60 tahun (Lansia)", value: 245, persen: 11 },
              ].map((d, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600">{d.label}</span>
                    <span className="font-bold text-slate-800">{d.value} ({d.persen}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${d.persen}%`, backgroundColor: COLOR }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Jenis Kelamin & KK
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-1 p-3 rounded-lg bg-teal-50 border border-teal-200 text-center">
                <p className="text-2xl font-black text-teal-700">1.198</p>
                <p className="text-xs text-teal-600 font-medium">Laki-laki</p>
              </div>
              <div className="flex-1 p-3 rounded-lg bg-rose-50 border border-rose-200 text-center">
                <p className="text-2xl font-black text-rose-700">1.147</p>
                <p className="text-xs text-rose-600 font-medium">Perempuan</p>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-slate-50 border text-center">
              <p className="text-2xl font-black text-slate-800">587</p>
              <p className="text-xs text-slate-500 font-medium">Jumlah Kartu Keluarga</p>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {[
                { label: "RW 01", value: 520 },
                { label: "RW 02", value: 680 },
                { label: "RW 03", value: 450 },
              ].map((rw, i) => (
                <div key={i} className="p-2 border rounded-lg bg-white">
                  <p className="text-lg font-black" style={{ color: COLOR }}>{rw.value}</p>
                  <p className="text-[10px] text-slate-400">{rw.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* SEARCH & FILTER + TABLE */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Tabel Data Penduduk
            </CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama/NIK..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-48"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Pindah">Pindah</option>
                <option value="Meninggal">Meninggal</option>
              </select>
              <button className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-1">
                <Download size={12} /> Export
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-teal-100">
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">No</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">NIK</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">No. KK</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Nama</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Alamat</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((w, i) => (
                  <tr key={i} className={`border-b border-slate-100 hover:bg-teal-50/50 transition-colors ${i % 2 === 0 ? "bg-slate-50/50" : ""}`}>
                    <td className="py-2.5 px-3 text-slate-400 text-xs">{i + 1}</td>
                    <td className="py-2.5 px-3 font-mono text-xs text-slate-600">{w.nik}</td>
                    <td className="py-2.5 px-3 font-mono text-xs text-slate-600">{w.kk}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">{w.nama}</td>
                    <td className="py-2.5 px-3 text-slate-600 text-xs">{w.alamat}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={w.status} /></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">Data tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-400 mt-3">Menampilkan {filtered.length} dari 2.345 data penduduk</p>
        </CardContent>
      </Card>
    </div>
  );
}
