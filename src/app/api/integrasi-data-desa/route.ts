import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const sources = await prisma.integrasiDataDesa.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(sources);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data sources' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const source = await prisma.integrasiDataDesa.create({
      data: {
        namaSumber: body.namaSumber,
        tipe: body.tipe,
        apiEndpoint: body.apiEndpoint,
        status: body.status || 'Tidak Terhubung',
        terakhirSinkronisasi: body.terakhirSinkronisasi
      }
    });
    return NextResponse.json(source);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create data source' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const source = await prisma.integrasiDataDesa.update({
      where: { id },
      data
    });
    return NextResponse.json(source);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update data source' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.integrasiDataDesa.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete data source' }, { status: 500 });
  }
}
