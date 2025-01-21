export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  total_volume: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  price_change_percentage_30d_in_currency: number;
  price_change_percentage_1y_in_currency: number;
  sparkline_in_7d: {
    price: number[];
  };
  // Additional metadata fields
  verified?: boolean;
  has_whitepaper?: boolean;
  has_website?: boolean;
  has_audit?: boolean;
  is_stablecoin?: boolean;
  is_memecoin?: boolean;
  // Optional fields that might be useful
  description?: string;
  website?: string;
  whitepaper?: string;
  audit_reports?: string[];
  category?: string[];
  tags?: string[];
} 