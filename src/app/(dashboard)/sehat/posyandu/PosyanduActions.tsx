"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createPosyandu } from "@/actions/sehat";

export function PosyanduActions({ color }: { color: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [lokasi, setLokasi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [balita, setBalita] = useState("");
  const [imunisasi, setImunisasi] = useState("");
  const [catatan, setCatatan] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await createPosyandu({
      lokasi,
      tanggal,
      jumlahBalita: parseInt(balita),
      jumlahImunisasi: parseInt(imunisasi),
      catatan
    });
    
    if (res.success) {
      alert("✅ Jadwal & Kegiatan Posyandu berhasil disimpan ke Database!");
      setIsModalOpen(false);
      setLokasi(""); setTanggal(""); setBalita(""); setImunisasi(""); setCatatan("");
    } else {
      alert("Gagal: " + res.error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex gap-3 mb-2">
        <Button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: color }}>
          + Buat Jadwal Posyandu Baru
        </Button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#E07B2A] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Input Kegiatan Posyandu</h2>
              <p className="text-orange-100 text-xs opacity-90">Rekapitulasi Layanan KIA</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lokasi (Posyandu/RW)</label>
                <input type="text" required value={lokasi} onChange={(e) => setLokasi(e.target.value)} placeholder="Contoh: Balai RW 03" className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Kegiatan</label>
                <input type="date" required value={tanggal} onChange={(e) => setTanggal(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jumlah Balita</label>
                  <input type="number" value={balita} onChange={(e) => setBalita(e.target.value)} placeholder="0" className="w-full border rounded-lg p-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jml Imunisasi</label>
                  <input type="number" value={imunisasi} onChange={(e) => setImunisasi(e.target.value)} placeholder="0" className="w-full border rounded-lg p-2.5 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catatan Tambahan</label>
                <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} placeholder="Keterangan tambahan..." className="w-full border rounded-lg p-2.5 text-sm h-20" />
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} className="bg-[#E07B2A] hover:bg-[#c26721] text-white px-8">
                  {loading ? "Menyimpan..." : "Simpan Jadwal"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
