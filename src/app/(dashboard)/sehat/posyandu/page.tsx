export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import NakesSehatActions from "../NakesSehatActions";
import { PosyanduActions } from "./PosyanduActions";

const COLOR = "#E07B2A";

export default async function PosyanduPage() {
  const posyandu = await prisma.posyandu.findMany({
    orderBy: { tanggal: "desc" },
    take: 10,
  });

  const totalKegiatan = await prisma.posyandu.count();
  const totalBalita = posyandu.reduce((acc, p) => acc + p.jumlahBalita, 0);
  const totalImunisasi = posyandu.reduce((acc, p) => acc + p.jumlahImunisasi, 0);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Sistem Informasi Posyandu" modul="Smart Sehat Adat" color={COLOR} />

      <PosyanduActions color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Kegiatan" value={totalKegiatan || 5} satuan="mingguan" barColor="orange" progress={100} />
        <StatCard label="Balita Hadir" value={totalBalita || 96} satuan="anak" barColor="green" progress={80} />
        <StatCard label="Imunisasi" value={totalImunisasi || 61} satuan="tindakan" barColor="teal" progress={64} />
        <StatCard label="Jadwal Aktif" value={5} satuan="lokasi" barColor="blue" progress={100} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Jadwal Posyandu */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              📅 Jadwal Posyandu Bulan Ini
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { tanggal: "5 Mei 2025", lokasi: "Balai RW 01", waktu: "08:00 – 11:00", status: "Selesai" },
              { tanggal: "12 Mei 2025", lokasi: "Posyandu Melati RW 02", waktu: "08:00 – 11:00", status: "Selesai" },
              { tanggal: "19 Mei 2025", lokasi: "Balai Desa", waktu: "08:00 – 12:00", status: "Mendatang" },
              { tanggal: "26 Mei 2025", lokasi: "Posyandu Mawar RW 03", waktu: "08:00 – 11:00", status: "Mendatang" },
            ].map((jadwal, i) => (
              <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-orange-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{jadwal.tanggal}</p>
                  <p className="text-xs text-slate-500">{jadwal.lokasi} • {jadwal.waktu}</p>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${jadwal.status === "Selesai" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"}`}>
                  {jadwal.status}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Kegiatan Posyandu dari DB */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
              📊 Riwayat Kegiatan Posyandu
            </CardTitle>
          </CardHeader>
          <CardContent>
            {posyandu.length === 0 ? (
              <div className="text-center py-10 text-slate-400">
                <p className="text-2xl mb-2">🏥</p>
                <p className="text-sm">Belum ada data kegiatan posyandu.</p>
                <p className="text-xs mt-1">Nakes dapat menambahkan data melalui menu Monitoring.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {posyandu.map((p) => (
                  <div key={p.id} className="p-3 border rounded-lg">
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">{p.lokasi}</p>
                      <p className="text-xs text-slate-500">{new Date(p.tanggal).toLocaleDateString("id-ID")}</p>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-slate-600">
                      <span>👶 {p.jumlahBalita} balita</span>
                      <span>💉 {p.jumlahImunisasi} imunisasi</span>
                    </div>
                    {p.catatan && <p className="text-xs text-slate-500 mt-1 italic">{p.catatan}</p>}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

