import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";

const salesSchema = yup.object({
  shippingInfo: yup.object().shape({
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    apartment: yup.string().required("Apartment is required"),
    pincode: yup.number().required("Pincode is required"),
  }),
  orderItems: yup
    .array()
    .of(
      yup.object().shape({
        product: yup.string().required("Product is required"),
        quantity: yup.number().required("Quantity is required"),
        price: yup.number().required("Price is required"),
      })
    )
    .required("At least one order item is required"),
  totalPrice: yup.number().required("Total Price is required"),
  orderStatus: yup.string(),
});

const SalesForm = ({ handleSubmit, initialData, setModalOpen }) => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState([]);

  const formik = useFormik({
    initialValues: {
      date: initialData ? initialData.date : "",
      orderItems: initialData
        ? initialData.orderItems
        : [{ product: "", quantity: "", price: "" }],
      totalPrice: initialData ? initialData.totalPrice : "",
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


   // Function to calculate unit price dynamically
   const calculateUnitPrice = (productId) => {
    const product = products.find((p) => p._id === productId);
    return product ? product.price : 0 ;
  };


  return (
    <form
      onSubmit={formik.handleSubmit}
      className="d-flex gap-15 flex-wrap justify-content-between"
    >
      <div className="flex-grow-2">
        <label className="form-label text-dark">Date</label>
        <input
          type="datetime-local"
          placeholder="Date"
          className="form-control"
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <div className="error">
          {formik.touched.date && formik.errors.date && (
            <div className="error">{formik.errors.date}</div>
          )}
        </div>
      </div>
      <div className="flex-grow-1">
        <label className="form-label text-dark">Customer </label>
        <input
          type="text"
          placeholder="Select Customer"
          className="form-control"
          name="pincode"
          onChange={formik.handleChange("pincode")}
          onBlur={formik.handleChange("pincode")}
          value={formik.values.pincode}
        />
        <div className="error">
          {formik.touched.pincode && formik.errors.pincode}
        </div>
      </div>
      <div className="w-100 row d-flex ">
        <div className="">
          {formik.values.orderItems.map((orderItem, index) => (
            <div key={index} className="mb-3">
              {/* Product select */}
              <div className="form-group d-flex align-items-center">
                <label
                  htmlFor={`orderItems[${index}].product`}
                  className="form-label text-dark me-2"
                ></label>
                <select
                  className="form-select me-2"
                  name={`orderItems[${index}].product`}
                  value={orderItem.product}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option value="">Select Fruit</option>
                  {products.map((product) => (
                    <option key={product._id} value={product._id}>
                      {product.title}
                    </option>
                  ))}
                </select>
                {/* Quantity input */}
                <input
                  type="text"
                  placeholder="Quantity"
                  className="form-control flex-grow-1 me-2"
                  name={`orderItems[${index}].quantity`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={orderItem.quantity}
                />
                {/* Unit Price display */}
                <input
                  type="text"
                  placeholder="Unit Price: Rs"
                  className="form-control"
                  name= {calculateUnitPrice(orderItem.product) * orderItem.quantity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value= {calculateUnitPrice(orderItem.product) * orderItem.quantity}
                />
                {/* <div className="flex-grow-1 text-dark">
                  Unit Price: Rs
                  {calculateUnitPrice(orderItem.product) * orderItem.quantity}
                </div> */}
                 {/* Render the "Add Product" button only for the last row */}
          {index === formik.values.orderItems.length - 1 && (
            <button
              type="button"
              className="btn btn-primary ms-2"
              onClick={() =>
                formik.setFieldValue("orderItems", [
                  ...formik.values.orderItems,
                  { product: "", quantity: 0 }, // Add a new empty row
                ])
              }
            >
              <i className="bi bi-plus-circle"></i> {/* Plus icon */}
            </button>
          )}
              </div>
              {/* Validation errors */}
              {/* Add other order item fields similarly */}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="d-flex justify-content-end border-top modal-footer">
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </form>
  );
};

export default SalesForm;
