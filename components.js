import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">TaskApp</Link>
        {token ? (
          <div className="flex space-x-4">
            <Link to="/dashboard" className="text-white hover:underline">Dashboard</Link>
            <Link to="/profile" className="text-white hover:underline">Profile</Link>
            <button onClick={handleLogout} className="text-white bg-red-500 px-3 py-1 rounded">Logout</button>
          </div>
        ) : (
          <div className="flex space-x-4">
            <Link to="/login" className="text-white hover:underline">Login</Link>
            <Link to="/signup" className="text-white hover:underline">Signup</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
