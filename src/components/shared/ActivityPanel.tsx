"use client";

import { RefreshCw, Database, Bell, FileText, Activity, History } from "lucide-react";

interface ActivityPanelProps {
  title: string;       // e.g. "Konten & Aktivitas" | "Ringkasan Layanan" | "Ringkasan Fitur"
  featureName: string; // e.g. "E-Learning Budaya Lokal"
  color: string;       // hex color
}

const icons = [Activity, Database, Bell, FileText, Activity, History];

export function ActivityPanel({ title, featureName, color }: ActivityPanelProps) {
  const activities = [
    { label: `Ringkasan ${featureName}`, desc: "Aktivitas hari ini tercatat" },
    { label: "Integrasi data", desc: "Sinkron dengan Satu Data Desa" },
    { label: "Notifikasi", desc: "Pengingat otomatis aktif" },
    { label: "Laporan", desc: "Siap ekspor PDF/Excel" },
    { label: "Status sistem", desc: "Layanan normal" },
    { label: "Audit trail", desc: "Aksi pengguna terekam" },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col">
      <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-800">{title}</h3>
      </div>

      {/* Sync button */}
      <div className="px-4 pt-4">
        <button
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: color }}
        >
          <RefreshCw size={15} />
          Sinkron dengan Satu Data Desa
        </button>
      </div>

      {/* Activities */}
      <div className="flex-1 p-4 space-y-2.5 overflow-y-auto">
        {activities.map((act, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100"
            >
              <div
                className="p-1.5 rounded-md flex-shrink-0"
                style={{ backgroundColor: `${color}15`, color }}
              >
                <Icon size={14} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 leading-tight">{act.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{act.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
