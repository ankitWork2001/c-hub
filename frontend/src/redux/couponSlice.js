// redux/slices/couponSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  couponId:"67fa20572e5d38b2c8450f74",
}

const couponSlice = createSlice({
  name: 'coupon',
  initialState,
  reducers: {
    setCouponId: (state, action) => {
      state.couponId = action.payload;
    },
    clearCouponId: (state) => {
      state.couponId = null;
    },
  },
});

export const { setCouponId, clearCouponId } = couponSlice.actions;
export default couponSlice.reducer;

