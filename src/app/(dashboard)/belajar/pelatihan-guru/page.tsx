import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

const COLOR = "#1E5FA5";


export default async function PelatihanGuruPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";
  const isGuru = userRole === "guru_fasilitator";

  const [sesiList, totalGuru, sertifikatCount] = await Promise.all([
    prisma.kelas.findMany({
      where: { modul: "pelatihan_guru" },
      orderBy: { createdAt: "desc" },
    }),
    prisma.user.count({ where: { role: 'guru_fasilitator' } }),
    prisma.pesertaKelas.count({ where: { NOT: { sertifikat: null } } }),
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Program Pelatihan Guru Digital" modul="Smart Belajar Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Peserta Guru" value={totalGuru} satuan="jiwa" barColor="blue" progress={70} />
        <StatCard label="Sesi" value={sesiList.length} satuan="bulan ini" barColor="green" progress={50} />
        <StatCard label="Sertifikat" value={sertifikatCount} satuan="terbit" barColor="teal" progress={57} />
        <StatCard label="Status" value="Live" satuan="data" barColor="orange" progress={100} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold capitalize" style={{ color: COLOR }}>
            🎥 Sesi Pelatihan Guru Wajib (Live DB)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {sesiList.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">Belum ada sesi pelatihan terdaftar.</p>
            ) : sesiList.map((s, i) => (
              <div key={i} className="p-3 border rounded-lg flex justify-between items-center hover:bg-slate-50 transition-colors">
                <div>
                  <p className="font-semibold text-sm text-slate-800">{s.nama}</p>
                  <p className="text-xs text-slate-500">📅 {s.batch} • ⏰ {s.waktu}</p>
                </div>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-[10px] font-bold">{s.status}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                        Ikuti Sesi
                    </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>📝 Pengumpulan Tugas Pelatihan</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-slate-400">
            <p className="text-3xl mb-2">📝</p>
            <p className="text-sm font-semibold">Tugas Pembuatan Modul Budaya</p>
            <p className="text-xs mt-1">Batas waktu: Akhir Bulan</p>
            <Button className="mt-4" style={{ backgroundColor: COLOR }}>Upload Tugas (.PDF / .MP4)</Button>
        </CardContent>
      </Card>
    </div>
  );
}
