"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { createArsip, createMusyawarah } from "@/actions/adat";

export default function AdatManagementActions({ color }: { color: string }) {
  const { isAdat, isAdmin } = useUserRole();
  const [loading, setLoading] = useState(false);

  if (!isAdat && !isAdmin) return null;

  const handleUnggahArsip = async () => {
    setLoading(true);
    const res = await createArsip({
      judul: "Dokumentasi Ritual Paser 2024",
      kategori: "Ritual",
      tipe: "video",
    });
    
    if (res.success) {
      alert("✅ Arsip berhasil diunggah dan disimpan ke Database MySQL!");
      window.location.reload();
    } else {
      alert("Gagal mengunggah arsip: " + res.error);
    }
    setLoading(false);
  };

  const handleBuatMusyawarah = async () => {
    setLoading(true);
    const res = await createMusyawarah({
      judul: "Musyawarah Pembahasan Batas RW 04",
      tanggal: "2025-05-20",
    });
    
    if (res.success) {
      alert("✅ Agenda Musyawarah berhasil disimpan ke Database MySQL!");
      window.location.reload();
    } else {
      alert("Gagal membuat musyawarah: " + res.error);
    }
    setLoading(false);
  };

  const handleAction = (action: string) => {
    alert(`📜 Fitur Lembaga Adat:\n\n${action}\n\nFitur ini memastikan tata kelola adat terjaga.`);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      <Button 
        onClick={handleUnggahArsip}
        disabled={loading}
        className="text-white"
        style={{ backgroundColor: color }}
      >
        {loading ? "⌛ Menyimpan..." : "+ Unggah Arsip (Live DB)"}
      </Button>
      <Button 
        variant="outline"
        onClick={handleBuatMusyawarah}
        disabled={loading}
        style={{ borderColor: color, color: color }}
      >
        {loading ? "⌛ Menyimpan..." : "📅 Agenda Musyawarah (Live DB)"}
      </Button>
      <Button 
        variant="outline"
        onClick={() => handleAction("Tambah Titik Batas Wilayah Adat Baru")}
        style={{ borderColor: color, color: color }}
      >
        🗺️ Update Peta Wilayah
      </Button>
      <Button 
        variant="outline"
        onClick={() => handleAction("Catat Kasus / Sidang Adat Baru")}
        style={{ borderColor: "#ef4444", color: "#ef4444" }}
      >
        ⚖️ Catat Sidang Adat (14)
      </Button>
    </div>
  );
}
