import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from 'yup';

const salesSchema = yup.object({
  shippingInfo: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    apartment: yup.string().required("Apartment is required"),
    pincode: yup.number().required("Pincode is required"),
  }),
  orderItems: yup.array().of(yup.object().shape({
    product: yup.string().required("Product is required"),
    quantity: yup.number().required("Quantity is required"),
    price: yup.number().required("Price is required"),
  })).required("At least one order item is required"),
  totalPrice: yup.number().required("Total Price is required"),
  orderStatus: yup.string(),
});

const SalesForm = ({ handleSubmit, initialData }) => {


  const [products, setProducts] = useState([]);

  const formik = useFormik({
    initialValues: {
      shippingInfo: {
        address: initialData ? initialData.shippingInfo.address : "",
        city: initialData ? initialData.shippingInfo.city : "",
        state: initialData ? initialData.shippingInfo.state : "",
        apartment: initialData ? initialData.shippingInfo.apartment : "",
        pincode: initialData ? initialData.shippingInfo.pincode : "",
      },
      orderItems: initialData ? initialData.orderItems : [{ product: "", quantity: "", price: "" }],
      totalPrice: initialData ? initialData.totalPrice : "",
      orderStatus: initialData ? initialData.orderStatus : "",
    },
    validationSchema: salesSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8070/product/");
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []); // Run this effect only once when the component mounts


  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="container">
        {/* Shipping Information */}
        <div className="row">
          <div className="col">
            {/* <div className="mb-3">
              <label htmlFor="shippingInfo.address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                name="shippingInfo.address"
                value={formik.values.shippingInfo.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.shippingInfo?.address && formik.errors.shippingInfo?.address && (
                <div className='error'>{formik.errors.shippingInfo.address}</div>
              )}
            </div> */}
            {/* Add other shipping fields similarly */}
          </div>
        </div>

        {/* Order Items */}
        {formik.values.orderItems.map((orderItem, index) => (
          <div key={index} className="row">
            <div className="col">
            <div className="mb-3">
                <label htmlFor={`orderItems[${index}].product`} className="form-label">Product</label>
                <select
                  className="form-select"
                  name={`orderItems[${index}].product`}
                  value={orderItem.product}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Product</option>
                  {/* Map over products and create options */}
                  {products.map(product => (
                    <option key={product._id} value={product._id}>{product.title}</option>
                  ))}
                </select>
                {/* Display validation errors */}
                {formik.touched[`orderItems[${index}].product`] && formik.errors[`orderItems[${index}].product`] && (
                  <div className='error'>{formik.errors[`orderItems[${index}].product`]}</div>
                )}
              </div>

              {/* Add other order item fields similarly */}
            </div>
          </div>
        ))}

        {/* Total Price */}
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="totalPrice" className="form-label">Total Price</label>
              <input
                type="text"
                className="form-control"
                name="totalPrice"
                value={formik.values.totalPrice}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.totalPrice && formik.errors.totalPrice && (
                <div className='error'>{formik.errors.totalPrice}</div>
              )}
            </div>
          </div>
        </div>

        {/* Order Status */}
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="orderStatus" className="form-label">Order Status</label>
              <input
                type="text"
                className="form-control"
                name="orderStatus"
                value={formik.values.orderStatus}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {/* Add validation messages for orderStatus similarly */}
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="d-flex justify-content-end border-top">
        <button type="submit" className="btn btn-success">Submit</button>
      </div>
    </form>
  );
};

export default SalesForm;
