import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const VehicleSchema = yup.object({
  vehicle_no: yup.string().required("Vehicle Number is required"),
  type: yup.string().required("Type is required"),
  conditions: yup.string().required(" Condition status is required"),
  capacity: yup.string().required("Capacity status is required"),
  owner_name: yup.string().required(" Owner Name is required"),
  nic: yup.string().required("NIC status is required"),
  email: yup.string().required("Email status is required"),
  phone: yup.string().required("Phone status is required"),
  Bank: yup.string().required("Bank status is required"),
  Branch: yup.string().required("Branch status is required"),
  account_no: yup.string().required("Account Number status is required"),
  

});


const VehicleForm = ({ handleSubmit, initialData }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "", // Set _id from initialData if available
      vehicle_no: initialData ? initialData.vehicle_no : "",
      type: initialData ? initialData.type : "",
      conditions: initialData ? initialData.conditions : "",
      capacity: initialData ? initialData.capacity : "",
      owner_name: initialData ? initialData.owner_name : "",
      nic: initialData ? initialData.nic : "",
      email: initialData ? initialData.email : "",
      phone: initialData ? initialData.phone : "",
      Bank: initialData ? initialData.Bank : "",
      Branch: initialData ? initialData.Branch : "",
      account_no: initialData ? initialData.account_no : "",

  
    },
    validationSchema: VehicleSchema,
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
          <label htmlFor="vehicle_no" className="form-label">
          Vehicle Number
          </label>
          <input
            type="text"
            className="form-control"
            name="vehicle_no"
            placeholder="Vehicle Number"
            value={formik.values.vehicle_no}
            onChange={formik.handleChange("vehicle_no")}
            onBlur={formik.handleBlur("vehicle_no")}/>
            <div className='error'>
               {formik.touched.vehicle_no && formik.errors.vehicle_no}
            </div>
            
        
        </div>
        <div className="mb-3">
          <label htmlFor="type" className="form-label">
            Type
          </label>
          <input
            type="text"
            className="form-control"
            name="type"
            placeholder="Type"
            value={formik.values.type}
            onChange={formik.handleChange("type")}
            onBlur={formik.handleBlur("type")}/>
            <div className='error'>
               {formik.touched.type && formik.errors.type}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="conditions" className="form-label">
          Conditions
          </label>
          <input
            type="text"
            className="form-control"
            name="conditions"
            placeholder="Conditions"
            value={formik.values.conditions}
            onChange={formik.handleChange("conditions")}
            onBlur={formik.handleBlur("conditions")}/>
            <div className='error'>
               {formik.touched.conditions && formik.errors.conditions}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="capacity" className="form-label">
          Capacity 
          </label>
          <input
            type="text"
            className="form-control"
            name="capacity"
            placeholder="Capacity"
            value={formik.values.capacity}
            onChange={formik.handleChange("capacity")}
            onBlur={formik.handleBlur("capacity")}/>
            <div className='error'>
               {formik.touched.capacity && formik.errors.capacity}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="owner_name" className="form-label">
          Owner Name
          </label>
          <input
            type="text"
            className="form-control"
            name="owner_name"
            placeholder="Owner Name"
            value={formik.values.owner_name}
            onChange={formik.handleChange("owner_name")}
            onBlur={formik.handleBlur("owner_name")}/>
            <div className='error'>
               {formik.touched.owner_name && formik.errors.owner_name}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="nic" className="form-label">
          NIC
          </label>
          <input
            type="text"
            className="form-control"
            name="nic"
            placeholder="NIC"
            value={formik.values.nic}
            onChange={formik.handleChange("nic")}
            onBlur={formik.handleBlur("nic")}/>
            <div className='error'>
               {formik.touched.nic && formik.errors.nic}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
          Email
          </label>
          <input
            type="text"
            className="form-control"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}/>
            <div className='error'>
               {formik.touched.email && formik.errors.email}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
          Phone
          </label>
          <input
            type="text"
            className="form-control"
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange("phone")}
            onBlur={formik.handleBlur("phone")}/>
            <div className='error'>
               {formik.touched.phone && formik.errors.phone}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Bank" className="form-label">
          Bank
          </label>
          <input
            type="text"
            className="form-control"
            name="Bank"
            placeholder="Bank"
            value={formik.values.Bank}
            onChange={formik.handleChange("Bank")}
            onBlur={formik.handleBlur("Bank")}/>
            <div className='error'>
               {formik.touched.Bank && formik.errors.Bank}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Branch" className="form-label">
          Branch
          </label>
          <input
            type="text"
            className="form-control"
            name="Branch"
            placeholder="Branch"
            value={formik.values.Branch}
            onChange={formik.handleChange("Branch")}
            onBlur={formik.handleBlur("Branch")}/>
            <div className='error'>
               {formik.touched.Branch && formik.errors.Branch}
            </div>
        </div>
       
        <div className="mb-3">
          <label htmlFor="account_no" className="form-label">
          Account Number
          </label>
          <input
            type="text"
            className="form-control"
            name="account_no"
            placeholder="Account Number"
            value={formik.values.account_no}
            onChange={formik.handleChange("account_no")}
            onBlur={formik.handleBlur("account_no")}/>
            <div className='error'>
               {formik.touched.account_no && formik.errors.account_no}
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

export default VehicleForm;
