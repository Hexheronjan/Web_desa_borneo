import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { ActionButton } from "@/components/shared/ActionButton";
import { deleteKelas } from "@/actions/belajar";
import GuruVirtualActions from "./GuruVirtualActions";

const COLOR = "#1E5FA5";

export default async function KelasVirtualPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";
  const isGuru = userRole === "guru_fasilitator" || userRole === "admin_super";

  const [kelasVirtual, totalPeserta, totalRekaman] = await Promise.all([
    prisma.kelas.findMany({
      where: { modul: "kelas_virtual" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.pesertaKelas.count({
        where: { kelas: { modul: 'kelas_virtual' } }
    }),
    prisma.materi.count({
        where: { tipe: 'video', kelas: { modul: 'kelas_virtual' } }
    })
  ]);

  // Calculate Real RW Stats for Virtual Classes
  const rwrts = await prisma.rwRt.findMany({
      include: {
          warga: {
              include: {
                  pesertaKelas: {
                      where: { kelas: { modul: 'kelas_virtual' } }
                  }
              }
          }
      }
  });

  const rwStats = rwrts.map(rw => ({
      nama: `Warga RW ${rw.rw}/RT ${rw.rt}`,
      count: rw.warga.filter(w => w.pesertaKelas.length > 0).length
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Kelas Virtual Komunitas" modul="Smart Belajar Adat" color={COLOR} />

      {/* Guru Virtual Actions */}
      {isGuru && <GuruVirtualActions color={COLOR} />}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kelas Virtual" value={kelasVirtual.length} satuan="batch aktif" barColor="blue" progress={100} />
        <StatCard label="Peserta Live" value={totalPeserta} satuan="hadir live" barColor="green" progress={75} />
        <StatCard label="Rekaman" value={totalRekaman} satuan="tersimpan" barColor="teal" progress={60} />
        <StatCard label="Status" value="Live" satuan="data" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              📅 Jadwal & Rekaman Kelas Virtual (Live DB)
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {kelasVirtual.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">Belum ada kelas virtual terdaftar.</p>
            ) : kelasVirtual.map((k, i) => (
              <div key={i} className={`p-3 border-2 rounded-lg ${k.status === 'Aktif' ? 'border-blue-100 bg-blue-50' : 'border-slate-100'}`}>
                <p className="font-semibold text-sm text-blue-900">{k.nama}</p>
                <p className="text-xs text-slate-600 mt-1">📅 {k.batch} • ⏰ {k.waktu}</p>
                <div className="flex gap-2 mt-2">
                  <Button size="sm" className="flex-1 bg-blue-600 text-white">
                    {k.status === 'Aktif' ? 'Mulai Live' : 'Buka Rekaman'}
                  </Button>
                  {isGuru && (
                      <ActionButton 
                        label="Hapus" 
                        action={deleteKelas} 
                        id={k.id} 
                        variant="ghost" 
                        className="text-red-500" 
                        successMessage="Kelas virtual berhasil dihapus."
                      />
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>👥 Partisipasi Peserta per RW (Real-time)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {rwStats.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">Belum ada data wilayah.</p>
              ) : rwStats.map((p, i) => (
                <div key={i} className="flex justify-between items-center p-2 bg-slate-50 rounded-lg">
                  <span className="text-xs font-medium text-slate-700">{p.nama}</span>
                  <span className="text-xs font-bold text-blue-700">{p.count} jiwa</span>
                </div>
              ))}
              <p className="text-[10px] text-slate-400 mt-4 text-center">Data partisipasi disinkronkan dengan Database Satu Data Desa.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
