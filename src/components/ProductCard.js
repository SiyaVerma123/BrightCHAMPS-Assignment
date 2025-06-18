// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css'; // We'll create this CSS file next

const ProductCard = ({ product, onToggleFavorite, isFavorite }) => {
  return (
    <div className={`product-card ${isFavorite ? 'favorite' : ''}`}>
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <p className="product-rating">Rating: {product.rating} / 5</p>
      <button
        className={`favorite-button ${isFavorite ? 'favorited' : ''}`}
        onClick={() => onToggleFavorite(product.id)}
      >
        {isFavorite ? '★ Favorited' : '☆ Add to Favorites'}
      </button>
    </div>
  );
};

export default ProductCard;