import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (userId) {
      const dashboard = await prisma.dashboardLayananSLV.findUnique({
        where: { userId }
      });
      return NextResponse.json(dashboard);
    }
    
    const dashboards = await prisma.dashboardLayananSLV.findMany();
    return NextResponse.json(dashboards);
  } catch (error) {
    console.error('Error fetching SLV dashboard:', error);
    return NextResponse.json({ error: 'Failed to fetch SLV dashboard' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const dashboard = await prisma.dashboardLayananSLV.create({
      data: body
    });
    return NextResponse.json(dashboard, { status: 201 });
  } catch (error) {
    console.error('Error creating SLV dashboard:', error);
    return NextResponse.json({ error: 'Failed to create SLV dashboard' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, ...data } = body;
    const dashboard = await prisma.dashboardLayananSLV.update({
      where: { userId },
      data
    });
    return NextResponse.json(dashboard);
  } catch (error) {
    console.error('Error updating SLV dashboard:', error);
    return NextResponse.json({ error: 'Failed to update SLV dashboard' }, { status: 500 });
  }
}
