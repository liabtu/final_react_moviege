import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange, t }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button 
        disabled={currentPage === 1} 
        onClick={() => onPageChange(currentPage - 1)}
        className="pag-btn"
      >
        ← {t.prev}
      </button>
      
      <span className="page-info">
        {t.page} {currentPage} / {totalPages}
      </span>

      <button 
        disabled={currentPage === totalPages} 
        onClick={() => onPageChange(currentPage + 1)}
        className="pag-btn"
      >
        {t.next} →
      </button>
    </div>
  );
};

export default Pagination;