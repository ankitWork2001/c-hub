import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiHome, FiTag, FiShoppingBag, FiGrid, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const AdminNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  // Close mobile menu when navigating
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { title: 'Dashboard', path: '/admin/dashboard', icon: <FiHome className="mr-2" /> },
    { title: 'Coupons', path: '/admin/coupons', icon: <FiTag className="mr-2" /> },
    { title: 'Stores', path: '/admin/stores', icon: <FiShoppingBag className="mr-2" /> },
    { title: 'Categories', path: '/admin/categories', icon: <FiGrid className="mr-2" /> },
  ];

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="font-bold text-xl">Admin Panel</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors duration-200 ${isActive(link.path)}`}
              >
                {link.icon} {link.title}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center ml-4 px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors duration-200"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-700 focus:outline-none"
            >
              {isMobileMenuOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-200 ${isActive(link.path)}`}
              >
                {link.icon} {link.title}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition-colors duration-200 mt-4"
            >
              <FiLogOut className="mr-2" /> Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;