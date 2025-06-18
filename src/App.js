import React, { useState, useEffect, useMemo, useCallback } from 'react';
import ProductList from './components/ProductList';
import FilterSortBar from './components/FilterSortBar';
import Pagination from './components/Pagination';
import './App.css'; // Assuming you have a basic App.css for overall layout

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedRating, setSelectedRating] = useState(0); // Minimum rating (0 means no minimum)
  const [sortOrder, setSortOrder] = useState('none'); // 'asc', 'desc', 'none'

  // State for favorites (using product IDs)
  // Initialize from local storage, or an empty array if not found
  const [favorites, setFavorites] = useState(() => {
    try {
      const localFavorites = localStorage.getItem('favorites');
      return localFavorites ? JSON.parse(localFavorites) : [];
    } catch (e) {
      console.error("Failed to parse favorites from localStorage:", e);
      return []; // Return empty array if parsing fails
    }
  });

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products to display per page

  // Effect to fetch products data from public/products.json
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json'); // Path relative to public folder
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []); // Empty dependency array means this runs once on component mount

  // Effect to persist favorites to local storage whenever the favorites state changes
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      console.error("Failed to save favorites to localStorage:", e);
    }
  }, [favorites]); // Dependency array includes 'favorites'

  // CORRECTED: Memoized derivation of unique categories for the filter dropdown
  // Ensures 'All' appears exactly once at the beginning.
  const categories = useMemo(() => {
    // Get unique categories from products, and filter out 'All'
    // in case a product's category name itself is 'All'.
    const uniqueCategories = Array.from(new Set(products.map(p => p.category))).filter(cat => cat !== 'All');
    return ['All', ...uniqueCategories]; // Explicitly add 'All' once at the beginning
  }, [products]); // Re-calculate only when 'products' array changes

  // Memoized and optimized filtering and sorting logic
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products]; // Create a shallow copy to avoid direct mutation

    // 1. Filter by Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // 2. Filter by Minimum Rating
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // 3. Sort by Price
    if (sortOrder !== 'none') {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.price - b.price; // Ascending order
        } else {
          return b.price - a.price; // Descending order
        }
      });
    }

    // Reset page to 1 when filters or sort order change.
    // This is placed here to ensure the pagination resets immediately
    // after filtering/sorting has changed the total product count.
    setCurrentPage(1);
    return filtered;
  }, [products, selectedCategory, selectedRating, sortOrder]); // Dependencies for re-calculation

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);

  // Callback for handling page changes in pagination
  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // Smoothly scroll to the top of the page when changing pages
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []); // No dependencies, as it only updates currentPage

  // Callback for toggling a product's favorite status
  const handleToggleFavorite = useCallback((productId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(productId)) {
        // If already in favorites, remove it
        return prevFavorites.filter(id => id !== productId);
      } else {
        // If not in favorites, add it
        return [...prevFavorites, productId];
      }
    });
  }, []); // No dependencies, as it only uses the updater function for setFavorites

  if (loading) {
    return <div className="app-container">Loading products...</div>;
  }

  if (error) {
    return <div className="app-container">Error: {error.message}. Please try again later.</div>;
  }

  return (
    <div className="app-container">
      <h1>E-Commerce Product Listing</h1>

      {/* Filter and Sort Bar Component */}
      <FilterSortBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedRating={selectedRating}
        onRatingChange={setSelectedRating}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      {/* Conditional rendering for no products found message */}
      {currentProducts.length === 0 ? (
        <p className="no-products-message">No products found matching your criteria.</p>
      ) : (
        <>
          {/* Product List Component */}
          <ProductList
            products={currentProducts}
            onToggleFavorite={handleToggleFavorite}
            favorites={favorites} // Pass favorites to highlight cards
          />

          {/* Pagination Component */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default App;