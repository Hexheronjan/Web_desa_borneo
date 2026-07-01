import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const frameworks = await prisma.masterFramework.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(frameworks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch frameworks' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const framework = await prisma.masterFramework.create({
      data: {
        namaFramework: body.namaFramework,
        dimensi: body.dimensi,
        indikator: body.indikator,
        bobot: body.bobot,
        status: body.status || 'Aktif'
      }
    });
    return NextResponse.json(framework);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create framework' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const framework = await prisma.masterFramework.update({
      where: { id },
      data
    });
    return NextResponse.json(framework);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update framework' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.masterFramework.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete framework' }, { status: 500 });
  }
}
