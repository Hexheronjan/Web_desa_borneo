"use client";
import { useSession } from "next-auth/react";

export function useUserRole() {
  const { data: session } = useSession();
  
  // Peran yang tersedia: 
  // 'warga', 'pemerintah_desa', 'lembaga_adat', 'nakes_posyandu', 'guru_fasilitator', 'admin_super'
  const role = session?.user?.role || "warga";
  
  return {
    role,
    isWarga: role === "warga",
    isAdmin: role === "pemerintah_desa" || role === "admin_super",
    isAdat: role === "lembaga_adat",
    isNakes: role === "nakes_posyandu",
    isGuru: role === "guru_fasilitator",
    // Helper to check if user has management/admin access
    isStaff: role !== "warga"
  };
}
