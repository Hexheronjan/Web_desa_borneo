import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const dashboard = await prisma.dashboardNasional.findMany({
      orderBy: { createdAt: 'desc' },
      take: 1
    });
    return NextResponse.json(dashboard[0] || null);
  } catch (error) {
    console.error('Error fetching national dashboard:', error);
    return NextResponse.json({ error: 'Failed to fetch national dashboard' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dashboard = await prisma.dashboardNasional.create({
      data: body
    });
    return NextResponse.json(dashboard, { status: 201 });
  } catch (error) {
    console.error('Error creating national dashboard:', error);
    return NextResponse.json({ error: 'Failed to create national dashboard' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const dashboard = await prisma.dashboardNasional.update({
      where: { id },
      data
    });
    return NextResponse.json(dashboard);
  } catch (error) {
    console.error('Error updating national dashboard:', error);
    return NextResponse.json({ error: 'Failed to update national dashboard' }, { status: 500 });
  }
}
