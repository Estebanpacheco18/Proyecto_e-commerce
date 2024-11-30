import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CategoryMenu.css';

function CategoryMenu({ selectedCategories, handleCategoryChange }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        const products = response.data;
        const uniqueCategories = [...new Set(products.map(product => product.category))];
        setCategories(uniqueCategories);
      })
      .catch(error => {
        console.error('There was an error fetching the categories!', error);
      });
  }, []);

  return (
    <div className="category-menu">
      <h2>Categories</h2>
      <button className="btn btn-secondary mb-3" onClick={() => handleCategoryChange('all')}>Show All</button>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>
            <input
              type="checkbox"
              className="form-check-input"
              id={category}
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
            />
            <label className="form-check-label" htmlFor={category}>{category}</label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMenu;