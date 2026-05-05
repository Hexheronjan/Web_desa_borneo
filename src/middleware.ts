import NextAuth from "next-auth";
import { authConfig } from "./auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  if (pathname === "/login" && isLoggedIn) {
    const url = req.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (!isLoggedIn && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ── Role-Based Access Control (RBAC) ──
  const role = req.auth?.user?.role;
  
  if (isLoggedIn && pathname !== "/unauthorized" && pathname !== "/login" && pathname !== "/") {
    
    // 1. Modul Smart Belajar (Hanya Guru, Warga, Admin/Pemerintah Desa)
    if (pathname.startsWith("/belajar")) {
      const allowedRoles = ["guru_fasilitator", "warga", "pemerintah_desa", "admin_super"];
      if (!allowedRoles.includes(role!)) {
        const url = req.nextUrl.clone();
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }

    // 2. Modul Smart Sehat (Hanya Nakes, Warga, Admin/Pemerintah Desa)
    if (pathname.startsWith("/sehat")) {
      const allowedRoles = ["nakes_posyandu", "warga", "pemerintah_desa", "admin_super"];
      if (!allowedRoles.includes(role!)) {
        const url = req.nextUrl.clone();
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }

    // 3. Modul Smart Adat (Hanya Lembaga Adat, Warga, Admin/Pemerintah Desa)
    if (pathname.startsWith("/adat")) {
      const allowedRoles = ["lembaga_adat", "warga", "pemerintah_desa", "admin_super"];
      if (!allowedRoles.includes(role!)) {
        const url = req.nextUrl.clone();
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }

    // 4. Modul Data Desa & Laporan (Hanya Pemerintah Desa & Admin)
    if (pathname.startsWith("/data-desa") || pathname.startsWith("/laporan") || pathname.startsWith("/audit")) {
      const allowedRoles = ["pemerintah_desa", "admin_super"];
      if (!allowedRoles.includes(role!)) {
        const url = req.nextUrl.clone();
        url.pathname = "/unauthorized";
        return NextResponse.redirect(url);
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
