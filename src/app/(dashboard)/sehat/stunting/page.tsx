import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { StuntingActions } from "./StuntingActions";

const COLOR = "#E07B2A";

export default async function StuntingPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";
  const wargaId = (session?.user as any)?.wargaId;
  const isWarga = userRole === "warga";

  // Ambil data stunting dari DB
  const stuntingData = await prisma.stunting.findMany({
    where: isWarga ? { wargaId: wargaId } : {},
    include: { warga: true },
    orderBy: { tanggal: "desc" },
    take: 10
  });

  const totalKasus = await prisma.stunting.count({
    where: { kategori: { not: "Normal" } }
  });

  const highRisk = await prisma.stunting.count({ where: { kategori: "RisikoTinggi" } });
  const mediumRisk = await prisma.stunting.count({ where: { kategori: "RisikoSedang" } });
  const totalRekomendasi = await prisma.stunting.count({ where: { rekomendasi: { not: null } } });

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur={isWarga ? "Pantau Status Gizi Anak" : "Deteksi Stunting & Gizi Buruk"} modul="Smart Sehat Adat" color={COLOR} />

      {!isWarga && (
        <StuntingActions color={COLOR} data={stuntingData} />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label={isWarga ? "Status Gizi" : "Total Kasus Stunting"} 
          value={isWarga ? (stuntingData[0]?.kategori || "Normal") : totalKasus} 
          satuan={isWarga ? "Sangat Baik" : "jiwa"} 
          barColor={isWarga ? "green" : "red"} 
          progress={100} 
        />
        <StatCard 
          label={isWarga ? "Tinggi Badan" : "Risiko Tinggi"} 
          value={isWarga ? (stuntingData[0]?.tb || "-") : highRisk} 
          satuan={isWarga ? "cm" : "jiwa"} 
          barColor={isWarga ? "blue" : "red"} 
          progress={100} 
        />
        <StatCard 
          label={isWarga ? "Berat Badan" : "Risiko Sedang"} 
          value={isWarga ? (stuntingData[0]?.bb || "-") : mediumRisk} 
          satuan={isWarga ? "kg" : "jiwa"} 
          barColor={isWarga ? "teal" : "yellow"} 
          progress={100} 
        />
        <StatCard label="Rekomendasi" value={isWarga ? (stuntingData[0] ? 1 : 0) : totalRekomendasi} satuan="diterbitkan" barColor="purple" progress={100} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            {isWarga ? "👶 Grafik Pertumbuhan & Rekomendasi Anak" : "👶 Daftar Balita Berisiko"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stuntingData.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-6">Belum ada data stunting terdaftar.</p>
            ) : stuntingData.map((s) => (
              <div key={s.id} className={`p-4 border rounded-lg ${s.kategori === "Normal" ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm text-slate-800">{s.warga.nama} <span className="text-xs font-normal text-slate-500">({s.umurBulan} bln)</span></p>
                    <p className="text-xs text-slate-600 mt-1">BB: {s.bb}kg • TB: {s.tb}cm • Tanggal: {new Date(s.tanggal).toLocaleDateString()}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${s.kategori === "Normal" ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {s.kategori}
                  </span>
                </div>
                {s.rekomendasi && (
                  <div className="mt-3 p-3 bg-white/50 rounded border border-dashed border-slate-300">
                    <p className="text-xs text-slate-700"><strong>💡 Rekomendasi Nakes:</strong></p>
                    <p className="text-xs text-slate-600 mt-1 italic">{s.rekomendasi}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
