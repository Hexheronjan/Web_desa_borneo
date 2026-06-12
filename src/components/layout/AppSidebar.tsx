"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRoleFromPath } from "@/lib/modul-config";
import {
  LayoutDashboard,
  X,
  ChevronDown,
  Shield,
  Leaf,
} from "lucide-react";
import { useSession } from "next-auth/react";

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role || "warga";
  const roleInfo = getRoleFromPath(pathname);

  // Group sidebar items by their group property
  const groups: Record<string, typeof roleInfo.sidebarItems> = {};
  roleInfo.sidebarItems.forEach((item) => {
    const g = item.group || "MENU";
    if (!groups[g]) groups[g] = [];
    groups[g].push(item);
  });

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-full flex-shrink-0 shadow-sm relative">
      {/* Sidebar Header */}
      <div
        className="px-5 py-4 text-white flex items-center justify-between"
        style={{ backgroundColor: roleInfo.warna }}
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-white/20 rounded-lg">
            <Leaf size={16} />
          </div>
          <div>
            <span className="font-bold text-sm block leading-tight">SMART LIVING VILLAGE</span>
            <span className="text-[10px] opacity-80 block leading-tight">ADAT BORNEO</span>
          </div>
        </div>
        {/* Mobile Close Button */}
        <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/20 rounded-md transition-colors">
          <X size={20} />
        </button>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
        <div className="flex items-center gap-2">
          <Shield size={14} className="text-slate-400" />
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">{roleInfo.nama}</span>
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto flex flex-col">
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={groupName} className="px-3 mb-1">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 px-2 pt-2">
              {groupName}
            </p>
            <div className="space-y-0.5">
              {items.map((item) => {
                const isActive =
                  pathname === item.path ||
                  (item.path !== "/admin" &&
                    item.path !== "/operator-sid" &&
                    item.path !== "/pemdes" &&
                    item.path !== "/bpd" &&
                    item.path !== "/adat" &&
                    item.path !== "/guru" &&
                    item.path !== "/nakes" &&
                    item.path !== "/warga" &&
                    item.path !== "/dinas-pmd" &&
                    item.path !== "/peneliti" &&
                    pathname.startsWith(item.path));

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                      isActive
                        ? "text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                    style={isActive ? { backgroundColor: roleInfo.warna } : {}}
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
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-slate-100 bg-slate-50">
        <p className="text-[10px] text-slate-400 leading-tight font-medium">
          BINUS University × ASIIN 2023–2029
        </p>
        <p className="text-[10px] text-slate-400">SLV Prototype v2.0</p>
      </div>
    </aside>
  );
}
