'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Calendar, Search, Plus, Edit, Trash2, CheckCircle } from 'lucide-react';

const COLOR = '#e65100';

interface Posyandu {
  id: string;
  tanggal: Date;
  lokasi: string;
  jumlahBalita: number;
  jumlahImunisasi: number;
  catatan?: string;
}

export default function PosyanduPage() {
  const [search, setSearch] = useState('');
  const [dataPosyandu, setDataPosyandu] = useState<Posyandu[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<Posyandu | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/posyandu');
      const result = await res.json();
      if (result.success) setDataPosyandu(result.data);
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

  const handleEdit = (data: Posyandu) => {
    setEditingData(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const res = await fetch(`/api/posyandu?id=${id}`, { method: 'DELETE' });
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
      const res = await fetch('/api/posyandu', {
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

  const filtered = dataPosyandu.filter(p =>
    p.lokasi?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Posyandu & KIA" modul="Nakes / Kader Posyandu" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Jadwal Posyandu" value={filtered.length} satuan="kegiatan" barColor="orange" progress={100} />
        <StatCard label="Total Balita" value={filtered.reduce((sum, p) => sum + p.jumlahBalita, 0)} satuan="balita" barColor="green" progress={100} />
        <StatCard label="Total Imunisasi" value={filtered.reduce((sum, p) => sum + p.jumlahImunisasi, 0)} satuan="imunisasi" barColor="blue" progress={92} />
        <StatCard label="Cakupan Imunisasi" value={filtered.length > 0 ? Math.round((filtered.reduce((sum, p) => sum + p.jumlahImunisasi, 0) / filtered.reduce((sum, p) => sum + p.jumlahBalita, 1)) * 100) : 0} satuan="%" barColor="purple" progress={filtered.length > 0 ? Math.round((filtered.reduce((sum, p) => sum + p.jumlahImunisasi, 0) / filtered.reduce((sum, p) => sum + p.jumlahBalita, 1)) * 100) : 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
                <Calendar size={16} /> Jadwal Operasional Posyandu Bulan Berjalan
              </CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Cari lokasi..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 w-48"
                  />
                </div>
                <button
                  onClick={handleAdd}
                  className="px-3 py-1.5 text-xs bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-1"
                >
                  <Plus size={12} /> Tambah Jadwal
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {loading ? (
              <div className="text-center py-8 text-slate-400">Memuat data...</div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-8 text-slate-400">Data tidak ditemukan</div>
            ) : (
              filtered.map((pos, i) => (
                <div key={pos.id} className="p-4 border rounded-xl bg-slate-50/50 hover:shadow-sm transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs font-bold text-orange-700 font-mono block mb-1">
                        {new Date(pos.tanggal).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <p className="font-bold text-slate-800 text-sm md:text-base">{pos.lokasi}</p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleEdit(pos)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(pos.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-slate-500 text-[11px] mt-2 font-mono">
                    <span>Balita: {pos.jumlahBalita}</span>
                    <span className="hidden md:inline">•</span>
                    <span>Imunisasi: {pos.jumlahImunisasi}</span>
                    {pos.catatan && (
                      <>
                        <span className="hidden md:inline">•</span>
                        <span className="text-slate-600">{pos.catatan}</span>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2" style={{ color: COLOR }}>
              <CheckCircle size={16} /> Alat Ukur Terstandar (SDGs)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-slate-600 leading-normal">
            <p>Untuk menekan stunting secara presisi, Posyandu dilengkapi alat ukur berstandar Kemenkes RI:</p>
            <div className="p-3 bg-orange-50 border border-orange-100 rounded-lg">
              <p className="font-bold text-orange-800 mb-1">Daftar Alat</p>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>Antropometri Kit Digital</li>
                <li>Timbangan Bayi (Baby Scale)</li>
                <li>Alat Ukur Tinggi Badan (Stadiometer)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#e65100] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">{editingData ? 'Edit Jadwal Posyandu' : 'Tambah Jadwal Posyandu'}</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal *</label>
                <input
                  type="date"
                  required
                  value={formData.tanggal ? new Date(formData.tanggal).toISOString().split('T')[0] : ''}
                  onChange={e => setFormData({ ...formData, tanggal: e.target.value })}
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Lokasi *</label>
                <input
                  type="text"
                  required
                  value={formData.lokasi || ''}
                  onChange={e => setFormData({ ...formData, lokasi: e.target.value })}
                  placeholder="Lokasi posyandu"
                  className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jumlah Balita</label>
                  <input
                    type="number"
                    value={formData.jumlahBalita || 0}
                    onChange={e => setFormData({ ...formData, jumlahBalita: parseInt(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jumlah Imunisasi</label>
                  <input
                    type="number"
                    value={formData.jumlahImunisasi || 0}
                    onChange={e => setFormData({ ...formData, jumlahImunisasi: parseInt(e.target.value) })}
                    className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catatan</label>
                <textarea
                  value={formData.catatan || ''}
                  onChange={e => setFormData({ ...formData, catatan: e.target.value })}
                  placeholder="Catatan tambahan"
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
