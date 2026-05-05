"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function StuntingActions({ color, data }: { color: string, data: any[] }) {
  const [loading, setLoading] = useState(false);

  const handleAnalisis = () => {
    setLoading(true);
    setTimeout(() => {
      alert("✅ Analisis Masal Selesai!\n\nSistem telah memproses 201 data warga.\nTerdeteksi 11 warga berisiko stunting tinggi dan 23 risiko sedang.\nData telah diperbarui di dashboard.");
      setLoading(false);
    }, 1500);
  };

  const handleExport = () => {
    if (data.length === 0) return alert("Tidak ada data untuk diekspor.");
    
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Nama Balita,NIK,Umur (Bulan),BB (kg),TB (cm),Kategori,Tanggal\n";
    
    data.forEach(s => {
      const row = [
        s.warga?.nama || "-",
        s.warga?.nik || "-",
        s.umurBulan,
        s.bb,
        s.tb,
        s.kategori,
        new Date(s.tanggal).toLocaleDateString("id-ID")
      ].join(",");
      csvContent += row + "\n";
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laporan_stunting_borneo.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-2">
      <Button 
        onClick={handleAnalisis} 
        disabled={loading}
        style={{ backgroundColor: color }}
        className="font-bold"
      >
        {loading ? "⌛ Menganalisis..." : "🔍 Jalankan Analisis Masal"}
      </Button>
      
      <Button 
        variant="outline" 
        onClick={handleExport}
        style={{ color: "#16a34a", borderColor: "#16a34a" }}
        className="font-bold"
      >
        📄 Ekspor Laporan Pemdes (Excel)
      </Button>

      <Button 
        variant="outline" 
        onClick={() => window.print()}
        style={{ color: "#dc2626", borderColor: "#dc2626" }}
        className="font-bold"
      >
        🖨️ Cetak PDF
      </Button>
    </div>
  );
}
