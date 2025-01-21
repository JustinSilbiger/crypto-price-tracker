import { FC } from 'react';
import { FilterState, FilterActions, TimeRange, PriceChangeFilter } from '../types/filters';

interface FiltersProps {
  filters: FilterState;
  actions: FilterActions;
}

export const Filters: FC<FiltersProps> = ({ filters, actions }) => {
  return (
    <div className="filters-bar">
      <div className="filters-main">
        <div className="search-filter">
          <input
            type="text"
            className="search-input"
            placeholder="Search cryptocurrencies..."
            value={filters.search}
            onChange={(e) => actions.setSearch(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select
            className="filter-select"
            value={filters.sortBy}
            onChange={(e) => actions.setSortBy(e.target.value as any)}
          >
            <option value="market_cap">Market Cap</option>
            <option value="volume">Volume</option>
            <option value="price">Price</option>
            <option value="price_change">Price Change</option>
            <option value="name">Name</option>
          </select>
          
          <select
            className="filter-select"
            value={filters.sortOrder}
            onChange={(e) => actions.setSortOrder(e.target.value as any)}
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
          
          <select
            className="filter-select"
            value={filters.timeRange}
            onChange={(e) => actions.setTimeRange(e.target.value as TimeRange)}
          >
            <option value="1h">1 Hour</option>
            <option value="24h">24 Hours</option>
            <option value="7d">7 Days</option>
            <option value="30d">30 Days</option>
            <option value="1y">1 Year</option>
          </select>
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={filters.marketCapRange}
            onChange={(e) => actions.setMarketCapRange(e.target.value as any)}
          >
            <option value="all">All Market Caps</option>
            <option value="large">Large Cap ($10B+)</option>
            <option value="mid">Mid Cap ($1B-$10B)</option>
            <option value="small">Small Cap (&lt;$1B)</option>
          </select>

          <select
            className="filter-select"
            value={filters.volumeRange}
            onChange={(e) => actions.setVolumeRange(e.target.value as any)}
          >
            <option value="all">All Volumes</option>
            <option value="high">High Volume ($1B+)</option>
            <option value="medium">Medium Volume ($100M-$1B)</option>
            <option value="low">Low Volume (&lt;$100M)</option>
          </select>
        </div>
      </div>
      
      <div className="advanced-filters">
        <div className="filter-group">
          <div className="quick-filters">
            <select
              className="filter-select"
              value={filters.priceChangeFilter}
              onChange={(e) => actions.setPriceChangeFilter(e.target.value as PriceChangeFilter)}
            >
              <option value="all">All Price Changes</option>
              <optgroup label="Gainers">
                <option value="gainers_1">+1% or more</option>
                <option value="gainers_5">+5% or more</option>
                <option value="gainers_10">+10% or more</option>
              </optgroup>
              <optgroup label="Losers">
                <option value="losers_1">-1% or more</option>
                <option value="losers_5">-5% or more</option>
                <option value="losers_10">-10% or more</option>
              </optgroup>
            </select>
          </div>

          <div className="price-range">
            <input
              type="number"
              className="filter-select"
              placeholder="Min Price"
              value={filters.priceRange.min || ''}
              onChange={(e) => actions.setPriceRange(
                e.target.value ? Number(e.target.value) : null,
                filters.priceRange.max
              )}
            />
            <input
              type="number"
              className="filter-select"
              placeholder="Max Price"
              value={filters.priceRange.max || ''}
              onChange={(e) => actions.setPriceRange(
                filters.priceRange.min,
                e.target.value ? Number(e.target.value) : null
              )}
            />
          </div>

          <div className="custom-ranges">
            <div className="volume-range">
              <input
                type="number"
                className="filter-select"
                placeholder="Min Volume"
                value={filters.minVolume || ''}
                onChange={(e) => actions.setVolumeFilter(
                  e.target.value ? Number(e.target.value) : null,
                  filters.maxVolume
                )}
              />
              <input
                type="number"
                className="filter-select"
                placeholder="Max Volume"
                value={filters.maxVolume || ''}
                onChange={(e) => actions.setVolumeFilter(
                  filters.minVolume,
                  e.target.value ? Number(e.target.value) : null
                )}
              />
            </div>

            <div className="market-cap-range">
              <input
                type="number"
                className="filter-select"
                placeholder="Min Market Cap"
                value={filters.minMarketCap || ''}
                onChange={(e) => actions.setMarketCapFilter(
                  e.target.value ? Number(e.target.value) : null,
                  filters.maxMarketCap
                )}
              />
              <input
                type="number"
                className="filter-select"
                placeholder="Max Market Cap"
                value={filters.maxMarketCap || ''}
                onChange={(e) => actions.setMarketCapFilter(
                  filters.minMarketCap,
                  e.target.value ? Number(e.target.value) : null
                )}
              />
            </div>
          </div>

          <div className="additional-filters">
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.isVerified}
                onChange={(e) => actions.setVerifiedFilter(e.target.checked)}
              />
              Verified Only
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.hasWhitepaper}
                onChange={(e) => actions.setWhitepaperFilter(e.target.checked)}
              />
              Has Whitepaper
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.hasWebsite}
                onChange={(e) => actions.setWebsiteFilter(e.target.checked)}
              />
              Has Website
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.hasAudit}
                onChange={(e) => actions.setAuditFilter(e.target.checked)}
              />
              Has Audit
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.excludeStablecoins}
                onChange={(e) => actions.setStablecoinFilter(e.target.checked)}
              />
              Exclude Stablecoins
            </label>
            <label className="filter-checkbox">
              <input
                type="checkbox"
                checked={filters.excludeMemecoins}
                onChange={(e) => actions.setMemecoinFilter(e.target.checked)}
              />
              Exclude Memecoins
            </label>
          </div>
          
          <button
            className="reset-button"
            onClick={actions.resetFilters}
          >
            Reset All Filters
          </button>
        </div>
      </div>
    </div>
  );
}; 