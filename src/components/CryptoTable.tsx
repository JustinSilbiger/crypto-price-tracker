import { useState } from 'react';

interface CryptoData {
  rank: number;
  name: string;
  symbol: string;
  logoUrl: string;
  price: number;
  change1h: number;
  change24h: number;
  marketCap: number;
  volume: number;
  supply: number;
}

const CryptoTable = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  const toggleFavorite = (rank: number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(rank)) {
        newFavorites.delete(rank);
      } else {
        newFavorites.add(rank);
      }
      return newFavorites;
    });
  };

  return (
    <table className="crypto-table">
      <thead className="table-header">
        <tr>
          <th className="star-column"></th>
          <th className="rank-column">#</th>
          <th className="name-column">Name</th>
          <th className="price-column">Price</th>
          <th className="price-change-column">1h %</th>
          <th className="price-change-column">24h %</th>
          <th className="market-cap-column">Market Cap</th>
          <th className="volume-column">Volume(24h)</th>
          <th className="supply-column">Circulating Supply</th>
          <th className="chart-column">Last 7 Days</th>
        </tr>
      </thead>
      <tbody>
        {cryptoData.map((crypto) => (
          <tr key={crypto.rank} className="crypto-row">
            <td className="star-column">
              <span
                className={`star-icon ${favorites.has(crypto.rank) ? 'active' : ''}`}
                onClick={() => toggleFavorite(crypto.rank)}
              >
                ★
              </span>
            </td>
            <td className="rank-column">{crypto.rank}</td>
            <td className="name-column">
              <div className="coin-info">
                <img src={crypto.logoUrl} alt="" className="coin-logo" />
                <div className="coin-name-info">
                  <span className="coin-name">{crypto.name}</span>
                  <span className="coin-symbol">{crypto.symbol}</span>
                </div>
              </div>
            </td>
            <td className="price-column">
              ${crypto.price.toLocaleString()}
            </td>
            <td className="price-change-column">
              <span className={crypto.change1h >= 0 ? 'price-up' : 'price-down'}>
                {Math.abs(crypto.change1h)}%
              </span>
            </td>
            <td className="price-change-column">
              <span className={crypto.change24h >= 0 ? 'price-up' : 'price-down'}>
                {Math.abs(crypto.change24h)}%
              </span>
            </td>
            <td className="market-cap-column">
              ${crypto.marketCap.toLocaleString()}
            </td>
            <td className="volume-column">
              ${crypto.volume.toLocaleString()}
            </td>
            <td className="supply-column">
              {crypto.supply.toLocaleString()} {crypto.symbol}
            </td>
            <td className="chart-column">
              {/* Chart component goes here */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CryptoTable; 