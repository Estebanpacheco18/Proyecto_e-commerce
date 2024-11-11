import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import './ProductList.css';

function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const { addToCart, message } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        const allProducts = response.data;
        const filteredProducts = allProducts.filter(product => product.category === category);
        setProducts(filteredProducts);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, [category]);

  return (
    <div className="container">
      <h1>Products in {category}</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <div className="row">
        {products.map(product => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
                <button className="btn btn-secondary" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <Link to="/cart" className="btn btn-success">Go to Cart</Link>
      </div>
    </div>
  );
}

export default CategoryProducts;