import axios from "axios";
const base_url = "http://localhost:8070/";

const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const configHeader = {
  headers: {
    Authorization: `Bearer ${getToken?.token}`,
    Accept: "application/json",
  },
};

const fetchProductCategory = async () => {
  const response = await axios.get(
    `${base_url}productCategory/`
  );
  return response.data;
};

const createProductCategory = async (categoryData) => {
  const response = await axios.post(
    `${base_url}productCategory/add`,
    categoryData,
    configHeader
  );
  return response.data;
};

const getProductCategoryById = async (id) => {
  const response = await axios.get(
    `${base_url}productcategory/get/${id}`
  );
  return response.data;
};

const updateProductCategory = async (category) => {
  const response = await axios.put(
    `${base_url}productcategory/update/${category.id}`,
    { title: category.categoryData.title },
    configHeader
  );
  return response.data;
};

const deleteProductCategory = async (categoryId) => {
  const response = await axios.delete(
    `${base_url}productcategory/delete/${categoryId}`,
    configHeader
  );
  return response.data;
};
const productCategoryService = {
  fetchProductCategory,
  createProductCategory,
  getProductCategoryById,
  updateProductCategory,
  deleteProductCategory,
};

export default productCategoryService;