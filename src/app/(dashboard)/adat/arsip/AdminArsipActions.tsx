"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createArsip } from "@/actions/adat";

const MAX_FILE_MB = 25;
const CHUNK_SIZE_BYTES = 1536 * 1024; // 1.5 MB biner (~2 MB base64) -> aman di Vercel (limit 4.5 MB) & MySQL cPanel

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunks: string[] = [];
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) {
    const end = Math.min(i + step, bytes.length);
    let part = "";
    for (let j = i; j < end; j++) {
      part += String.fromCharCode(bytes[j]);
    }
    chunks.push(part);
  }
  return btoa(chunks.join(""));
}

export default function AdminArsipActions({ color }: { color: string }) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progressText, setProgressText] = useState<string | null>(null);
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
    try {
      const fileKey = `arsip_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
      const totalChunks = Math.max(1, Math.ceil(file.size / CHUNK_SIZE_BYTES));

      for (let i = 0; i < totalChunks; i++) {
        setProgressText(totalChunks > 1 ? `Mengunggah bagian ${i + 1}/${totalChunks}...` : "Mengunggah file...");
        const slice = file.slice(i * CHUNK_SIZE_BYTES, (i + 1) * CHUNK_SIZE_BYTES);
        const buf = await slice.arrayBuffer();
        const dataBase64 = arrayBufferToBase64(buf);

        const uploadRes = await fetch("/api/adat/arsip/file", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key: fileKey,
            chunkIndex: i,
            totalChunks,
            fileName: file.name,
            mimeType: file.type || "application/octet-stream",
            dataBase64,
          }),
        });

        const uploadJson = await uploadRes.json().catch(() => null);
        if (!uploadRes.ok || !uploadJson?.success) {
          throw new Error(uploadJson?.error || `Gagal menyimpan bagian file (${uploadRes.status})`);
        }
      }

      setProgressText("Menyimpan arsip...");
      const fileUrl = `/api/adat/arsip/file?key=${encodeURIComponent(fileKey)}&name=${encodeURIComponent(file.name)}`;
      const res = await createArsip({
        judul: judul.trim(),
        kategori,
        tipe,
        url: fileUrl,
      });
      
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
      setProgressText(null);
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
                  {loading ? (progressText || "Mengunggah...") : "Unggah & Simpan"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
