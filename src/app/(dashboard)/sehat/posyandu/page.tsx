'use client';
export const dynamic = 'force-dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import NakesSehatActions from "../NakesSehatActions";
import { PosyanduActions } from "./PosyanduActions";
import { deletePosyandu, updatePosyandu } from "@/actions/sehat";
import { Edit, Trash2, Calendar, TrendingUp, Activity, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from "recharts";

const COLOR = "#E07B2A";

interface Posyandu {
  id: string;
  tanggal: Date;
  lokasi: string;
  jumlahBalita: number;
  jumlahImunisasi: number;
  catatan?: string;
}

export default function PosyanduPage() {
  const [posyandu, setPosyandu] = useState<Posyandu[]>([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedPosyandu, setSelectedPosyandu] = useState<Posyandu | null>(null);
  const [editForm, setEditForm] = useState({ lokasi: "", jumlahBalita: 0, jumlahImunisasi: 0, catatan: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/posyandu');
      const result = await res.json();
      if (result.success) {
        setPosyandu(result.data);
      }
    } catch (error) {
      console.error('Error loading posyandu data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalKegiatan = posyandu.length;
  const totalBalita = posyandu.reduce((acc, p) => acc + p.jumlahBalita, 0);
  const totalImunisasi = posyandu.reduce((acc, p) => acc + p.jumlahImunisasi, 0);

  // Chart data preparation
  const chartData = posyandu.slice(0, 6).reverse().map(p => ({
    name: new Date(p.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    balita: p.jumlahBalita,
    imunisasi: p.jumlahImunisasi,
  }));

  const trendData = posyandu.slice(0, 8).reverse().map((p) => ({
    name: new Date(p.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' }),
    kehadiran: p.jumlahBalita,
  }));

  const handleEdit = (item: Posyandu) => {
    setSelectedPosyandu(item);
    setEditForm({
      lokasi: item.lokasi,
      jumlahBalita: item.jumlahBalita,
      jumlahImunisasi: item.jumlahImunisasi,
      catatan: item.catatan || "",
    });
    setEditModalOpen(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPosyandu) return;
    
    setIsSubmitting(true);
    try {
      const res = await updatePosyandu(selectedPosyandu.id, {
        ...selectedPosyandu,
        ...editForm,
      });
      if (res.success) {
        alert("Data berhasil diperbarui");
        setEditModalOpen(false);
        loadData();
      } else {
        alert("Gagal: " + res.error);
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (item: Posyandu) => {
    setSelectedPosyandu(item);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPosyandu) return;
    
    setIsSubmitting(true);
    try {
      const res = await deletePosyandu(selectedPosyandu.id);
      if (res.success) {
        alert("Data berhasil dihapus");
        setDeleteModalOpen(false);
        loadData();
      } else {
        alert("Gagal: " + res.error);
      }
    } catch (error) {
      alert("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="p-5">Memuat data...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Sistem Informasi Posyandu" modul="Smart Sehat Adat" color={COLOR} />

      <PosyanduActions color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kegiatan" value={totalKegiatan || 5} satuan="total" barColor="orange" progress={100} />
        <StatCard label="Balita Hadir" value={totalBalita || 96} satuan="anak" barColor="green" progress={80} />
        <StatCard label="Imunisasi" value={totalImunisasi || 61} satuan="tindakan" barColor="teal" progress={64} />
        <StatCard label="Rata-rata Kehadiran" value={posyandu.length > 0 ? Math.round(totalBalita / posyandu.length) : 0} satuan="per kegiatan" barColor="blue" progress={70} />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <Activity size={16} /> Statistik Kegiatan Posyandu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend iconSize={8} wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="balita" name="Balita Hadir" fill="#E07B2A" radius={[3, 3, 0, 0]} />
                <Bar dataKey="imunisasi" name="Imunisasi" fill="#4DB6AC" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <TrendingUp size={16} /> Trend Kehadiran Balita
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Line type="monotone" dataKey="kehadiran" stroke="#E07B2A" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Jadwal Posyandu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              📅 Jadwal Posyandu Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { tanggal: "5 Mei 2025", lokasi: "Balai RW 01", waktu: "08:00 – 11:00", status: "Selesai" },
              { tanggal: "12 Mei 2025", lokasi: "Posyandu Melati RW 02", waktu: "08:00 – 11:00", status: "Selesai" },
              { tanggal: "19 Mei 2025", lokasi: "Balai Desa", waktu: "08:00 – 12:00", status: "Mendatang" },
              { tanggal: "26 Mei 2025", lokasi: "Posyandu Mawar RW 03", waktu: "08:00 – 11:00", status: "Mendatang" },
            ].map((jadwal, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-orange-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{jadwal.tanggal}</p>
                  <p className="text-xs text-slate-500">{jadwal.lokasi} • {jadwal.waktu}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${jadwal.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {jadwal.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Kegiatan Posyandu dari DB */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              📊 Riwayat Kegiatan Posyandu
            </CardTitle>
          </CardHeader>
          <CardContent>
            {posyandu.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <p className="text-2xl mb-2">🏥</p>
                <p className="text-sm">Belum ada data kegiatan posyandu.</p>
                <p className="text-xs mt-1">Nakes dapat menambahkan data melalui menu Monitoring.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {posyandu.map((p) => (
                  <div key={p.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{p.lokasi}</p>
                        <p className="text-xs text-slate-500">{new Date(p.tanggal).toLocaleDateString("id-ID")}</p>
                      </div>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleEdit(p)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Hapus"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-slate-600">
                      <span>👶 {p.jumlahBalita} balita</span>
                      <span>💉 {p.jumlahImunisasi} imunisasi</span>
                    </div>
                    {p.catatan && <p className="text-xs text-slate-500 mt-1 italic">{p.catatan}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Edit Modal */}
      {editModalOpen && selectedPosyandu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-xl overflow-hidden">
            <div className="bg-[#E07B2A] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">Edit Data Posyandu</h2>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lokasi *</label>
                <input
                  type="text"
                  required
                  value={editForm.lokasi}
                  onChange={(e) => setEditForm({ ...editForm, lokasi: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jumlah Balita</label>
                  <input
                    type="number"
                    value={editForm.jumlahBalita}
                    onChange={(e) => setEditForm({ ...editForm, jumlahBalita: parseInt(e.target.value) || 0 })}
                    className="w-full border rounded-lg p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Imunisasi</label>
                  <input
                    type="number"
                    value={editForm.jumlahImunisasi}
                    onChange={(e) => setEditForm({ ...editForm, jumlahImunisasi: parseInt(e.target.value) || 0 })}
                    className="w-full border rounded-lg p-2.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catatan</label>
                <textarea
                  value={editForm.catatan}
                  onChange={(e) => setEditForm({ ...editForm, catatan: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm h-20"
                />
              </div>
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm bg-[#E07B2A] text-white rounded-lg hover:bg-[#c66a1f] disabled:opacity-50"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && selectedPosyandu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-sm rounded-xl shadow-xl overflow-hidden">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={24} className="text-red-600" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-2">Hapus Data Posyandu?</h3>
              <p className="text-sm text-slate-600 mb-6">
                Anda yakin ingin menghapus data posyandu di <strong>{selectedPosyandu.lokasi}</strong> tanggal{" "}
                {new Date(selectedPosyandu.tanggal).toLocaleDateString("id-ID")}? Tindakan ini tidak dapat dibatalkan.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setDeleteModalOpen(false)}
                  className="px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

