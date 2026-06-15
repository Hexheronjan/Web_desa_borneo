import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const surat = await prisma.$queryRaw<any[]>`
      SELECT id, title, category, description, valueText, status, createdBy, createdAt, updatedAt,
        CASE WHEN valueBlob IS NOT NULL AND valueBlob != '' THEN 1 ELSE 0 END as hasPdf
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
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    
    await prisma.$executeRawUnsafe(`
      INSERT INTO ModuleRecord (id, modulePath, moduleName, title, category, description, valueText, status, createdBy, createdAt, updatedAt)
      VALUES ('${id}', '/warga/surat-online', 'Surat Online', '${body.title}', '${body.category}', '${body.description}', NULL, '${body.status}', '${body.createdBy}', '${now}', '${now}')
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
    
    const updates = [];
    if (data.title) updates.push(`title = '${data.title}'`);
    if (data.category) updates.push(`category = '${data.category}'`);
    if (data.description) updates.push(`description = '${data.description}'`);
    if (data.status) updates.push(`status = '${data.status}'`);
    if (data.valueText) updates.push(`valueText = '${data.valueText}'`);
    if (data.valueBlob) updates.push(`valueBlob = '${data.valueBlob}'`);
    
    const setClause = updates.join(', ');
    
    await prisma.$executeRawUnsafe(`
      UPDATE ModuleRecord
      SET ${setClause}
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
