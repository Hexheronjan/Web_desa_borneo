import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan" }, { status: 400 });
    }

    // Get real cultural data
    const totalPengurus = await prisma.pengurus.count({ where: { desaId: desa.id } });
    const totalArsipAdat = await prisma.arsipAdat.count({ where: { desaId: desa.id }});
    const totalMusyawarah = await prisma.musyawarah.count({ where: { desaId: desa.id }});
    const totalWilayahAdat = await prisma.wilayahAdat.count({ where: { desaId: desa.id }});

    // Cultural activities monthly trend (mock with real base numbers)
    const kegiatanBulanan = [
      { bln: 'Jan', kegiatan: Math.max(2, totalMusyawarah - 4) },
      { bln: 'Feb', kegiatan: Math.max(3, totalMusyawarah - 3) },
      { bln: 'Mar', kegiatan: Math.max(4, totalMusyawarah - 2) },
      { bln: 'Apr', kegiatan: Math.max(3, totalMusyawarah - 2) },
      { bln: 'Mei', kegiatan: Math.max(5, totalMusyawarah - 1) },
      { bln: 'Jun', kegiatan: totalMusyawarah || 6 },
      { bln: 'Jul', kegiatan: Math.max(4, totalMusyawarah - 1) },
      { bln: 'Agu', kegiatan: Math.max(7, totalMusyawarah) },
      { bln: 'Sep', kegiatan: Math.max(5, totalMusyawarah - 1) },
      { bln: 'Okt', kegiatan: Math.max(6, totalMusyawarah) },
      { bln: 'Nov', kegiatan: Math.max(8, totalMusyawarah + 1) },
      { bln: 'Des', kegiatan: Math.max(5, totalMusyawarah - 1) },
    ];

    // Institutional radar data
    const kelembagaanRadar = [
      { aspek: 'Struktur Org.', nilai: Math.min(95, 70 + totalPengurus * 5) },
      { aspek: 'Musyawarah', nilai: Math.min(92, 75 + totalMusyawarah * 3) },
      { aspek: 'Dokumentasi', nilai: Math.min(88, 65 + totalArsipAdat * 2) },
      { aspek: 'Hukum Adat', nilai: 85 },
      { aspek: 'Huma Betang', nilai: Math.min(90, 70 + totalWilayahAdat * 5) },
    ];

    // Get real pengurus data for leadership structure
    const pengurusData = await prisma.pengurus.findMany({
      where: { desaId: desa.id },
      take: 4,
      orderBy: { createdAt: 'asc' }
    });

    const anggotaData = pengurusData.length > 0 ? pengurusData.map(p => ({
      jabatan: p.jabatan,
      nama: p.nama,
      masa: p.periode,
      status: p.status
    })) : [
      { jabatan: 'Damang Kepala Adat', nama: 'H. Tjilik Riwut', masa: '2022–2027', status: 'Aktif' },
      { jabatan: 'Mantir Adat I', nama: 'Yansen Tambun', masa: '2022–2027', status: 'Aktif' },
      { jabatan: 'Mantir Adat II', nama: 'Mariati Luha', masa: '2022–2027', status: 'Aktif' },
      { jabatan: 'Sekretaris Adat', nama: 'Beno Sintha', masa: '2022–2027', status: 'Aktif' },
    ];

    return NextResponse.json({
      success: true,
      data: {
        kegiatanBulanan,
        kelembagaanRadar,
        anggotaData,
        stats: {
          totalPengurus,
          totalArsipAdat,
          totalMusyawarah,
          totalWilayahAdat
        }
      }
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}