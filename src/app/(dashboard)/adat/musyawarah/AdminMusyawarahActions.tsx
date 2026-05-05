"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createMusyawarah } from "@/actions/adat";

export default function AdminMusyawarahActions({ color }: { color: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [judul, setJudul] = useState("");
  const [tanggal, setTanggal] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createMusyawarah({ judul, tanggal });
    if (res.success) {
      alert("✅ Agenda Musyawarah Adat berhasil dibuat!");
      setIsModalOpen(false);
      setJudul(""); setTanggal("");
    } else alert("Gagal: " + res.error);
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <Button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: color }}>
        + Buat Agenda Musyawarah
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 text-white" style={{ backgroundColor: color }}>
              <h2 className="font-bold text-lg">Buat Agenda Musyawarah Adat</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Musyawarah</label>
                <input type="text" required value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Contoh: Musyawarah Penetapan Batas RW 01" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Pelaksanaan</label>
                <input type="date" required value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} style={{ backgroundColor: color, color: 'white' }}>Buat Agenda</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
