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
  "/operator-sid": ["operator_sid", "admin_super"],
  "/pemdes": ["pemerintah_desa", "admin_super"],
  "/bpd": ["bpd", "admin_super"],
  "/adat": ["lembaga_adat", "admin_super"],
  "/guru": ["guru_fasilitator", "admin_super"],
  "/nakes": ["nakes_posyandu", "admin_super"],
  "/warga": ["warga", "admin_super"],
  "/dinas-pmd": ["dinas_pmd", "admin_super"],
  "/peneliti": ["peneliti", "admin_super"],
  "/sustainability": ["pemerintah_desa", "admin_super", "dinas_pmd"],
};

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;
  const publicRoutes = ["/login", "/unauthorized"];

  // If logged in and on /login, redirect to role dashboard
  if (pathname === "/login" && isLoggedIn) {
    const role = req.auth?.user?.role || "warga";
    const url = req.nextUrl.clone();
    url.pathname = roleRouteMap[role] || "/warga";
    return NextResponse.redirect(url);
  }

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // If not logged in and not on /login, redirect to /login
  if (!isLoggedIn) {
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
