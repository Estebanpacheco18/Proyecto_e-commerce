import React, { useContext, useState } from 'react'; // Eliminar useEffect
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Logout from './components/Logout';
import Payment from './components/Payment';
import Profile from './components/Profile';
import CategoryMenu from './components/CategoryMenu';
import CategoryProducts from './components/CategoryProducts';
import { AuthContext } from './AuthContext';
// Eliminar la importación no utilizada
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// En este componente, importamos los componentes ProductList, ProductDetail, 
// Cart, Login y Logout.

// Ahora podemos usar el modo oscuro en nuestra aplicación.
// Para ello, importamos el hook useState y creamos un estado darkMode con el valor inicial false.

function App() {
  const { user, logout } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleCategoryChange = (category) => {
    if (category === 'all') {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(prevSelected =>
        prevSelected.includes(category)
          ? prevSelected.filter(c => c !== category)
          : [...prevSelected, category]
      );
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className={`App ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="App-header">
        <div className="nav-container">
          <h1><Link to="/" className="home-link">VentaNova</Link></h1>
          <div className="dropdown">
            <button className="dropbtn" onClick={toggleMenu}>☰</button>
            {isMenuOpen && (
              <div className="dropdown-content">
                <Link to="/profile">Profile</Link>
                {user && <div className="welcome-message">Welcome, {user}!</div>}
                <div className="category-menu">
                  <CategoryMenu selectedCategories={selectedCategories} handleCategoryChange={handleCategoryChange} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
          />
        </div>
        <div className="auth-buttons">
          {user ? (
            <>
              <button className="btn btn-danger ml-3" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">Login</Link>
            </>
          )}
          <button className="btn btn-secondary ml-3" onClick={toggleDarkMode}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </header>
      <main className="container">
        <div className="row">
          <div className="col-md-12"> {/* Ampliar la sección de productos */}
            <Routes>
              <Route path="/" element={<ProductList selectedCategories={selectedCategories} searchTerm={searchTerm} />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/categories/:category" element={<CategoryProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/logout" element={user ? <Logout /> : <Navigate to="/login" />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;