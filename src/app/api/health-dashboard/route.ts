import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real health data
    const totalRekamMedis = await prisma.rekamMedis.count();
    const totalTelemedicine = await prisma.telemedicine.count();
    const totalPosyandu = await prisma.posyandu.count({ where: { desaId: desa.id }});
    const totalStunting = await prisma.stunting.count();
    const totalMonitoring = await prisma.monitoringKesehatan.count();

    // Nutritional status pie data
    const statusGizi = [
      { name: 'Normal', value: 65, color: '#4CAF50' },
      { name: 'Risiko Sedang', value: 25, color: '#FF9800' },
      { name: 'Risiko Tinggi', value: 10, color: '#F44336' },
    ];

    // Stunting prevalence per RT
    const stuntingPerRT = [
      { rt: 'RT 01', prevalensi: 12 },
      { rt: 'RT 02', prevalensi: 15 },
      { rt: 'RT 03', prevalensi: 18 },
      { rt: 'RT 04', prevalensi: 14 },
      { rt: 'RT 05', prevalensi: 16 },
    ];

    return NextResponse.json({
      success: true,
      data: {
        statusGizi,
        stuntingPerRT,
        stats: {
          totalRekamMedis,
          totalTelemedicine,
          totalPosyandu,
          totalStunting,
          totalMonitoring
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}