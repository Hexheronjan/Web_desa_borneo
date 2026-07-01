"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Activity, ClipboardCheck, Database, FileText } from "lucide-react";
import { ModuleRecordsPanel } from "@/components/module-records/ModuleRecordsPanel";
import { LayananSLVMetadataCards } from "@/components/layanan-slv/LayananSLVMetadataCards";
import { PageTitle } from "@/components/shared/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { getFiturFromPath, getRoleFromPath, layananSLVMetadata } from "@/lib/modul-config";

export function GenericModulePage() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const roleInfo = useMemo(() => getRoleFromPath(pathname, session?.user?.role), [pathname, session?.user?.role]);
  const fitur = useMemo(() => getFiturFromPath(pathname, roleInfo), [pathname, roleInfo]);

  // Cari metadata Excel untuk fitur ini
  const metadata = useMemo(() => layananSLVMetadata[fitur] || null, [fitur]);

  const quickStats = useMemo(() => {
    if (metadata) return null;
    return [
      { label: "Data Modul", value: "CRUD", icon: Database, subText: "Tersambung ke database modul" },
      { label: "Status Proses", value: "Aktif", icon: Activity, subText: "Tersambung ke database modul" },
      { label: "Validasi", value: "Tersedia", icon: ClipboardCheck, subText: "Tersambung ke database modul" },
      { label: "Laporan", value: "Siap", icon: FileText, subText: "Tersambung ke database modul" },
    ];
  }, [metadata]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur={fitur} modul={roleInfo.nama} color={roleInfo.warna} />

      {metadata ? (
        <LayananSLVMetadataCards metadata={metadata} color={roleInfo.warna} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats?.map((item) => (
            <Card key={item.label} className="p-4 border-l-4 shadow-sm hover:shadow-md transition-shadow" style={{ borderLeftColor: roleInfo.warna }}>
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{item.label}</p>
                <item.icon size={16} style={{ color: roleInfo.warna }} />
              </div>
              <p className="text-base md:text-lg font-black text-slate-800 leading-tight">{item.value}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1.5">{item.subText}</p>
            </Card>
          ))}
        </div>
      )}

      <ModuleRecordsPanel metadata={metadata || undefined} />

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
