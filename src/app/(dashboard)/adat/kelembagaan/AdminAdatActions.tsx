"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createPengurus } from "@/actions/adat";

export default function AdminKelembagaanActions({ color }: { color: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [bidang, setBidang] = useState("Adat & Budaya");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await createPengurus({ nama, jabatan, bidang });
    if (res.success) {
      alert("✅ Data Pengurus baru berhasil disimpan!");
      setIsModalOpen(false);
      setNama(""); setJabatan("");
    } else alert("Gagal: " + res.error);
    setLoading(false);
  };

  return (
    <div className="mb-4">
      <Button onClick={() => setIsModalOpen(true)} style={{ backgroundColor: color }}>
        + Tambah Pengurus Baru
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 text-white" style={{ backgroundColor: color }}>
              <h2 className="font-bold text-lg">Input Pengurus Lembaga Adat</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <input type="text" required value={nama} onChange={(e) => setNama(e.target.value)} placeholder="Nama Lengkap" className="w-full border rounded-lg p-2.5 text-sm" />
              <input type="text" required value={jabatan} onChange={(e) => setJabatan(e.target.value)} placeholder="Jabatan (Contoh: Ketua Adat)" className="w-full border rounded-lg p-2.5 text-sm" />
              <select value={bidang} onChange={(e) => setBidang(e.target.value)} className="w-full border rounded-lg p-2.5 text-sm bg-white">
                <option>Adat & Budaya</option>
                <option>Hukum & Sengketa</option>
                <option>Wilayah & Pemetaan</option>
                <option>Pendidikan & Kaderisasi</option>
                <option>Humas & Kerjasama</option>
              </select>
              <div className="flex justify-end gap-3 pt-6">
                <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>Batal</Button>
                <Button type="submit" disabled={loading} style={{ backgroundColor: color, color: 'white' }}>Simpan Pengurus</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
