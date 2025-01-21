export type SortBy = 'market_cap' | 'volume' | 'price' | 'price_change' | 'name';
export type SortOrder = 'asc' | 'desc';
export type TimeRange = '1h' | '24h' | '7d' | '30d' | '1y';
export type VolumeRange = 'all' | 'high' | 'medium' | 'low';
export type MarketCapRange = 'all' | 'large' | 'mid' | 'small';

// Price change thresholds for quick filters
export type PriceChangeFilter = 'all' | 'gainers_1' | 'gainers_5' | 'gainers_10' | 'losers_1' | 'losers_5' | 'losers_10';

export interface PriceRange {
  min: number | null;
  max: number | null;
}

export interface FilterState {
  search: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  timeRange: TimeRange;
  priceRange: PriceRange;
  priceChangeFilter: PriceChangeFilter;
  marketCapRange: MarketCapRange;
  volumeRange: VolumeRange;
  showGainers: boolean;
  showLosers: boolean;
  minVolume: number | null;
  maxVolume: number | null;
  minMarketCap: number | null;
  maxMarketCap: number | null;
  // New filters
  isVerified: boolean;
  hasWhitepaper: boolean;
  hasWebsite: boolean;
  hasAudit: boolean;
  excludeStablecoins: boolean;
  excludeMemecoins: boolean;
}

export interface FilterActions {
  setSearch: (search: string) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (order: SortOrder) => void;
  setTimeRange: (range: TimeRange) => void;
  setPriceRange: (min: number | null, max: number | null) => void;
  setPriceChangeFilter: (filter: PriceChangeFilter) => void;
  setMarketCapRange: (range: MarketCapRange) => void;
  setVolumeRange: (range: VolumeRange) => void;
  setShowGainers: (show: boolean) => void;
  setShowLosers: (show: boolean) => void;
  setVolumeFilter: (min: number | null, max: number | null) => void;
  setMarketCapFilter: (min: number | null, max: number | null) => void;
  setVerifiedFilter: (isVerified: boolean) => void;
  setWhitepaperFilter: (hasWhitepaper: boolean) => void;
  setWebsiteFilter: (hasWebsite: boolean) => void;
  setAuditFilter: (hasAudit: boolean) => void;
  setStablecoinFilter: (exclude: boolean) => void;
  setMemecoinFilter: (exclude: boolean) => void;
  resetFilters: () => void;
} 