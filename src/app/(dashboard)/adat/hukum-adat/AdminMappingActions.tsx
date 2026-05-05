"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createWilayahAdat } from "@/actions/adat";

export default function AdminMappingActions({ color }: { color: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [namaLokasi, setNamaLokasi] = useState("");
  const [koordinat, setKoordinat] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createWilayahAdat({ namaLokasi, koordinat });
    if (res.success) {
      alert("✅ Titik Batas Wilayah Adat berhasil dicatat!");
      setIsModalOpen(false);
      setNamaLokasi(""); setKoordinat("");
    } else alert("Gagal: " + res.error);
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <Button onClick={() => setIsModalOpen(true)} variant="outline" style={{ borderColor: color, color: color }}>
        📍 Catat Titik Batas Baru
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 text-white" style={{ backgroundColor: color }}>
              <h2 className="font-bold text-lg">Input Titik Batas Wilayah Adat</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Lokasi / Patok</label>
                <input type="text" required value={namaLokasi} onChange={(e) => setNamaLokasi(e.target.value)} placeholder="Contoh: Batas Timur RT 04" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Koordinat (Lat, Long)</label>
                <input type="text" required value={koordinat} onChange={(e) => setKoordinat(e.target.value)} placeholder="Contoh: -1.2691, 116.8253" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} style={{ backgroundColor: color, color: 'white' }}>Simpan Titik</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
