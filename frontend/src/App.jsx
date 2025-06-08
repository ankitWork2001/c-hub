import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import StorePage from "./pages/StorePage";
import Login from "./admin/Login";
import Signup from "./admin/Signup";
import AdminDashboard from "./admin/Dashboard";
import AdminCategories from "./admin/Categories";
import AdminStores from "./admin/Stores";
import AdminCoupons from "./admin/Coupons";
import DealOfDay from "./components/DealOfDaySection";
import CouponPage from "./pages/CouponPage";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import SearchResults from "./pages/SearchResults";

const ErrorPage = () => (
  <div className="flex flex-col min-h-screen">
    <Navbar />
    <main className="flex-grow flex items-center justify-center bg-gray-100">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Something Went Wrong</h1>
        <p className="text-lg text-gray-600 mb-6">
          An unexpected error occurred. Please try again later or contact support.
        </p>
        <Link to="/" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          Go Back Home
        </Link>
      </div>
    </main>
    <Footer />
  </div>
);

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
    errorElement: <ErrorPage />,
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
        path: "/dealofday",
        element: <DealOfDay />,
      },
      {
        path: "/dealofday/coupon/:couponId",
        element: <CouponPage />,
      },
      {
        path: "/category/coupon/:couponId",
        element: <CouponPage />,
      },
      {
        path: "/store/coupon/:couponId",
        element: <CouponPage />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/coupon",
        element: <CouponPage />,
      },
      {
        path: "/contactus",
        element: <ContactUs />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
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
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/categories",
    element: <AdminCategories />,
  },
  {
    path: "/admin/stores",
    element: <AdminStores />,
  },
  {
    path: "/admin/coupons",
    element: <AdminCoupons />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
