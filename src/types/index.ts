export interface CryptoData {
  id: string;
  market_cap_rank: number;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_1h: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  max_supply: number | null;
  sparkline_in_7d: {
    price: number[];
  };
} 