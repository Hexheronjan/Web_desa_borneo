'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageTitle } from '@/components/shared/PageTitle';
import { StatCard } from '@/components/shared/StatCard';
import {
  ShieldAlert, RefreshCw, BarChart2, CheckCircle2, AlertTriangle,
  Database, User, Calendar, CloudLightning, FileSpreadsheet
} from 'lucide-react';
import { useState } from 'react';

const COLOR = '#283593';

const DATA_KUALITAS = [
  {
    dataset: 'Data Profil Kependudukan',
    sumber: 'Operator SID & Dukcapil',
    kelengkapan: 98,
    belumDiperbarui: 0, // Dalam hari / jumlah record
    belumDiverifikasi: 5, // record
    konsisten: true,
    statusIntegrasi: 'Berhasil',
    pj: 'Sekretaris Desa (Siti Nurhaliza)',
    jadwalUpdate: 'Setiap tanggal 1 awal bulan',
  },
  {
    dataset: 'Data Kesehatan Ibu & Balita',
    sumber: 'Kader Posyandu & Puskesmas',
    kelengkapan: 92,
    belumDiperbarui: 12, // record belum diisi bulan ini
    belumDiverifikasi: 15,
    konsisten: false, // Ada perbedaan jumlah balita
    statusIntegrasi: 'Berhasil dengan Catatan',
    pj: 'Bidan Desa (Siti Rahmah)',
    jadwalUpdate: 'Setiap tanggal 10 awal bulan',
  },
  {
    dataset: 'Data Pendidikan & Dapodik',
    sumber: 'SDN 01 Lung Anai & PAUD Adat',
    kelengkapan: 95,
    belumDiperbarui: 4,
    belumDiverifikasi: 8,
    konsisten: true,
    statusIntegrasi: 'Berhasil',
    pj: 'Guru Fasilitator (Bapak Ahmadi)',
    jadwalUpdate: 'Tiap tengah semester',
  },
  {
    dataset: 'Data Anggaran & Realisasi APBDes',
    sumber: 'Bendahara Desa',
    kelengkapan: 100,
    belumDiperbarui: 0,
    belumDiverifikasi: 0,
    konsisten: true,
    statusIntegrasi: 'Berhasil',
    pj: 'Bendahara Desa (Bapak Budi)',
    jadwalUpdate: 'Mingguan / Tiap Jumat sore',
  },
];

export default function KualitasDataPage() {
  const [data, setData] = useState(DATA_KUALITAS);

  const handleVerifyDataset = (datasetName: string) => {
    setData(prev => prev.map(d => {
      if (d.dataset === datasetName) {
        return { ...d, belumDiverifikasi: 0 };
      }
      return d;
    }));
    alert(`✅ Seluruh record data "${datasetName}" berhasil diverifikasi dan disahkan.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Kualitas dan Keterbaruan Data" modul="Pemerintah Desa" color={COLOR} />

      <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs flex items-start gap-2.5">
        <Database size={16} className="text-indigo-700 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Pentingnya Kualitas Data Desa</p>
          <p className="text-indigo-700 mt-0.5 font-medium leading-relaxed">
            Kualitas data harus terlihat dan terpantau dengan jelas karena hasil dari **Penilaian Kesiapan (Readiness), SDGs Desa, dan Keputusan DSS** sepenuhnya bergantung pada data yang valid dan dapat dipercaya.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kelengkapan Rata-rata" value="96.25%" satuan="Kelengkapan Data" barColor="green" progress={96} />
        <StatCard label="Belum Diverifikasi" value={data.reduce((s, d) => s + d.belumDiverifikasi, 0) + ' Record'} satuan="Menunggu Validasi" barColor="orange" progress={40} />
        <StatCard label="Data Tidak Konsisten" value={data.filter(d => !d.konsisten).length + ' Dataset'} satuan="Perlu Sinkronisasi" barColor="red" progress={20} />
        <StatCard label="Integrasi Sistem" value="Berhasil" satuan="SID & Cloud Server" barColor="blue" progress={100} />
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
          Status Kualitas & Keterbaruan Dataset Utama Desa
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data.map((item, idx) => (
            <Card key={idx} className={`border-t-4 ${!item.konsisten ? 'border-t-red-500' : 'border-t-indigo-700'}`}>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-slate-800 leading-snug flex items-center justify-between gap-2 flex-wrap">
                  <span>{item.dataset}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${item.statusIntegrasi === 'Berhasil' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    Integrasi: {item.statusIntegrasi}
                  </span>
                </CardTitle>
                <p className="text-[10px] text-slate-400">Sumber: {item.sumber}</p>
              </CardHeader>
              <CardContent className="text-xs space-y-3.5">
                
                {/* DATA METRICS */}
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 bg-slate-50 border rounded-lg">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase">Kelengkapan</p>
                    <p className="font-bold text-slate-700 mt-0.5">{item.kelengkapan}%</p>
                  </div>
                  <div className="p-2 bg-slate-50 border rounded-lg">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase">Belum Diperbarui</p>
                    <p className="font-bold text-slate-700 mt-0.5">{item.belumDiperbarui} Record</p>
                  </div>
                  <div className="p-2 bg-slate-50 border rounded-lg">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase">Belum Diverifikasi</p>
                    <p className={`font-bold mt-0.5 ${item.belumDiverifikasi > 0 ? 'text-orange-600' : 'text-green-700'}`}>
                      {item.belumDiverifikasi} Record
                    </p>
                  </div>
                  <div className="p-2 bg-slate-50 border rounded-lg">
                    <p className="text-[9px] text-slate-400 font-semibold uppercase">Konsistensi</p>
                    <p className={`font-bold mt-0.5 ${item.konsisten ? 'text-green-700' : 'text-red-600'}`}>
                      {item.konsisten ? 'Konsisten ✓' : 'Tidak Konsisten ✗'}
                    </p>
                  </div>
                </div>

                {/* METADATA PJ & JADWAL */}
                <div className="space-y-1 text-[10px] text-slate-500 border-t pt-2.5">
                  <p className="flex items-center gap-1"><User size={10} /> Penanggung Jawab: <strong>{item.pj}</strong></p>
                  <p className="flex items-center gap-1"><Calendar size={10} /> Jadwal Pembaruan: <strong>{item.jadwalUpdate}</strong></p>
                </div>

                {/* ALERTS & ACTIONS */}
                {!item.konsisten && (
                  <div className="p-2 bg-red-50 border border-red-150 rounded-lg text-red-800 text-[10px] flex items-start gap-1">
                    <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                    <span>Perhatian: Ada perbedaan jumlah balita aktif dengan data puskesmas kecamatan. Segera lakukan rekonsiliasi data.</span>
                  </div>
                )}

                {item.belumDiverifikasi > 0 && (
                  <button
                    onClick={() => handleVerifyDataset(item.dataset)}
                    className="w-full py-1.5 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg font-bold text-[10px] shadow-sm transition-colors"
                  >
                    Verifikasi & Validasi Record Data
                  </button>
                )}

              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 p-2.5 border border-dashed rounded-lg bg-slate-50/50">
        <span className="flex items-center gap-1"><RefreshCw size={12} className="animate-pulse" /> Data kualitas diperbarui berkala berdasarkan log sinkronisasi cloud database</span>
        <span>Terakhir Diperbarui: 18 Juli 2026</span>
      </div>
    </div>
  );
}
