"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createHukumAdat } from "@/actions/adat";

export default function AdminHukumActions({ color }: { color: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [judul, setJudul] = useState("");
  const [tipe, setTipe] = useState("Aturan");
  const [deskripsi, setDeskripsi] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createHukumAdat({ judul, tipe, deskripsi, publik: true });
    if (res.success) {
      alert("✅ Aturan Hukum Adat berhasil dipublikasikan!");
      setIsModalOpen(false);
      setJudul(""); setDeskripsi("");
    } else alert("Gagal: " + res.error);
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <Button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: color }}>
        + Publish Aturan Hukum Baru
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 text-white" style={{ backgroundColor: color }}>
              <h2 className="font-bold text-lg">Publikasi Aturan Hukum Adat</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Aturan/Pasal</label>
                <input type="text" required value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Contoh: Larangan Penebangan di Hutan Lindung" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipe</label>
                <select value={tipe} onChange={(e) => setTipe(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm bg-white">
                  <option>Aturan</option>
                  <option>Kasus</option>
                  <option>Putusan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi/Isi Aturan</label>
                <textarea required value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)} placeholder="Tuliskan isi aturan hukum adat secara detail..." className="w-full border rounded-lg p-2.5 text-sm h-32" />
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} style={{ backgroundColor: color, color: 'white' }}>Publish Sekarang</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
