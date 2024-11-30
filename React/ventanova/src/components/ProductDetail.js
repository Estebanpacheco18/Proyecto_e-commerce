import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import './ProductDetail.css';

//En este componente, importamos el hook useParams de react-router-dom
//para obtener el id del producto de la URL.
//También importamos el hook useContext para acceder a la función addToCart
//del CartContext.

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, message } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${id}/`)
      .then(response => {
        setProduct(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container">
      <div className="product-details">
        <h1>{product.name}</h1>
        {message && <div className="alert alert-success">{message}</div>}
        <img src={product.image} alt={product.name} className="img-fluid product-image" />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Back to Products</button>
        <Link to="/cart" className="btn btn-success">Go to Cart</Link>
      </div>
    </div>
  );
}

export default ProductDetail;