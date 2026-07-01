import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const periodes = await prisma.manajemenPeriode.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(periodes);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch periodes' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const periode = await prisma.manajemenPeriode.create({
      data: {
        tahun: body.tahun,
        semester: body.semester,
        status: body.status || 'Tutup'
      }
    });
    return NextResponse.json(periode);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create periode' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const periode = await prisma.manajemenPeriode.update({
      where: { id },
      data
    });
    return NextResponse.json(periode);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update periode' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.manajemenPeriode.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete periode' }, { status: 500 });
  }
}
