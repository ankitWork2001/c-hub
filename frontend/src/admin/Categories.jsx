import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";
import UpdateCategory from "./Components/UpdateCategory";
import AdminNavbar from "./Components/AdminNavbar";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [edit,setEdit]=useState(null);
  const [add,setAdd]=useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_APP_BACKEND}api/categories`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setCategories(res.data.categories);
      setLoading(false);
    } catch (err) {
      setError("Failed to load categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND}api/categories/${id}`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        }
      });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      alert("Failed to delete category");
    }
  };



  return (
    <>
    <AdminNavbar/>
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>
      <button
        className="m-2 ml-1 p-3 text-1xl border-2 border-blue-200 hover:cursor-pointer rounded-lg bg-blue-800 text-white hover:bg-pink-800"
        onClick={() => {
          setAdd(!add);
        }}
      >
        Add Category
      </button>
      {add && <AddCategory />}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-xl">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Image</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Total Coupons</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <React.Fragment key={cat._id}>
                <tr key={cat._id} className="border-t">
                  <td className="p-3">
                    <img src={cat.image} alt={cat.name} className="w-12 h-12 rounded object-cover" />
                  </td>
                  <td className="p-3 font-medium">{cat.name}</td>
                  <td className="p-3">{cat.totalCoupons}</td>
                  <td className="p-3 flex space-x-3">
                    <button
                      onClick={() => setEdit(edit === cat._id ? null : cat._id)} 
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
                {edit === cat._id && (
                  <tr >
                    <td colSpan="10" className="py-4 m-4 ">
                      <UpdateCategory id={cat._id} />
                    </td>
                  </tr>
                )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    </>
  );
};

const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: "",
    totalCoupons: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("image", e.target.image.files[0]);
    data.append(
      "totalCoupons",
      formData.totalCoupons === "" ? 0 : formData.totalCoupons
    );

    try {
      const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND}api/categories/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:`Bearer ${localStorage.getItem("adminToken")}`
        },
      });

      alert("Category added successfully!");
      setFormData({ name: "", totalCoupons: "", image: null });
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to add category.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Add New Category</h2>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium">Category Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Image File</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 hover:cursor-pointer"
          />
        </div>

        <div>
          <label className="block font-medium">Total Coupons (optional)</label>
          <input
            type="number"
            name="totalCoupons"
            value={formData.totalCoupons}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
            min={0}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default Categories;