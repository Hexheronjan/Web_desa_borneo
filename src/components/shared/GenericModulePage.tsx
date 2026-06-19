"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Activity, ClipboardCheck, Database, FileText } from "lucide-react";
import { ModuleRecordsPanel } from "@/components/module-records/ModuleRecordsPanel";
import { PageTitle } from "@/components/shared/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getFiturFromPath, getRoleFromPath } from "@/lib/modul-config";

export function GenericModulePage() {
  const pathname = usePathname();
  const roleInfo = useMemo(() => getRoleFromPath(pathname), [pathname]);
  const fitur = useMemo(() => getFiturFromPath(pathname, roleInfo), [pathname, roleInfo]);

  const quickStats = [
    { label: "Data Modul", value: "CRUD", icon: Database },
    { label: "Status Proses", value: "Aktif", icon: Activity },
    { label: "Validasi", value: "Tersedia", icon: ClipboardCheck },
    { label: "Laporan", value: "Siap", icon: FileText },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur={fitur} modul={roleInfo.nama} color={roleInfo.warna} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((item) => (
          <Card key={item.label} className="p-4 border-l-4" style={{ borderLeftColor: roleInfo.warna }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-slate-500 font-semibold">{item.label}</p>
              <item.icon size={16} style={{ color: roleInfo.warna }} />
            </div>
            <p className="text-xl font-black text-slate-800">{item.value}</p>
            <p className="text-xs text-slate-500 mt-1">Tersambung ke database modul</p>
          </Card>
        ))}
      </div>

      <ModuleRecordsPanel />

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: roleInfo.warna }}>
            Alur Kerja Modul
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-4">
            {["Input Data", "Validasi", "Monitoring", "Laporan"].map((step, index) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <div className="mb-2 h-8 w-8 rounded-full text-white flex items-center justify-center text-sm font-bold" style={{ backgroundColor: roleInfo.warna }}>
                  {index + 1}
                </div>
                <p className="text-sm font-bold text-slate-800">{step}</p>
                <p className="text-xs text-slate-500 mt-1">Data {fitur.toLowerCase()} diproses dan tersimpan.</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
