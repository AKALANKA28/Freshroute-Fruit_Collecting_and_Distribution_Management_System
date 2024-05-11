import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productSlice";
import contactReducer from "../features/contact/contactSlice";
import orderReducer from "../features/orders/orderSlice";
import productReducer from "../features/admin/products/productSlice"
import productCategoryReducer from "../features/admin/productCategory/productCategorySlice"
import gradeReducer from "../features/admin/color/gradeSlice"
import uploadReducer from "../features/admin/upload/uploadSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
    contact: contactReducer,
    orders: orderReducer,
    adminproduct: productReducer,
    productCategory: productCategoryReducer,
    grade: gradeReducer,
    upload: uploadReducer,

  },
});
