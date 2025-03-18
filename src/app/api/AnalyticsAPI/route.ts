'use server';
import { prisma } from '@/db';
import { Analytics } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  let { action, storedBooksBarcode, status }: Analytics = req;

  try {
    const auditData = await prisma.analytics.create({
      data: {
        action,
        status,
      },
      include: { book: storedBooksBarcode ? true : false },
    });

    return NextResponse.json(auditData);
  } catch (error) {
    console.error('Error saving analytic item:', error);
    return NextResponse.json(
      { error: 'Failed Adding Analytics Item...' },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const auditLogResults = await prisma.analytics.findMany({
      orderBy: { eventAt: 'asc' },
    });

    return NextResponse.json(auditLogResults);
  } catch (error: any) {
    console.error('Error fetching analytic items:', error);
    return NextResponse.json(
      { error: 'Failed Finding Analytics Items...' },
      { status: 500 },
    );
  }
}
