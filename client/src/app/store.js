import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productSlice";
import contactReducer from "../features/contact/contactSlice";
import salesReducer from "../components/finance/body/Sales/salesSlice";
import expenseReducer from "../components/finance/body/Expenses/expenseSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
    contact: contactReducer,
    sales: salesReducer,
    expense: expenseReducer,

  },
});
