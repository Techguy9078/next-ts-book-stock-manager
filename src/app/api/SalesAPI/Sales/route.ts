'use server';
import { prisma } from '@/db';
import { Sales } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  const { isbn, title, author, genre } = req;
  try {
    const updateStatCount = await prisma.sales.create({
      data: {
        isbn: isbn,
        title: title,
        author: author,
        genre: genre,
      },
    });

    return NextResponse.json(updateStatCount);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed Updating Add Sale...' },
      { status: 500 },
    );
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (startDate === null || endDate === null) {
    return NextResponse.json(
      { error: 'Failed Finding Sales Report...' },
      { status: 500 },
    );
  }

  function ParseStartDate(date: string) {
    let newStartDate = new Date(date);
    newStartDate.setHours(1);
    return newStartDate.toISOString();
  }

  function ParseEndDate(date: string) {
    let newEndDate = new Date(date);
    newEndDate.setHours(23);
    return newEndDate.toISOString();
  }

  try {
    const salesResults = await prisma.sales.findMany({
      where: {
        createdAt: {
          gte: ParseStartDate(startDate),
          lte: ParseEndDate(endDate),
        },
      },
    });

    console.log(salesResults);

    const groupedSalesResults: { [key: string]: Sales[] } = salesResults.reduce(
      (acc: any, result) => {
        const { genre } = result;
        if (acc[genre]) {
          acc[genre].push(result);
        } else {
          acc[genre] = [result];
        }
        return acc;
      },
      {},
    );

    return NextResponse.json(
      Object.keys(groupedSalesResults).length
        ? groupedSalesResults
        : 'no results',
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed Finding Sales Report...' },
      { status: 500 },
    );
  }
}
