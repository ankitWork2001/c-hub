import React, { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import axios from "axios";
import UpdateStore from "./Components/UpdateStore";
import AdminNavbar from "./Components/AdminNavbar";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(null);
  const [add, setAdd] = useState(false);

  const fetchStores = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_BACKEND}api/stores`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      setStores(data.stores);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch stores:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this store?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${import.meta.env.VITE_APP_BACKEND}api/stores/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`, 
        },
      });
      setStores((prev) => prev.filter((store) => store._id !== id));
    } catch (error) {
      console.error("Failed to delete store:", error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <>
    <AdminNavbar/>
    <div className="p-4">
      <div className="text-3xl font-semibold mb-4">Top Stores</div>
      <button
        className="m-2 ml-1 p-3 text-1xl border-2 border-blue-200 hover:cursor-pointer rounded-lg bg-blue-800 text-white hover:bg-pink-800"
        onClick={() => {
          setAdd(!add);
        }}
      >
        Add Store
      </button>
      {add && <AddStore />}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left py-3 px-4">Store Name</th>
              <th className="text-left py-3 px-4">Total Coupons</th>
              <th className="text-left py-3 px-4">Featured</th>
              <th className="text-left py-3 px-4">Created At</th>
              <th className="text-left py-3 px-4">Rank</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <React.Fragment key={store._id}>
                <tr className="border-t">
                  <td className="py-3 px-4">{store.name}</td>
                  <td className="py-3 px-4">{store.totalCoupons}</td>
                  <td className="py-3 px-4">Yes</td>
                  <td className="py-3 px-4">
                    {new Date(store.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </td>
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 flex gap-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                      onClick={() =>
                        setEdit(edit === store._id ? null : store._id)
                      }
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                      onClick={() => handleDelete(store._id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
                {edit === store._id && (
                  <tr>
                    <td colSpan="10" className="py-4 m-4 ">
                      <UpdateStore id={store._id} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}

            {stores.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

const AddStore = () => {
  const [formData, setFormData] = useState({
    name: "",
    logo: "",
    totalCoupons: "",
  });


  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        totalCoupons:
          formData.totalCoupons === "" ? 0 : Number(formData.totalCoupons),
      };

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("logo", e.target.logo.files[0]);
      formDataToSend.append("totalCoupons", formData.totalCoupons || 0);

      const res = await axios.post(
        `${import.meta.env.VITE_APP_BACKEND}api/stores/`,
        formDataToSend,
        {
          headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        }
      );

      alert("Store added successfully!");
      setFormData({ name: "", logo: "", totalCoupons: "" });
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to add store");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 mb-4 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Store</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Store Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="block font-medium">Logo :</label>
          <input
            type="file"
            name="logo"
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1 hover:cursor-pointer"
          />
        </div>

        <div>
          <label className="block font-medium">Total Coupons:</label>
          <input
            type="number"
            name="totalCoupons"
            value={formData.totalCoupons}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1 "
            min={0}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Add Store
        </button>
      </form>
    </div>
  );
};

export default Stores;
