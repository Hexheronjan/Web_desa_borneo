import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const versions = await prisma.frameworkVersioning.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(versions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch versions' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const version = await prisma.frameworkVersioning.create({
      data: {
        versi: body.versi,
        tanggal: new Date(body.tanggal),
        status: body.status || 'Non-Aktif'
      }
    });
    return NextResponse.json(version);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create version' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const version = await prisma.frameworkVersioning.update({
      where: { id },
      data: { ...data, tanggal: data.tanggal ? new Date(data.tanggal) : undefined }
    });
    return NextResponse.json(version);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update version' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.frameworkVersioning.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete version' }, { status: 500 });
  }
}
