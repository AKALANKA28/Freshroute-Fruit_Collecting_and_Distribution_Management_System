import React from "react";
import * as yup from 'yup';
import { useFormik } from "formik";

const expenseSchema = yup.object({
  _id: yup.string(), // Add _id to the schema
  date: yup.string().nullable().required("Date is required"),
  category: yup.string().required("Category is required"),
  amount: yup.string().required("Amount is required"),
  description: yup.string(),
});

const ExpenseForm = ({ handleSubmit, initialData }) => {
  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "", // Set _id from initialData if available
      date: initialData ? initialData.date : "",
      category: initialData ? initialData.category : "",
      amount: initialData ? initialData.amount : "",
      description: initialData ? initialData.description : "",
    },
    validationSchema: expenseSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <input type="hidden" name="_id" value={formik.values._id} /> {/* Hidden input for _id */}
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Date</label>
        <input
          type="datetime-local"
          className="form-control"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.date && formik.errors.date && (
          <div className='error'>
            {formik.errors.date}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select
          name="category"
          className="form-control"
          value={formik.values.category}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option value="">Select Category</option>
          <option value="Transport">Transport</option>
          <option value="Employee">Employee</option>
          <option value="Research">Research</option>
          <option value="Promotion">Promotion</option>
          <option value="Payments">Payments</option>

        </select>
        {formik.touched.category && formik.errors.category && (
          <div className='error'>
            {formik.errors.category}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input
          type="text"
          className="form-control"
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.amount && formik.errors.amount && (
          <div className='error'>
            {formik.errors.amount}
          </div>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input
          type="text"
          className="form-control"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.description && formik.errors.description && (
          <div className='error'>
            {formik.errors.description}
          </div>
        )}
      </div>
      <div className="d-flex justify-content-end border-top">
        <button type="submit" className="btn btn-success">Submit</button>

      </div>
    </form>
  );
};

export default ExpenseForm;
