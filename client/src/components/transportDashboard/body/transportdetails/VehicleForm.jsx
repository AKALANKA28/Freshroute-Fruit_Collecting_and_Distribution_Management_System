import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const VehicleSchema = yup.object({
  vehicle_no: yup.string()
    .matches(/^[A-Z]{2}\d+$/, 'Vehicle number must start with 2 capital letters followed by numbers')
    .required("Vehicle Number is required"),
  type: yup.string().required("Type is required"),
  conditions: yup.string().required("Condition status is required"),
  capacity: yup.string()
    .matches(/^\d+$/, 'Capacity must be numbers only')
    .required("Capacity status is required"),
  owner_name: yup.string()
    .matches(/^[a-zA-Z ]+$/, 'Owner Name must contain letters only')
    .required("Owner Name is required"),
  email: yup.string()
    .email('Invalid email address')
    .required("Email status is required"),
  phone: yup.string()
    .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
    .required("Phone status is required"),
  Bank: yup.string().required("Bank status is required"),
  Branch: yup.string()
    .matches(/^[a-zA-Z ]+$/, 'Branch must contain letters only')
    .required("Branch status is required"),
  account_no: yup.string()
    .matches(/^\d+$/, 'Account Number must be numbers only')
    .required("Account Number status is required"),
});

const VehicleForm = ({ handleSubmit, initialData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "",
      vehicle_no: initialData ? initialData.vehicle_no : "",
      type: initialData ? initialData.type : "",
      conditions: initialData ? initialData.conditions : "",
      capacity: initialData ? initialData.capacity : "",
      owner_name: initialData ? initialData.owner_name : "",
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
    <form onSubmit={formik.handleSubmit}>
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.vehicle_no && formik.errors.vehicle_no && (
                  <div className='error'>
                    {formik.errors.vehicle_no}
                  </div>

                )}
              </div>
              <div className="mb-1">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  className="form-select"
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>Select Type</option>
                  <option value="large">Large</option>
                  <option value="medium">Medium</option>
                  <option value="small">Small</option>
                </select>
                {formik.touched.type && formik.errors.type && (
                  <div className='error'>
                    {formik.errors.type}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="conditions" className="form-label">
                  Conditions
                </label>
                <select
                  className="form-select"
                  name="conditions"
                  value={formik.values.conditions}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>Select Condition</option>
                  <option value="full">Full</option>
                  <option value="half">Half</option>
                </select>
                {formik.touched.conditions && formik.errors.conditions && (
                  <div className='error'>
                    {formik.errors.conditions}
                  </div>
                )}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.capacity && formik.errors.capacity && (
                  <div className='error'>
                    {formik.errors.capacity}
                  </div>
                )}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.owner_name && formik.errors.owner_name && (
                  <div className='error'>
                    {formik.errors.owner_name}
                  </div>
                )}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className='error'>
                    {formik.errors.email}
                  </div>
                )}
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
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className='error'>
                    {formik.errors.phone}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <label htmlFor="Bank" className="form-label">
                  Bank
                </label>
                <select
                  className="form-select"
                  name="Bank"
                  value={formik.values.Bank}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="" disabled>Select Bank</option>
                  <option value="BOC">BOC</option>
                  <option value="Peoples Bank">Peoples Bank</option>
                  <option value="HNB">HNB</option>
                  <option value="DFCC">DFCC</option>
                  <option value="RDB">RDB</option>
                </select>
                {formik.touched.Bank && formik.errors.Bank && (
                  <div className='error'>
                    {formik.errors.Bank}
                  </div>
                )}
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
          <button type="submit" className="btn btn-success"> Submit </button>
        </div>
      </form>
  
  );
};

export default VehicleForm;
