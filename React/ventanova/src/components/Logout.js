import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

//En este componente, importamos el AuthContext
//y usamos el hook useContext para acceder a la función logout.

function Logout() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="container">
      <h1>Welcome, {user}</h1>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
    </div>
  );
}

export default Logout;