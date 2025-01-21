import { useState, useCallback, useMemo } from 'react';
import { FilterState, FilterActions, SortBy, SortOrder, TimeRange, PriceChangeFilter } from '../types/filters';
import { CryptoData } from '../types/crypto';

const initialState: FilterState = {
  search: '',
  sortBy: 'market_cap',
  sortOrder: 'desc',
  timeRange: '24h',
  priceRange: { min: null, max: null },
  priceChangeFilter: 'all',
  marketCapRange: 'all',
  volumeRange: 'all',
  showGainers: false,
  showLosers: false,
  minVolume: null,
  maxVolume: null,
  minMarketCap: null,
  maxMarketCap: null,
  isVerified: false,
  hasWhitepaper: false,
  hasWebsite: false,
  hasAudit: false,
  excludeStablecoins: false,
  excludeMemecoins: false,
};

// Market cap thresholds (in USD)
const MARKET_CAP_THRESHOLDS = {
  large: 10_000_000_000, // $10B
  mid: 1_000_000_000,    // $1B
};

// Volume thresholds (in USD)
const VOLUME_THRESHOLDS = {
  high: 1_000_000_000,   // $1B
  medium: 100_000_000,   // $100M
};

// Price change thresholds
const PRICE_CHANGE_THRESHOLDS = {
  gainers_1: 1,
  gainers_5: 5,
  gainers_10: 10,
  losers_1: -1,
  losers_5: -5,
  losers_10: -10,
};

const getPriceChangeForTimeRange = (coin: CryptoData, timeRange: TimeRange): number => {
  const priceChangeMap = {
    '1h': coin.price_change_percentage_1h_in_currency,
    '24h': coin.price_change_percentage_24h,
    '7d': coin.price_change_percentage_7d_in_currency,
    '30d': coin.price_change_percentage_30d_in_currency,
    '1y': coin.price_change_percentage_1y_in_currency,
  };

  return priceChangeMap[timeRange] || 0;
};

export const useFilters = () => {
  const [filters, setFilters] = useState<FilterState>(initialState);

  const setSearch = useCallback((search: string) => {
    setFilters(prev => ({ ...prev, search }));
  }, []);

  const setSortBy = useCallback((sortBy: SortBy) => {
    setFilters(prev => ({ ...prev, sortBy }));
  }, []);

  const setSortOrder = useCallback((sortOrder: SortOrder) => {
    setFilters(prev => ({ ...prev, sortOrder }));
  }, []);

  const setTimeRange = useCallback((timeRange: TimeRange) => {
    setFilters(prev => ({ ...prev, timeRange }));
  }, []);

  const setPriceRange = useCallback((min: number | null, max: number | null) => {
    setFilters(prev => ({ ...prev, priceRange: { min, max } }));
  }, []);

  const setPriceChangeFilter = useCallback((filter: PriceChangeFilter) => {
    setFilters(prev => ({ ...prev, priceChangeFilter: filter }));
  }, []);

  const setMarketCapRange = useCallback((range: 'all' | 'large' | 'mid' | 'small') => {
    setFilters(prev => ({ ...prev, marketCapRange: range }));
  }, []);

  const setVolumeRange = useCallback((range: 'all' | 'high' | 'medium' | 'low') => {
    setFilters(prev => ({ ...prev, volumeRange: range }));
  }, []);

  const setShowGainers = useCallback((show: boolean) => {
    setFilters(prev => ({ ...prev, showGainers: show, showLosers: show ? false : prev.showLosers }));
  }, []);

  const setShowLosers = useCallback((show: boolean) => {
    setFilters(prev => ({ ...prev, showLosers: show, showGainers: show ? false : prev.showGainers }));
  }, []);

  const setVolumeFilter = useCallback((min: number | null, max: number | null) => {
    setFilters(prev => ({ ...prev, minVolume: min, maxVolume: max }));
  }, []);

  const setMarketCapFilter = useCallback((min: number | null, max: number | null) => {
    setFilters(prev => ({ ...prev, minMarketCap: min, maxMarketCap: max }));
  }, []);

  const setVerifiedFilter = useCallback((isVerified: boolean) => {
    setFilters(prev => ({ ...prev, isVerified }));
  }, []);

  const setWhitepaperFilter = useCallback((hasWhitepaper: boolean) => {
    setFilters(prev => ({ ...prev, hasWhitepaper }));
  }, []);

  const setWebsiteFilter = useCallback((hasWebsite: boolean) => {
    setFilters(prev => ({ ...prev, hasWebsite }));
  }, []);

  const setAuditFilter = useCallback((hasAudit: boolean) => {
    setFilters(prev => ({ ...prev, hasAudit }));
  }, []);

  const setStablecoinFilter = useCallback((exclude: boolean) => {
    setFilters(prev => ({ ...prev, excludeStablecoins: exclude }));
  }, []);

  const setMemecoinFilter = useCallback((exclude: boolean) => {
    setFilters(prev => ({ ...prev, excludeMemecoins: exclude }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(initialState);
  }, []);

  const filterData = useCallback((data: CryptoData[]) => {
    let filteredData = [...data];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        coin => 
          coin.name.toLowerCase().includes(searchLower) ||
          coin.symbol.toLowerCase().includes(searchLower)
      );
    }

    // Apply price range filter
    if (filters.priceRange.min !== null) {
      filteredData = filteredData.filter(coin => coin.current_price >= filters.priceRange.min!);
    }
    if (filters.priceRange.max !== null) {
      filteredData = filteredData.filter(coin => coin.current_price <= filters.priceRange.max!);
    }

    // Apply price change filter
    if (filters.priceChangeFilter !== 'all') {
      const priceChange = (coin: CryptoData) => getPriceChangeForTimeRange(coin, filters.timeRange);
      const threshold = PRICE_CHANGE_THRESHOLDS[filters.priceChangeFilter];
      
      filteredData = filteredData.filter(coin => {
        const change = priceChange(coin);
        if (filters.priceChangeFilter.includes('gainers')) {
          return change >= Math.abs(threshold);
        } else {
          return change <= threshold;
        }
      });
    }

    // Apply gainers/losers filter
    if (filters.showGainers || filters.showLosers) {
      const priceChange = (coin: CryptoData) => getPriceChangeForTimeRange(coin, filters.timeRange);
      filteredData = filteredData.filter(coin => 
        (filters.showGainers && priceChange(coin) > 0) ||
        (filters.showLosers && priceChange(coin) < 0)
      );
    }

    // Apply market cap range filter
    if (filters.marketCapRange !== 'all') {
      filteredData = filteredData.filter(coin => {
        switch (filters.marketCapRange) {
          case 'large':
            return coin.market_cap >= MARKET_CAP_THRESHOLDS.large;
          case 'mid':
            return coin.market_cap >= MARKET_CAP_THRESHOLDS.mid && coin.market_cap < MARKET_CAP_THRESHOLDS.large;
          case 'small':
            return coin.market_cap < MARKET_CAP_THRESHOLDS.mid;
          default:
            return true;
        }
      });
    }

    // Apply volume range filter
    if (filters.volumeRange !== 'all') {
      filteredData = filteredData.filter(coin => {
        switch (filters.volumeRange) {
          case 'high':
            return coin.total_volume >= VOLUME_THRESHOLDS.high;
          case 'medium':
            return coin.total_volume >= VOLUME_THRESHOLDS.medium && coin.total_volume < VOLUME_THRESHOLDS.high;
          case 'low':
            return coin.total_volume < VOLUME_THRESHOLDS.medium;
          default:
            return true;
        }
      });
    }

    // Apply custom volume filter
    if (filters.minVolume !== null) {
      filteredData = filteredData.filter(coin => coin.total_volume >= filters.minVolume!);
    }
    if (filters.maxVolume !== null) {
      filteredData = filteredData.filter(coin => coin.total_volume <= filters.maxVolume!);
    }

    // Apply custom market cap filter
    if (filters.minMarketCap !== null) {
      filteredData = filteredData.filter(coin => coin.market_cap >= filters.minMarketCap!);
    }
    if (filters.maxMarketCap !== null) {
      filteredData = filteredData.filter(coin => coin.market_cap <= filters.maxMarketCap!);
    }

    // Apply additional filters
    if (filters.isVerified && filteredData[0]?.verified !== undefined) {
      filteredData = filteredData.filter(coin => coin.verified);
    }
    if (filters.hasWhitepaper && filteredData[0]?.has_whitepaper !== undefined) {
      filteredData = filteredData.filter(coin => coin.has_whitepaper);
    }
    if (filters.hasWebsite && filteredData[0]?.has_website !== undefined) {
      filteredData = filteredData.filter(coin => coin.has_website);
    }
    if (filters.hasAudit && filteredData[0]?.has_audit !== undefined) {
      filteredData = filteredData.filter(coin => coin.has_audit);
    }
    if (filters.excludeStablecoins && filteredData[0]?.is_stablecoin !== undefined) {
      filteredData = filteredData.filter(coin => !coin.is_stablecoin);
    }
    if (filters.excludeMemecoins && filteredData[0]?.is_memecoin !== undefined) {
      filteredData = filteredData.filter(coin => !coin.is_memecoin);
    }

    // Apply sorting
    filteredData.sort((a, b) => {
      let comparison = 0;
      switch (filters.sortBy) {
        case 'market_cap':
          comparison = a.market_cap - b.market_cap;
          break;
        case 'volume':
          comparison = a.total_volume - b.total_volume;
          break;
        case 'price':
          comparison = a.current_price - b.current_price;
          break;
        case 'price_change': {
          const aChange = getPriceChangeForTimeRange(a, filters.timeRange);
          const bChange = getPriceChangeForTimeRange(b, filters.timeRange);
          comparison = aChange - bChange;
          break;
        }
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });

    return filteredData;
  }, [filters]);

  return {
    filters,
    actions: useMemo(() => ({
      setSearch,
      setSortBy,
      setSortOrder,
      setTimeRange,
      setPriceRange,
      setPriceChangeFilter,
      setMarketCapRange,
      setVolumeRange,
      setShowGainers,
      setShowLosers,
      setVolumeFilter,
      setMarketCapFilter,
      setVerifiedFilter,
      setWhitepaperFilter,
      setWebsiteFilter,
      setAuditFilter,
      setStablecoinFilter,
      setMemecoinFilter,
      resetFilters,
    }), [
      setSearch,
      setSortBy,
      setSortOrder,
      setTimeRange,
      setPriceRange,
      setPriceChangeFilter,
      setMarketCapRange,
      setVolumeRange,
      setShowGainers,
      setShowLosers,
      setVolumeFilter,
      setMarketCapFilter,
      setVerifiedFilter,
      setWhitepaperFilter,
      setWebsiteFilter,
      setAuditFilter,
      setStablecoinFilter,
      setMemecoinFilter,
      resetFilters,
    ]),
    filterData,
    getPriceChangeForTimeRange,
  };
}; 