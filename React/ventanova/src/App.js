import React, { useContext } from 'react';
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import { AuthContext } from './AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//En este componente, importamos los componentes ProductList, ProductDetail, 
//Cart, Login y Logout.
function App() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Product List</h1>
        <div className="auth-buttons">
          {user ? (
            <>
              <span>Welcome, {user}</span>
              <button className="btn btn-danger" onClick={logout}>Logout</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Login</Link>
          )}
        </div>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/logout" element={user ? <Logout /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;