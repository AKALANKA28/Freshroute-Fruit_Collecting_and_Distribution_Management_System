import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as yup from "yup";
import Vehicle from "../transportdetails/Vehicle"; // Update the path based on your file structure

// Define the validation schema using yup
const CoveringSchema = yup.object().shape({
  vehicle_no: yup.string().required("Vehicle Number is required"),
  owner_name: yup.string().required("Owner Name is required"),
  total_coverings: yup
    .string()
    .required("Total Coverings is required")
    .matches(/^\d+(\.\d+)?$/, "Total Coverings must be a number"),
  date: yup.date().required("Date is required"),
});

const CoveringForm = ({ handleSubmit, initialData }) => {
  const [vehicles, setVehicles] = useState([]); // State to hold vehicle details

  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Vehicle/");
      setDataList(response.data);
      setVehicles(response.data); // Update the vehicles state with fetched data
      console.log(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      _id: initialData ? initialData._id : "",
      vehicle_no: initialData ? initialData.vehicle_no : "",
      owner_name: initialData ? initialData.owner_name : "",
      total_coverings: initialData ? initialData.total_coverings.toString() : "", // Convert to string for input field
      date: initialData ? initialData.date : "",
    },
    validationSchema: CoveringSchema, // Using the defined validation schema
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="container">
          <div className="d-flex align-items-center gap-15">
            <div className="row">
              <div className="col">
                <div className="mb-3">
                  <label htmlFor="vehicle_no" className="form-label">
                    Vehicle Number
                  </label>
                  <select
                    className="form-control"
                    name="vehicle_no"
                    value={formik.values.vehicle_no}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Vehicle Number</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle.vehicle_no}>
                        {vehicle.vehicle_no}
                      </option>
                    ))}
                  </select>
                  {formik.touched.vehicle_no && formik.errors.vehicle_no && (
                    <div className="error">{formik.errors.vehicle_no}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="owner_name" className="form-label">
                    Owner Name
                  </label>
                  <select
                    className="form-control"
                    name="owner_name"
                    value={formik.values.owner_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">Select Owner Name</option>
                    {vehicles.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle.owner_name}>
                        {vehicle.owner_name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.owner_name && formik.errors.owner_name && (
                    <div className="error">{formik.errors.owner_name}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="total_coverings" className="form-label">
                    Total Coverings (in km)
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="total_coverings"
                    placeholder="Total Coverings"
                    value={formik.values.total_coverings}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.total_coverings &&
                    formik.errors.total_coverings && (
                      <div className="error">{formik.errors.total_coverings}</div>
                    )}
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.date && formik.errors.date && (
                    <div className="error">{formik.errors.date}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end border-top">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CoveringForm;
