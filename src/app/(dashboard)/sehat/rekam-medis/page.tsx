import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { ActionButton } from "@/components/shared/ActionButton";
import { deleteRekamMedis } from "@/actions/sehat";
import { AdminRekamMedisActions } from "./AdminRekamMedisActions";
import { RekamMedisDetail } from "./RekamMedisDetail";

const COLOR = "#E07B2A";

export default async function RekamMedisPage() {
  const session = await auth();
  const userRole = session?.user?.role || "warga";
  const wargaId = (session?.user as any)?.wargaId;
  const isWarga = userRole === "warga";

  const [rekamData, totalRekam, totalAlergi] = await Promise.all([
    prisma.rekamMedis.findMany({
      where: isWarga ? { wargaId: wargaId } : {},
      include: { warga: true },
      orderBy: { tanggal: "desc" },
      take: 20
    }),
    prisma.rekamMedis.count({ where: isWarga ? { wargaId: wargaId } : {} }),
    prisma.rekamMedis.count({ 
      where: { 
        ...(isWarga ? { wargaId: wargaId } : {}),
        NOT: { alergi: null } 
      } 
    })
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Rekam Medis Digital" modul="Smart Sehat Adat" color={COLOR} />

      {!isWarga && (
        <AdminRekamMedisActions color={COLOR} data={rekamData} />
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label={isWarga ? "Riwayat Anda" : "Profil Warga"} value={totalRekam} satuan="entri" barColor="orange" progress={100} />
        <StatCard label="Alergi" value={totalAlergi} satuan="tercatat" barColor="red" progress={14} />
        <StatCard label="Kunjungan" value="487" satuan="total" barColor="green" progress={90} />
        <StatCard label="Status" value="Aktif" satuan="digital" barColor="blue" progress={100} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            {isWarga ? "📜 Riwayat Penyakit & Alergi Anda" : "📋 Daftar Rekam Medis Warga (Live DB)"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {rekamData.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">Belum ada rekam medis terdaftar.</p>
            ) : rekamData.map((rm) => (
              <div key={rm.id} className="p-3 border rounded-lg hover:bg-orange-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm text-slate-800">{isWarga ? "Rekam Medis Pribadi" : rm.warga.nama}</p>
                    <p className="text-xs text-slate-500">NIK: {rm.warga.nik} • Diagnosis: {rm.diagnosis}</p>
                    <p className={`text-[10px] mt-1 font-semibold ${rm.alergi ? "text-red-600" : "text-green-600"}`}>
                      ⚠️ Alergi: {rm.alergi || "Tidak ada"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <RekamMedisDetail rm={rm} color={COLOR} />
                    {!isWarga && (
                        <ActionButton 
                          label="Hapus" 
                          action={deleteRekamMedis} 
                          id={rm.id} 
                          variant="ghost"
                          className="text-red-500"
                          successMessage="Rekam medis berhasil dihapus."
                        />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
