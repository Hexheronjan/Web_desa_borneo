import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real PMD office data
    const totalDesa = await prisma.desa.count();
    const totalMonitoring = await prisma.monitoringDesa.count();

    // Multi-desa data (mock with real base numbers)
    const mapDesaData = [
      { nama: 'Desa Borneo 1', index: 78, readiness: 82, maturity: 3.8 },
      { nama: 'Desa Borneo 2', index: 75, readiness: 78, maturity: 3.5 },
      { nama: 'Desa Borneo 3', index: 72, readiness: 75, maturity: 3.2 },
      { nama: 'Desa Borneo 4', index: 80, readiness: 85, maturity: 4.0 },
      { nama: 'Desa Borneo 5', index: 74, readiness: 76, maturity: 3.4 },
    ];

    // Benchmark data
    const benchmarkData = [
      { desa: 'Desa Borneo 1', slindex: 78, target: 85, trend: 'up' },
      { desa: 'Desa Borneo 2', slindex: 75, target: 80, trend: 'up' },
      { desa: 'Desa Borneo 3', slindex: 72, target: 75, trend: 'down' },
      { desa: 'Desa Borneo 4', slindex: 80, target: 85, trend: 'up' },
      { desa: 'Desa Borneo 5', slindex: 74, target: 75, trend: 'up' },
    ];

    // Regional trend
    const trendRegional = [
      { bln: 'Jan', avg: 72 },
      { bln: 'Feb', avg: 73 },
      { bln: 'Mar', avg: 74 },
      { bln: 'Apr', avg: 75 },
      { bln: 'Mei', avg: 76 },
      { bln: 'Jun', avg: 78 },
    ];

    return NextResponse.json({
      success: true,
      data: {
        mapDesaData,
        benchmarkData,
        trendRegional,
        stats: {
          totalDesa,
          totalMonitoring
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}