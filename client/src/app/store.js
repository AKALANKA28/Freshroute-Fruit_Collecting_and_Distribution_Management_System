import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productsReducer from "../features/products/productSlice";
import contactReducer from "../features/contact/contactSlice";
import salesReducer from "../components/finance/body/Sales/salesSlice";
import expenseReducer from "../components/finance/body/Expenses/expenseSlice";
import processReducer from "../components/transportDashboard/body/processdetails/ProcessSlice";
import scheduleReducer from "../components/transportDashboard/body/scheduledetails/ScheduleSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productsReducer,
    contact: contactReducer,
    sales: salesReducer,
    expense: expenseReducer,
    process: processReducer,
    schedule: scheduleReducer,
  },
});
