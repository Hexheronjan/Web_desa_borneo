import NextAuth from "next-auth";
import { authConfig } from "./auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

// Role-to-route mapping
const roleRouteMap: Record<string, string> = {
  admin_super: "/admin",
  operator_sid: "/operator-sid",
  pemerintah_desa: "/pemdes",
  bpd: "/bpd",
  lembaga_adat: "/adat",
  guru_fasilitator: "/guru",
  nakes_posyandu: "/nakes",
  warga: "/warga",
  dinas_pmd: "/dinas-pmd",
  peneliti: "/peneliti",
};

// Route-to-allowed-roles mapping
const routeAccessMap: Record<string, string[]> = {
  "/admin": ["admin_super"],
  "/operator-sid": ["operator_sid"],
  "/pemdes": ["pemerintah_desa"],
  "/bpd": ["bpd"],
  "/adat": ["lembaga_adat"],
  "/guru": ["guru_fasilitator"],
  "/nakes": ["nakes_posyandu"],
  "/warga": ["warga"],
  "/dinas-pmd": ["dinas_pmd"],
  "/peneliti": ["peneliti"],
  "/sustainability": ["pemerintah_desa", "admin_super", "dinas_pmd"],
};

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // If logged in and on /login, redirect to role dashboard
  if (pathname === "/login" && isLoggedIn) {
    const role = req.auth?.user?.role || "warga";
    const url = req.nextUrl.clone();
    url.pathname = roleRouteMap[role] || "/warga";
    return NextResponse.redirect(url);
  }

  // If not logged in and not on /login, redirect to /login
  if (!isLoggedIn && pathname !== "/login") {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Root "/" → redirect to role-specific dashboard
  if (isLoggedIn && pathname === "/") {
    const role = req.auth?.user?.role || "warga";
    const url = req.nextUrl.clone();
    url.pathname = roleRouteMap[role] || "/warga";
    return NextResponse.redirect(url);
  }

  // Role-Based Access Control (RBAC)
  if (isLoggedIn && pathname !== "/unauthorized" && pathname !== "/login") {
    const role = req.auth?.user?.role;

    for (const [routePrefix, allowedRoles] of Object.entries(routeAccessMap)) {
      if (pathname.startsWith(routePrefix)) {
        if (!allowedRoles.includes(role!)) {
          const url = req.nextUrl.clone();
          url.pathname = "/unauthorized";
          return NextResponse.redirect(url);
        }
        break;
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
