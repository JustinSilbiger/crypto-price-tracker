import { FC, useState } from 'react';
import { formatPrice, formatNumber, formatPercentage, formatVolume } from '../../utils/formatters';
import { SparklineChart } from '../CryptoTable/SparklineChart';
import type { CryptoData } from '../../hooks/useCryptoData';

interface CryptoListProps {
  cryptoData: CryptoData[];
}

export const CryptoList: FC<CryptoListProps> = ({ cryptoData }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'market_cap_rank', direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [changeFilter, setChangeFilter] = useState('all');
  const [marketCapFilter, setMarketCapFilter] = useState('all');
  const [volumeFilter, setVolumeFilter] = useState('all');
  const [timeRangeFilter, setTimeRangeFilter] = useState('24h');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const sortedAndFilteredData = cryptoData
    .filter(crypto => {
      const searchMatch = crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());
      
      const priceMatch = priceFilter === 'all' ? true :
        priceFilter === 'under1' ? crypto.current_price < 1 :
        priceFilter === 'under10' ? crypto.current_price < 10 :
        priceFilter === 'under100' ? crypto.current_price < 100 :
        priceFilter === 'over100' ? crypto.current_price >= 100 : true;
      
      const changeMatch = changeFilter === 'all' ? true :
        changeFilter === 'positive' ? crypto.price_change_percentage_24h > 0 :
        changeFilter === 'negative' ? crypto.price_change_percentage_24h < 0 :
        changeFilter === 'major-gain' ? crypto.price_change_percentage_24h > 10 :
        changeFilter === 'major-loss' ? crypto.price_change_percentage_24h < -10 : true;

      const marketCapMatch = marketCapFilter === 'all' ? true :
        marketCapFilter === 'large' ? crypto.market_cap > 10000000000 :
        marketCapFilter === 'medium' ? crypto.market_cap > 1000000000 && crypto.market_cap <= 10000000000 :
        marketCapFilter === 'small' ? crypto.market_cap <= 1000000000 : true;

      const volumeMatch = volumeFilter === 'all' ? true :
        volumeFilter === 'high' ? crypto.total_volume > 1000000000 :
        volumeFilter === 'medium' ? crypto.total_volume > 100000000 && crypto.total_volume <= 1000000000 :
        volumeFilter === 'low' ? crypto.total_volume <= 100000000 : true;

      return searchMatch && priceMatch && changeMatch && marketCapMatch && volumeMatch;
    })
    .sort((a, b) => {
      const direction = sortConfig.direction === 'asc' ? 1 : -1;
      switch (sortConfig.key) {
        case 'market_cap_rank':
          return (a.market_cap_rank - b.market_cap_rank) * direction;
        case 'price':
          return (a.current_price - b.current_price) * direction;
        case 'change':
          return (a.price_change_percentage_24h - b.price_change_percentage_24h) * direction;
        case 'market_cap':
          return (a.market_cap - b.market_cap) * direction;
        case 'volume':
          return (a.total_volume - b.total_volume) * direction;
        default:
          return 0;
      }
    });

  const handleSort = (key: string) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <>
      <div className="filters-bar">
        <div className="filters-main">
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search coins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-group">
            <select
              value={timeRangeFilter}
              onChange={(e) => setTimeRangeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="1h">1H Change</option>
              <option value="24h">24H Change</option>
              <option value="7d">7D Change</option>
              <option value="30d">30D Change</option>
            </select>
            <select
              value={changeFilter}
              onChange={(e) => setChangeFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Changes</option>
              <option value="positive">Positive</option>
              <option value="negative">Negative</option>
              <option value="major-gain">Major Gain (&gt;10%)</option>
              <option value="major-loss">Major Loss (&gt;10%)</option>
            </select>
          </div>
          <button 
            className="advanced-filters-toggle"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            {showAdvancedFilters ? 'Hide Filters ↑' : 'More Filters ↓'}
          </button>
        </div>
        
        {showAdvancedFilters && (
          <div className="advanced-filters">
            {/* ... advanced filters content ... */}
          </div>
        )}
      </div>
      <div className="table-wrapper">
        <div className="crypto-list">
          <div className="crypto-list-header">
            <div className="header-row">
              <div className="header-cell rank-cell">#</div>
              <div className="header-cell name-cell">Name</div>
              <div className="header-cell price-cell">Price</div>
              <div className="header-cell change-cell">24h %</div>
              <div className="header-cell market-cap-cell">Market Cap</div>
              <div className="header-cell volume-cell">Volume(24h)</div>
              <div className="header-cell chart-cell">Last 7d</div>
            </div>
          </div>
          {sortedAndFilteredData.map((crypto) => (
            <div key={crypto.id} className="crypto-item">
              <div className="crypto-cell rank-cell">{crypto.market_cap_rank}</div>
              <div className="crypto-cell name-cell">
                <div className="coin-info">
                  <img src={crypto.image} alt={crypto.name} className="coin-logo" />
                  <div className="coin-details">
                    <span className="coin-name">{crypto.name}</span>
                    <span className="coin-symbol">{crypto.symbol.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              <div className="crypto-cell price-cell">{formatPrice(crypto.current_price)}</div>
              <div className={`crypto-cell change-cell ${crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}`}>
                {formatPercentage(crypto.price_change_percentage_24h)}
              </div>
              <div className="crypto-cell market-cap-cell">{formatPrice(crypto.market_cap)}</div>
              <div className="crypto-cell volume-cell">
                <div className="volume-info">
                  <div>{formatVolume(crypto.total_volume)}</div>
                  <div className="volume-secondary">
                    {formatNumber(crypto.total_volume / crypto.current_price)} {crypto.symbol.toUpperCase()}
                  </div>
                </div>
              </div>
              <div className="crypto-cell chart-cell">
                <div className="sparkline-chart-container">
                  <SparklineChart
                    data={crypto.sparkline_in_7d.price}
                    id={crypto.id}
                    percentageChange={crypto.price_change_percentage_24h}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CryptoList; 