import React from "react";
import { useState } from "react";
import axios from "axios";

const UpdateCategory = ({ id }) => {
  const [data, setData] = useState({
    image: null,
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
    let newData = JSON.stringify(data);
    try {
      const formData = new FormData();
      formData.append("image", e.target.image.files[0]);
      formData.append("totalCoupons", data.totalCoupons);

      let response = await axios.put(
      `${import.meta.env.VITE_APP_BACKEND}api/categories/${id}`,
      formData,
      {
        headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        "Content-Type": "multipart/form-data",
        },
      }
      );
      alert("Category Updated Successfully")
    }
    catch(err)
    {
      alert("Category Update Failed")
    }
   
    window.location.reload();
  }

  return (
    <div className="flex flex-col p-8 bg-white shadow-md rounded-lg max-w-lg mx-auto">
      <h1 className="font-bold text-3xl mb-6 text-gray-800">Update Category</h1>
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
            htmlFor="image"
            className="font-semibold text-gray-700 block mb-2"
          >
            Category Logo:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer"
        >
          Update Category
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
