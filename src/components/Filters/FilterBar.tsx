import { FC } from 'react';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
}

const FilterBar: FC<FilterBarProps> = ({ 
  searchTerm, 
  onSearchChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="filters-section">
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or symbol..."
          className="search-input"
        />
      </div>
      <div className="sort-actions">
        <select 
          value={sortBy} 
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          <option value="market_cap_desc">Market Cap (High to Low)</option>
          <option value="market_cap_asc">Market Cap (Low to High)</option>
          <option value="price_desc">Price (High to Low)</option>
          <option value="price_asc">Price (Low to High)</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar; 