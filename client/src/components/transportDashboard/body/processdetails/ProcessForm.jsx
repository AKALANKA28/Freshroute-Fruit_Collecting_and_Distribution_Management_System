import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';

const ProcessSchema = yup.object({
  process_ID: yup.string()
    .matches(/^\d+$/, 'Process ID must contain only numbers')
    .required("Process ID is required"),
  vehicle_no: yup.string()
    .matches(/^[A-Z]{2}\d+$/, 'Vehicle Number must start with two capital letters followed by numbers')
    .required("Vehicle Number is required"),
  driver_name: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Driver Name must contain only letters')
    .required("Driver name is required"),
  current_status: yup.string()
    .matches(/^[A-Za-z\s]+$/, 'Current Status must contain only letters')
    .required("Current status is required"),
});

const ProcessForm = ({ handleSubmit, initialData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "",
      process_ID: initialData ? initialData.process_ID : "",
      vehicle_no: initialData ? initialData.vehicle_no : "",
      driver_name: initialData ? initialData.driver_name : "",
      current_status: initialData ? initialData.current_status : "",
    },
    validationSchema: ProcessSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleNameChange = (e) => {
    const { name, value } = e.target;
    // Capitalize the first letter of the driver's name
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    formik.setFieldValue(name, capitalizedValue);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.process_ID && formik.errors.process_ID && (
                <div className='error'>
                  {formik.errors.process_ID}
                </div>
              )}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.vehicle_no && formik.errors.vehicle_no && (
                <div className='error'>
                  {formik.errors.vehicle_no}
                </div>
              )}
            </div>
          </div>
          <div className="col-md-6">
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
                onChange={handleNameChange} // Changed to handleNameChange
                onBlur={formik.handleBlur}
              />
              {formik.touched.driver_name && formik.errors.driver_name && (
                <div className='error'>
                  {formik.errors.driver_name}
                </div>
              )}
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
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.current_status && formik.errors.current_status && (
                <div className='error'>
                  {formik.errors.current_status}
                </div>
              )}
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

export default ProcessForm;
