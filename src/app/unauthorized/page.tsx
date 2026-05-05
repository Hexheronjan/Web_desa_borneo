import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
      <h1 className="text-4xl font-bold text-red-600 mb-4">403 - Akses Ditolak</h1>
      <p className="text-slate-600 mb-8 max-w-md text-center">
        Anda tidak memiliki izin untuk mengakses halaman ini. Halaman ini memerlukan role yang berbeda.
      </p>
      <Link href="/" className={buttonVariants({ variant: "default" })}>
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
