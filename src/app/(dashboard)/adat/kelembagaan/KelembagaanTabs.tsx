"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserRole } from "@/hooks/useUserRole";
import { ActionButton } from "@/components/shared/ActionButton";
import { deletePengurus } from "@/actions/adat";

export function KelembagaanTabs({ initialPengurus, color }: { initialPengurus: any[], color: string }) {
  const { isWarga, isAdmin } = useUserRole();
  const [activeTab, setActiveTab] = useState<"pengurus" | "program" | "dokumen">("pengurus");

  const programList = [
    { nama: "Festival Budaya Paser 2025", progres: 60, status: "Berjalan" },
    { nama: "Digitalisasi Arsip Ritual Belian", progres: 90, status: "Berjalan" },
    { nama: "Pembangunan Balai Adat Baru", progres: 25, status: "Persiapan" },
  ];

  return (
    <>
      <div className="flex gap-2 border-b border-slate-200">
        <button onClick={() => setActiveTab("pengurus")} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "pengurus" ? "border-[#2E7D32] text-[#2E7D32]" : "border-transparent text-slate-500"}`}>
          👥 Data Pengurus
        </button>
        <button onClick={() => setActiveTab("program")} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "program" ? "border-[#2E7D32] text-[#2E7D32]" : "border-transparent text-slate-500"}`}>
          🚀 Program Kerja
        </button>
        {!isWarga && (
          <button onClick={() => setActiveTab("dokumen")} className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "dokumen" ? "border-[#2E7D32] text-[#2E7D32]" : "border-transparent text-slate-500"}`}>
            📄 Dokumen Resmi
          </button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: color }}>
            {activeTab === "pengurus" ? "👥 Daftar Pengurus Lembaga Adat (Live DB)" : activeTab === "program" ? "🚀 Monitoring Program Kerja" : "📄 Verifikasi Dokumen Lembaga"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeTab === "pengurus" && initialPengurus.map((p) => (
              <div key={p.id} className="p-3 border rounded-lg flex justify-between items-center hover:bg-green-50 transition-colors">
                <div>
                  <p className="font-bold text-sm text-slate-800">{p.nama}</p>
                  <p className="text-xs text-slate-500">{p.jabatan} • Bidang: {p.bidang}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-1 rounded-full font-bold bg-green-100 text-green-700">{p.status}</span>
                  {!isWarga && (
                    <ActionButton 
                      label="Hapus" 
                      action={deletePengurus} 
                      id={p.id} 
                      variant="ghost" 
                      className="text-red-500 text-[10px]" 
                      successMessage="Data pengurus telah dihapus."
                    />
                  )}
                </div>
              </div>
            ))}
            {activeTab === "program" && programList.map((p, i) => (
              <div key={i} className="p-3 border rounded-lg hover:bg-green-50 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-bold text-sm text-slate-800">{p.nama}</p>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${p.status === 'Berjalan' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.status}</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full">
                  <div className="h-full bg-green-600 rounded-full" style={{ width: `${p.progres}%` }} />
                </div>
                <p className="text-[10px] text-right mt-1 text-slate-500">{p.progres}% Selesai</p>
              </div>
            ))}
            {activeTab === "dokumen" && (
              <div className="text-center py-6 text-slate-400">
                <p className="text-2xl mb-1">📄</p>
                <p className="text-xs">9 Dokumen resmi (SK, Berita Acara) menunggu verifikasi.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
