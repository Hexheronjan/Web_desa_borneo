import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";

const COLOR = "#1E5FA5";


export default async function PusatLiterasiPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";

  const [totalLayanan, tutorCount] = await Promise.all([
    prisma.pesertaKelas.count({ where: { kelas: { modul: 'pusat_literasi' } } }),
    prisma.user.count({ where: { role: 'guru_fasilitator' } })
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Pusat Literasi Digital Desa" modul="Smart Belajar Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Layanan" value={totalLayanan} satuan="total warga" barColor="blue" progress={62} />
        <StatCard label="Perangkat" value={18} satuan="siap pakai" barColor="green" progress={90} />
        <StatCard label="Tutor" value={tutorCount} satuan="shift aktif" barColor="teal" progress={60} />
        <StatCard label="Status" value="Live" satuan="data" barColor="orange" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>🖥️ Layanan Perangkat & Tutor</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-slate-600">
            <p>Warga dapat meminjam perangkat atau mendapatkan bimbingan tutor untuk:</p>
            <ul className="list-disc pl-4 space-y-1">
              <li>Penyusunan tugas sekolah/kuliah</li>
              <li>Pelatihan dasar komputer & internet</li>
              <li>Akses layanan administrasi desa digital</li>
              <li>Pencarian informasi beasiswa & peluang kerja</li>
            </ul>
            <div className="flex gap-2 pt-2">
              <Button size="sm" style={{ backgroundColor: COLOR }} className="flex-1">Daftar Tutor</Button>
              <Button size="sm" variant="outline" className="flex-1" style={{ borderColor: COLOR, color: COLOR }}>Pinjam Perangkat</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>🕒 Jadwal Tutor Digital (Live)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { shift: "Pagi", jam: "08:00 - 12:00", tutor: "Bpk. Heri" },
                { shift: "Siang", jam: "13:00 - 17:00", tutor: "Ibu Maya" },
                { shift: "Malam", jam: "19:00 - 21:00", tutor: "Tutor Piket" },
              ].map((s, i) => (
                <div key={i} className="flex justify-between items-center p-2 border-b last:border-0">
                  <div>
                    <p className="font-bold text-xs">{s.shift}</p>
                    <p className="text-[10px] text-slate-500">{s.jam}</p>
                  </div>
                  <p className="text-xs font-semibold text-blue-700">{s.tutor}</p>
                </div>
              ))}
              <p className="text-[10px] text-slate-400 mt-4 text-center italic">Hubungi admin untuk ketersediaan perangkat hari ini.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
