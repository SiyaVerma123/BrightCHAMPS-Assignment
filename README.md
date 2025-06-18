# E-Commerce Product Listing Page

This is a responsive product listing page for an e-commerce platform, developed as part of a BrightCHAMPS assignment.

## Features Implemented
- Display products with image, name, price, category, and rating
- Filter by **category** and **minimum rating**
- Sort products by **price** (ascending/descending)
- Mark products as **favorites**
- Favorites are stored in **local storage**
- **Pagination** (8 products per page)

## Tech Stack
- React.js
- JavaScript (ES6+)
- CSS (custom, assumed for layout)
- Mock API using `products.json`
- LocalStorage for persistence

## State & Data Management
- `useState`, `useEffect`, `useMemo`, `useCallback`
- Derived product filtering, sorting, and pagination
- Persistent favorites using `localStorage`

## How to Run
```bash
git clone https://github.com/SiyaVerma123/BrightCHAMPS-Assignment
cd BrightCHAMPS-Assignment
npm install
npm start
