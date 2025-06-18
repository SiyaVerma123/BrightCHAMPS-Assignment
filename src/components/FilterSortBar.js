// src/components/FilterSortBar.js
import React from 'react';
import './FilterSortBar.css'; // We'll create this CSS file next

const FilterSortBar = ({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedRating,
  onRatingChange,
  sortOrder,
  onSortChange,
}) => {
  return (
    <div className="filter-sort-bar">
      <div className="filter-group">
        <label htmlFor="category-filter">Category:</label>
        <select
          id="category-filter"
          value={selectedCategory}
          onChange={e => onCategoryChange(e.target.value)}
        >
          {/* The 'All' option is explicitly included here, and the categories prop
              will be derived in App.js to ensure no duplicates. */}
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating-filter">Minimum Rating:</label>
        <select
          id="rating-filter"
          value={selectedRating}
          onChange={e => onRatingChange(parseFloat(e.target.value))}
        >
          <option value="0">All Ratings</option>
          <option value="4.5">4.5 & Up</option>
          <option value="4.0">4.0 & Up</option>
          <option value="3.5">3.5 & Up</option>
        </select>
      </div>

      <div className="sort-group">
        <label htmlFor="sort-order">Sort By Price:</label>
        <select
          id="sort-order"
          value={sortOrder}
          onChange={e => onSortChange(e.target.value)}
        >
          <option value="none">None</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSortBar;