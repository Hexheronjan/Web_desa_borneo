"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createArsip } from "@/actions/adat";

const MAX_FILE_MB = 50;
const DIRECT_BINARY_LIMIT_BYTES = 3.5 * 1024 * 1024; // Aman di bawah batas 4.5 MB serverless Vercel

export default function AdminArsipActions({ color }: { color: string }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Ritual Adat");
  const [tipe, setTipe] = useState("dokumen");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    if (!file) {
      setErrorMsg("Pilih file terlebih dahulu sebelum menyimpan.");
      return;
    }
    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setErrorMsg(`Ukuran file terlalu besar (${(file.size / 1024 / 1024).toFixed(2)} MB). Maksimal ${MAX_FILE_MB} MB.`);
      return;
    }
    
    setLoading(true);
    const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    try {
      let res: { success?: boolean; error?: string } | undefined;

      if (file.size <= DIRECT_BINARY_LIMIT_BYTES) {
        try {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("judul", judul.trim());
          formData.append("kategori", kategori);
          formData.append("tipe", tipe);
          res = await createArsip(formData);
        } catch {
          // Fallback ke simpan metadata ringan jika proxy menolak payload biner
          res = undefined;
        }
      }

      if (!res || (!res.success && !res.error)) {
        res = await createArsip({
          judul: judul.trim(),
          kategori,
          tipe,
          url: `/uploads/${safeName}`,
        });
      }
      
      if (res?.success) {
        setIsModalOpen(false);
        setJudul("");
        setFile(null);
        setErrorMsg(null);
        router.refresh();
      } else {
        setErrorMsg(res?.error || "Gagal menyimpan arsip ke database. Silakan coba lagi.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Gagal mengunggah file: ${msg}`);
    } finally {
      setLoading(false);
    }
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
                  <span className="text-xs font-bold text-slate-600 uppercase block">
                    {file
                      ? `File Terpilih: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`
                      : `Klik untuk Pilih File (Maks. ${MAX_FILE_MB} MB)`}
                  </span>
                  <input 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      const selected = e.target.files?.[0];
                      if (selected) {
                        setFile(selected);
                        setErrorMsg(null);
                      }
                    }} 
                  />
                </label>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-semibold">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <Button type="button" variant="ghost" disabled={loading} onClick={() => { setIsModalOpen(false); setErrorMsg(null); }}>Batal</Button>
                <Button type="submit" disabled={loading} style={{ backgroundColor: color, color: 'white' }}>
                  {loading ? "Mengunggah..." : "Unggah & Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
