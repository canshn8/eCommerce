import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    favorites: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
     state.quantity += 1;
     state.products.push(action.payload);
     state.total += action.payload.price;
    },
    
    addFavorite: (state, action) => {
      state.quantity += 1;
      state.favorites.push(action.payload);
    },
   
    removeProduct: (state, action) => {
      let index = state.products.indexOf(action.payload);
      state.products.splice(index, 1)
      state.products = [...state.products] 
      state.total -= action.payload.price;
      state.quantity -= action.payload
    },

    removeFavori(state, action){
      let index = state.favorites.indexOf(action.payload);
      state.favorites.splice(index, 1)
      state.favorites = [...state.favorites] 
      state.quantity -= action.payload
    },

    getProductStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    getProductSuccess: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
    },
    getProductFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { addProduct, addFavorite, deleteFromCart, removeFavori,removeProduct,getProductStart, getProductSuccess, getProductFailure } = cartSlice.actions;
export default cartSlice.reducer;