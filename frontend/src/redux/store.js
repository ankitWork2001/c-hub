import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './categorySlice.js'
import storeReducer from './storeSlice.js'
import couponReducer from './couponSlice.js'
export const store = configureStore({
  reducer: {
    category: categoryReducer,
    store: storeReducer,
    coupon: couponReducer,
  },
})