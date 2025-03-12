'use server';
import { prisma } from '@/db';
import { NextResponse } from 'next/server';

// Add Customer Request
export async function POST(request: Request) {
  const req = await request.json();

  const {
    name: requestName,
    phone: requestNumber,
    title: requestTitle,
    author: requestAuthor,
    isbn: requestISBN,
    comments: requestComment,
  } = req;

  // Check required fields
  if (!requestName || !requestNumber) {
    return NextResponse.json(
      { error: 'Customer name and number are the minimum required details...' },
      { status: 400 },
    );
  }

  try {
    const customerBookRequest = await prisma.customerBookRequest.create({
      data: {
        requestName,
        requestNumber,
        requestTitle,
        requestAuthor,
        requestISBN,
        requestComment,
      },
    });

    return NextResponse.json(customerBookRequest);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed Adding Book Request...' },
      { status: 500 },
    );
  }
}

// Search Customer Requests
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  let searchTerm = searchParams.get('search');

  try {
    let customerResults;

    if (searchTerm) {
      searchTerm = searchTerm.split(' ').join(' | ');
      customerResults = await prisma.customerBookRequest.findMany({
        where: {
          requestName: { search: searchTerm, mode: 'insensitive' },
          requestNumber: { search: searchTerm },
          requestTitle: { search: searchTerm, mode: 'insensitive' },
          requestAuthor: { search: searchTerm, mode: 'insensitive' },
          requestISBN: { search: searchTerm },
          requestComment: { search: searchTerm, mode: 'insensitive' },
        },
        orderBy: { createdAt: 'desc' },
      });
    } else {
      // If no search term is provided, fetch all results
      customerResults = await prisma.customerBookRequest.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    return NextResponse.json(customerResults);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed Finding Customer Request by Search...' },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get('id');

  if (id) {
    try {
      const deletedCustomer = await prisma.customerBookRequest.delete({
        where: {
          id: Number(id),
        },
      });

      return NextResponse.json(deletedCustomer);
    } catch (error: any) {
      return NextResponse.json(
        { error: 'Failed Removing Customer Request by ID...' },
        { status: 500 },
      );
    }
  }

  return NextResponse.json(
    { error: "I'm a little teapot, cannot handle that method." },
    { status: 418 },
  );
}
