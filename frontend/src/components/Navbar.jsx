import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCategoryId, setCategoryName } from "../redux/categorySlice";
import { resetStore } from "../redux/storeSlice";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Optional icons (or use emoji/icons if preferred)

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Top Nav: Search Bar */}
      <div className="flex flex-col sm:flex-row justify-evenly items-center gap-4 sm:gap-6 mx-2">
        <div className="bg-white w-full px-6 py-2 border-b sm:border-none">
          <div className="max-w-5xl mx-auto flex">
            <input
              type="text"
              placeholder="Search for deals, stores, etc."
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 text-black focus:outline-none"
            />
            <button className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600">
              Search
            </button>
          </div>
        </div>
        <Link to={"/admin/login"}>
          <button className="bg-blue-500 text-white mb-2 mt-2 cursor-pointer px-4 py-2 rounded-md hover:bg-blue-600 hidden md:block">
            Login
          </button>
        </Link>
      </div>

      {/* Bottom Nav: Logo + Links */}
      <nav className="bg-blue-600 text-white px-6 py-3 relative">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-500 rounded-md p-1">
                <img
                  src="https://images.unsplash.com/photo-1522780550166-284a0288c8df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW1hem9ufGVufDB8fDB8fHww"
                  alt="Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>
            </div>
          </Link>

          {/* Hamburger Button */}
          <div className="sm:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Nav Links */}
          <div className="hidden sm:flex space-x-20 mx-30 text-lg">
            <Link
              to="/category"
              className="hover:underline"
              onClick={() => {
                dispatch(setCategoryId(null));
                dispatch(setCategoryName("All Categories"));
              }}
            >
              Categories
            </Link>
            <Link
              to="/store"
              className="hover:underline"
              onClick={() => dispatch(resetStore())}
            >
              Top Stores
            </Link>
            <Link to="/dealofday" className="hover:underline">
              Deals of the Day
            </Link>
            <a href="#" className="hover:underline">
              Share &amp; Earn
            </a>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {isOpen && (
          <div className="flex flex-col sm:hidden mt-4 space-y-4 text-lg px-4">
            <Link
              to="/category"
              className="hover:underline"
              onClick={() => {
                dispatch(setCategoryId(null));
                dispatch(setCategoryName("All Categories"));
                setIsOpen(false);
              }}
            >
              Categories
            </Link>
            <Link
              to="/store"
              className="hover:underline"
              onClick={() => {
                dispatch(resetStore());
                setIsOpen(false);
              }}
            >
              Top Stores
            </Link>
            <Link
              to="/dealofday"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Deals of the Day
            </Link>
            <a href="#" className="hover:underline" onClick={() => setIsOpen(false)}>
              Share &amp; Earn
            </a>
            <Link
              to="/admin/login"
              className="hover:underline"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
