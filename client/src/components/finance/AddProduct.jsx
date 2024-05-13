import React, { useEffect, useState } from "react";
// import { useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "../../Website/Components/CustomInput";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { getProductCategory } from "../../features/admin/productCategory/productCategorySlice";
import { getGrades } from "../../features/admin/color/gradeSlice";
import {
  deleteImage,
  uploadImg,
} from "../../features/admin/upload/uploadSlice";
import {
  createProducts,
  resetState,
} from "../../features/admin/products/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const [grade, setGrade] = useState([]);
  useEffect(() => {
    dispatch(getProductCategory());
    dispatch(getGrades());
  }, [dispatch]);

  const getproductcategories = useSelector(
    (state) => state.productCategory.productcategories
  );
  const getgrades = useSelector((state) => state.grade.grades);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const { isSuccess, isError, isLoading, createdProduct } = newProduct;
  // console.log(getgrades);
  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success("Product Added Successfully");
    }
    if (isError) {
      toast.error("Something Went Wrong");
    }
  }, [isSuccess, isError, isLoading, createdProduct]);
  const img = [];
  imgState.forEach((image) => {
    img.push({
      public_id: image.public_id,
      url: image.url,
    });
  });
  useEffect(() => {
    formik.values.grade = grade ? grade : "";
    formik.values.images = img;
  }, [grade, img]);

  const gradeOpt = [];
  getgrades.map((i) => {
    gradeOpt.push({
      label: i.title,
      value: i._id,
    });
  });
  let productSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number(),
    grade: Yup.array(),
    category: Yup.string().required("Category is required"),
    //   tags: Yup.string().required("Tag is required"),
    quantity: Yup.number().required("Quantity is required"),
  });
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      price: "",
      grade: [], // Initialize grade as an empty array
      category: "",
      // tags: "",
      quantity: "",
      images: "",
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      console.log("Form Values:", values);

      dispatch(createProducts(values));
      formik.resetForm();
      setGrade([]); // Set grade as an empty array
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const handleGrades = (selectedGrades) => {
    console.log(selectedGrades);
    setGrade(selectedGrades);
  };


  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            name="title"
            placeholder="Enter Product Title"
            change={formik.handleChange}
            onBul={formik.handleBlur}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <div className="mb-3 mt-3">
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={formik.handleChange("description")}
              onBlur={formik.values.description}
            />
            {/* <ReactQuill
                theme="snow"
                name="description"
                onChange={formik.handleChange("description")}
                value={formik.values.description}
              /> */}
            <div className="error">
              {formik.touched.description && formik.errors.description ? (
                <div>{formik.errors.description}</div>
              ) : null}
            </div>
          </div>
          <CustomInput
            type="number"
            name="price"
            placeholder="Enter Product Price"
            Cange={formik.handleChange}
            nBlur={formik.handleBlur}
            vlue={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price ? (
              <div>{formik.errors.price}</div>
            ) : null}
          </div>

          {/* product category */}
          <select
            className="form-select py-3 mt-3 text-dark"
            name="category"
            onChange={formik.handleChange}
          >
            <option value="">Select Product Category</option>
            {getproductcategories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category ? (
              <div>{formik.errors.category}</div>
            ) : null}
          </div>

          {/* Tags
             <select
              className="form-select py-3 mt-3"
              name="tags"
              onChange={formik.handleChange}
            >
              <option value="Select Tag" defaultValue="Select Tag">Select Tag</option>
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="special">Special</option>
            </select>
            <div className="error">
              {formik.touched.tags && formik.errors.tags ? (
                <div>{formik.errors.tags}</div>
              ) : null}
            </div> */}

          {/* product Grade */}
          <Select
  mode="multiple"
  allowClear
  className="w-100 mt-3"
  placeholder="Select Grades"
  defaultValue={grade}
  onChange={(selectedGrades) =>
    handleGrades(
      selectedGrades.map((gradeId) => {
        const selectedGrade = gradeOpt.find((grade) => grade.value === gradeId);
        return {
          _id: gradeId,
          title: selectedGrade ? selectedGrade.label : "" // Ensure title is included
        };
      })
    )
  }
  options={gradeOpt}
/>



          <div className="error">
            {formik.touched.grade && formik.errors.grade ? (
              <div>{formik.errors.grade}</div>
            ) : null}
          </div>
          <CustomInput
            type="number"
            placeholder="Enter product quantity"
            name="quantity"
            change={formik.handleChange}
            val={formik.values.quantity}
            onBul={formik.handleBlur}
          />
          <div className="error">
            {formik.touched.quantity && formik.errors.quantity ? (
              <div>{formik.errors.quantity}</div>
            ) : null}
          </div>
          <div className="bg-white border-1 p-5 mt-3 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages mt-3 d-flex flex-wrap gap-3">
            {imgState.map((img, imgIndex) => (
              <div className="position-relative" key={imgIndex}>
                <button
                  type="button"
                  onClick={() => dispatch(deleteImage(img.public_id))}
                  className="btn-close position-absolute"
                  style={{ top: "5px", right: "5px" }}
                ></button>
                <img src={img.url} alt="" width={150} height={150} />
              </div>
            ))}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 mt-3"
            type="submit"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
