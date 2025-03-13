'use server';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const req = await request.json();
  let { barcode, isbn, title, author, genre, park } = req;

  if (typeof barcode === 'number') {
    barcode = barcode.toString();
  }

  try {
    const combinedBookData = await prisma.scannedBook.create({
      data: {
        park: Boolean(park),
        book: {
          connectOrCreate: {
            where: { barcode },
            create: {
              barcode,
              isbn,
              title,
              author,
              genre,
            },
          },
        },
      },
      include: { book: true },
    });

    return NextResponse.json(combinedBookData);
  } catch (error) {
    console.error('Error saving book:', error);
    return NextResponse.json(
      { error: 'Failed Adding Local Book...' },
      { status: 500 },
    );
  }
}


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    let searchTerm = searchParams.get('search');
  
    let oldest = searchParams.get('oldest')?.toString();
  
    if (oldest) {
      const bookResults = await prisma.scannedBook.findMany({
        take: Number(oldest),
        orderBy: { createdAt: 'asc' },
      });
  
      return NextResponse.json(bookResults);
    }
  
    let currentFindingBookTitle = searchParams
      .get('currentFindingBookTitle')
      ?.toString();
    let currentFindingBookAuthor = searchParams
      .get('currentFindingBookAuthor')
      ?.toString();
  
    if (currentFindingBookTitle && currentFindingBookAuthor) {
      let currentBookTitle = currentFindingBookTitle.toString();
      let currentBookAuthor = currentFindingBookAuthor.toString();
  
      const bookFindingCountResult = await prisma.scannedBook.aggregate({
        _count: true,
        where: {
          title: { contains: currentBookTitle, mode: 'insensitive' },
          author: { contains: currentBookAuthor, mode: 'insensitive' },
        },
      });
  
      return NextResponse.json(bookFindingCountResult._count);
    }
  
    if (!searchTerm) {
      return NextResponse.json(
        { error: 'No Search Term Entered...' },
        { status: 500 },
      );
    }
  
    try {
      const bookNormResults = await prisma.scannedBook.findMany({
        where: {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { author: { contains: searchTerm, mode: 'insensitive' } },
            { barcode: { contains: searchTerm } },
            { isbn: { contains: searchTerm } },
          ],
        },
        orderBy: { title: 'asc' },
      });
  
      return NextResponse.json(bookNormResults.concat(bookNormResults));
    } catch (error: any) {
      console.error('Error fetching books:', error);
      return NextResponse.json(
        { error: 'Failed Finding Local Book...' },
        { status: 500 },
      );
    }
  }