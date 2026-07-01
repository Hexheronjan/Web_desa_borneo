import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const rules = await prisma.dSSKnowledgeBase.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(rules);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch rules' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rule = await prisma.dSSKnowledgeBase.create({
      data: {
        namaRule: body.namaRule,
        kategori: body.kategori,
        bobot: body.bobot,
        aturan: body.aturan,
        status: body.status || 'Aktif'
      }
    });
    return NextResponse.json(rule);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create rule' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const rule = await prisma.dSSKnowledgeBase.update({
      where: { id },
      data
    });
    return NextResponse.json(rule);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update rule' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID required' }, { status: 400 });
    }
    await prisma.dSSKnowledgeBase.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete rule' }, { status: 500 });
  }
}
