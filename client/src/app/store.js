import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productSlice";
import contactReducer from "../features/contact/contactSlice";
import orderReducer from "../features/orders/orderSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
    contact: contactReducer,
    orders: orderReducer,
  },
});
