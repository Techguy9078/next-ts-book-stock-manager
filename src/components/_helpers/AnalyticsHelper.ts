import { Analytics } from '@prisma/client';
import axios from 'axios';

interface IAnalytics extends Omit<Analytics, 'id' | 'eventAt'> {}

export async function useAnalytics(analyticsData: IAnalytics) {
  let { action, status, storedBooksBarcode, information } = analyticsData;

  try {
    const { data } = await axios.post('/api/AnalyticsAPI', {
      action,
      status,
      storedBooksBarcode,
      information,
    });

    return data;
  } catch (error) {
    return console.log(error);
  }
}

export async function useAnalyticsData() {
  try {
    const { data } = await axios.get('/api/AnalyticsAPI');

    return data;
  } catch (error) {
    return console.log(error);
  }
}
