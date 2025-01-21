import { FC } from 'react';
import { CryptoData } from '../../types';
import SparklineChart from '../CryptoTable/SparklineChart';
import { formatPrice, formatNumber, formatPercentage } from '../../utils/formatters';

interface CryptoListItemProps {
  crypto: CryptoData;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

const CryptoListItem: FC<CryptoListItemProps> = ({ crypto, isFavorite, onToggleFavorite }) => {
  const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    return (
      <div className="crypto-item">
        <div className="mobile-row-1">
          <button
            className="favorite-button"
            onClick={() => onToggleFavorite(crypto.id)}
          >
            {isFavorite ? '★' : '☆'}
          </button>
          <span className="rank-number">#{crypto.market_cap_rank}</span>
          <div className="coin-info">
            <img src={crypto.image} alt={crypto.name} className="coin-logo" />
            <div className="coin-details">
              <span className="coin-name">{crypto.name}</span>
              <span className="coin-symbol">{crypto.symbol.toUpperCase()}</span>
            </div>
          </div>
          <div className="market-data">
            <div className="market-data-primary">{formatPrice(crypto.current_price)}</div>
            <div className={`price-change ${crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}`}>
              {crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'} {formatPercentage(crypto.price_change_percentage_24h)}
            </div>
          </div>
        </div>

        <div className="mobile-row-2">
          <div className="market-data">
            <div className="market-data-label">Market Cap</div>
            <div className="market-data-primary">{formatPrice(crypto.market_cap)}</div>
          </div>
          <div className="market-data">
            <div className="market-data-label">Volume (24h)</div>
            <div className="market-data-primary">{formatPrice(crypto.total_volume)}</div>
          </div>
        </div>

        <div className="mobile-chart">
          <SparklineChart
            data={crypto.sparkline_in_7d.price}
            id={crypto.id}
            percentageChange={crypto.price_change_percentage_7d}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="crypto-item">
      <button
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={() => onToggleFavorite(crypto.id)}
      >
        ★
      </button>
      <div className="rank-number">{crypto.market_cap_rank}</div>
      <div className="coin-info">
        <img src={crypto.image} alt={crypto.name} className="coin-logo" />
        <div className="coin-details">
          <span className="coin-name">{crypto.name}</span>
          <span className="coin-symbol">{crypto.symbol}</span>
        </div>
      </div>
      <div className="market-data">
        <div className="market-data-primary">{formatPrice(crypto.current_price)}</div>
      </div>
      <div className={`price-change ${crypto.price_change_percentage_1h >= 0 ? 'price-up' : 'price-down'}`}>
        <span className="price-change-icon">{crypto.price_change_percentage_1h >= 0 ? '▲' : '▼'}</span>
        {formatPercentage(crypto.price_change_percentage_1h)}
      </div>
      <div className={`price-change ${crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}`}>
        <span className="price-change-icon">{crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}</span>
        {formatPercentage(crypto.price_change_percentage_24h)}
      </div>
      <div className="market-data">
        <div className="market-data-primary">{formatPrice(crypto.market_cap)}</div>
      </div>
      <div className="market-data">
        <div className="market-data-primary">{formatPrice(crypto.total_volume)}</div>
        <div className="market-data-secondary">
          {formatNumber(crypto.total_volume)} {crypto.symbol}
        </div>
      </div>
      <div className="market-data">
        <div className="market-data-primary">
          {formatNumber(crypto.circulating_supply)} {crypto.symbol}
        </div>
        {crypto.max_supply && (
          <div className="market-data-secondary">
            {((crypto.circulating_supply / crypto.max_supply) * 100).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="sparkline-chart">
        <SparklineChart
          data={crypto.sparkline_in_7d.price}
          id={crypto.id}
          percentageChange={crypto.price_change_percentage_7d}
        />
      </div>
    </div>
  );
};

export default CryptoListItem; 