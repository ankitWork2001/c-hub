import React from "react";
import { useState } from "react";
import axios from "axios";

const UpdateStore = ({ id }) => {
  const [data, setData] = useState({
    logo: null,
    totalCoupons: null,
  });

  function handleChange(event) {
    const { name, value, type, files } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
      formData.append("logo", e.target.logo.files[0]);
      formData.append("totalCoupons", data.totalCoupons);

    try {
      let response = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND}api/stores/${id}`,
      formData,
      {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data",
        },
      }
      );
      alert("Store successfully updated")
    }
    catch(err)
    {
      alert("Store Update failed")
    }
   
    window.location.reload();
  }

  return (
    <div className="flex flex-col p-8 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h1 className="font-bold text-3xl mb-6 text-gray-800">Update Store</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="totalCoupons"
            className="font-semibold text-gray-700 block mb-2"
          >
            Total Coupons:
          </label>
          <input
            type="number"
            id="totalCoupons"
            name="totalCoupons"
            value={data.totalCoupons}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter total coupons"
          />
        </div>

        <div>
          <label
            htmlFor="logo"
            className="font-semibold text-gray-700 block mb-2"
          >
            Store Logo:
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Update Store
        </button>
      </form>
    </div>
  );
};

export default UpdateStore;
