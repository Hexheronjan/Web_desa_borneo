import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import AdminDataDesaActions from "./AdminDataDesaActions";
import { auth } from "@/auth";
import { ActionButton } from "@/components/shared/ActionButton";
import { deleteWarga } from "@/actions/data-desa";

const COLOR = "#5E35B1";

export default async function DataDesaPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";
  const isWarga = userRole === "warga";

  const [totalWarga, wargaAktif, wargaReview, wargaBaru] = await Promise.all([
    prisma.warga.count(),
    prisma.warga.count({ where: { status: "Aktif" } }),
    prisma.warga.count({ where: { status: "Review" } }),
    prisma.warga.count({ where: { status: "Baru" } }),
  ]);

  const desa = await prisma.desa.findFirst();
  const rwrts = await prisma.rwRt.findMany();
  const listWarga = await prisma.warga.findMany({ take: 10, orderBy: { createdAt: 'desc' } });

  const auditDummy = [
    { user: "Admin Desa", aksi: "Menambah warga baru", modul: "Data Desa", waktu: "5 menit lalu" },
    { user: "Nakes Posyandu", aksi: "Input rekam medis warga #204", modul: "Smart Sehat", waktu: "12 menit lalu" },
    { user: "Guru Fasilitator", aksi: "Upload materi E-Learning Batch B", modul: "Smart Belajar", waktu: "1 jam lalu" },
  ];

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Profil & Data Desa Adat" modul="Data Desa Adat Borneo" color={COLOR} />

      {!isWarga && <AdminDataDesaActions totalWarga={totalWarga} />}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Warga" value={totalWarga} satuan="jiwa terdaftar" barColor="purple" progress={100} />
        <StatCard label="Luas Wilayah" value="1.450" satuan="hektar" barColor="green" progress={100} />
        <StatCard label="RW/RT" value="5/15" satuan="wilayah" barColor="orange" progress={100} />
        <StatCard label="Suku" value="Dayak Paser" satuan="etnis utama" barColor="blue" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Profil Desa (Dilihat Semua) */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>🏛️ Profil Desa Adat Borneo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p><strong>Nama Desa:</strong> {desa?.nama || "Desa Adat Borneo"}</p>
            <p><strong>Visi:</strong> Mewujudkan desa adat mandiri yang berbudaya dan berbasis teknologi.</p>
            <p><strong>Sejarah Singkat:</strong> Desa ini merupakan pusat pemukiman suku Dayak Paser sejak abad ke-18...</p>
            <div className="pt-2">
              <button className="text-xs text-purple-600 font-bold hover:underline">Baca Selengkapnya →</button>
            </div>
          </CardContent>
        </Card>

        {/* Struktur & Wilayah */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>📊 Kependudukan & Wilayah</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {rwrts.map((rw, i) => (
                <div key={i} className="p-2 border rounded-lg text-center bg-purple-50">
                  <p className="font-bold text-xs text-slate-700">RW {rw.rw}/RT {rw.rt}</p>
                  <p className="text-lg font-extrabold" style={{ color: COLOR }}>{rw.jumlahWarga}</p>
                  <p className="text-[10px] text-slate-400">warga</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {!isWarga && (
        <>
          {/* Admin Only: Kelola Warga */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>👥 Kelola Data Warga (Live DB)</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                {listWarga.length === 0 ? (
                    <p className="text-sm text-slate-500 text-center py-4">Belum ada warga terdaftar.</p>
                ) : listWarga.map((w, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-purple-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800">{w.nama}</p>
                      <p className="text-xs text-slate-500">NIK: {w.nik} • Status: {w.status}</p>
                    </div>
                    <div className="flex gap-2">
                        <ActionButton 
                            label="Hapus" 
                            action={deleteWarga} 
                            id={w.id} 
                            variant="outline"
                            className="text-red-600 border-red-200" 
                            successMessage="Data warga berhasil dihapus."
                        />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Admin Only: Audit Trail */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>🔍 Audit Trail (Admin Only)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {auditDummy.map((a, i) => (
                  <div key={i} className="flex justify-between text-xs border-b pb-2">
                    <span className="text-slate-600"><strong>{a.user}</strong>: {a.aksi}</span>
                    <span className="text-slate-400">{a.waktu}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
