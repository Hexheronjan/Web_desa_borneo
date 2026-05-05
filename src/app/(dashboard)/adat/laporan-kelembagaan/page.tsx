import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import AdminAdatActions from "./AdminAdatActions";
import { auth } from "@/auth";
import Link from "next/link";
import { ActionButton } from "@/components/shared/ActionButton";
import { approveArsip, deleteArsip } from "@/actions/adat";

const COLOR = "#2E7D32";

export default async function LaporanKelembagaanPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";
  const isWarga = userRole === "warga";

  // BLOCK WARGA ACCESS
  if (isWarga) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
        <div className="text-6xl">🔒</div>
        <h2 className="text-2xl font-bold text-slate-800">Akses Terbatas</h2>
        <p className="text-slate-500 max-w-md">
          Maaf, halaman Laporan Kelembagaan & Admin Adat hanya dapat diakses oleh Pengurus Lembaga Adat dan Admin Desa.
        </p>
        <Link href="/adat" className="px-6 py-2 bg-[#2E7D32] text-white rounded-lg font-bold shadow-md hover:bg-[#1b4b1e] transition-colors">
          Kembali ke Dashboard Adat
        </Link>
      </div>
    );
  }

  const [totalArsip, arsipReview, totalMusyawarah, disahkan, kasusAktif, pengurusCount] = await Promise.all([
    prisma.arsipAdat.count(),
    prisma.arsipAdat.count({ where: { statusReview: "Review" } }),
    prisma.musyawarah.count(),
    prisma.musyawarah.count({ where: { statusSah: true } }),
    prisma.hukumAdat.count({ where: { tipe: "Kasus", status: "Aktif" } }),
    prisma.pengurus.count()
  ]);

  const arsipMenunggu = await prisma.arsipAdat.findMany({
    where: { statusReview: "Review" },
    take: 10,
    orderBy: { createdAt: "desc" },
  });

  const displayArsip = arsipMenunggu;

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Laporan Kelembagaan & Admin Adat" modul="Smart Lembaga Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Arsip" value={totalArsip} satuan="dokumen" barColor="green" progress={95} />
        <StatCard label="Menunggu Review" value={arsipReview} satuan="perlu validasi" barColor="orange" progress={35} />
        <StatCard label="Musyawarah" value={totalMusyawarah} satuan="bulan ini" barColor="teal" progress={75} />
        <StatCard label="Keputusan Sah" value={disahkan} satuan="disahkan" barColor="blue" progress={67} />
      </div>

      <AdminAdatActions />

      {/* Verifikasi Arsip */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            📋 Arsip Menunggu Verifikasi Admin ({arsipReview} arsip - Live Data)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {displayArsip.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">Tidak ada arsip yang menunggu review.</p>
          ) : (
            <div className="space-y-3">
              {displayArsip.map((a: any, i: number) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-green-50 transition-colors">
                  <div>
                    <p className="font-semibold text-sm text-slate-800">{a.judul}</p>
                    <p className="text-xs text-slate-500">{a.kategori} • {a.tipe}</p>
                  </div>
                  <div className="flex gap-2">
                    <ActionButton 
                        label="✓ Setujui" 
                        action={approveArsip} 
                        id={a.id} 
                        className="bg-green-600 hover:bg-green-700 text-white" 
                        successMessage="Arsip berhasil disetujui and dipublikasikan!"
                    />
                    <ActionButton 
                        label="✗ Tolak" 
                        action={deleteArsip} 
                        id={a.id} 
                        variant="outline"
                        className="text-red-700 border-red-200 hover:bg-red-50" 
                        successMessage="Arsip telah ditolak and dihapus."
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Rekap Semua Modul */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>📊 Rekap Aktivitas Semua Modul Adat (Real-time)</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Fitur</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Total Data</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Perlu Tindakan</th>
                <th className="text-left px-4 py-3 font-semibold text-slate-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SI Kelembagaan Adat", pengurusCount, 0, "Aktif"],
                ["Arsip Digital Adat & Budaya", totalArsip, arsipReview, "Review"],
                ["Musyawarah Adat Online", totalMusyawarah, disahkan, "Selesai"],
                ["Digital Mapping Wilayah Adat", 12, 0, "Normal"],
                ["Portal Hukum Adat & Resolusi", kasusAktif, kasusAktif > 0 ? kasusAktif : 0, "Sidang"],
              ].map(([fitur, total, tindakan, status], i) => (
                <tr key={i} className="border-b border-slate-50 hover:bg-green-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-slate-800">{fitur as string}</td>
                  <td className="px-4 py-3 text-slate-600">{total}</td>
                  <td className="px-4 py-3">
                    {Number(tindakan) > 0 ? (
                      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">{tindakan}</span>
                    ) : (
                      <span className="text-slate-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${status === "Sengketa" || status === "Sidang" ? "bg-red-100 text-red-700" : status === "Review" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {status as string}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
