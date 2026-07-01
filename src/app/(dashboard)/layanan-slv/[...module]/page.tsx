import { GenericModulePage } from "@/components/shared/GenericModulePage";

/** Fallback untuk modul tanpa halaman khusus. Profil Saya, Forum Desa, dan Partisipasi Musyawarah punya page.tsx sendiri. */
export default function Page() {
  return <GenericModulePage />;
}
