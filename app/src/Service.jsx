import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://www.alphavantage.co/query';

export const getStockData = async (symbol) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        function: 'TIME_SERIES_INTRADAY',
        symbol,
        interval: '1min',
        apikey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock data:', error);
    throw error;
  }
};
