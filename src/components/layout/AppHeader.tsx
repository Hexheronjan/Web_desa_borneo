"use client";

import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, LogOut } from "lucide-react";
import { getModulFromPath, getFiturFromPath } from "@/lib/modul-config";

export function AppHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const modul = getModulFromPath(pathname);
  const fitur = getFiturFromPath(pathname, modul);
  const userName = session?.user?.name ?? "Admin Desa";

  return (
    <header
      className="text-white flex items-center justify-between px-6 py-3 shadow-md z-10 flex-shrink-0"
      style={{ backgroundColor: modul.warna }}
    >
      {/* Kiri: Interface label */}
      <div>
        <h1 className="text-base font-bold tracking-tight leading-tight">
          Interface {modul.nama} &mdash; {fitur}
        </h1>
      </div>

      {/* Kanan: desa label + notif + avatar + logout */}
      <div className="flex items-center gap-4">
        <div className="hidden md:block text-right">
          <p className="text-xs text-white/60 leading-none">SLV Prototype Desa Adat Borneo</p>
          <p className="text-sm font-semibold leading-tight mt-0.5">{userName}</p>
          <p className="text-xs text-white/70 leading-none capitalize">{session?.user?.role?.replace('_', ' ') ?? "User"}</p>
        </div>
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-white/80 hover:text-white transition-colors" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold">
            3
          </span>
        </div>
        <Avatar className="h-8 w-8 ring-2 ring-white/30">
          <AvatarFallback className="text-xs font-bold" style={{ backgroundColor: modul.warna, filter: "brightness(1.3)", color: "white" }}>
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <button 
          onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
          className="ml-2 p-2 rounded-lg hover:bg-white/20 transition-all flex items-center justify-center group"
          title="Keluar dari Sistem"
        >
          <LogOut size={20} className="text-white/80 group-hover:text-white" />
        </button>

      </div>
    </header>
  );
}
