"use client";
import { useState } from "react";
import { useUserRole } from "@/hooks/useUserRole";

export default function AdminAdatActions() {
  const { isAdmin } = useUserRole();
  const [exporting, setExporting] = useState(false);

  if (!isAdmin) return null;

  const handleExport = (format: "PDF" | "Excel") => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      alert(`✅ Laporan Adat diekspor ke ${format}!\n\nFile: Laporan_Adat_${new Date().toLocaleDateString("id-ID").replace(/\//g, "-")}.${format === "PDF" ? "pdf" : "xlsx"}`);
    }, 1500);
  };

  const handleValidasiPeta = () => {
    alert("🗺️ Validasi Peta Wilayah Adat:\n\n12 layer peta aktif, 3 dalam proses validasi.\n\nLayer perlu validasi:\n• Batas RW 02-03 (sengketa aktif)\n• Titik lokasi lahan adat baru\n• Layer pemukiman RW 05\n\nSilakan buka menu Mapping Wilayah untuk validasi detail.");
  };

  const handleKoordinasiMusyawarah = () => {
    alert("📅 Koordinasi Jadwal Musyawarah:\n\nMusyawarah mendatang:\n• Penetapan Batas Wilayah - 20 Mei 2025\n• Revisi Aturan Hukum Adat - 27 Mei 2025\n\nAnda dapat:\n• Konfirmasi atau ubah jadwal\n• Kirim undangan ke peserta\n• Atur platform live online");
  };

  return (
    <div className="flex flex-wrap gap-3">
      <button onClick={() => handleExport("PDF")} disabled={exporting}
        className="px-4 py-2 text-sm font-medium bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 transition-colors disabled:opacity-50">
        {exporting ? "⏳ Memproses..." : "📄 Ekspor Laporan PDF"}
      </button>
      <button onClick={() => handleExport("Excel")} disabled={exporting}
        className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors disabled:opacity-50">
        {exporting ? "⏳ Memproses..." : "📊 Ekspor Excel"}
      </button>
      <button onClick={handleValidasiPeta}
        className="px-4 py-2 text-sm font-medium bg-teal-50 text-teal-700 border border-teal-200 rounded-lg hover:bg-teal-100 transition-colors">
        🗺️ Validasi Peta Wilayah
      </button>
      <button onClick={handleKoordinasiMusyawarah}
        className="px-4 py-2 text-sm font-medium bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 transition-colors">
        📅 Koordinasi Musyawarah
      </button>
    </div>
  );
}
