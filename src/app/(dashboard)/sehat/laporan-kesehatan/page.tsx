import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import AdminSehatActions from "./AdminSehatActions";
import { auth } from "@/auth";
import Link from "next/link";

const COLOR = "#E07B2A";


export default async function LaporanKesehatanPage() {
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
          Maaf, halaman Dashboard Kesehatan & Laporan hanya dapat diakses oleh Nakes dan Admin Desa.
        </p>
        <Link href="/sehat" className="px-6 py-2 bg-[#E07B2A] text-white rounded-lg font-bold shadow-md hover:bg-[#c26721] transition-colors">
          Kembali ke Dashboard Sehat
        </Link>
      </div>
    );
  }

  const [totalTelemed, antrian, totalRekam, stuntingTinggi, stuntingTotal, posyandu, rwrts] = await Promise.all([
    prisma.telemedicine.count(),
    prisma.telemedicine.count({ where: { status: "Antrian" } }),
    prisma.rekamMedis.count(),
    prisma.stunting.count({ where: { kategori: "RisikoTinggi" } }),
    prisma.stunting.count(),
    prisma.posyandu.findMany({ orderBy: { tanggal: "desc" }, take: 5 }),
    prisma.rwRt.findMany({
      include: {
        warga: {
          include: {
            telemedicine: true
          }
        }
      }
    })
  ]);

  // Aggregate Real RW Data
  const rwData = rwrts.map(rw => ({
    rw: `RW ${rw.rw}/RT ${rw.rt}`,
    kunjungan: rw.warga.reduce((acc, w) => acc + w.telemedicine.length, 0),
    aktif: rw.warga.filter(w => w.status === 'Aktif').length,
    baru: rw.warga.filter(w => w.status === 'Baru').length,
    review: rw.warga.filter(w => w.status === 'Review').length,
  }));

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Dashboard Kesehatan & Laporan" modul="Smart Sehat Adat" color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Kunjungan" value={totalTelemed} satuan="semua waktu" barColor="orange" progress={100} />
        <StatCard label="Antrian Aktif" value={antrian} satuan="menunggu" barColor="red" progress={antrian > 0 ? 50 : 0} />
        <StatCard label="Rekam Medis" value={totalRekam} satuan="entri" barColor="teal" progress={80} />
        <StatCard label="Stunting Risiko Tinggi" value={stuntingTinggi} satuan={`dari ${stuntingTotal} balita`} barColor="red" progress={stuntingTinggi > 0 ? 40 : 0} />
      </div>

      <AdminSehatActions />

      {/* Tabel Status Per RW/RT */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold flex items-center justify-between" style={{ color: COLOR }}>
            <span>📍 Status Kesehatan Warga per RW/RT (Live Data)</span>
            <span className="text-xs text-slate-400 font-normal">Total {rwrts.length} Wilayah ▾</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-orange-50 border-b border-orange-100">
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Wilayah</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Kunjungan</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Aktif</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Baru</th>
                  <th className="text-left px-4 py-3 font-semibold text-slate-700">Review</th>
                </tr>
              </thead>
              <tbody>
                {rwData.map((r, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-orange-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800">{r.rw}</td>
                    <td className="px-4 py-3 text-slate-600 font-semibold">{r.kunjungan}</td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">{r.aktif}</span></td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">{r.baru}</span></td>
                    <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">{r.review}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Rekap Posyandu */}
      <Card>
        <CardHeader><CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>🏥 Rekap Kegiatan Posyandu Terbaru</CardTitle></CardHeader>
        <CardContent>
          {posyandu.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">Belum ada data posyandu. Nakes dapat menambahkan melalui menu Posyandu.</p>
          ) : (
            <div className="space-y-2">
              {posyandu.map((p, i) => (
                <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-orange-50 transition-colors">
                  <div>
                    <p className="font-semibold text-sm">{p.lokasi}</p>
                    <p className="text-xs text-slate-500">{new Date(p.tanggal).toLocaleDateString("id-ID")}</p>
                  </div>
                  <div className="flex gap-4 text-xs text-slate-600">
                    <span>👶 {p.jumlahBalita} balita</span>
                    <span>💉 {p.jumlahImunisasi} imunisasi</span>
                  </div>
                  <button className="text-xs text-orange-600 hover:underline">Edit Jadwal</button>
                </div>
              ))}
            </div>
          )}
          <button className="mt-3 w-full text-xs text-orange-700 font-semibold border border-orange-200 rounded-lg py-2 hover:bg-orange-50 transition-colors">
            + Tambah Jadwal Posyandu Baru
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
