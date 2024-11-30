import React, { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-container">
      <h1>Welcome, {user}!</h1>
      <p>This is your profile page.</p>
    </div>
  );
}

export default Profile;