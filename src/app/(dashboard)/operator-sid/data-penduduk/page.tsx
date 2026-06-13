"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { Users, Search, Filter, Download, UserPlus, Edit, Trash2 } from "lucide-react";
import { createWarga, updateWarga, deleteWarga, updateWargaStatus } from "@/actions/data-desa";

const COLOR = "#00695c";

interface Warga {
  id: string;
  nik: string;
  nama: string;
  alamat: string;
  status: string;
  tempatLahir?: string;
  tanggalLahir?: Date;
  jenisKelamin?: string;
  noHp?: string;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Aktif: "bg-green-100 text-green-700",
    Pindah: "bg-yellow-100 text-yellow-700",
    Meninggal: "bg-red-100 text-red-700",
    Baru: "bg-blue-100 text-blue-700",
    Review: "bg-purple-100 text-purple-700",
  };
  return (
    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${map[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
  );
}

export default function DataPendudukPage() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [dataWarga, setDataWarga] = useState<Warga[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWarga, setEditingWarga] = useState<Warga | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    nik: "",
    nama: "",
    alamat: "",
    tempatLahir: "",
    tanggalLahir: "",
    jenisKelamin: "L",
    noHp: "",
    status: "Aktif",
  });

  // Load data from database
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch("/api/warga");
      const result = await res.json();
      if (result.success) {
        // Deduplicate data at client level
        const uniqueData = new Map();
        result.data.forEach((w: Warga) => {
          uniqueData.set(w.id, w);
        });
        setDataWarga(Array.from(uniqueData.values()));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = dataWarga.filter((w) => {
    const matchSearch = w.nama.toLowerCase().includes(search.toLowerCase()) || w.nik.includes(search);
    const matchStatus = filterStatus === "Semua" || w.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAdd = () => {
    setEditingWarga(null);
    setFormData({
      nik: "",
      nama: "",
      alamat: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "L",
      noHp: "",
      status: "Aktif",
    });
    setIsModalOpen(true);
  };

  const handleEdit = (warga: Warga) => {
    setEditingWarga(warga);
    setFormData({
      nik: warga.nik,
      nama: warga.nama,
      alamat: warga.alamat,
      tempatLahir: warga.tempatLahir || "",
      tanggalLahir: warga.tanggalLahir ? new Date(warga.tanggalLahir).toISOString().split('T')[0] : "",
      jenisKelamin: warga.jenisKelamin || "L",
      noHp: warga.noHp || "",
      status: warga.status,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
      const res = await deleteWarga(id);
      if (res.success) {
        alert("Data berhasil dihapus");
        loadData();
      } else {
        alert("Gagal menghapus: " + res.error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double submission
    setIsSubmitting(true);

    const res = editingWarga
      ? await updateWarga(editingWarga.id, formData)
      : await createWarga(formData);

    if (res.success) {
      alert(editingWarga ? "Data berhasil diperbarui" : "Data berhasil ditambahkan");
      setIsModalOpen(false);
      await loadData();
    } else {
      alert("Gagal: " + res.error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Penduduk" modul="Operator SID" color={COLOR} />

      {/* SEARCH & FILTER + TABLE */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Users size={16} /> Tabel Data Penduduk
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleAdd}
                className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-1"
              >
                <UserPlus size={12} /> Tambah Data
              </button>
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari nama/NIK..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-48"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
              >
                <option value="Semua">Semua Status</option>
                <option value="Aktif">Aktif</option>
                <option value="Pindah">Pindah</option>
                <option value="Meninggal">Meninggal</option>
              </select>
              <button className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-1">
                <Download size={12} /> Export
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-teal-100">
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">No</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">NIK</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Nama</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Alamat</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Status</th>
                  <th className="text-left py-2 px-3 text-xs font-bold text-slate-500">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((w, i) => (
                  <tr key={w.id} className={`border-b border-slate-100 hover:bg-teal-50/50 transition-colors ${i % 2 === 0 ? "bg-slate-50/50" : ""}`}>
                    <td className="py-2.5 px-3 text-slate-400 text-xs">{i + 1}</td>
                    <td className="py-2.5 px-3 font-mono text-xs text-slate-600">{w.nik}</td>
                    <td className="py-2.5 px-3 font-semibold text-slate-700">{w.nama}</td>
                    <td className="py-2.5 px-3 text-slate-600 text-xs">{w.alamat}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={w.status} /></td>
                    <td className="py-2.5 px-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(w)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(w.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400 text-sm">Data tidak ditemukan</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-slate-400 mt-3">Menampilkan {filtered.length} dari {dataWarga.length} data penduduk</p>
        </CardContent>
      </Card>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#00695c] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">{editingWarga ? "Edit Data Penduduk" : "Tambah Data Penduduk Baru"}</h2>
              <p className="text-teal-100 text-xs opacity-90">{editingWarga ? "Perbarui data penduduk yang ada" : "Masukkan data penduduk baru"}</p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">NIK *</label>
                  <input
                    type="text"
                    required
                    value={formData.nik}
                    onChange={(e) => setFormData({ ...formData, nik: e.target.value })}
                    placeholder="16 digit NIK"
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    placeholder="Nama lengkap"
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Alamat *</label>
                <textarea
                  required
                  value={formData.alamat}
                  onChange={(e) => setFormData({ ...formData, alamat: e.target.value })}
                  placeholder="Alamat lengkap"
                  className="w-full border rounded-lg p-2.5 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-teal-300"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tempat Lahir</label>
                  <input
                    type="text"
                    value={formData.tempatLahir}
                    onChange={(e) => setFormData({ ...formData, tempatLahir: e.target.value })}
                    placeholder="Tempat lahir"
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Lahir</label>
                  <input
                    type="date"
                    value={formData.tanggalLahir}
                    onChange={(e) => setFormData({ ...formData, tanggalLahir: e.target.value })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jenis Kelamin</label>
                  <select
                    value={formData.jenisKelamin}
                    onChange={(e) => setFormData({ ...formData, jenisKelamin: e.target.value })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  >
                    <option value="L">Laki-laki</option>
                    <option value="P">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">No. HP</label>
                  <input
                    type="text"
                    value={formData.noHp}
                    onChange={(e) => setFormData({ ...formData, noHp: e.target.value })}
                    placeholder="08xxxxxxxxxx"
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Pindah">Pindah</option>
                  <option value="Meninggal">Meninggal</option>
                  <option value="Baru">Baru</option>
                  <option value="Review">Review</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 text-sm bg-[#00695c] hover:bg-[#004d40] text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : (editingWarga ? "Simpan Perubahan" : "Simpan Data")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
