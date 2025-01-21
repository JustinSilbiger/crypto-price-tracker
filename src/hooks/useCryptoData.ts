import { useState, useEffect } from 'react';
import axios from 'axios';
import { CryptoData } from '../types/crypto';

export const useCryptoData = (page = 1, perPage = 50) => {
  const [data, setData] = useState<CryptoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const safePageNumber = Math.min(Math.max(1, page), 250);
        
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: perPage,
              page: safePageNumber,
              sparkline: true,
              price_change_percentage: '1h,24h,7d,30d,1y'
            }
          }
        );

        // Transform the data to ensure all required fields exist with correct field names
        const transformedData = response.data.map((coin: any) => ({
          id: coin.id,
          symbol: coin.symbol,
          name: coin.name,
          image: coin.image,
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          market_cap_rank: coin.market_cap_rank,
          total_volume: coin.total_volume,
          price_change_percentage_1h_in_currency: parseFloat(coin.price_change_percentage_1h_in_currency) || 0,
          price_change_percentage_24h: parseFloat(coin.price_change_percentage_24h) || 0,
          price_change_percentage_7d_in_currency: parseFloat(coin.price_change_percentage_7d_in_currency) || 0,
          price_change_percentage_30d_in_currency: parseFloat(coin.price_change_percentage_30d_in_currency) || 0,
          price_change_percentage_1y_in_currency: parseFloat(coin.price_change_percentage_1y_in_currency) || 0,
          sparkline_in_7d: {
            price: coin.sparkline_in_7d?.price || []
          },
          // Add metadata with default values
          verified: false, // We'll need to get this from another API endpoint or source
          has_whitepaper: false,
          has_website: !!coin.links?.homepage?.[0],
          has_audit: false,
          is_stablecoin: coin.tags?.includes('stablecoin') || false,
          is_memecoin: coin.tags?.includes('meme') || false,
          // Additional metadata
          description: coin.description?.en,
          website: coin.links?.homepage?.[0],
          whitepaper: coin.links?.whitepaper,
          category: coin.categories || [],
          tags: coin.tags || []
        }));

        // Log the first transformed item to verify the data
        console.log('First transformed item:', transformedData[0]);
        
        setData(transformedData);
        setTotalPages(Math.min(Math.ceil(response.data.length > 0 ? 250 : 0), 250));
      } catch (err) {
        console.error('API Error:', err);
        if (axios.isAxiosError(err)) {
          console.error('API Response:', err.response?.data);
        }
        setError(err instanceof Error ? err.message : 'Failed to fetch data');
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, perPage]);

  return { data, loading, error, totalPages, refetch: () => setLoading(true) };
}; 