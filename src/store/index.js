import { configureStore } from "@reduxjs/toolkit";
import { vetApi } from "../services/shopServices";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../services/authService";
import counterReducer from "../features/Counter/CounterSlice";
import shopReducer from "../features/Shop/ShopSlice";
import cartReducer from "../features/Cart/CartSlice";
import authReducer from "../features/User/UserSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    shop: shopReducer,
    cart: cartReducer,
    auth: authReducer,
    [vetApi.reducerPath]: vetApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vetApi.middleware).concat(authApi.middleware),
});

setupListeners(store.dispatch);

export default store;
