'use server';
import { Analytics } from '@prisma/client';
import axios from 'axios';

interface IAnalytics extends Omit<Analytics, 'id' | 'eventAt'> {}

export async function useAnalytics(analyticsData: IAnalytics) {
  let { action, status, storedBooksBarcode, information } = analyticsData;
  console.log(analyticsData)

  try {
    const { data } = await axios.post('/api/AnalyticsAPI', {
      action,
      status,
      storedBooksBarcode,
      information,
    });

    console.log(data);

    return data;
  } catch (error) {
    return null;
  }
}

export async function useAnalyticsData() {
  const { data } = await axios.get('/api/AnalyticsAPI');

  return data;
}
