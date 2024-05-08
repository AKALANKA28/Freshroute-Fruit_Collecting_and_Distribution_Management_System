import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const ScheduleSchema = yup.object({
  schedule_ID: yup.string().nullable().required("Schedule ID is required"),
  vehicle_no: yup.string().required("Vehicle Number is required"),
  driver_name: yup.string().required("Driver name is required"),
  pickup_location: yup.string().required("Pickup Location status is required"),
  destination: yup.string().required("Destination status is required"),
  date: yup.string().required(" Date is required"),
  quantity: yup.string().required("Quantity status is required"),
  

});


const ScheduleForm = ({ handleSubmit, initialData }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "", // Set _id from initialData if available
    schedule_ID: initialData ? initialData.schedule_ID : "",
    vehicle_no: initialData ? initialData.vehicle_no : "",
    driver_name: initialData ? initialData.driver_name : "",
    pickup_location: initialData ? initialData.pickup_location : "",
    destination: initialData ? initialData.destination : "",
    date: initialData ? initialData.date : "",
    quantity: initialData ? initialData.quantity : "",

  
    },
    validationSchema: ScheduleSchema,
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
          <label htmlFor="schedule_ID" className="form-label">
          Schedule ID
          </label>
          <input
            type="text"
            className="form-control"
            name="schedule_ID"
            placeholder="Schedule ID"
            value={formik.values.schedule_ID}
            onChange={formik.handleChange("schedule_ID")}
            onBlur={formik.handleBlur("schedule_ID")}/>
            <div className='error'>
               {formik.touched.schedule_ID && formik.errors.schedule_ID}
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
          <label htmlFor="pickup_location" className="form-label">
          Pickup Location 
          </label>
          <input
            type="text"
            className="form-control"
            name="pickup_location"
            placeholder="Pickup Location"
            value={formik.values.pickup_location}
            onChange={formik.handleChange("pickup_location")}
            onBlur={formik.handleBlur("pickup_location")}/>
            <div className='error'>
               {formik.touched.pickup_location && formik.errors.pickup_location}
            </div>
        </div>
        <div className="mb-3">
          <label htmlFor="destination" className="form-label">
          Destination
          </label>
          <input
            type="text"
            className="form-control"
            name="destination"
            placeholder="Destination"
            value={formik.values.destination}
            onChange={formik.handleChange("destination")}
            onBlur={formik.handleBlur("destination")}/>
            <div className='error'>
               {formik.touched.destination && formik.errors.destination}
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
          <label htmlFor="quantity" className="form-label">
          Quantity
          </label>
          <input
            type="text"
            className="form-control"
            name="quantity"
            placeholder="Quantity"
            value={formik.values.quantity}
            onChange={formik.handleChange("quantity")}
            onBlur={formik.handleBlur("quantity")}/>
            <div className='error'>
               {formik.touched.quantity && formik.errors.quantity}
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

export default ScheduleForm;
