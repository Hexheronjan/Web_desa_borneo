export const dynamic = 'force-dynamic';
import prisma from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/shared/PageTitle";
import { StatCard } from "@/components/shared/StatCard";
import NakesSehatActions from "../NakesSehatActions";
import { ActionButton } from "@/components/shared/ActionButton";
import { deleteMonitoring } from "@/actions/sehat";

const COLOR = "#E07B2A";


export default async function MonitoringPage() {
  const [monitoringData, totalPengukuran, totalWarga, alertCount] = await Promise.all([
    prisma.monitoringKesehatan.findMany({
      include: { warga: true },
      orderBy: { tanggal: "desc" },
      take: 20
    }),
    prisma.monitoringKesehatan.count(),
    prisma.warga.count(),
    prisma.monitoringKesehatan.count({ where: { alert: true } })
  ]);

  return (
    <div className="flex flex-col gap-5">
      <PageTitle fitur="Monitoring Kesehatan Warga" modul="Smart Sehat Adat" color={COLOR} />

      <NakesSehatActions color={COLOR} />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Pengukuran" value={totalPengukuran} satuan="total" barColor="orange" progress={100} />
        <StatCard label="Warga Terpantau" value={totalWarga} satuan="jiwa" barColor="green" progress={100} />
        <StatCard label="Alert" value={alertCount} satuan="follow-up" barColor="red" progress={alertCount > 0 ? 50 : 0} />
        <StatCard label="Efektivitas" value="92" satuan="%" barColor="teal" progress={92} />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-semibold" style={{ color: COLOR }}>
            📊 Data Pemeriksaan Terbaru (Live DB)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {monitoringData.length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-6">Belum ada data pemeriksaan.</p>
            ) : monitoringData.map((d) => (
              <div key={d.id} className="p-3 border rounded-lg flex justify-between items-center hover:bg-orange-50 transition-colors">
                <div>
                  <p className="font-bold text-sm text-slate-800">{d.warga.nama}</p>
                  <p className="text-xs text-slate-600 mt-1">
                    {d.tensiSistolik ? `Tensi: ${d.tensiSistolik}/${d.tensiDiastolik} • ` : ""}
                    {d.beratBadan ? `BB: ${d.beratBadan}kg • ` : ""}
                    {d.tinggiBadan ? `TB: ${d.tinggiBadan}cm` : ""}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-1">{new Date(d.tanggal).toLocaleString("id-ID")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${!d.alert ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {d.alert ? "Risiko" : "Normal"}
                  </span>
                  <ActionButton 
                    label="Hapus" 
                    action={deleteMonitoring} 
                    id={d.id} 
                    variant="ghost"
                    className="text-red-500 hover:text-red-700"
                    successMessage="Data pemeriksaan berhasil dihapus."
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

