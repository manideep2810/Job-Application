import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBriefcase, FaUserCircle, FaBars, FaTimes, FaSignOutAlt, FaClipboardList } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3 md:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary-600">
            <FaBriefcase className="text-2xl" />
            <span className="font-heading font-bold text-xl tracking-tight">JobTrack</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="text-gray-700 hover:text-primary-600 font-medium flex items-center space-x-1.5"
                >
                  <FaClipboardList />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/job/new"
                  className="btn btn-primary flex items-center space-x-1.5 shadow-sm"
                >
                  <span>+ Add Job</span>
                </Link>
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-50">
                    <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center">
                      <span className="text-sm font-bold">{user?.name?.charAt(0)}</span>
                    </div>
                    <span className="max-w-[100px] truncate">{user?.name?.split(' ')[0]}</span>
                  </button>
                  <div className="absolute right-0 mt-1 w-56 origin-top-right bg-white rounded-lg shadow-lg py-2 z-20 hidden group-hover:block border border-gray-100">
                    <div className="px-4 py-2.5 border-b border-gray-100">
                      <p className="font-medium text-sm text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">{user?.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 items-center space-x-2"
                    >
                      <FaSignOutAlt className="text-gray-400" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-primary-600 font-medium px-3 py-2">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary shadow-sm">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg" 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-100">
            <div className="flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="px-3 py-3 bg-gray-50 rounded-lg mb-1">
                    <div className="font-medium text-gray-900">{user?.name}</div>
                    <div className="text-sm text-gray-500 truncate">{user?.email}</div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="px-3 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                    onClick={closeMenu}
                  >
                    <FaClipboardList className="text-gray-400" />
                    <span>Dashboard</span>
                  </Link>
                  <Link
                    to="/job/new"
                    className="px-3 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                    onClick={closeMenu}
                  >
                    <span>+ Add Job</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2.5 text-left text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg flex items-center space-x-2"
                  >
                    <FaSignOutAlt className="text-gray-400" />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-3 py-2.5 text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-lg"
                    onClick={closeMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-2.5 bg-primary-500 text-white rounded-lg text-center font-medium"
                    onClick={closeMenu}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 