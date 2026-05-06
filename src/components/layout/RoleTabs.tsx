"use client";

import { usePathname } from "next/navigation";
import { getModulFromPath } from "@/lib/modul-config";
import { useSession } from "next-auth/react";

export function RoleTabs() {
  const pathname = usePathname();
  const modul = getModulFromPath(pathname);
  const { data: session, status } = useSession();
  const userRole = session?.user?.role || (status === "loading" ? "..." : "guest");


  // Mapping role database ke label UI yang rapi
  const roleLabels: Record<string, string> = {
    warga: "Warga",
    pemerintah_desa: "Pemerintah Desa",
    lembaga_adat: "Lembaga Adat",
    nakes_posyandu: "Nakes/Posyandu",
    guru_fasilitator: "Guru/Fasilitator",
    admin_super: "Admin Super"
  };

  const userRoleLabel = roleLabels[userRole] || userRole;

  // Tentukan tab apa saja yang muncul berdasarkan modul yang sedang aktif
  let visibleTabs = [];

  if (pathname.startsWith("/adat")) {
    visibleTabs = [
      { label: "Modul Aktif:", isLabel: true },
      { label: "Smart Lembaga Adat", isActive: true },
    ];
  } else if (pathname.startsWith("/sehat")) {
    visibleTabs = [
      { label: "Modul Aktif:", isLabel: true },
      { label: "Smart Sehat Adat", isActive: true },
    ];
  } else if (pathname.startsWith("/belajar")) {
    visibleTabs = [
      { label: "Modul Aktif:", isLabel: true },
      { label: "Smart Belajar Adat", isActive: true },
    ];
  } else {
    // Dashboard Utama / Data Desa
    visibleTabs = [
      { label: "Modul Aktif:", isLabel: true },
      { label: "Data Desa Utama", isActive: true },
    ];
  }

  return (
    <div className="flex border-b bg-white overflow-x-auto flex-shrink-0 items-center justify-between pr-4">
      <div className="flex items-center">
        {visibleTabs.map((tab, idx) => {
          if (tab.isLabel) {
            return (
              <div key={idx} className="px-5 py-2.5 text-sm font-medium text-slate-400 whitespace-nowrap">
                {tab.label}
              </div>
            );
          }
          return (
            <div
              key={idx}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-colors border-b-2`}
              style={{
                borderBottomColor: modul.warna,
                color: modul.warna,
                backgroundColor: `${modul.warna}10`,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: modul.warna }}
              />
              {tab.label}
            </div>
          );
        })}
      </div>
      
      {/* Tampilkan Status Akses User saat ini */}
      <div className="text-sm font-medium flex items-center gap-2">
        <span className="text-slate-500">Akses sebagai:</span>
        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider">
          {userRoleLabel}
        </span>
      </div>
    </div>
  );
}
