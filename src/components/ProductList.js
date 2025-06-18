// src/components/ProductList.js
import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css'; // We'll create this CSS file next

const ProductList = ({ products, onToggleFavorite, favorites }) => {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(product.id)}
        />
      ))}
    </div>
  );
};

export default ProductList;