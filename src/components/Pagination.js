// src/components/Pagination.js
import React from 'react';
import './Pagination.css'; // We'll create this CSS file next

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  if (totalPages <= 1) {
    return null; // Don't render pagination if only one or no pages
  }

  return (
    <nav className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous
      </button>
      <ul className="pagination-list">
        {pageNumbers.map(number => (
          <li key={number} className="pagination-item">
            <button
              onClick={() => onPageChange(number)}
              className={`pagination-link ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;