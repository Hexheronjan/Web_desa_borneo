"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { createArsip, createMusyawarah, createWilayahAdat, createHukumAdat } from "@/actions/adat";

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

  const [isWilayahModalOpen, setIsWilayahModalOpen] = useState(false);
  const [isSidangModalOpen, setIsSidangModalOpen] = useState(false);

  const [wilayahForm, setWilayahForm] = useState({
    namaLayer: "",
    koordinat: "",
    deskripsi: "",
  });

  const [sidangForm, setSidangForm] = useState({
    judul: "",
    tanggal: "",
    deskripsi: "",
    keputusan: "",
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

  const handleSimpanWilayah = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Parse koordinat JSON
      let koordinatData;
      try {
        koordinatData = JSON.parse(wilayahForm.koordinat);
      } catch {
        // If not valid JSON, create a simple point format
        koordinatData = {
          type: "Point",
          coordinates: [0, 0], // Default coordinates
          description: wilayahForm.koordinat
        };
      }

      const res = await createWilayahAdat({
        namaLayer: wilayahForm.namaLayer,
        koordinat: koordinatData,
      });

      if (res.success) {
        alert("✅ Peta Wilayah Adat berhasil disimpan ke Database!");
        setIsWilayahModalOpen(false);
        setWilayahForm({ namaLayer: "", koordinat: "", deskripsi: "" });
        window.location.reload();
      } else {
        alert("Gagal menyimpan peta wilayah: " + res.error);
      }
    } catch (error: any) {
      alert("Terjadi kesalahan: " + error.message);
    }
    setLoading(false);
  };

  const handleSimpanSidang = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await createHukumAdat({
      judul: sidangForm.judul,
      tipe: "Kasus",
      deskripsi: sidangForm.deskripsi + (sidangForm.keputusan ? `\nKeputusan: ${sidangForm.keputusan}` : ""),
      publik: false,
    });

    if (res.success) {
      alert("✅ Sidang Adat berhasil dicatat ke Database!");
      setIsSidangModalOpen(false);
      setSidangForm({ judul: "", tanggal: "", deskripsi: "", keputusan: "" });
      window.location.reload();
    } else {
      alert("Gagal mencatat sidang: " + res.error);
    }
    setLoading(false);
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
          onClick={() => setIsWilayahModalOpen(true)}
          style={{ borderColor: color, color: color }}
        >
          🗺️ Update Peta Wilayah
        </Button>
        <Button
          variant="outline"
          onClick={() => setIsSidangModalOpen(true)}
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

      {/* Modal Peta Wilayah */}
      {isWilayahModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#283593] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Update Peta Wilayah Adat</h2>
              <p className="text-indigo-100 text-xs opacity-90">Kelola batas dan wilayah adat desa</p>
            </div>
            <form onSubmit={handleSimpanWilayah} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Layer *</label>
                <input
                  type="text"
                  required
                  value={wilayahForm.namaLayer}
                  onChange={(e) => setWilayahForm({ ...wilayahForm, namaLayer: e.target.value })}
                  placeholder="Contoh: Batas RW 01, Kawasan Hutan Adat"
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Koordinat (JSON) *</label>
                <textarea
                  required
                  value={wilayahForm.koordinat}
                  onChange={(e) => setWilayahForm({ ...wilayahForm, koordinat: e.target.value })}
                  placeholder='Contoh: {"type": "Polygon", "coordinates": [[[...]]]}'
                  className="w-full border rounded-lg p-2.5 text-sm h-24 font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">Format GeoJSON atau deskripsi koordinat</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi</label>
                <textarea
                  value={wilayahForm.deskripsi}
                  onChange={(e) => setWilayahForm({ ...wilayahForm, deskripsi: e.target.value })}
                  placeholder="Deskripsi wilayah atau batas..."
                  className="w-full border rounded-lg p-2.5 text-sm h-16"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsWilayahModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#283593] hover:bg-[#1a237e] text-white"
                >
                  {loading ? "⌛ Menyimpan..." : "Simpan Peta"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Sidang Adat */}
      {isSidangModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#ef4444] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Catat Sidang Adat</h2>
              <p className="text-red-100 text-xs opacity-90">Dokumentasi kasus dan sidang adat</p>
            </div>
            <form onSubmit={handleSimpanSidang} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Judul Kasus *</label>
                <input
                  type="text"
                  required
                  value={sidangForm.judul}
                  onChange={(e) => setSidangForm({ ...sidangForm, judul: e.target.value })}
                  placeholder="Contoh: Sengketa Batas Tanah RW 02"
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Sidang *</label>
                <input
                  type="date"
                  required
                  value={sidangForm.tanggal}
                  onChange={(e) => setSidangForm({ ...sidangForm, tanggal: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Deskripsi Kasus *</label>
                <textarea
                  required
                  value={sidangForm.deskripsi}
                  onChange={(e) => setSidangForm({ ...sidangForm, deskripsi: e.target.value })}
                  placeholder="Jelaskan detail kasus, pihak terkait, dan kronologi..."
                  className="w-full border rounded-lg p-2.5 text-sm h-24"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Keputusan</label>
                <textarea
                  value={sidangForm.keputusan}
                  onChange={(e) => setSidangForm({ ...sidangForm, keputusan: e.target.value })}
                  placeholder="Hasil keputusan sidang (jika sudah)"
                  className="w-full border rounded-lg p-2.5 text-sm h-16"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsSidangModalOpen(false)}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-[#ef4444] hover:bg-[#dc2626] text-white"
                >
                  {loading ? "⌛ Menyimpan..." : "Catat Sidang"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
