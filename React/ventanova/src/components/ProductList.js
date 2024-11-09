import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import './ProductList.css'; // importamos el archivo CSS

//En este componente, importamos el hook useContext para acceder a la función addToCart
//del CartContext.
//Usamos el hook useState para manejar el estado de los productos.

function ProductList() {
    const [products, setProducts] = useState([]);
    const { addToCart, message } = useContext(CartContext);
  
    useEffect(() => {
      axios.get('http://127.0.0.1:8000/api/products/')
        .then(response => {
          setProducts(response.data);
        })
        .catch(error => {
          console.error('There was an error fetching the data!', error);
        });
    }, []);
  
    return (
      <div className="container">
        <h1>Product List</h1>
        {message && <div className="alert alert-success">{message}</div>}
        <div className="row">
          {products.map(product => (
            <div key={product.id} className="col-md-4">
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.name} />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">{product.description}</p>
                  <Link to={`/product/${product.id}`} className="btn btn-primary">View Details</Link>
                  <button className="btn btn-secondary" onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link to="/cart" className="btn btn-success">Go to Cart</Link>
      </div>
    );
  }
  
  export default ProductList;