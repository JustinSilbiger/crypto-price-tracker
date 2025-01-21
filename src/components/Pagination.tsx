import { FC } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Ensure we don't exceed limits
  const safeTotalPages = Math.min(totalPages, 250);
  const safeCurrentPage = Math.min(Math.max(1, currentPage), safeTotalPages);
  
  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const delta = 1; // Show 1 page on each side of current page
    
    // Always show first page
    pages.push(1);
    
    // Calculate range around current page
    const rangeStart = Math.max(2, safeCurrentPage - delta);
    const rangeEnd = Math.min(safeTotalPages - 1, safeCurrentPage + delta);
    
    // Add ellipsis before range if needed
    if (rangeStart > 2) {
      pages.push('...');
    }
    
    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Add ellipsis after range if needed
    if (rangeEnd < safeTotalPages - 1) {
      pages.push('...');
    }
    
    // Always show last page if not already included
    if (safeTotalPages > 1) {
      pages.push(safeTotalPages);
    }
    
    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="pagination">
      <button
        className="page-button"
        onClick={() => onPageChange(safeCurrentPage - 1)}
        disabled={safeCurrentPage === 1}
      >
        Previous
      </button>
      
      {visiblePages.map((page, index) => (
        <button
          key={`${page}-${index}`}
          className={`page-button ${page === safeCurrentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
          onClick={() => typeof page === 'number' ? onPageChange(page) : undefined}
          disabled={page === '...'}
        >
          {page}
        </button>
      ))}
      
      <button
        className="page-button"
        onClick={() => onPageChange(safeCurrentPage + 1)}
        disabled={safeCurrentPage === safeTotalPages}
      >
        Next
      </button>
    </div>
  );
}; 