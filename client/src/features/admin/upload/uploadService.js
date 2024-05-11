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

const uploadImg = async (data) => {
    const response = await axios.put(`${base_url}product/upload`, data,  configHeader)
    return response.data;
}

const deleteImg = async (public_id) => {
  const response = await axios.delete(`${base_url}upload/delete-img/${public_id}`, configHeader)
  return response.data;
}


const uploadService = {
    uploadImg,
    deleteImg,
}

export default uploadService;