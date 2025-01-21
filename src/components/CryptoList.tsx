import { FC, useMemo } from 'react';
import { CryptoData } from '../hooks/useCryptoData';
import { useFilters } from '../hooks/useFilters';
import { LoadingState } from './LoadingState';
import { ErrorState } from './ErrorState';
import { Filters } from './Filters';
import { formatCompactNumber, formatPrice, formatPercent } from '../utils/formatters';

const getTimeRangeLabel = (timeRange: string): string => {
  switch (timeRange) {
    case '1h': return '1H Change';
    case '24h': return '24H Change';
    case '7d': return '7D Change';
    case '30d': return '30D Change';
    case '1y': return '1Y Change';
    default: return '24H Change';
  }
};

interface CryptoListProps {
  data: CryptoData[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export const CryptoList: FC<CryptoListProps> = ({ data, loading, error, onRetry }) => {
  const { filters, actions, filterData, getPriceChangeForTimeRange } = useFilters();
  
  // Memoize the filtered data
  const filteredData = useMemo(() => {
    return filterData(data);
  }, [data, filterData, filters]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState message={error} onRetry={onRetry} />;

  return (
    <div className="table-wrapper">
      <Filters filters={filters} actions={actions} />
      
      <div className="crypto-list">
        <div className="crypto-list-header">
          <div className="header-row">
            <div className="header-cell rank-cell">#</div>
            <div className="header-cell name-cell">Name</div>
            <div className="header-cell price-cell">Price</div>
            <div className="header-cell change-cell">{getTimeRangeLabel(filters.timeRange)}</div>
            <div className="header-cell market-cap-cell">Market Cap</div>
            <div className="header-cell volume-cell">Volume</div>
            <div className="header-cell chart-cell">Last 7 Days</div>
          </div>
        </div>

        {filteredData.map((crypto) => {
          const priceChange = getPriceChangeForTimeRange(crypto, filters.timeRange);
          
          return (
            <div key={crypto.id} className="crypto-item">
              <div className="rank-cell">{crypto.market_cap_rank}</div>
              
              <div className="name-cell">
                <div className="coin-info">
                  <img src={crypto.image} alt={crypto.name} className="coin-logo" />
                  <div className="coin-details">
                    <span className="coin-name">{crypto.name}</span>
                    <span className="coin-symbol">{crypto.symbol.toUpperCase()}</span>
                  </div>
                </div>
              </div>
              
              <div className="price-cell">
                {formatPrice(crypto.current_price)}
              </div>
              
              <div className={`change-cell ${priceChange >= 0 ? 'price-up' : 'price-down'}`}>
                {formatPercent(priceChange)}
              </div>
              
              <div className="market-cap-cell">
                {formatCompactNumber(crypto.market_cap)}
              </div>
              
              <div className="volume-cell">
                <div className="volume-info">
                  <span className="volume-primary">
                    {formatCompactNumber(crypto.total_volume)}
                  </span>
                </div>
              </div>
              
              <div className="chart-cell">
                {/* Sparkline chart would go here */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 