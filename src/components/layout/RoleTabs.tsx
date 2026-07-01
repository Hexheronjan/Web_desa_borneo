"use client";

import { usePathname } from "next/navigation";
import { getRoleFromPath } from "@/lib/modul-config";
import { useSession } from "next-auth/react";

export function RoleTabs() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const roleInfo = getRoleFromPath(pathname, session?.user?.role);
  const userRole = session?.user?.role || "guest";

  const roleLabels: Record<string, string> = {
    warga: "Warga",
    pemerintah_desa: "Pemdes / Kepala Desa",
    lembaga_adat: "Lembaga Adat",
    nakes_posyandu: "Nakes",
    guru_fasilitator: "Guru",
    admin_super: "Super Admin",
    operator_sid: "Operator SID",
    bpd: "BPD",
    dinas_pmd: "Dinas PMD Regional",
    peneliti: "Peneliti",
    layanan_slv: "Layanan SLV",
  };

  const userRoleLabel = roleLabels[userRole] || userRole;

  // Find active sub-menu
  const activeItem = roleInfo.sidebarItems.find(
    (i) => pathname === i.path || (i.path.length > 1 && pathname.startsWith(i.path + "/"))
  );

  return (
    <div className="flex border-b bg-white overflow-x-auto flex-shrink-0 items-center justify-between pr-4">
      <div className="flex items-center">
        <div className="px-5 py-2.5 text-sm font-medium text-slate-400 whitespace-nowrap">
          Modul Aktif:
        </div>
        <div
          className="flex items-center gap-1.5 px-5 py-2.5 text-sm font-bold whitespace-nowrap transition-colors border-b-2"
          style={{
            borderBottomColor: roleInfo.warna,
            color: roleInfo.warna,
            backgroundColor: `${roleInfo.warna}10`,
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: roleInfo.warna }}
          />
          {activeItem?.label || roleInfo.nama}
        </div>
      </div>

      <div className="text-sm font-medium flex items-center gap-2">
        <span className="text-slate-500">Akses sebagai:</span>
        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 shadow-sm text-xs font-bold uppercase tracking-wider">
          {userRoleLabel}
        </span>
      </div>
    </div>
  );
}
