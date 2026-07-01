"use client";

import { FileDown, FileSpreadsheet, Layers, Settings } from "lucide-react";
import { Card } from "@/components/ui/card";
import { LayananSLVMetadata } from "@/lib/modul-config";

export function LayananSLVMetadataCards({
  metadata,
  color,
}: {
  metadata: LayananSLVMetadata;
  color: string;
}) {
  const items = [
    { label: "Isi (Field Data Utama)", value: metadata.fieldDataUtama, icon: FileSpreadsheet, subText: "Struktur data utama" },
    { label: "Isi Data/Informasi", value: metadata.isiDataInformasi, icon: Layers, subText: "Jenis konten informasi" },
    { label: "Fungsi Sistem", value: metadata.fungsiSistem, icon: Settings, subText: "Sistem proses layanan" },
    { label: "Output", value: metadata.output, icon: FileDown, subText: "Hasil keluaran sistem" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="p-4 border-l-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderLeftColor: color }}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</p>
            <item.icon size={16} style={{ color }} />
          </div>
          <p className="text-base md:text-lg font-black text-slate-800 leading-tight">{item.value}</p>
          <p className="text-[10px] text-slate-400 font-medium mt-1.5">{item.subText}</p>
        </Card>
      ))}
    </div>
  );
}
