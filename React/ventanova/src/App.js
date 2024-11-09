import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);

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
    <div className="App">
      <header className="App-header">
        <h1>Product List</h1>
      </header>
      <main className="container">
        {products.length > 0 ? (
          <ul className="list-group">
            {products.map(product => (
              <li key={product.id} className="list-group-item">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                {product.image && (
                  <img src={product.image} alt={product.name} className="product-image" />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available</p>
        )}
      </main>
    </div>
  );
}

export default App;