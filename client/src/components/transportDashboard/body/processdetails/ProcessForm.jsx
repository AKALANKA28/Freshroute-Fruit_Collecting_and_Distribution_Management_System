import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import { addProcess } from "./ProcessSlice";


const ProcessSchema = yup.object({
  process_ID: yup.string().nullable().required("Process ID is required"),
  vehicle_no: yup.string().required("Vehicle Number is required"),
  driver_name: yup.string().required("Driver name is required"),
  current_status: yup.string().required("Current status is required"),
  

});


const ProcessForm = ({ handleSubmit, initialData }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const formik = useFormik({
    initialValues: {
    process_ID:"",
    vehicle_no:"",
    driver_name:"",
    current_status:"",
  
    },
    validationSchema: ProcessSchema,
    onSubmit: (values) => {
      dispatch(addProcess(values));
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
          <label htmlFor="process_ID" className="form-label">
          Process ID
          </label>
          <input
            type="text"
            className="form-control"
            name="process_ID"
            placeholder="Process ID"
            value={formik.values.process_ID}
            onChange={formik.handleChange("process_ID")}
            onBlur={formik.handleBlur("process_ID")}/>
            <div className='error'>
               {formik.touched.process_ID && formik.errors.process_ID}
            </div>
            
        
        </div>
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
          <label htmlFor="driver_name" className="form-label">
          Driver Name
          </label>
          <input
            type="text"
            className="form-control"
            name="driver_name"
            placeholder="Driver Name"
            value={formik.values.driver_name}
            onChange={formik.handleChange("driver_name")}
            onBlur={formik.handleBlur("driver_name")}/>
            <div className='error'>
               {formik.touched.driver_name && formik.errors.driver_name}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="current_status" className="form-label">
          Current Status
          </label>
          <input
            type="text"
            className="form-control"
            name="current_status"
            placeholder="Current Status"
            value={formik.values.current_status}
            onChange={formik.handleChange("current_status")}
            onBlur={formik.handleBlur("current_status")}/>
            <div className='error'>
               {formik.touched.current_status && formik.errors.current_status}
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

export default ProcessForm;
