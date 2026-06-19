"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, CalendarDays, ChevronDown, Clock, LogOut } from "lucide-react";
import { getRoleFromPath, getFiturFromPath } from "@/lib/modul-config";

export function AppHeader() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [now, setNow] = useState<Date | null>(null);
  const roleInfo = getRoleFromPath(pathname, session?.user?.role);
  const fitur = getFiturFromPath(pathname, roleInfo);
  const userName = session?.user?.name ?? "User";
  const year = now?.getFullYear() ?? new Date().getFullYear();

  useEffect(() => {
    setNow(new Date());
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const dateLabel = useMemo(() => {
    const date = now ?? new Date();
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }).format(date);
  }, [now]);

  const timeLabel = useMemo(() => {
    const date = now ?? new Date();
    return `${new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Jakarta",
    }).format(date)} WIB`;
  }, [now]);

  return (
    <header className="bg-white text-slate-900 flex items-center justify-between gap-4 px-4 md:px-6 py-3 border-b border-slate-200 z-10 flex-shrink-0">
      <div>
        <h1 className="text-xl md:text-2xl font-black tracking-tight leading-tight uppercase">
          {roleInfo.nama}
        </h1>
        <p className="hidden sm:block text-xs md:text-sm text-slate-600 font-medium">
          {fitur} - Smart Living Village
        </p>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        <div className="hidden lg:flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600">
          <CalendarDays size={15} />
          <span>Periode {year}</span>
          <span className="text-slate-300">|</span>
          <span>{dateLabel}</span>
        </div>
        <div className="hidden xl:flex items-center gap-2 text-xs text-slate-500">
          <Clock size={15} />
          <span>{timeLabel}</span>
        </div>
        <div className="relative cursor-pointer">
          <Bell size={20} className="text-slate-600 hover:text-slate-900 transition-colors" />
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
            5
          </span>
        </div>
        <Avatar className="h-9 w-9 ring-2 ring-slate-100">
          <AvatarFallback className="text-xs font-bold text-white" style={{ backgroundColor: roleInfo.warna }}>
            {userName.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:block text-left">
          <p className="text-sm font-bold leading-tight text-slate-900">{userName}</p>
          <p className="text-xs text-slate-500 leading-tight capitalize">{session?.user?.role?.replace(/_/g, " ") ?? "User"}</p>
        </div>
        <ChevronDown size={16} className="hidden md:block text-slate-400" />
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="p-1.5 rounded-md hover:bg-slate-100 transition-colors"
          title="Keluar (Logout)"
        >
          <LogOut size={18} className="text-slate-500 hover:text-slate-900" />
        </button>
      </div>
    </header>
  );
}
