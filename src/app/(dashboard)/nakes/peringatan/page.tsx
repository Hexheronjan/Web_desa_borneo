'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { AlertTriangle, CheckCircle2, Clock, ShieldAlert, Plus, Eye, Send, FileText } from 'lucide-react';

const COLOR = '#e65100';

interface PeringatanItem {
  id: number;
  jenisMasalah: string;
  tingkatPrioritas: 'Tinggi' | 'Sedang' | 'Rendah';
  sumber: string;
  penanggungJawab: string;
  batasWaktu: string;
  status: 'Baru' | 'Dalam Proses' | 'Selesai';
  buktiPenyelesaian?: string;
}

const INITIAL_PERINGATAN: PeringatanItem[] = [
  {
    id: 1,
    jenisMasalah: 'Data Posyandu belum diperbarui (terlambat 2 hari)',
    tingkatPrioritas: 'Tinggi',
    sumber: 'Sistem Posyandu Digital',
    penanggungJawab: 'Tenaga Kesehatan / Bidan Desa',
    batasWaktu: '24 Juli 2026',
    status: 'Baru',
  },
  {
    id: 2,
    jenisMasalah: '15 Ibu hamil belum menerima layanan pemeriksaan ANC rutin',
    tingkatPrioritas: 'Tinggi',
    sumber: 'Data Ibu & Anak (KIA)',
    penanggungJawab: 'Kader Posyandu Dusun 1 & 2',
    batasWaktu: '28 Juli 2026',
    status: 'Dalam Proses',
    buktiPenyelesaian: 'Penyusunan jadwal kunjungan rumah sedang dilakukan oleh bidan desa.',
  },
  {
    id: 3,
    jenisMasalah: 'Program Posyandu Remaja melewati jadwal (tertunda 1 minggu)',
    tingkatPrioritas: 'Sedang',
    sumber: 'Program Kesehatan Desa',
    penanggungJawab: 'Kader Posyandu Remaja',
    batasWaktu: '30 Juli 2026',
    status: 'Dalam Proses',
  },
  {
    id: 4,
    jenisMasalah: 'Kelengkapan data Ibu & Anak Dusun 3 sangat rendah (hanya 68%)',
    tingkatPrioritas: 'Sedang',
    sumber: 'Kualitas Data Kesehatan',
    penanggungJawab: 'Tenaga Kesehatan + Operator',
    batasWaktu: '25 Juli 2026',
    status: 'Baru',
  },
  {
    id: 5,
    jenisMasalah: 'Kondisi prioritas stunting meningkat di Dusun 2 (tambah 3 balita)',
    tingkatPrioritas: 'Tinggi',
    sumber: 'Monitoring Stunting',
    penanggungJawab: 'Pemerintah Desa + Nakes',
    batasWaktu: '22 Juli 2026',
    status: 'Selesai',
    buktiPenyelesaian: 'Telah didistribusikan PMT pemulihan tambahan pada 20 Juli 2026.',
  },
];

export default function PeringatanTindakLanjutPage() {
  const [items, setItems] = useState<PeringatanItem[]>(INITIAL_PERINGATAN);
  const [selectedItem, setSelectedItem] = useState<PeringatanItem | null>(null);
  const [inputBukti, setInputBukti] = useState('');

  const handleUpdateStatus = (id: number, status: 'Dalam Proses' | 'Selesai', bukti?: string) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, status, buktiPenyelesaian: bukti || item.buktiPenyelesaian };
      }
      return item;
    }));
    setSelectedItem(null);
    setInputBukti('');
  };

  return (
    <div className="flex flex-col gap-5 text-xs pb-10">
      <PageTitle fitur="Peringatan dan Tindak Lanjut" modul="Tenaga Kesehatan" color={COLOR} />

      {/* Banner Peringatan Privasi */}
      <div className="p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-950 flex items-start gap-2">
        <ShieldAlert size={14} className="text-orange-700 flex-shrink-0 mt-0.5" />
        <p className="font-semibold leading-relaxed">
          <strong>Pusat Resolusi Tindak Lanjut:</strong> Panel ini digunakan agar setiap masalah kesehatan yang dideteksi oleh sistem segera ditindaklanjuti secara taktis. Data individu bersifat sensitif dan hanya digunakan untuk kepentingan pelayanan sesuai kewenangan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* TABEL LIST PERINGATAN (2/3) */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">Daftar Peringatan Aktif</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              {items.map(item => (
                <div 
                  key={item.id} 
                  onClick={() => { setSelectedItem(item); setInputBukti(item.buktiPenyelesaian || ''); }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedItem?.id === item.id 
                      ? 'border-orange-400 bg-orange-50/20' 
                      : 'border-slate-200 hover:border-orange-300'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={14} className={item.tingkatPrioritas === 'Tinggi' ? 'text-red-650 mt-0.5' : 'text-amber-600 mt-0.5'} />
                      <p className="font-bold text-slate-800 leading-snug">{item.jenisMasalah}</p>
                    </div>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                      item.tingkatPrioritas === 'Tinggi' ? 'bg-red-50 text-red-750 border-red-200' : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      {item.tingkatPrioritas}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-1 gap-x-4 text-[10px] text-slate-500 mb-2">
                    <div><strong>Sumber:</strong> {item.sumber}</div>
                    <div><strong>Batas Waktu:</strong> {item.batasWaktu}</div>
                    <div>
                      <strong>Status:</strong>&nbsp;
                      <span className={`font-bold ${
                        item.status === 'Selesai' ? 'text-green-700' : item.status === 'Dalam Proses' ? 'text-amber-750' : 'text-red-600'
                      }`}>{item.status}</span>
                    </div>
                  </div>

                  {item.buktiPenyelesaian && (
                    <div className="p-2 rounded-lg bg-green-50/50 border border-green-155 text-green-900 text-[10px] italic">
                      <strong>Bukti Penyelesaian:</strong> {item.buktiPenyelesaian}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* DETAILS & TINDAK LANJUT FORM (1/3) */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="py-3 border-b">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">Tindak Lanjut &amp; Resolusi</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              {selectedItem ? (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-800 text-xs mb-1">{selectedItem.jenisMasalah}</h4>
                    <p className="text-[10px] text-slate-400">PJ: {selectedItem.penanggungJawab}</p>
                  </div>

                  <div className="space-y-2 border-t pt-3">
                    <p className="font-bold text-slate-650 text-[10px] uppercase">Input Bukti Penyelesaian / Keterangan</p>
                    <textarea
                      value={inputBukti}
                      onChange={e => setInputBukti(e.target.value)}
                      placeholder="Masukkan bukti penyelesaian masalah, foto dokumen pendukung, atau tindak lanjut yang telah dicatat..."
                      className="w-full h-24 border rounded-lg p-2 text-xs focus:outline-none focus:border-orange-500 bg-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(selectedItem.id, 'Dalam Proses', inputBukti)}
                      className="flex-1 py-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-700 font-bold hover:bg-amber-100 transition-colors flex items-center justify-center gap-1 text-[10px]"
                    >
                      <Clock size={12} /> Proses
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(selectedItem.id, 'Selesai', inputBukti || 'Masalah telah diselesaikan oleh Tenaga Kesehatan.')}
                      className="flex-1 py-2 rounded-lg bg-green-700 text-white font-bold hover:bg-green-800 transition-colors flex items-center justify-center gap-1 text-[10px]"
                    >
                      <CheckCircle2 size={12} /> Selesai
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400">
                  <AlertTriangle size={24} className="mx-auto text-slate-300 mb-2" />
                  <p className="font-semibold">Pilih salah satu item peringatan untuk mencatat tindak lanjut.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
