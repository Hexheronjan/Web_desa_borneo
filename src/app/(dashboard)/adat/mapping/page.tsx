"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import AdatManagementActions from "../AdatManagementActions";

const COLOR = "#2E7D32";

export default function MappingPage() {
  const [activeLayer, setActiveLayer] = useState<string>("Batas Wilayah");

  const layers = [
    "Batas Wilayah",
    "Lahan Pertanian",
    "Hutan Adat",
    "Situs Budaya",
    "Pemukiman",
    "Sumber Air",
  ];

  const points = [
    { id: 1, nama: "Batas Utara - Sektor A", koordinat: "1.234, 116.789", status: "Terverifikasi" },
    { id: 2, nama: "Hutan Lindung Adat", koordinat: "1.235, 116.790", status: "Sengketa" },
    { id: 3, nama: "Makam Leluhur", koordinat: "1.230, 116.780", status: "Terverifikasi" },
  ];

  const handleAction = (action: string) => {
    alert(`🗺️ Digital Mapping Adat:\n\n${action}\n\nLayer aktif: ${activeLayer}\n84 titik batas wilayah terpetakan.`);
  };

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Digital Mapping Wilayah Adat" modul="Smart Lembaga Adat" color={COLOR} />

      <AdatManagementActions color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Titik Batas" value={84} satuan="koordinat" barColor="green" progress={100} />
        <StatCard label="Layer Peta" value={12} satuan="lapisan aktif" barColor="blue" progress={80} />
        <StatCard label="Luas Wilayah" value={1450} satuan="hektar" barColor="teal" progress={100} />
        <StatCard label="Sengketa" value={3} satuan="perlu resolusi" barColor="red" progress={15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Kontrol Layer */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>🛰️ Kontrol Layer Peta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {layers.map(l => (
              <button
                key={l}
                onClick={() => setActiveLayer(l)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${activeLayer === l ? "bg-green-600 text-white shadow-md" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
              >
                {activeLayer === l ? "👁️ " : "⚪ "} {l}
              </button>
            ))}
            <Button size="sm" className="w-full mt-4" variant="outline" onClick={() => handleAction("Export Peta ke GeoJSON/SHP")}>💾 Export Data GIS</Button>
          </CardContent>
        </Card>

        {/* Simulasi Peta */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>🗺️ Visualisasi Peta Digital Adat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative w-full aspect-video bg-blue-50 rounded-xl overflow-hidden border-2 border-slate-200 group">
              {/* Background pattern (simulasi topografi) */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#2E7D32 0.5px, transparent 0.5px)', backgroundSize: '15px 15px' }} />
              
              {/* Batas Wilayah (Simulasi) */}
              <div className="absolute inset-10 border-4 border-dashed border-green-600 rounded-[20%] opacity-40 animate-pulse" />

              {/* Titik-titik Koordinat */}
              {points.map((p, i) => (
                <div 
                  key={p.id} 
                  className={`absolute w-4 h-4 cursor-pointer hover:scale-125 transition-transform ${p.status === 'Sengketa' ? 'bg-red-500' : 'bg-green-600'} rounded-full border-2 border-white shadow-lg`}
                  style={{ top: `${20 + i * 25}%`, left: `${30 + i * 20}%` }}
                  onClick={() => handleAction(`Detail Titik: ${p.nama}\nKoordinat: ${p.koordinat}`)}
                >
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 bg-white px-2 py-0.5 rounded text-[8px] font-bold shadow whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    {p.nama}
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-lg text-[10px] font-bold text-slate-700 shadow-sm border border-slate-200">
                Layer Aktif: <span className="text-green-700">{activeLayer}</span>
              </div>

              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50">+</button>
                <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center font-bold text-slate-700 hover:bg-slate-50">-</button>
              </div>
            </div>
            
            <div className="mt-4 space-y-2">
              <p className="text-xs font-semibold text-slate-700">Daftar Titik Batas Terbaru:</p>
              {points.map(p => (
                <div key={p.id} className="flex justify-between items-center text-[10px] p-2 bg-slate-50 rounded">
                  <span>📍 {p.nama} ({p.koordinat})</span>
                  <span className={`font-bold ${p.status === 'Sengketa' ? 'text-red-600' : 'text-green-600'}`}>{p.status}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
