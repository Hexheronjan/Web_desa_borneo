import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const siswa = await prisma.siswa.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: siswa });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Get desa record
    const desa = await prisma.desa.findFirst();
    if (!desa) {
      return NextResponse.json({ success: false, error: "Data desa tidak ditemukan. Silakan hubungi admin." }, { status: 400 });
    }
    
    const record = await prisma.siswa.create({
      data: {
        desaId: desa.id,
        nisn: body.nisn,
        nama: body.nama,
        kelas: body.kelas,
        jenjang: body.jenjang,
        status: body.status || "Aktif",
      }
    });
    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    const record = await prisma.siswa.update({
      where: { id },
      data: {
        nisn: data.nisn,
        nama: data.nama,
        kelas: data.kelas,
        jenjang: data.jenjang,
        status: data.status,
      }
    });
    return NextResponse.json({ success: true, data: record });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }
    await prisma.siswa.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
