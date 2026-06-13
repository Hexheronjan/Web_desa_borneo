import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const monitoring = await prisma.monitoringDesa.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, data: monitoring });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const record = await prisma.monitoringDesa.create({
      data: {
        namaDesa: body.namaDesa,
        kecamatan: body.kecamatan,
        index: parseFloat(body.index) || 0,
        readiness: parseFloat(body.readiness) || 0,
        maturity: parseFloat(body.maturity) || 0,
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
    
    const record = await prisma.monitoringDesa.update({
      where: { id },
      data: {
        namaDesa: data.namaDesa,
        kecamatan: data.kecamatan,
        index: data.index !== undefined ? parseFloat(data.index) : undefined,
        readiness: data.readiness !== undefined ? parseFloat(data.readiness) : undefined,
        maturity: data.maturity !== undefined ? parseFloat(data.maturity) : undefined,
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
    await prisma.monitoringDesa.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
