'use server';
import { Chatbot } from '@/components/BardAPI/BardAPI';
import axios, { AxiosResponse } from 'axios';
import { NextResponse } from 'next/server';
import { prisma } from '@/db';
import {
  BookDataParseGoogleAPI,
  BookDataParseOL,
} from '@/components/_helpers/DataParse';

const sessionId = process.env.Secure1PSID!;

// Trial ISBN 9781845967888
// Another Trial ISBN 9780007276721

// http://openlibrary.org/api/volumes/brief/isbn/${barcode}.json
// http://openlibrary.org/api/volumes/brief/isbn/9781957779072.json

//
// https://openlibrary.org/api/books?bibkeys=ISBN:${barcode}&jscmd=data&format=json

// https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&printType=books

async function OLAPISearch(barcode: string): Promise<AxiosResponse<any, any>> {
  const result = await axios.get(
    `https://openlibrary.org/api/books?bibkeys=ISBN:${barcode}&jscmd=data&format=json`,
  );
  return result;
}

async function GoogleAPISearch(
  barcode: string,
): Promise<AxiosResponse<any, any>> {
  const result = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=isbn:${barcode}&printType=books`,
  );
  return result;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const barcode = searchParams.get('barcode');

  if (barcode === null) {
    return NextResponse.json(
      { error: 'No Barcode Provided Finding Book Using API...' },
      { status: 500 },
    );
  }

  try {
    const bookResults = await prisma.storedBooks.findUnique({
      where: {
        barcode: barcode,
      },
    });

    console.log('Local', bookResults);
    if (!bookResults) {
      return NextResponse.json([], { status: 404 });
    }

    //console.log('Local', bookResults);

    return NextResponse.json(bookResults);
  } catch {
    console.log('Could not Find Book In Local Database...');
    try {
      const result = await OLAPISearch(barcode);
      const BookDataOLParsed = await BookDataParseOL(result, barcode);

      console.log('OL', BookDataOLParsed);

      return NextResponse.json(BookDataOLParsed);
    } catch {
      try {
        const result = await GoogleAPISearch(barcode);
        const BookDataGoogleParsed = await BookDataParseGoogleAPI(
          result,
          barcode,
        );

        console.log('Google', BookDataGoogleParsed);

        return NextResponse.json(BookDataGoogleParsed);
      } catch (error: any) {
        return NextResponse.json(
          { error: 'Failed Finding Book Using API...' },
          { status: 500 },
        );
      }
    }
  }
}
