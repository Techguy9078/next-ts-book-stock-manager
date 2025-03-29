'use server';
import { prisma } from '@/db';
import { Analytics } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  let { action, storedBooksBarcode, information, status }: Analytics = req;

  if (!storedBooksBarcode) storedBooksBarcode = 'No Book Provided';
  if (!information) information = 'No Information Provided';

  try {
    const analyticsData = await prisma.analytics.create({
      data: {
        action,
        status,
        information,
        storedBooksBarcode,
      },
      include: { book: storedBooksBarcode ? true : false },
    });

    return NextResponse.json(analyticsData);
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
    const analyticsDataLogResults = await prisma.analytics.findMany({
      orderBy: { eventAt: 'asc' },
    });

    return NextResponse.json(analyticsDataLogResults);
  } catch (error: any) {
    console.error('Error fetching analytic items:', error);
    return NextResponse.json(
      { error: 'Failed Finding Analytics Items...' },
      { status: 500 },
    );
  }
}
