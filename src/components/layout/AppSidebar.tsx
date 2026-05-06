"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getModulFromPath } from "@/lib/modul-config";
import { LayoutDashboard, HeartPulse, BookOpen, Map as MapIcon, Database, X } from "lucide-react";
import { useSession } from "next-auth/react";

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const modul = getModulFromPath(pathname);
  const { data: session } = useSession();
  const role = session?.user?.role || "warga";

  // Konfigurasi visibilitas modul berdasarkan role (sesuai middleware)
  const canAccessDataDesa = ["pemerintah_desa", "admin_super"].includes(role);
  const canAccessBelajar = ["guru_fasilitator", "warga", "pemerintah_desa", "admin_super"].includes(role);
  const canAccessSehat = ["nakes_posyandu", "warga", "pemerintah_desa", "admin_super"].includes(role);
  const canAccessAdat = ["lembaga_adat", "warga", "pemerintah_desa", "admin_super"].includes(role);

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 shadow-sm relative">
      {/* Sidebar Header */}
      <div
        className="px-5 py-4 text-white flex items-center justify-between"
        style={{ backgroundColor: modul.warna }}
      >
        <div className="flex items-center gap-2">
          <LayoutDashboard size={18} />
          <span className="font-bold text-sm">Menu {modul.nama}</span>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/20 rounded-md transition-colors">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto flex flex-col">
        {/* === SWITCHER MODUL UTAMA === */}
        <div className="px-4 mb-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Pilih Modul</p>
          <div className="space-y-1">
            {canAccessDataDesa && (
              <Link onClick={onClose} href="/" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${pathname === "/" || pathname.startsWith("/data-desa") ? "bg-[#5E35B1]/10 text-[#5E35B1]" : "text-slate-600 hover:bg-slate-100"}`}>
                <Database size={16} /> Data Desa
              </Link>
            )}
            {canAccessSehat && (
              <Link onClick={onClose} href="/sehat" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith("/sehat") ? "bg-[#E07B2A]/10 text-[#E07B2A]" : "text-slate-600 hover:bg-slate-100"}`}>
                <HeartPulse size={16} /> Smart Sehat
              </Link>
            )}
            {canAccessBelajar && (
              <Link onClick={onClose} href="/belajar" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith("/belajar") ? "bg-[#1E5FA5]/10 text-[#1E5FA5]" : "text-slate-600 hover:bg-slate-100"}`}>
                <BookOpen size={16} /> Smart Belajar
              </Link>
            )}
            {canAccessAdat && (
              <Link onClick={onClose} href="/adat" className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${pathname.startsWith("/adat") ? "bg-[#2E7D32]/10 text-[#2E7D32]" : "text-slate-600 hover:bg-slate-100"}`}>
                <MapIcon size={16} /> Smart Adat
              </Link>
            )}
          </div>
        </div>

        <div className="mx-4 my-2 border-t border-slate-100" />

        {/* === SUB-MENU MODUL AKTIF === */}
        <div className="px-2 mb-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">Fitur {modul.nama}</p>
          {modul.sidebarItems
            .filter((item) => {
              if (role === "warga") {
                // Warga tidak boleh melihat menu Laporan atau Data Desa (manajemen)
                const isLaporan = item.path.includes("laporan");
                const isDataDesaDetail = item.path === "/data-desa";
                return !isLaporan && !isDataDesaDetail;
              }
              return true;
            })
            .map((item) => {
              const isActive = pathname === item.path ||
                (item.path !== "/belajar" && item.path !== "/sehat" && item.path !== "/adat" && item.path !== "/" && pathname.startsWith(item.path));

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 mx-1 rounded-lg text-sm font-medium transition-all mb-0.5 ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`}
                  style={isActive ? { backgroundColor: modul.warna } : {}}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                      isActive ? "bg-white" : "bg-slate-300"
                    }`}
                  />
                  <span className="leading-tight">{item.label}</span>
                </Link>
              );
            })}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
        <p className="text-[10px] text-slate-400 leading-tight font-medium">
          BINUS University × ASIIN 2023–2029
        </p>
        <p className="text-[10px] text-slate-400">SLV Prototype v1.0</p>
      </div>
    </aside>
  );
}
