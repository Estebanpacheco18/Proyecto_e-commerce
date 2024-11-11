import React, { useContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import Payment from './components/Payment';
import CategoryMenu from './components/CategoryMenu';
import CategoryProducts from './components/CategoryProducts';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// En este componente, importamos los componentes ProductList, ProductDetail, 
// Cart, Login y Logout.

// ahora podemos usar el modo oscuro en nuestra aplicación.

function App() {
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [products, setProducts] = useState([]);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="App-header">
        <h1>VentaNova</h1>
        <div className="auth-buttons">
          {user ? (
            <>
              <span>Welcome, {user}</span>
              <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
          <button className="btn btn-secondary" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <main className="container">
        <div className="row">
          <div className="col-md-3">
            <CategoryMenu />
          </div>
          <div className="col-md-9">
            <Routes>
              <Route path="/" element={<ProductList products={products} />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/categories/:category" element={<CategoryProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/logout" element={user ? <Logout /> : <Navigate to="/login" />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;