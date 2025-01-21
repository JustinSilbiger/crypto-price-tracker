import { FC } from 'react';
import { CryptoData } from '../../types';
import SparklineChart from './SparklineChart';
import { formatPrice, formatNumber, formatPercentage } from '../../utils/formatters';

interface CryptoTableRowProps {
  crypto: CryptoData;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
}

const CryptoTableRow: FC<CryptoTableRowProps> = ({ crypto, onToggleFavorite, isFavorite }) => {
  return (
    <tr className="crypto-row">
      <td className="crypto-cell text-left">
        <button
          onClick={() => onToggleFavorite(crypto.id)}
          className={`btn btn-icon ${isFavorite ? 'active' : ''}`}
        >
          ★
        </button>
      </td>
      <td className="crypto-cell text-left">{crypto.market_cap_rank}</td>
      <td className="crypto-cell">
        <div className="coin-info">
          <img src={crypto.image} alt={crypto.name} className="coin-logo" />
          <div className="coin-details">
            <span className="coin-name">{crypto.name}</span>
            <span className="coin-symbol">{crypto.symbol}</span>
          </div>
        </div>
      </td>
      <td className="crypto-cell text-right">
        <div className="market-data">
          <div className="market-data-primary">{formatPrice(crypto.current_price)}</div>
        </div>
      </td>
      <td className="crypto-cell text-right">
        <div className={`price-change ${crypto.price_change_percentage_1h >= 0 ? 'price-up' : 'price-down'}`}>
          <span className="price-change-icon">{crypto.price_change_percentage_1h >= 0 ? '▲' : '▼'}</span>
          {formatPercentage(crypto.price_change_percentage_1h)}
        </div>
      </td>
      <td className="crypto-cell text-right">
        <div className={`price-change ${crypto.price_change_percentage_24h >= 0 ? 'price-up' : 'price-down'}`}>
          <span className="price-change-icon">{crypto.price_change_percentage_24h >= 0 ? '▲' : '▼'}</span>
          {formatPercentage(crypto.price_change_percentage_24h)}
        </div>
      </td>
      <td className="crypto-cell text-right">
        <div className="market-data">
          <div className="market-data-primary">{formatPrice(crypto.market_cap)}</div>
        </div>
      </td>
      <td className="crypto-cell text-right">
        <div className="market-data">
          <div className="market-data-primary">{formatPrice(crypto.total_volume)}</div>
          <div className="market-data-secondary">
            {formatNumber(crypto.total_volume)} {crypto.symbol}
          </div>
        </div>
      </td>
      <td className="crypto-cell text-right">
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
      </td>
      <td className="crypto-cell">
        <div className="sparkline-chart">
          <SparklineChart
            data={crypto.sparkline_in_7d.price}
            id={crypto.id}
            percentageChange={crypto.price_change_percentage_7d}
          />
        </div>
      </td>
    </tr>
  );
};

export default CryptoTableRow; 