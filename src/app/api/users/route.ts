import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Role } from "@/generated/client";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        desa: true,
        warga: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: users });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if email already exists
    const existingEmail = await prisma.user.findFirst({
      where: { email: body.email }
    });
    if (existingEmail) {
      return NextResponse.json({ success: false, error: "Email sudah terdaftar" }, { status: 400 });
    }

    // Check if username already exists
    const existingUsername = await prisma.user.findFirst({
      where: { username: body.username }
    });
    if (existingUsername) {
      return NextResponse.json({ success: false, error: "Username sudah terdaftar" }, { status: 400 });
    }

    // Get or create desa
    let desa = await prisma.desa.findFirst();
    if (!desa) {
      desa = await prisma.desa.create({
        data: {
          nama: "Desa Borneo Adat",
          kecamatan: "Kecamatan Default",
          kabupaten: "Kabupaten Default",
          provinsi: "Kalimantan Tengah",
        }
      });
    }

    // If wargaId is provided, verify it exists
    if (body.wargaId) {
      const warga = await prisma.warga.findUnique({
        where: { id: body.wargaId }
      });
      if (!warga) {
        return NextResponse.json({ success: false, error: "Warga tidak ditemukan" }, { status: 400 });
      }
    }

    const record = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        username: body.username,
        password: body.password, // In production, this should be hashed
        role: body.role as Role,
        desaId: body.desaId || desa.id,
        wargaId: body.wargaId || null,
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
    
    // Check if email already exists (excluding current record)
    if (data.email) {
      const existingEmail = await prisma.user.findFirst({
        where: {
          email: data.email,
          id: { not: id }
        }
      });
      if (existingEmail) {
        return NextResponse.json({ success: false, error: "Email sudah terdaftar pada user lain" }, { status: 400 });
      }
    }

    // Check if username already exists (excluding current record)
    if (data.username) {
      const existingUsername = await prisma.user.findFirst({
        where: {
          username: data.username,
          id: { not: id }
        }
      });
      if (existingUsername) {
        return NextResponse.json({ success: false, error: "Username sudah terdaftar pada user lain" }, { status: 400 });
      }
    }

    const record = await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        role: data.role as Role,
        desaId: data.desaId,
        wargaId: data.wargaId,
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
    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
