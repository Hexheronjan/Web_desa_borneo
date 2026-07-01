import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const validators = await prisma.expertValidation.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(validators);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch validators' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validator = await prisma.expertValidation.create({
      data: {
        namaValidator: body.namaValidator,
        keahlian: body.keahlian,
        artefakDivalidasi: body.artefakDivalidasi,
        nilaiValiditas: body.nilaiValiditas,
        status: body.status || 'Pending'
      }
    });
    return NextResponse.json(validator);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create validator' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const validator = await prisma.expertValidation.update({
      where: { id },
      data
    });
    return NextResponse.json(validator);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update validator' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.expertValidation.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete validator' }, { status: 500 });
  }
}
