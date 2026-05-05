"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HukumList({ initialHukum, initialWilayah, color }: { initialHukum: any[], initialWilayah: any[], color: string }) {
  const [activeTab, setActiveTab] = useState<"hukum" | "mapping">("hukum");

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b border-slate-200">
        <button 
          onClick={() => setActiveTab("hukum")} 
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "hukum" ? "border-green-700 text-green-700" : "border-transparent text-slate-500"}`}
        >
          ⚖️ Aturan & Hukum Adat
        </button>
        <button 
          onClick={() => setActiveTab("mapping")} 
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === "mapping" ? "border-green-700 text-green-700" : "border-transparent text-slate-500"}`}
        >
          🗺️ Pemetaan Wilayah Adat
        </button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: color }}>
            {activeTab === "hukum" ? "⚖️ Direktori Hukum & Aturan Adat (Live DB)" : "🗺️ Titik Batas & Pemetaan Wilayah"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTab === "hukum" ? (
            initialHukum.length === 0 ? (
              <p className="text-center py-10 text-slate-400">Belum ada aturan hukum adat yang dipublikasikan.</p>
            ) : (
              <div className="space-y-4">
                {initialHukum.map((h) => (
                  <div key={h.id} className="p-5 border rounded-2xl hover:shadow-md transition-all bg-white border-slate-100 group">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                          h.tipe === 'Aturan' ? 'bg-green-100 text-green-700' : 
                          h.tipe === 'Kasus' ? 'bg-red-100 text-red-700' : 
                          'bg-orange-100 text-orange-700'
                        }`}>
                          {h.tipe}
                        </span>
                        <h3 className="font-bold text-slate-800 text-lg mt-2">{h.judul}</h3>
                      </div>
                      <span className="text-[10px] text-slate-400">{new Date(h.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {h.deskripsi}
                    </p>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="px-4 py-3">Nama Lokasi / Patok</th>
                    <th className="px-4 py-3">Koordinat (Lat, Long)</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {initialWilayah.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-10 text-center text-slate-400">Belum ada titik batas yang dicatat.</td>
                    </tr>
                  ) : initialWilayah.map((w) => (
                    <tr key={w.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-700">{w.namaLokasi}</td>
                      <td className="px-4 py-3 font-mono text-xs text-blue-600">{w.koordinat}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded">Terverifikasi</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
