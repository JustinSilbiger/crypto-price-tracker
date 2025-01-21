import { FC } from 'react';

export const LoadingState: FC = () => {
  return (
    <div className="crypto-list">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="crypto-item animate-pulse">
          <div className="rank-cell">
            <div className="skeleton h-4 w-8"></div>
          </div>
          <div className="name-cell">
            <div className="coin-info">
              <div className="skeleton h-8 w-8 rounded-full"></div>
              <div className="coin-details">
                <div className="skeleton h-4 w-24"></div>
                <div className="skeleton h-3 w-16 mt-1"></div>
              </div>
            </div>
          </div>
          <div className="price-cell">
            <div className="skeleton h-4 w-20"></div>
          </div>
          <div className="change-cell">
            <div className="skeleton h-4 w-16"></div>
          </div>
          <div className="market-cap-cell">
            <div className="skeleton h-4 w-24"></div>
          </div>
          <div className="volume-cell">
            <div className="skeleton h-4 w-20"></div>
          </div>
          <div className="chart-cell">
            <div className="skeleton h-12 w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}; 