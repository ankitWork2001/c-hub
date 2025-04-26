import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    storeId:null,
    storeName:'All Stores',
}

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        setStoreId: (state, action) => {
            state.storeId = action.payload;
        },
        setStoreName: (state, action) => {
            state.storeName = action.payload;
        },
        resetStore: (state) => {
            state.storeId = null;
            state.storeName = 'All Stores';
            
        },
    },
})

export const { setStoreId, setStoreName, resetStore } = storeSlice.actions
export default storeSlice.reducer