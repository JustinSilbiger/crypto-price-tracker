import { FC } from 'react';

interface HeaderProps {
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

const Header: FC<HeaderProps> = ({ isDarkMode, onThemeToggle }) => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Crypto Tracker</h1>
        <div className="header-actions">
          <button 
            className="theme-toggle"
            onClick={onThemeToggle}
            aria-label="Toggle theme"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 