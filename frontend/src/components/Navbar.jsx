import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { useDispatch } from "react-redux";
import { setCategoryId, setCategoryName } from "../redux/categorySlice";
import { resetStore } from "../redux/storeSlice";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
import Logo from "../../assets/Logo.png";
import SeoTags from "./SeoTags";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const suggestionRef = useRef(null); // Added ref for outside click detection

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      setIsSuggestionsOpen(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const [couponsRes, storesRes, categoriesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/coupons`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}` },
          }),
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/stores`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}` },
          }),
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/categories`, {
            headers: { Authorization: `Bearer ${import.meta.env.VITE_APP_TOKEN}` },
          }),
        ]);

        const couponSuggestions = (couponsRes.data || [])
          .filter((coupon) =>
            coupon.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            coupon.couponCode?.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((coupon) => ({
            type: "coupon",
            id: coupon._id,
            name: coupon.description || coupon.couponCode,
          }));

        const storeSuggestions = (storesRes.data.stores || [])
          .filter((store) => store.name?.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((store) => ({
            type: "store",
            id: store._id,
            name: store.name,
          }));

        const categorySuggestions = (categoriesRes.data.categories || [])
          .filter((category) => category.name?.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((category) => ({
            type: "category",
            id: category._id,
            name: category.name,
          }));

        setSuggestions([...couponSuggestions, ...storeSuggestions, ...categorySuggestions].slice(0, 5));
        setIsSuggestionsOpen(true);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
        setSuggestions([]);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Added outside click handler
  const handleClickOutside = (e) => {
    if (suggestionRef.current && !suggestionRef.current.contains(e.target)) {
      setIsSuggestionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSuggestionsOpen(false);
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.name);
    setIsSuggestionsOpen(false);
    navigate(`/search?query=${encodeURIComponent(suggestion.name)}`);
  };

  return (
    <>
      <div className="bg-white px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 sm:gap-8">
          <Link to="/" className="flex items-center">
            <div className="relative group">
              <div className="w-[79px] h-[71px] bg-white rounded-[9px] flex items-center justify-center shadow-md transition-transform group-hover:scale-105 group-hover:shadow-[0px_1px_4px_0px_#3771C8D6]">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-[79px] h-[71px] object-contain p-1"
                />
              </div>
            </div>
          </Link>
          <div className="flex flex-1 relative" ref={suggestionRef}> {/* Added ref to the container */}
            <input
              type="text"
              placeholder="Search for deals, stores, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-l-md px-4 py-2 text-black focus:outline-none"
            />
            <button
              onClick={handleSearch}
              className="bg-orange-500 text-white px-4 py-2 rounded-r-md hover:bg-orange-600"
            >
              Search
            </button>
            {isSuggestionsOpen && suggestions.length > 0 && (
              <div className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10 mt-1">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <span className="text-sm text-gray-600 capitalize">{suggestion.type}:</span>{" "}
                    {suggestion.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <nav className="bg-blue-600 text-white px-4 py-3 shadow-md relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="hidden sm:flex gap-12 text-md font-medium mx-auto">
            <Link
              to="/category"
              className="hover:underline transition"
              onClick={() => {
                dispatch(setCategoryId(null));
                dispatch(setCategoryName("All Categories"));
              }}
            >
              Categories
            </Link>
            <Link
              to="/store"
              className="hover:underline transition"
              onClick={() => dispatch(resetStore())}
            >
              Top Stores
            </Link>
            <Link to="/dealofday" className="hover:underline transition">
              Deals of the Day
            </Link>
            <Link to="#" className="hover:underline transition">
              Share & Earn
            </Link>
          </div>
        </div>
        {isOpen && (
          <div className="sm:hidden mt-4 space-y-4 px-4 text-base font-medium">
            <Link
              to="/category"
              className="hover:underline block"
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
              className="hover:underline block"
              onClick={() => {
                dispatch(resetStore());
                setIsOpen(false);
              }}
            >
              Top Stores
            </Link>
            <Link
              to="/dealofday"
              className="hover:underline block"
              onClick={() => setIsOpen(false)}
            >
              Deals of the Day
            </Link>
            <Link
              to="#"
              className="hover:underline block"
              onClick={() => setIsOpen(false)}
            >
              Share & Earn
            </Link>
          </div>
        )}
        <SeoTags
          title="Smart Coupons & Promo Codes | CouponSmartDeals"
          description="Use smart coupons and promo codes to save online! CouponSmartDeals brings the best offers from top brands. Explore discounts, deals, and savings."
          canonical="https://www.couponsmartdeals.com"
        />
      </nav>
    </>
  );
};

export default Navbar;
