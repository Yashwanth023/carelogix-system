
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-light tracking-tight text-gray-900">Care</span>
              <span className="text-2xl font-medium tracking-tight text-blue-500">Logix</span>
            </Link>
          </div>
          
          <nav className="flex items-center space-x-8">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Dashboard
                </Link>
                <Link 
                  to="/patients" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Patients
                </Link>
                <Link 
                  to="/doctors" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Doctors
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
