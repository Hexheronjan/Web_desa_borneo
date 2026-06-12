import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Root page → redirects to role-specific dashboard via middleware
// This is a fallback in case middleware doesn't catch it
export default async function RootPage() {
  const session = await auth();
  const role = session?.user?.role || "warga";

  const roleRoutes: Record<string, string> = {
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

  redirect(roleRoutes[role] || "/warga");
}
