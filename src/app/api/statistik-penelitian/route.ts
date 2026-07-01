import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const datasetId = searchParams.get('datasetId');
    
    const where = datasetId ? { datasetId } : {};
    const statistik = await prisma.statistikPenelitian.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(statistik);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch statistics' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const statistik = await prisma.statistikPenelitian.create({
      data: body
    });
    return NextResponse.json(statistik, { status: 201 });
  } catch (error) {
    console.error('Error creating statistic:', error);
    return NextResponse.json({ error: 'Failed to create statistic' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }
    await prisma.statistikPenelitian.delete({
      where: { id }
    });
    return NextResponse.json({ message: 'Statistic deleted successfully' });
  } catch (error) {
    console.error('Error deleting statistic:', error);
    return NextResponse.json({ error: 'Failed to delete statistic' }, { status: 500 });
  }
}
