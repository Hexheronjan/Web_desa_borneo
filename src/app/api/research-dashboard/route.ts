import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real research data
    const totalKelas = await prisma.kelas.count({ where: { desaId: desa.id }});
    const totalForum = await prisma.forum.count({ where: { kelas: { desaId: desa.id }}});

    // Maturity level data
    const maturityData = [
      { dim: 'Digital Governance', level: 3.8 },
      { dim: 'Smart Economy', level: 3.5 },
      { dim: 'Smart Living', level: 4.2 },
      { dim: 'Smart Environment', level: 3.9 },
      { dim: 'Smart Mobility', level: 3.2 },
    ];

    // Consistency ratio trend
    const crTrend = [
      { iter: 'Iter 1', cr: 0.15 },
      { iter: 'Iter 2', cr: 0.12 },
      { iter: 'Iter 3', cr: 0.10 },
      { iter: 'Iter 4', cr: 0.09 },
      { iter: 'Iter 5', cr: 0.08 },
    ];

    // UAT/SUS scores
    const uatData = [
      { aspek: 'Usability', sus: 85 },
      { aspek: 'Learnability', sus: 82 },
      { aspek: 'Memorability', sus: 78 },
      { aspek: 'Efficiency', sus: 80 },
      { aspek: 'Satisfaction', sus: 88 },
    ];

    return NextResponse.json({
      success: true,
      data: {
        maturityData,
        crTrend,
        uatData,
        stats: {
          totalKelas,
          totalForum
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}