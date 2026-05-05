"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export function RekamMedisDetail({ rm, color }: { rm: any, color: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="sm" variant="ghost" className="text-xs" onClick={() => setIsOpen(true)}>
        Detail
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center" style={{ backgroundColor: color }}>
              <h2 className="text-white font-bold text-lg">Rincian Rekam Medis</h2>
              <button onClick={() => setIsOpen(false)} className="text-white hover:opacity-70 text-2xl">&times;</button>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pasien</p>
                  <p className="text-slate-900 font-bold text-base">{rm.warga.nama}</p>
                  <p className="text-slate-500 text-xs">NIK: {rm.warga.nik}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal Periksa</p>
                  <p className="text-slate-900 font-bold">{new Date(rm.tanggal).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Diagnosis Utama</p>
                <p className="text-slate-800 font-bold text-lg leading-tight">{rm.diagnosis}</p>
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Catatan Tambahan</p>
                <p className="text-sm text-slate-600 italic leading-relaxed">
                  {rm.catatan || "Tidak ada catatan tambahan dari nakes."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-[10px] font-bold text-red-400 uppercase tracking-widest mb-1">Riwayat Alergi</p>
                  <p className="text-sm text-red-700 font-bold">{rm.alergi || "Tidak ada alergi"}</p>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-100">
                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-1">Tenaga Kesehatan</p>
                  <p className="text-sm text-emerald-700 font-bold">{rm.nakes || "Bidan Desa"}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <Button onClick={() => setIsOpen(false)} style={{ backgroundColor: color, color: 'white' }} className="px-10">
                Tutup
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
