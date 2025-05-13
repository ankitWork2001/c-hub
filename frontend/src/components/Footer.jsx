import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import SeoTags from "./SeoTags";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white px-4 md:px-12 py-6 mt-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
    <div>
      <h4 className="font-bold text-lg mb-2 border-b border-blue-400 pb-2">Quick Links</h4>
      <ul className="space-y-1">
        <li><Link to="/aboutus" className="hover:text-blue-200 transition">About Us</Link></li>
        <li><a href="#" className="hover:text-blue-200 transition">How It Works</a></li>
        <li><Link to="/contactus" className="hover:text-blue-200 transition">Contact Us</Link></li>
        <li><a href="#" className="hover:text-blue-200 transition">FAQs</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Blog</a></li>
      </ul>
    </div>

    <div>
      <h4 className="font-bold text-lg mb-2 border-b border-blue-400 pb-2">Categories</h4>
      <ul className="space-y-1">
        <li><a href="#" className="hover:text-blue-200 transition">Sports Wear</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Electronics</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Furniture</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Watch</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Clothing</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Books</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Mobile</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Women Cloths</a></li>
        <li><a href="#" className="hover:text-blue-200 transition">Travel</a></li>
      </ul>
    </div>

    <div>
      <h4 className="font-bold text-lg mb-2 border-b border-blue-400 pb-2">Top Brands</h4>
      <ul className="space-y-1">
        <li><Link to="/store" className="hover:text-blue-200 transition">Amazon</Link></li>
        <li><Link to="/store" className="hover:text-blue-200 transition">Flipkart</Link></li>
        <li><Link to="/store" className="hover:text-blue-200 transition">Myntra</Link></li>
        <li><Link to="/store" className="hover:text-blue-200 transition">Airbnb</Link></li>
        <li><Link to="/store" className="hover:text-blue-200 transition">Puma</Link></li>
        <li><Link to="/store" className="hover:text-blue-200 transition">Rolex</Link></li>
      </ul>
    </div>

    <div>
      <h4 className="font-bold text-lg mb-2 border-b border-blue-400 pb-2">Customer Support</h4>
      <ul className="space-y-1">
        <li className="break-words">Email: support@yourcouponwebsite.com</li>
      </ul>
    </div>

    <div>
      <h4 className="font-bold text-lg mb-2 border-b border-blue-400 pb-2">Social Media</h4>
      <div className="flex space-x-3 text-xl">
        <a href="#" className="hover:text-blue-200 transition"><FaInstagram /></a>
        <a href="#" className="hover:text-blue-200 transition"><FaFacebookF /></a>
        <a href="#" className="hover:text-blue-200 transition"><FaYoutube /></a>
        <a href="#" className="hover:text-blue-200 transition"><FaLinkedinIn /></a>
        <a href="#" className="hover:text-blue-200 transition"><FaTwitter /></a>
      </div>
    </div>

    <div className="flex flex-col justify-end">
      <Link to="/admin/login">
        <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-4 py-2 rounded-md w-full hidden md:block">
          Admin Login
        </button>
      </Link>
    </div>
  </div>

  <div className="border-t border-blue-400 mt-6 pt-6 text-center">
    <p className="text-sm tracking-wide">
      © Copyright 2025. All rights reserved.
    </p>
  </div>
  <SeoTags
        title="Smart Coupons & Promo Codes | CouponSmartDeals"
        description="Use smart coupons and promo codes to save online! CouponSmartDeals brings the best offers from top brands. Explore discounts, deals, and savings."
        canonical="https://www.couponsmartdeals.com"
      />
</footer>

  );
}
