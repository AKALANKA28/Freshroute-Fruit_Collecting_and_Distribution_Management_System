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
const fetchGrade = async () => {
  const response = await axios.get(`${base_url}grade/`);
  return response.data;
};

const createGrade = async (gradeData) => {
  const response = await axios.post(
    `${base_url}grade/add`,
    gradeData,
    configHeader
  );
  return response.data;
};

const getGradeById = async (gradeId) => {
  const response = await axios.get(
    `${base_url}grade/get/${gradeId}`,
    configHeader
  );
  return response.data;
};

const updateAGrade = async (grade) => {
  const response = await axios.put(
    `${base_url}grade/update/${grade.id}`,
    { title: grade.gradeData.title },
    configHeader
  );
  return response.data;
};

const deleteAGrade = async (gradeId) => {
  const response = await axios.delete(
    `${base_url}grade/delete/${gradeId}`,
    configHeader
  );
  return response.data;
};

const colorService = {
  fetchGrade,
  createGrade,
  getGradeById,
  updateAGrade,
  deleteAGrade,
};

export default colorService;
