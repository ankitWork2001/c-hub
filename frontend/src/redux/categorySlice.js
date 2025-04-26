import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: null,
  categoryName: "All Categories",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategoryId: (state, action) => {
      state.categoryId = action.payload;
    },
    setCategoryName: (state, action) => {
      state.categoryName = action.payload;
    },
  },
});

export const { setCategoryId, setCategoryName } = categorySlice.actions;
export default categorySlice.reducer;