"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { createArsip, createMusyawarah } from "@/actions/adat";

export default function AdatManagementActions({ color }: { color: string }) {
  const { isAdat, isAdmin } = useUserRole();
  const [loading, setLoading] = useState(false);
  const [isArsipModalOpen, setIsArsipModalOpen] = useState(false);
  const [isMusyawarahModalOpen, setIsMusyawarahModalOpen] = useState(false);

  const [arsipForm, setArsipForm] = useState({
    judul: "",
    kategori: "",
    tipe: "dokumen" as "dokumen" | "foto" | "video",
    file: null as File | null,
  });

  const [musyawarahForm, setMusyawarahForm] = useState({
    judul: "",
    tanggal: "",
  });

  if (!isAdat && !isAdmin) return null;

  const handleUnggahArsip = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("judul", arsipForm.judul);
    formData.append("kategori", arsipForm.kategori);
    formData.append("tipe", arsipForm.tipe);
    if (arsipForm.file) {
      formData.append("file", arsipForm.file);
    }

    const res = await createArsip(formData);

    if (res.success) {
      alert("✅ Arsip berhasil diunggah dan disimpan ke Database!");
      setIsArsipModalOpen(false);
      setArsipForm({ judul: "", kategori: "", tipe: "dokumen", file: null });
      window.location.reload();
    } else {
      alert("Gagal mengunggah arsip: " + res.error);
    }
    setLoading(false);
  };

  const handleBuatMusyawarah = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createMusyawarah({
      judul: musyawarahForm.judul,
      tanggal: musyawarahForm.tanggal,
    });

    if (res.success) {
      alert("✅ Agenda Musyawarah berhasil disimpan ke Database!");
      setIsMusyawarahModalOpen(false);
      setMusyawarahForm({ judul: "", tanggal: "" });
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
    <>
      <div className="flex flex-wrap gap-3 mb-4">
        <Button
          onClick={() => setIsArsipModalOpen(true)}
          className="text-white"
          style={{ backgroundColor: color }}
        >
          + Unggah Arsip (Live DB)
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsMusyawarahModalOpen(true)}
          style={{ borderColor: color, color: color }}
        >
          📅 Agenda Musyawarah (Live DB)
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

      {/* Modal Unggah Arsip */}
      {isArsipModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#2e7d32] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Unggah Arsip Adat</h2>
              <p className="text-green-100 text-xs opacity-90">Dokumentasi budaya dan adat</p>
            </div>
            <form onSubmit={handleUnggahArsip} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Arsip *</label>
                <input
                  type="text"
                  required
                  value={arsipForm.judul}
                  onChange={(e) => setArsipForm({ ...arsipForm, judul: e.target.value })}
                  placeholder="Contoh: Dokumentasi Ritual Paser 2024"
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori *</label>
                <input
                  type="text"
                  required
                  value={arsipForm.kategori}
                  onChange={(e) => setArsipForm({ ...arsipForm, kategori: e.target.value })}
                  placeholder="Contoh: Ritual, Upacara, Musik"
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tipe *</label>
                <select
                  value={arsipForm.tipe}
                  onChange={(e) => setArsipForm({ ...arsipForm, tipe: e.target.value as any })}
                  className="w-full border rounded-lg p-2.5 text-sm"
                >
                  <option value="dokumen">Dokumen (PDF)</option>
                  <option value="foto">Foto</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">File</label>
                <input
                  type="file"
                  onChange={(e) => setArsipForm({ ...arsipForm, file: e.target.files?.[0] || null })}
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsArsipModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white"
                >
                  {loading ? "⌛ Menyimpan..." : "Simpan Arsip"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Buat Musyawarah */}
      {isMusyawarahModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#2e7d32] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Buat Agenda Musyawarah</h2>
              <p className="text-green-100 text-xs opacity-90">Jadwal pertemuan adat</p>
            </div>
            <form onSubmit={handleBuatMusyawarah} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Musyawarah *</label>
                <input
                  type="text"
                  required
                  value={musyawarahForm.judul}
                  onChange={(e) => setMusyawarahForm({ ...musyawarahForm, judul: e.target.value })}
                  placeholder="Contoh: Musyawarah Pembahasan Batas RW 04"
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal *</label>
                <input
                  type="date"
                  required
                  value={musyawarahForm.tanggal}
                  onChange={(e) => setMusyawarahForm({ ...musyawarahForm, tanggal: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsMusyawarahModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white"
                >
                  {loading ? "⌛ Menyimpan..." : "Simpan Agenda"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
