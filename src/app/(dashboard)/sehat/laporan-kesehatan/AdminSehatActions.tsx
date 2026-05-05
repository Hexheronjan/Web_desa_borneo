"use client";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";

export default function AdminSehatActions() {
  const { isAdmin } = useUserRole();
  const [exporting, setExporting] = useState(false);
  const router = useRouter();

  if (!isAdmin) return null;

  const handleExport = (format: "PDF" | "Excel") => {
    if (format === "PDF") {
      window.print();
    } else {
      // Simpan sebagai CSV (Excel)
      const csvContent = "data:text/csv;charset=utf-8,Laporan Ringkasan Kesehatan Desa\nTanggal," + new Date().toLocaleDateString() + "\nWilayah,Kunjungan,Aktif,Baru,Review\nRW 001/RT 001,2,1,2,0\nRW 01/RT 01,3,32,1,9\nRW 01/RT 02,2,30,2,5";
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "laporan_kesehatan_borneo.csv");
      document.body.appendChild(link);
      link.click();
    }
  };

  const handleAturJadwal = () => {
    router.push("/sehat/posyandu");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={() => handleExport("PDF")}
        className="px-4 py-2 text-sm font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
      >
        📄 Ekspor Laporan PDF
      </button>
      <button
        onClick={() => handleExport("Excel")}
        className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
      >
        📊 Ekspor Excel
      </button>
      <button
        onClick={handleAturJadwal}
        className="px-4 py-2 text-sm font-medium bg-orange-50 text-orange-700 border border-orange-200 rounded-lg hover:bg-orange-100 transition-colors"
      >
        📅 Kelola Jadwal Posyandu
      </button>
    </div>
  );
}
