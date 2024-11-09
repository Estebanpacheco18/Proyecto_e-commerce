import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CartContext } from '../CartContext';
import './ProductDetail.css'; // importamos el archivo CSS

//En este componente, importamos el hook useParams de react-router-dom
//para obtener el id del producto de la URL.
//También importamos el hook useContext para acceder a la función addToCart
//del CartContext.
function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useContext(CartContext);
//En este componente, usamos el hook useEffect para hacer una solicitud GET
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
      <h1>{product.name}</h1>
      <img src={product.image} alt={product.name} className="img-fluid product-image" />
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button className="btn btn-primary" onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}

export default ProductDetail;