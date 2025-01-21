import { useState } from 'react';
import { CryptoList } from './components/CryptoList/CryptoList';
import { LoadingState } from './components/LoadingState';
import { ErrorState } from './components/ErrorState';
import { Pagination } from './components/Pagination';
import { useCryptoData } from './hooks/useCryptoData';
import { ThemeToggle } from './components/ThemeToggle';
import './styles/main.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error, refetch } = useCryptoData(currentPage);

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">Crypto Tracker</h1>
          <ThemeToggle />
        </div>
      </header>

      <main className="content-wrapper">
        {loading ? (
          <LoadingState />
        ) : error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : (
          <>
            <CryptoList cryptoData={data} />
            <Pagination
              currentPage={currentPage}
              totalPages={100} // CoinGecko API limitation
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
