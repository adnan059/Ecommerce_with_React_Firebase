import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    totalPrice: 1,
  },
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload.item);
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (product) => product.id !== action.payload.item.id
      );
    },
    incCartQty: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.id === action.payload.id) {
          item.quantity = item.quantity + 1;
        }
        return item;
      });
    },
    decCartQty: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item.quantity > 1) {
          if (item.id === action.payload.id) {
            item.quantity = item.quantity - 1;
          }
        }
        return item;
      });
    },
    totalPriceSetter: (state, action) => {
      state.totalPrice = action.payload.totalPrice;
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  incCartQty,
  decCartQty,
  totalPriceSetter,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
