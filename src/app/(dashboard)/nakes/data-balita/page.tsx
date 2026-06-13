'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search, Plus, Edit, Trash2 } from 'lucide-react';

const COLOR = '#e65100';

interface Stunting {
  id: string;
  wargaId: string;
  tanggal: Date;
  bb: number;
  tb: number;
  umurBulan: number;
  zScore: number;
  kategori: string;
  rekomendasi?: string;
  warga?: {
    id: string;
    nik: string;
    nama: string;
    tempatLahir: string;
    tanggalLahir: Date;
  };
}

export default function DataBalitaPage() {
  const [search, setSearch] = useState('');
  const [dataBalita, setDataBalita] = useState<Stunting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Stunting | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stunting');
      const result = await res.json();
      if (result.success) setDataBalita(result.data);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingData(null);
    setFormData({});
    setIsModalOpen(true);
  };

  const handleEdit = (data: Stunting) => {
    setEditingData(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const res = await fetch(`/api/stunting?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        alert('Data berhasil dihapus');
        loadData();
      } else {
        alert('Gagal menghapus data');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const method = editingData ? 'PUT' : 'POST';
    
    try {
      const res = await fetch('/api/stunting', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingData ? { ...formData, id: editingData.id } : formData),
      });
      const result = await res.json();
      if (result.success) {
        alert(editingData ? 'Data berhasil diperbarui' : 'Data berhasil ditambahkan');
        setIsModalOpen(false);
        loadData();
      } else {
        alert('Gagal: ' + result.error);
      }
    } catch (error) {
      alert('Terjadi kesalahan');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filtered = dataBalita.filter(b =>
    b.warga?.nama?.toLowerCase().includes(search.toLowerCase()) ||
    b.kategori?.toLowerCase().includes(search.toLowerCase())
  );

  const normalCount = filtered.filter(b => b.kategori === 'Normal').length;
  const stuntingCount = filtered.filter(b => b.kategori === 'RisikoTinggi').length;
  const riskCount = filtered.filter(b => b.kategori === 'RisikoSedang').length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Balita" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Balita Terdaftar" value={filtered.length} satuan="anak" barColor="orange" progress={90} />
        <StatCard label="Kondisi Normal" value={normalCount} satuan="anak" barColor="green" progress={filtered.length > 0 ? (normalCount / filtered.length) * 100 : 0} />
        <StatCard label="Risiko Stunting" value={stuntingCount} satuan="anak" barColor="red" progress={filtered.length > 0 ? (stuntingCount / filtered.length) * 100 : 0} />
        <StatCard label="Risiko Sedang" value={riskCount} satuan="anak" barColor="yellow" progress={filtered.length > 0 ? (riskCount / filtered.length) * 100 : 0} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Heart size={16} className="text-red-500" /> Database Gizi & Tumbuh Kembang Balita Desa
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari balita..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 w-48"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="px-3 py-1.5 text-xs bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-1"
                >
                  <Plus size={12} /> Tambah Data
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8 text-slate-400">Memuat data...</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-500 uppercase tracking-wider border-b">
                      <th className="pb-2 pr-4 text-center">No</th>
                      <th className="pb-2 pr-4">Nama Lengkap</th>
                      <th className="pb-2 pr-4">Tempat, Tanggal Lahir</th>
                      <th className="pb-2 pr-4">Berat Badan</th>
                      <th className="pb-2 pr-4">Tinggi Badan</th>
                      <th className="pb-2 pr-4">Umur</th>
                      <th className="pb-2 pr-4">Status Gizi</th>
                      <th className="pb-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((b, i) => (
                      <tr key={b.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 pr-4 font-semibold text-slate-700">{b.warga?.nama || '-'}</td>
                        <td className="py-2.5 pr-4 text-xs text-slate-500 font-mono">
                          {b.warga?.tempatLahir || '-'}, {b.warga?.tanggalLahir ? new Date(b.warga.tanggalLahir).toLocaleDateString('id-ID') : '-'}
                        </td>
                        <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{b.bb} kg</td>
                        <td className="py-2.5 pr-4 text-xs font-mono font-bold text-slate-600">{b.tb} cm</td>
                        <td className="py-2.5 pr-4 text-xs font-mono text-slate-600">{b.umurBulan} bulan</td>
                        <td className="py-2.5 pr-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            b.kategori === 'Normal' ? 'bg-green-100 text-green-700' :
                            b.kategori === 'RisikoTinggi' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {b.kategori === 'RisikoTinggi' ? 'Stunting' : b.kategori === 'RisikoSedang' ? 'Risiko Sedang' : 'Normal'}
                          </span>
                        </td>
                        <td className="py-2.5 pr-4">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(b)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(b.id)}
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
                        <td colSpan={8} className="py-8 text-center text-slate-400 text-sm">Data tidak ditemukan</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#e65100] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">{editingData ? 'Edit Data Balita' : 'Tambah Data Balita'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">NIK Balita *</label>
                <input
                  type="text"
                  required
                  value={formData.wargaId || ''}
                  onChange={e => setFormData({ ...formData, wargaId: e.target.value })}
                  placeholder="Masukkan NIK (harus ada di Data Penduduk)"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <p className="text-[10px] text-slate-400 mt-1">NIK harus terdaftar di menu Data Penduduk</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal</label>
                <input
                  type="date"
                  value={formData.tanggal ? new Date(formData.tanggal).toISOString().split('T')[0] : ''}
                  onChange={e => setFormData({ ...formData, tanggal: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Berat Badan (kg) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.bb || ''}
                    onChange={e => setFormData({ ...formData, bb: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tinggi Badan (cm) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.tb || ''}
                    onChange={e => setFormData({ ...formData, tb: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Umur (bulan) *</label>
                  <input
                    type="number"
                    required
                    value={formData.umurBulan || ''}
                    onChange={e => setFormData({ ...formData, umurBulan: parseInt(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Z-Score</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.zScore || ''}
                    onChange={e => setFormData({ ...formData, zScore: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                <select
                  value={formData.kategori || 'Normal'}
                  onChange={e => setFormData({ ...formData, kategori: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="Normal">Normal</option>
                  <option value="RisikoSedang">Risiko Sedang</option>
                  <option value="RisikoTinggi">Risiko Tinggi (Stunting)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rekomendasi</label>
                <textarea
                  value={formData.rekomendasi || ''}
                  onChange={e => setFormData({ ...formData, rekomendasi: e.target.value })}
                  placeholder="Rekomendasi tindak lanjut"
                  className="w-full border rounded-lg p-2.5 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
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
                  className="px-6 py-2 text-sm bg-[#e65100] hover:bg-[#bf360c] text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
