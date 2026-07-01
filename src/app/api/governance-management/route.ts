import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const governances = await prisma.governanceManagement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(governances);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch governances' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const governance = await prisma.governanceManagement.create({
      data: {
        namaGovernance: body.namaGovernance,
        kategori: body.kategori,
        deskripsi: body.deskripsi,
        status: body.status || 'Aktif'
      }
    });
    return NextResponse.json(governance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create governance' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const governance = await prisma.governanceManagement.update({
      where: { id },
      data
    });
    return NextResponse.json(governance);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update governance' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.governanceManagement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete governance' }, { status: 500 });
  }
}
