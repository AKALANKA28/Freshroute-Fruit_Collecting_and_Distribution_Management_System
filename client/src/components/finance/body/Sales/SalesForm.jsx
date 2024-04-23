import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';


const salesSchema = yup.object({
  customer_name: yup.string().nullable().required("Password is required"),
  date: yup.string().required("Password is required"),
  fruit_name: yup.string().required("Password is required"),
  amount: yup.string().required("Password is required"),
  paid: yup.string().required("Password is required"),
  due: yup.string().required("Password is required"),
  status: yup.string().required("Password is required"),

});


const SalesForm = ({ handleSubmit, initialData }) => {

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "", // Set _id from initialData if available
      customer_name: initialData ? initialData.customer_name : "",
      fruit_name: initialData ? initialData.fruit_name : "",
      amount: initialData ? initialData.amount : "",
      paid: initialData ? initialData.paid : "",
      due: initialData ? initialData.due : "",
      status: initialData ? initialData.status : "",
    },
    validationSchema: salesSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });






  return (

    
    <form 
    action=""
    onSubmit={formik.handleSubmit}>

      
      <div className="container">
      <div className="d-flex align-items-center gap-15">

        <div className="row">
          
        <div className="col">
        <div className="mb-3">
          <label htmlFor="customer_name" className="form-label">
          Customer Name
          </label>
          <input
            type="text"
            className="form-control"
            name="customer_name"
            placeholder="Full Name"
            value={formik.values.customer_name}
            onChange={formik.handleChange("customer_name")}
            onBlur={formik.handleBlur("customer_name")}/>
            <div className='error'>
               {formik.touched.customer_name && formik.errors.customer_name}
            </div>
            
        
        </div>
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
          <label htmlFor="fruit_name" className="form-label">
          Fruit Name
          </label>
          <input
            type="text"
            className="form-control"
            name="fruit_name"
            placeholder="Mango"
            value={formik.values.fruit_name}
            onChange={formik.handleChange("fruit_name")}
            onBlur={formik.handleBlur("fruit_name")}/>
            <div className='error'>
               {formik.touched.fruit_name && formik.errors.fruit_name}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
           Amount
          </label>
          <input
            type="text"
            className="form-control"
            name="amount"
            placeholder="10 000.00"
            value={formik.values.amount}
            onChange={formik.handleChange("amount")}
            onBlur={formik.handleBlur("amount")}/>
            <div className='error'>
               {formik.touched.amount && formik.errors.amount}
            </div>
        </div>
        </div>
        <div className="col">
        <div className="mb-3">
          <label htmlFor="paid" className="form-label">
          Paid
          </label>
          <input
            type="text"
            className="form-control"
            name="paid"
            placeholder="10 000.00"
            value={formik.values.paid}
            onChange={formik.handleChange("paid")}
            onBlur={formik.handleBlur("paid")}/>
            <div className='error'>
               {formik.touched.paid && formik.errors.paid}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="due" className="form-label">
          Due
          </label>
          <input
            type="text"
            className="form-control"
            name="due"
            placeholder="Due"
            value={formik.values.due}
            onChange={formik.handleChange("due")}
            onBlur={formik.handleBlur("due")}/>
            <div className='error'>
               {formik.touched.due && formik.errors.due}
            </div>
        </div><div className="mb-3">
          <label htmlFor="status" className="form-label">
          Status
          </label>
          <input
            type="text"
            className="form-control"
            name="status"
            placeholder="Paid"
            value={formik.values.status}
            onChange={formik.handleChange("status")}
            onBlur={formik.handleBlur("status")}/>
            <div className='error'>
               {formik.touched.status && formik.errors.status}
            </div>
        </div>
        </div>

        </div> 
              </div>
            </div>
      
        <div className="d-flex justify-content-end border-top">
          {/* <button type="submit" className="btn btn-secondary "> Cancel </button> */}
          <button type="submit" className="btn btn-success"> Submit </button>
       </div>
      </form>
  
  );
};

export default SalesForm;
