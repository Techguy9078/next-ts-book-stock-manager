'use server';
import { prisma } from '@/db';
import { Sales } from '@prisma/client';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (date === null) {
    return NextResponse.json(
      { error: 'Failed Finding Sales Report...' },
      { status: 500 },
    );
  }

  // On how to do the date selection...
  //
  // LTE: Less Than or Equal to
  // Symbol of Less Than or Equal to <=
  //
  // GT: Greater Than
  // Symbol of Greater Than >
  //
  // GTE: Greater Than or Equal to
  // Symbol of Greater Than or Equal to >=
  //
  // https://github.com/prisma/prisma/discussions/11443#discussioncomment-4095465

  try {
    const salesResults = await prisma.sales.findMany({
      where: {
        createdAt: date,
      },
    });

    const groupedSalesResults: { [key: string]: Sales[] } = salesResults.reduce(
      (acc: any, result) => {
        const { genre } = result;
        if (acc[genre]) {
          acc[genre] += 1;
        } else {
          acc[genre] = 1;
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

export async function POST() {
  try {
    const dateSales = await prisma.salesStats.findMany({
      take: 50,
      orderBy: { date: 'asc' },
    });

    return NextResponse.json(dateSales);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed Getting Sale Stats...' },
      { status: 500 },
    );
  }
}

interface IPutReq {
  updateField: 'addBook' | 'removeBook';
}

export async function PUT(request: Request) {
  const { updateField }: IPutReq = await request.json();
  const localDate = new Date().toDateString();

  if (updateField == 'addBook') {
    try {
      const updateStatCount = await prisma.salesStats.upsert({
        where: {
          date: localDate,
        },
        update: {
          addedBooks: { increment: 1 },
        },
        create: {
          date: localDate,
          addedBooks: 1,
          removedBooks: 0,
        },
      });

      return NextResponse.json(updateStatCount);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Updating Add Sale Stats...' },
        { status: 500 },
      );
    }
  }
  if (updateField == 'removeBook') {
    try {
      const updateStatCount = await prisma.salesStats.upsert({
        where: {
          date: localDate,
        },
        update: {
          removedBooks: { increment: 1 },
        },
        create: {
          date: localDate,
          addedBooks: 0,
          removedBooks: 1,
        },
      });

      return NextResponse.json(updateStatCount);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Updating Remove Sale Stats...' },
        { status: 500 },
      );
    }
  }
  return NextResponse.json(
    { error: "I'm a little teapot, cannot handle that field." },
    { status: 418 },
  );
}
