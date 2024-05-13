import axios from "axios";


const getToken = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const configHeader = {
    headers: {
      Authorization: `Bearer ${getToken?.token}`,
      Accept: "application/json",
    },
  };
  //if not work config header
const fetchProduct = async() => {
    const response = await axios.get("http://localhost:8070/product/")
    return response.data;
}

const createProduct = async (product) => {
    const response = await axios.post("http://localhost:8070/product/add", product, configHeader)
    return response.data;
  }
const productService = {
    fetchProduct,
    createProduct,
}
export default productService;