import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    value: {
      user: "userIdLogged",
      updatedAt: new Date().toLocaleString(),
      total: 0,
      items: [],
    },
  },
  reducers: {
    addCartItem: (state, { payload }) => {
      const productIndex = state.value.items.findIndex(
        (item) => item.id === payload.id
      );

      if (productIndex !== -1) {
        state.value.items[productIndex].quantity += payload.quantity;
      } else {
        state.value.items.push(payload);
      }

      const total = state.value.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.value.total = total;
      state.value.updatedAt = new Date().toLocaleString();
    },
    removeCartItem: (state, { payload }) => {
      const itemsUpdated = state.value.items.filter(
        (item) => item.id !== payload.id
      );

      const total = itemsUpdated.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      state.value.items = itemsUpdated;
      state.value.total = total;
      state.value.updatedAt = new Date().toLocaleString();
    },
    emptyCart: (state) => {
      state.value.items = [];
      state.value.total = 0;
      state.value.updatedAt = new Date().toLocaleString();
    },
  },
});

export const { addCartItem, removeCartItem, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
