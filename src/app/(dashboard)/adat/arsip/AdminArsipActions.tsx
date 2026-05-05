"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createArsip } from "@/actions/adat";

export default function AdminArsipActions({ color }: { color: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Ritual Adat");
  const [tipe, setTipe] = useState("dokumen");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Pilih file terlebih dahulu!");
    
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("judul", judul);
    formData.append("kategori", kategori);
    formData.append("tipe", tipe);

    const res = await createArsip(formData);
    
    if (res.success) {
      alert("✅ File '" + file.name + "' berhasil diunggah secara riil ke server!");
      setIsModalOpen(false);
      setJudul("");
      setFile(null);
    } else alert("Gagal Unggah: " + res.error);
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <Button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: color }}>
        + Unggah Arsip Baru
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 text-white" style={{ backgroundColor: color }}>
              <h2 className="font-bold text-lg">Unggah Arsip Digital Adat</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Arsip</label>
                <input type="text" required value={judul} onChange={(e) => setJudul(e.target.value)} placeholder="Contoh: Video Ritual Belian" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori (9 Kategori Aktif)</label>
                <select value={kategori} onChange={(e) => setKategori(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm bg-white">
                  <option>Ritual Adat</option>
                  <option>Seni & Tari</option>
                  <option>Musik Tradisional</option>
                  <option>Benda Pusaka</option>
                  <option>Arsitektur Rumah Adat</option>
                  <option>Hukum & Aturan</option>
                  <option>Sejarah Lisan</option>
                  <option>Kuliner Tradisional</option>
                  <option>Pakaian & Wastra</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipe Media</label>
                <div className="flex gap-4 mb-4">
                  {["dokumen", "foto", "video"].map((t) => (
                    <label key={t} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" checked={tipe === t} onChange={() => setTipe(t)} name="tipe" />
                      <span className="text-sm capitalize text-slate-600">{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className={`p-4 border-2 border-dashed rounded-xl transition-colors ${file ? 'border-green-500 bg-green-50' : 'border-slate-200 hover:border-green-400'}`}>
                <label className="block text-center cursor-pointer">
                  <span className="text-2xl block mb-1">{file ? "✅" : "📁"}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    {file ? `File Terpilih: ${file.name}` : "Klik untuk Pilih File"}
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      const selected = e.target.files?.[0];
                      if (selected) setFile(selected);
                    }} 
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} style={{ backgroundColor: color, color: 'white' }}>Unggah & Simpan</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
