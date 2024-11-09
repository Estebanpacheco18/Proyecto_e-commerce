import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import './ProductList.css';

//En este componente, importamos el hook useContext para acceder a la función addToCart
//del CartContext.
//Usamos el hook useState para manejar el estado de los productos.

function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart, message } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Product List</h1>
      {message && <div className="alert alert-success">{message}</div>}
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleSearch}
        className="form-control mb-3"
      />
      <div className="row">
        {filteredProducts.map(product => (
          <div key={product.id} className="col-md-4">
            <div className="card">
              <img src={product.image} className="card-img-top" alt={product.name} />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
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

export default ProductList;