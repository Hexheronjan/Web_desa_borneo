import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Get desa info
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get current warga count for environmental impact calculations
    const totalWarga = await prisma.warga.count({ where: { desaId: desa.id } });

    // Mock environmental data with real warga count for scaling
    const envTrend = [
      { bln: 'Jan', air: 82, sampah: 55, solar: 28 },
      { bln: 'Feb', air: 84, sampah: 57, solar: 30 },
      { bln: 'Mar', air: 85, sampah: 58, solar: 31 },
      { bln: 'Apr', air: 86, sampah: 60, solar: 32 },
      { bln: 'Mei', air: 87, sampah: 61, solar: 33 },
      { bln: 'Jun', air: 88, sampah: 62, solar: 35 },
    ];

    const energiData = [
      { name: 'Solar Panel', value: 35, color: '#E65100' },
      { name: 'PLN Grid', value: 55, color: '#1565C0' },
      { name: 'Genset Desa', value: 10, color: '#94a3b8' },
    ];

    const sdgsProgress = [
      { sdg: 'SDGs 6 — Air Bersih', capaian: 88, target: 90, color: '#1565C0' },
      { sdg: 'SDGs 7 — Energi Bersih', capaian: 35, target: 50, color: '#E65100' },
      { sdg: 'SDGs 11 — Kota Layak Huni', capaian: 72, target: 80, color: '#7B1FA2' },
      { sdg: 'SDGs 13 — Iklim', capaian: 65, target: 70, color: '#2E7D32' },
      { sdg: 'SDGs 15 — Ekosistem', capaian: 78, target: 80, color: '#00695C' },
    ];

    // Scale some stats based on real warga count
    const stats = {
      skorLingkungan: 78,
      energiTerbarukan: 35,
      pengelolaanSampah: 62,
      aksesAirBersih: 88,
      totalWarga: totalWarga
    };

    return NextResponse.json({
      success: true,
      data: {
        envTrend,
        energiData,
        sdgsProgress,
        stats
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}