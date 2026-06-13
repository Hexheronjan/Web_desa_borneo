import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const surat = await prisma.$queryRaw<any[]>`
      SELECT id, title, category, description, status, createdBy, createdAt, updatedAt
      FROM ModuleRecord
      WHERE modulePath = '/warga/surat-online'
      ORDER BY createdAt DESC
      LIMIT 50
    `;
    return NextResponse.json({ success: true, data: surat });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const id = `surat_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
    
    await prisma.$executeRawUnsafe(`
      INSERT INTO ModuleRecord (id, modulePath, moduleName, title, category, description, valueText, status, createdBy)
      VALUES ('${id}', '/warga/surat-online', 'Surat Online', '${body.title}', '${body.category}', '${body.description}', NULL, '${body.status}', '${body.createdBy}')
    `);
    
    return NextResponse.json({ success: true, data: { id } });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    
    await prisma.$executeRawUnsafe(`
      UPDATE ModuleRecord
      SET title = '${data.title}',
          category = '${data.category}',
          description = '${data.description}',
          status = '${data.status}'
      WHERE id = '${id}' AND modulePath = '/warga/surat-online'
    `);
    
    return NextResponse.json({ success: true });
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
    
    await prisma.$executeRawUnsafe(`
      DELETE FROM ModuleRecord
      WHERE id = '${id}' AND modulePath = '/warga/surat-online'
    `);
    
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
