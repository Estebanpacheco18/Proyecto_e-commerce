import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import { AuthContext } from '../AuthContext';
import ProductCarousel from './ProductCarousel';
import './ProductList.css';

//En este componente, importamos el hook useContext para acceder a la función addToCart
//del CartContext y AuthContext.
//Usamos el hook useState para manejar el estado de los productos.

function ProductList({ selectedCategories, searchTerm }) {
  const [products, setProducts] = useState([]);
  const { addToCart, message } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleAddToCart = (product) => {
    if (user) {
      addToCart(product);
    } else {
      setLoginMessage('You must be logged in to add products to the cart.');
      setTimeout(() => setLoginMessage(''), 3000); // Clear message after 3 seconds
      navigate('/login');
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategories.length === 0 || selectedCategories.includes(product.category))
  );

  return (
    <div className="container">
      <h1>Product List</h1>
      {message && <div className="alert alert-success">{message}</div>}
      {loginMessage && <div className="alert alert-warning">{loginMessage}</div>}
      <ProductCarousel />
      <div className="row mt-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <p className="card-text">Price: ${product.price}</p>
                <p className="card-text">Stock: {product.stock}</p>
                <div className="button-group">
                  <Link to={`/products/${product.id}`} className="btn btn-primary">View Details</Link>
                  <button className="btn btn-secondary" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="button-group mt-3 justify-content-center">
        <Link to="/cart" className="btn btn-success">Go to Cart</Link>
      </div>
    </div>
  );
}

export default ProductList;