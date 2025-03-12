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

    // searchTerm = searchTerm.split(' ').join(' | ');

    // const bookResults = await prisma.scannedBook.findMany({
    //   where: {
    //     title: { search: searchTerm, mode: 'insensitive' },
    //     author: { search: searchTerm, mode: 'insensitive' },
    //     barcode: { search: searchTerm },
    //     isbn: { search: searchTerm },
    //   },
    //   orderBy: { title: 'asc' },
    // });

    // let s = new Set(bookNormResults.concat(bookResults));

    // let combinedResults = [...s];
    // console.log(combinedResults);

    return NextResponse.json(bookNormResults.concat(bookNormResults));
  } catch (error: any) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed Finding Local Book...' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  const req = await request.json();
  let { barcode, field, updateData } = req;

  if (!barcode) {
    return NextResponse.json(
      { error: 'Unfortunately no barcode was provided...' },
      { status: 400 },
    );
  }

  if (field == 'title') {
    try {
      const bookResults = await prisma.storedBooks.update({
        where: {
          barcode: barcode.toString(),
        },
        data: {
          title: updateData,
        },
      });

      return NextResponse.json(bookResults);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Finding Local Book...' },
        { status: 500 },
      );
    }
  }
  if (field == 'author') {
    try {
      const bookResults = await prisma.storedBooks.update({
        where: {
          barcode: barcode.toString(),
        },
        data: {
          author: updateData,
        },
      });

      return NextResponse.json(bookResults);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Finding Local Book...' },
        { status: 500 },
      );
    }
  }
  if (field == 'genre') {
    try {
      const bookResults = await prisma.storedBooks.update({
        where: {
          barcode: barcode.toString(),
        },
        data: {
          genre: updateData,
        },
      });

      return NextResponse.json(bookResults);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Finding Local Book...' },
        { status: 500 },
      );
    }
  }
  if (field == 'isbn') {
    try {
      const bookResults = await prisma.storedBooks.update({
        where: {
          barcode: barcode.toString(),
        },
        data: {
          isbn: updateData,
        },
      });

      return NextResponse.json(bookResults);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Finding Local Book...' },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { error: "I'm a little teapot, cannot handle that field." },
    { status: 418 },
  );
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const barcode = searchParams.get('barcode');
  const id = searchParams.get('id');

  if (barcode) {
    try {
      const bookResult = await prisma.scannedBook.findMany({
        where: {
          barcode: barcode.toString(),
          park: false, // Stops The Parked Books From Being Deleted
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      const deleteBook = await prisma.scannedBook.delete({
        where: {
          id: bookResult[0].id,
        },
      });

      return NextResponse.json(deleteBook);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Removing Book By Barcode...' },
        { status: 500 },
      );
    }
  }
  if (id) {
    try {
      const deleteBook = await prisma.scannedBook.delete({
        where: {
          id: Number(id),
        },
      });

      return NextResponse.json(deleteBook);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Removing Book By ID...' },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { error: "I'm a little teapot, cannot handle that method." },
    { status: 418 },
  );
}
