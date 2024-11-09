import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

//En este componente, importamos el AuthContext 
//y usamos el hook useContext para acceder a la función login.

//el hook useState se utiliza para manejar el estado del formulario de login.

//La función Login se encarga de mostrar un formulario
function Login() {
  const [username, setUsername] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}

export default Login;