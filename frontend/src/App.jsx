import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import StorePage from "./pages/StorePage";
import Login from "./admin/Login";
import Signup from "./admin/Signup";
import AdminDashboard from "./admin/Dashboard"
import AdminCategories from "./admin/Categories"
import AdminStores from "./admin/Stores"
import AdminCoupons from "./admin/Coupons"
import DealOfDay from "./components/DealOfDaySection";
import CouponPage from "./pages/CouponPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

const Layout = () => (
  <>
    <Navbar />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/store",
        element: <StorePage />,
      },
      {
        path:"/dealofday",
        element:<DealOfDay/>
      },
      {
        path: "/dealofday/coupon",
        element: <CouponPage/>
      },
      {
        path:"/category/coupon",
        element:<CouponPage/>
      },
      {
        path:"/aboutus",
        element:<AboutUs/>
      },
      {
        path: "/coupon",
        element: <CouponPage/>
      },
      {
        path:"/contactus",
        element:<ContactUs/>
      }
    ],
  },
  {
    path: "/admin/login",
    element: <Login />,
  },
  {
    path: "/admin/signup",
    element: <Signup />,
  },
  {
    path:"/admin/dashboard",
    element:<AdminDashboard/>
  },
  {
    path:"/admin/categories",
    element:<AdminCategories/>
  },
  {
    path:"/admin/stores",
    element:<AdminStores/>
  },
  {
    path:"/admin/coupons",
    element:<AdminCoupons/>
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
