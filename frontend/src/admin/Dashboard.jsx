import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTags, FaStore, FaListAlt } from 'react-icons/fa';
import AdminNavbar from './Components/AdminNavbar';

const StatCard = ({ title, value, color, icon: Icon, onClick }) => (
  <div
    className={`p-6 rounded-xl shadow-md hover:cursor-pointer hover:shadow-lg transition-shadow duration-300 ${color}`}
    onClick={onClick}
  >
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Icon className="text-3xl" />
    </div>
    <p className="text-4xl mt-4 font-bold">{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    coupons: 0,
    stores: 0,
    categories: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [couponsRes, storesRes, categoriesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/coupons`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          }),
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/stores`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          }),
          axios.get(`${import.meta.env.VITE_APP_BACKEND}api/categories`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
          }),
        ]);

        setStats({
          coupons: couponsRes.data.length || 0,
          stores: storesRes.data.count || 0,
          categories: categoriesRes.data.count || 0,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
    <AdminNavbar/>
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Coupons"
          value={stats.coupons}
          color="bg-blue-100"
          icon={FaTags}
          onClick={() => navigate('/admin/coupons')}
        />
        <StatCard
          title="Total Stores"
          value={stats.stores}
          color="bg-green-100"
          icon={FaStore}
          onClick={() => navigate('/admin/stores')}
        />
        <StatCard
          title="Total Categories"
          value={stats.categories}
          color="bg-yellow-100"
          icon={FaListAlt}
          onClick={() => navigate('/admin/categories')}
        />
      </div>
    </div>
    </>
    
  );
};

export default Dashboard;
