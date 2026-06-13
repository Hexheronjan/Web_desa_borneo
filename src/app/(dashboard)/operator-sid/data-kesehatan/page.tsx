'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import { Heart, Search, Filter, Download, UserPlus, Edit, Trash2, Activity, Calendar } from 'lucide-react';

const COLOR = '#00695c';

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

interface Posyandu {
  id: string;
  tanggal: Date;
  lokasi: string;
  jumlahBalita: number;
  jumlahImunisasi: number;
  catatan?: string;
}

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
  };
}

export default function DataKesehatanPage() {
  const [activeTab, setActiveTab] = useState<'monitoring' | 'posyandu' | 'stunting'>('monitoring');
  const [search, setSearch] = useState('');
  const [monitoringData, setMonitoringData] = useState<Monitoring[]>([]);
  const [posyanduData, setPosyanduData] = useState<Posyandu[]>([]);
  const [stuntingData, setStuntingData] = useState<Stunting[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'monitoring') {
        const res = await fetch('/api/monitoring');
        const result = await res.json();
        if (result.success) setMonitoringData(result.data);
      } else if (activeTab === 'posyandu') {
        const res = await fetch('/api/posyandu');
        const result = await res.json();
        if (result.success) setPosyanduData(result.data);
      } else if (activeTab === 'stunting') {
        const res = await fetch('/api/stunting');
        const result = await res.json();
        if (result.success) setStuntingData(result.data);
      }
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

  const handleEdit = (data: any) => {
    setEditingData(data);
    setFormData(data);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      const endpoint = activeTab === 'monitoring' ? '/api/monitoring' : 
                       activeTab === 'posyandu' ? '/api/posyandu' : '/api/stunting';
      const res = await fetch(`${endpoint}?id=${id}`, { method: 'DELETE' });
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
    const endpoint = activeTab === 'monitoring' ? '/api/monitoring' : 
                     activeTab === 'posyandu' ? '/api/posyandu' : '/api/stunting';
    const method = editingData ? 'PUT' : 'POST';
    
    try {
      const res = await fetch(endpoint, {
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

  const filteredData = () => {
    const data = activeTab === 'monitoring' ? monitoringData :
                  activeTab === 'posyandu' ? posyanduData : stuntingData;
    if (!search) return data;
    return data.filter((item: any) => {
      if (activeTab === 'posyandu') {
        return item.lokasi?.toLowerCase().includes(search.toLowerCase());
      }
      return item.warga?.nama?.toLowerCase().includes(search.toLowerCase()) ||
             item.warga?.nik?.includes(search);
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Data Kesehatan" modul="Operator SID" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Pasien Terpantau" value={monitoringData.length} satuan="warga" barColor="teal" progress={75} />
        <StatCard label="Total Balita" value={stuntingData.length} satuan="balita" barColor="blue" progress={20} />
        <StatCard label="Jadwal Posyandu" value={posyanduData.length} satuan="kegiatan" barColor="red" progress={4} />
        <StatCard label="Monitoring Bulan Ini" value={monitoringData.length} satuan="catatan" barColor="purple" progress={13} />
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab('monitoring')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  activeTab === 'monitoring' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Monitoring Kesehatan
              </button>
              <button
                onClick={() => setActiveTab('posyandu')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  activeTab === 'posyandu' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Jadwal Posyandu
              </button>
              <button
                onClick={() => setActiveTab('stunting')}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  activeTab === 'stunting' ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Data Stunting
              </button>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300 w-36 md:w-48"
                />
              </div>
              <button
                onClick={handleAdd}
                className="px-3 py-1.5 text-xs bg-teal-600 text-white rounded-lg hover:bg-teal-700 flex items-center gap-1"
              >
                <UserPlus size={12} /> Tambah Data
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
                  <tr className="text-left text-xs text-slate-500 border-b">
                    {activeTab === 'monitoring' && (
                      <>
                        <th className="pb-2 pr-4">No</th>
                        <th className="pb-2 pr-4">Nama Warga</th>
                        <th className="pb-2 pr-4">Tanggal</th>
                        <th className="pb-2 pr-4">BB/TB</th>
                        <th className="pb-2 pr-4">Tensi</th>
                        <th className="pb-2 pr-4">Suhu</th>
                        <th className="pb-2">Aksi</th>
                      </>
                    )}
                    {activeTab === 'posyandu' && (
                      <>
                        <th className="pb-2 pr-4">No</th>
                        <th className="pb-2 pr-4">Tanggal</th>
                        <th className="pb-2 pr-4">Lokasi</th>
                        <th className="pb-2 pr-4">Balita</th>
                        <th className="pb-2 pr-4">Imunisasi</th>
                        <th className="pb-2">Aksi</th>
                      </>
                    )}
                    {activeTab === 'stunting' && (
                      <>
                        <th className="pb-2 pr-4">No</th>
                        <th className="pb-2 pr-4">Nama Balita</th>
                        <th className="pb-2 pr-4">Tanggal</th>
                        <th className="pb-2 pr-4">BB/TB</th>
                        <th className="pb-2 pr-4">Umur</th>
                        <th className="pb-2 pr-4">Kategori</th>
                        <th className="pb-2">Aksi</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {filteredData().map((item: any, i) => (
                    <tr key={item.id} className={`border-b last:border-0 ${i % 2 === 0 ? 'bg-slate-50/50' : ''}`}>
                      <td className="py-2.5 pr-4 text-slate-400 text-xs">{i + 1}</td>
                      {activeTab === 'monitoring' && (
                        <>
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
                        </>
                      )}
                      {activeTab === 'posyandu' && (
                        <>
                          <td className="py-2.5 pr-4 text-slate-600 text-xs">
                            {new Date(item.tanggal).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-2.5 pr-4 font-semibold text-slate-700">{item.lokasi}</td>
                          <td className="py-2.5 pr-4 text-slate-600 text-xs">{item.jumlahBalita}</td>
                          <td className="py-2.5 pr-4 text-slate-600 text-xs">{item.jumlahImunisasi}</td>
                        </>
                      )}
                      {activeTab === 'stunting' && (
                        <>
                          <td className="py-2.5 pr-4 font-semibold text-slate-700">{item.warga?.nama || '-'}</td>
                          <td className="py-2.5 pr-4 text-slate-600 text-xs">
                            {new Date(item.tanggal).toLocaleDateString('id-ID')}
                          </td>
                          <td className="py-2.5 pr-4 text-slate-600 text-xs">
                            {item.bb}kg / {item.tb}cm
                          </td>
                          <td className="py-2.5 pr-4 text-slate-600 text-xs">{item.umurBulan} bulan</td>
                          <td className="py-2.5 pr-4">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              item.kategori === 'Normal' ? 'bg-green-100 text-green-700' :
                              item.kategori === 'RisikoSedang' ? 'bg-amber-100 text-amber-700' :
                              'bg-red-100 text-red-700'
                            }`}>
                              {item.kategori}
                            </span>
                          </td>
                        </>
                      )}
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
                  {filteredData().length === 0 && (
                    <tr>
                      <td colSpan={activeTab === 'stunting' ? 7 : activeTab === 'posyandu' ? 6 : 7} className="py-8 text-center text-slate-400 text-sm">
                        Data tidak ditemukan
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* MODAL FORM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-[#00695c] px-6 py-4 text-white">
              <h2 className="font-bold text-lg">
                {editingData ? 'Edit Data' : 'Tambah Data'} {activeTab === 'monitoring' ? 'Monitoring' : activeTab === 'posyandu' ? 'Posyandu' : 'Stunting'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              {activeTab === 'monitoring' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">NIK Warga *</label>
                    <input
                      type="text"
                      required
                      value={formData.wargaId || ''}
                      onChange={e => setFormData({ ...formData, wargaId: e.target.value })}
                      placeholder="Masukkan NIK"
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={formData.tanggal ? new Date(formData.tanggal).toISOString().split('T')[0] : ''}
                      onChange={e => setFormData({ ...formData, tanggal: e.target.value })}
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tinggi Badan (cm)</label>
                      <input
                        type="number"
                        step="0.1"
                        value={formData.tinggiBadan || ''}
                        onChange={e => setFormData({ ...formData, tinggiBadan: parseFloat(e.target.value) })}
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tensi Diastolik</label>
                      <input
                        type="number"
                        value={formData.tensiDiastolik || ''}
                        onChange={e => setFormData({ ...formData, tensiDiastolik: parseInt(e.target.value) })}
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>
                </>
              )}
              {activeTab === 'posyandu' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal *</label>
                    <input
                      type="date"
                      required
                      value={formData.tanggal ? new Date(formData.tanggal).toISOString().split('T')[0] : ''}
                      onChange={e => setFormData({ ...formData, tanggal: e.target.value })}
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jumlah Balita</label>
                      <input
                        type="number"
                        value={formData.jumlahBalita || 0}
                        onChange={e => setFormData({ ...formData, jumlahBalita: parseInt(e.target.value) })}
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Jumlah Imunisasi</label>
                      <input
                        type="number"
                        value={formData.jumlahImunisasi || 0}
                        onChange={e => setFormData({ ...formData, jumlahImunisasi: parseInt(e.target.value) })}
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Catatan</label>
                    <textarea
                      value={formData.catatan || ''}
                      onChange={e => setFormData({ ...formData, catatan: e.target.value })}
                      placeholder="Catatan tambahan"
                      className="w-full border rounded-lg p-2.5 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>
                </>
              )}
              {activeTab === 'stunting' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">NIK Balita *</label>
                    <input
                      type="text"
                      required
                      value={formData.wargaId || ''}
                      onChange={e => setFormData({ ...formData, wargaId: e.target.value })}
                      placeholder="Masukkan NIK balita"
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Tanggal</label>
                    <input
                      type="date"
                      value={formData.tanggal ? new Date(formData.tanggal).toISOString().split('T')[0] : ''}
                      onChange={e => setFormData({ ...formData, tanggal: e.target.value })}
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
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
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Z-Score</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.zScore || ''}
                        onChange={e => setFormData({ ...formData, zScore: parseFloat(e.target.value) })}
                        className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Kategori</label>
                    <select
                      value={formData.kategori || 'Normal'}
                      onChange={e => setFormData({ ...formData, kategori: e.target.value })}
                      className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-300"
                    >
                      <option value="Normal">Normal</option>
                      <option value="RisikoSedang">Risiko Sedang</option>
                      <option value="RisikoTinggi">Risiko Tinggi</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Rekomendasi</label>
                    <textarea
                      value={formData.rekomendasi || ''}
                      onChange={e => setFormData({ ...formData, rekomendasi: e.target.value })}
                      placeholder="Rekomendasi tindak lanjut"
                      className="w-full border rounded-lg p-2.5 text-sm h-20 focus:outline-none focus:ring-2 focus:ring-teal-300"
                    />
                  </div>
                </>
              )}
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
