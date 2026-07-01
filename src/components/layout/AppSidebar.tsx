"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRoleFromPath } from "@/lib/modul-config";
import {
  Activity,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  ClipboardCheck,
  Database,
  FileText,
  GraduationCap,
  HeartPulse,
  Landmark,
  LayoutDashboard,
  Leaf,
  Map,
  MessageSquare,
  Settings,
  Shield,
  Stethoscope,
  Users,
  X,
} from "lucide-react";
import { useSession } from "next-auth/react";

const iconByText = [
  { match: ["dashboard"], icon: LayoutDashboard },
  { match: ["user", "role", "akses", "pengguna", "akun"], icon: Users },
  { match: ["data", "integrasi", "sinkron", "import", "database", "sid"], icon: Database },
  { match: ["periode", "kalender", "agenda"], icon: Calendar },
  { match: ["validasi", "assessment", "evaluasi", "uat"], icon: ClipboardCheck },
  { match: ["audit", "aktivitas", "monitoring", "progress"], icon: Activity },
  { match: ["laporan", "repository", "arsip", "dokumen"], icon: FileText },
  { match: ["backup", "konfigurasi", "pengaturan", "sistem"], icon: Settings },
  { match: ["notifikasi", "pengumuman"], icon: Bell },
  { match: ["readiness", "maturity", "quality", "analytics", "statistik", "gap", "benchmark"], icon: BarChart3 },
  { match: ["kesehatan", "posyandu", "stunting", "balita", "hamil"], icon: HeartPulse },
  { match: ["pendidikan", "literasi", "guru", "kelas", "pelatihan"], icon: GraduationCap },
  { match: ["adat", "budaya", "kelembagaan", "warisan", "musyawarah"], icon: Landmark },
  { match: ["peta", "wilayah", "gis"], icon: Map },
  { match: ["panduan", "knowledge", "framework"], icon: BookOpen },
  { match: ["aspirasi", "forum", "feedback"], icon: MessageSquare },
  { match: ["telekonsultasi", "nakes"], icon: Stethoscope },
  { match: ["desa", "pmd"], icon: Building2 },
] as const;

function getItemIcon(label: string) {
  const lower = label.toLowerCase();
  return iconByText.find((item) => item.match.some((word) => lower.includes(word)))?.icon || FileText;
}

export function AppSidebar({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <aside className="w-72 bg-[#062342] text-white flex flex-col h-full flex-shrink-0 shadow-xl relative animate-pulse">
        <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white/10 rounded-lg">
              <Leaf size={20} />
            </div>
            <div>
              <span className="font-black text-lg block leading-tight">APL-SLV BORNEO</span>
              <span className="text-xs opacity-80 block leading-tight">Smart Living Village</span>
            </div>
          </div>
        </div>
        <div className="flex-1 p-5 space-y-4">
          <div className="h-4 bg-white/10 rounded w-2/3"></div>
          <div className="h-4 bg-white/10 rounded w-1/2"></div>
          <div className="h-4 bg-white/10 rounded w-3/4"></div>
        </div>
      </aside>
    );
  }

  const roleInfo = getRoleFromPath(pathname, session?.user?.role);
  const sidebarItems = [
    { label: "Dashboard", path: roleInfo.dashboardPath, group: "MENU UTAMA" },
    ...roleInfo.sidebarItems.filter((item) => item.path !== roleInfo.dashboardPath),
  ];

  const groups: Record<string, typeof sidebarItems> = {};
  sidebarItems.forEach((item) => {
    const group = item.group || "MENU";
    groups[group] ??= [];
    groups[group].push(item);
  });

  return (
    <aside className="w-72 bg-[#062342] text-white flex flex-col h-full flex-shrink-0 shadow-xl relative">
      <div className="px-5 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/10 rounded-lg">
            <Leaf size={20} />
          </div>
          <div>
            <span className="font-black text-lg block leading-tight">APL-SLV BORNEO</span>
            <span className="text-xs opacity-80 block leading-tight">Smart Living Village</span>
          </div>
        </div>
        <button onClick={onClose} className="lg:hidden p-1 hover:bg-white/20 rounded-md transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="px-5 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-white/10 flex items-center justify-center">
            <Shield size={22} />
          </div>
          <div className="min-w-0">
            <span className="text-lg font-black uppercase tracking-tight block leading-tight">{roleInfo.nama}</span>
            <span className="text-xs text-white/60 block truncate">{session?.user?.email || "APL-SLV Borneo"}</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto flex flex-col">
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={groupName} className="px-3 mb-1">
            <p className="text-[10px] font-bold text-white/45 uppercase tracking-wider mb-1 px-2 pt-3">
              {groupName}
            </p>
            <div className="space-y-0.5">
              {items.map((item) => {
                const Icon = getItemIcon(item.label);
                const isRoot = [
                  "/admin",
                  "/operator-sid",
                  "/pemdes",
                  "/bpd",
                  "/adat",
                  "/guru",
                  "/nakes",
                  "/warga",
                  "/dinas-pmd",
                  "/peneliti",
                  "/layanan-slv",
                ].includes(item.path);
                const isActive = pathname === item.path || (!isRoot && pathname.startsWith(item.path + "/"));

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all ${
                      isActive ? "text-white shadow-sm bg-blue-600" : "text-white/82 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon size={17} className="flex-shrink-0" />
                    <span className="leading-tight flex-1">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="px-5 py-4 border-t border-white/10">
        <p className="text-sm font-bold leading-tight">{session?.user?.name || "Pengguna SLV"}</p>
        <p className="text-xs text-white/60">Online</p>
      </div>
    </aside>
  );
}
