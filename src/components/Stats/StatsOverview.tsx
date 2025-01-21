import { FC } from 'react';
import { formatPrice, formatNumber } from '../../utils/formatters';

interface MarketStats {
  total_market_cap: number;
  total_volume: number;
  btc_dominance: number;
  total_cryptocurrencies: number;
}

interface StatsOverviewProps {
  stats: MarketStats;
}

const StatsOverview: FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <div className="stats-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Market Cap</span>
          <span className="stat-value">{formatPrice(stats.total_market_cap)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">24h Volume</span>
          <span className="stat-value">{formatPrice(stats.total_volume)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">BTC Dominance</span>
          <span className="stat-value">{stats.btc_dominance.toFixed(1)}%</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Cryptocurrencies</span>
          <span className="stat-value">{formatNumber(stats.total_cryptocurrencies)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview; 