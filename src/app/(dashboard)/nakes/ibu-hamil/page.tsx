'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search, Plus, Edit, Trash2 } from 'lucide-react';

const COLOR = '#e65100';

interface Monitoring {
  id: string;
  wargaId: string;
  tanggal: Date;
  beratBadan?: number;
  tinggiBadan?: number;
  tensiSistolik?: number;
  tensiDiastolik?: number;
  suhu?: number;
  alert: boolean;
  warga?: {
    id: string;
    nik: string;
    nama: string;
  };
}

export default function IbuHamilPage() {
  const [search, setSearch] = useState('');
  const [dataIbu, setDataIbu] = useState<Monitoring[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Monitoring | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/monitoring');
      const result = await res.json();
      if (result.success) setDataIbu(result.data);
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

  const handleEdit = (data: Monitoring) => {
    setEditingData(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const res = await fetch(`/api/monitoring?id=${id}`, { method: 'DELETE' });
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
      const res = await fetch('/api/monitoring', {
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

  const filtered = dataIbu.filter(i =>
    i.warga?.nama?.toLowerCase().includes(search.toLowerCase())
  );

  const alertCount = filtered.filter(i => i.alert).length;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pantauan Ibu Hamil" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Ibu Hamil Terdaftar" value={filtered.length} satuan="ibu" barColor="orange" progress={80} />
        <StatCard label="Normal" value={filtered.length - alertCount} satuan="ibu" barColor="green" progress={filtered.length > 0 ? ((filtered.length - alertCount) / filtered.length) * 100 : 0} />
        <StatCard label="Risiko Tinggi" value={alertCount} satuan="pantauan intensif" barColor="red" progress={filtered.length > 0 ? (alertCount / filtered.length) * 100 : 0} />
        <StatCard label="Monitoring Bulan Ini" value={filtered.length} satuan="catatan" barColor="blue" progress={50} />
      </div>

      <div className="grid grid-cols-1 gap-5">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Heart size={16} className="text-red-500" /> Database Ibu Hamil & Pantauan Kesehatan Ibu-Anak (KIA)
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari ibu..."
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
                      <th className="pb-2 pr-4">NIK</th>
                      <th className="pb-2 pr-4">Nama Ibu</th>
                      <th className="pb-2 pr-4">Tanggal</th>
                      <th className="pb-2 pr-4">BB/TB</th>
                      <th className="pb-2 pr-4">Tensi</th>
                      <th className="pb-2 pr-4">Suhu</th>
                      <th className="pb-2">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((item, i) => (
                      <tr key={item.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                        <td className="py-2.5 pr-4 text-center text-slate-400 font-mono text-xs">{i + 1}</td>
                        <td className="py-2.5 pr-4 font-mono text-xs text-slate-600">{item.warga?.nik || '-'}</td>
                        <td className="py-2.5 pr-4 font-semibold text-slate-700">{item.warga?.nama || '-'}</td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {new Date(item.tanggal).toLocaleDateString('id-ID')}
                        </td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {item.beratBadan && item.tinggiBadan ? `${item.beratBadan}kg / ${item.tinggiBadan}cm` : '-'}
                        </td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {item.tensiSistolik && item.tensiDiastolik ? `${item.tensiSistolik}/${item.tensiDiastolik}` : '-'}
                        </td>
                        <td className="py-2.5 pr-4 text-slate-600 text-xs">
                          {item.suhu ? `${item.suhu}°C` : '-'}
                        </td>
                        <td className="py-2.5 pr-4">
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id)}
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
              <h2 className="font-bold text-lg">{editingData ? 'Edit Data Ibu Hamil' : 'Tambah Data Ibu Hamil'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">NIK Ibu *</label>
                <input
                  type="text"
                  required
                  value={formData.wargaId || ''}
                  onChange={e => setFormData({ ...formData, wargaId: e.target.value })}
                  placeholder="Masukkan NIK (16 digit)"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
                <p className="text-[10px] text-slate-400 mt-1">Jika NIK belum terdaftar, data warga akan dibuat otomatis</p>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nama Ibu *</label>
                <input
                  type="text"
                  required
                  value={formData.nama || ''}
                  onChange={e => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Nama lengkap ibu hamil"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tempat Lahir</label>
                <input
                  type="text"
                  value={formData.tempatLahir || ''}
                  onChange={e => setFormData({ ...formData, tempatLahir: e.target.value })}
                  placeholder="Kota kelahiran"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Lahir</label>
                <input
                  type="date"
                  value={formData.tanggalLahir ? new Date(formData.tanggalLahir).toISOString().split('T')[0] : ''}
                  onChange={e => setFormData({ ...formData, tanggalLahir: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jenis Kelamin</label>
                <select
                  value={formData.jenisKelamin || 'P'}
                  onChange={e => setFormData({ ...formData, jenisKelamin: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  <option value="L">Laki-laki</option>
                  <option value="P">Perempuan</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal Pemeriksaan</label>
                <input
                  type="date"
                  value={formData.tanggal ? new Date(formData.tanggal).toISOString().split('T')[0] : ''}
                  onChange={e => setFormData({ ...formData, tanggal: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Berat Badan (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.beratBadan || ''}
                    onChange={e => setFormData({ ...formData, beratBadan: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tinggi Badan (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.tinggiBadan || ''}
                    onChange={e => setFormData({ ...formData, tinggiBadan: parseFloat(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tensi Sistolik</label>
                  <input
                    type="number"
                    value={formData.tensiSistolik || ''}
                    onChange={e => setFormData({ ...formData, tensiSistolik: parseInt(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tensi Diastolik</label>
                  <input
                    type="number"
                    value={formData.tensiDiastolik || ''}
                    onChange={e => setFormData({ ...formData, tensiDiastolik: parseInt(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Suhu (°C)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.suhu || ''}
                  onChange={e => setFormData({ ...formData, suhu: parseFloat(e.target.value) })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
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
