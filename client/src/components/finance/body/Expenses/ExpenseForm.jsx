import React, { useEffect, useState } from "react";
import * as yup from 'yup';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExpense } from "./expenseSlice";



const expenseSchema = yup.object({
  date: yup.string().nullable().required("Date is required"),
  category: yup.string().required("Category is required"),
  amount: yup.string().required("Amount is required"),
  description: yup.string()
  

});
const ExpenseForm = () => {
  const [formData, setFormData] = useState({
    date: "",
    category: "",
    amount: "",
    description: "",
    // status: "",


  });


  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const formik = useFormik({
    initialValues: {
      date: "",
      category: "",
      amount: "",
      description: "",
     
    },
    validationSchema: expenseSchema,
    onSubmit: (values) => {
      dispatch(addExpense(values));
    },
  });


  return (
    <div>
      <form 
      action=""
      onSubmit={formik.handleSubmit}>
      <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="datetime-local"
            className="form-control"
            name="date"
            placeholder="Date"
            value={formik.values.date}
            onChange={formik.handleChange("date")}
            onBlur={formik.handleBlur("date")}/>
            <div className='error'>
               {formik.touched.date && formik.errors.date}
            </div>
            
          
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category
          </label>
          <select
            name="category"
            className="form-control"
            onChange={formik.handleChange("category")}
            // value={formData.category || ""}
          >
            
            <option value="">Select Category</option>
            <option value="Transport">Transport</option>
            <option value="Employee">Employee</option>
            <option value="Research">Research</option>
            <option value="Promotion">Promotion</option>
          </select>
         
        </div>

        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className="form-control"
            name="amount"
            placeholder="Amount"
            value={formik.values.amount}
            onChange={formik.handleChange("amount")}
            onBlur={formik.handleBlur("amount")}/>
            <div className='error'>
               {formik.touched.amount && formik.errors.amount}
            </div>
         
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            name="description"
            placeholder="Description"
            value={formik.values.description}
            onChange={formik.handleChange("description")}
            onBlur={formik.handleBlur("description")}/>
            <div className='error'>
               {formik.touched.description && formik.errors.description}
            </div>
          
        </div>
     
        <div className="d-flex justify-content-end border-top">
          {/* <button type="submit" className="btn btn-secondary "> Cancel </button> */}
          <button type="submit" className="btn btn-success"> Submit </button>
       </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
