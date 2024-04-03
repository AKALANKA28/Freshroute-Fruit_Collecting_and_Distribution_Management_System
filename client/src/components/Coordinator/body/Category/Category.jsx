
import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoryForm from "./CategoryForm";
import CategoryPriceForm from "./CategoryPriceForm";
import "./Category.css";

axios.defaults.baseURL = "http://localhost:8070/";

function Category() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [priceSection, setPriceSection] = useState(false);
  const [data, setData] = useState({
    fruit: "",
    category: "",
    date: "",
    weight: "",
    quality: "",
    price: "",
  });

  const [dataEdit, setDataEdit] = useState({
    fruit: "",
    category: "",
    date: "",
    weight: "",
    quality: "",
    price: "",
  });

  

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Add data
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/Category/add", data);
      alert("Category Added");
      getFetchData();
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Category/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);



  // Edit data
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating Category with ID:", dataEdit._id);
    try {
      await axios.put(`/Category/update/${dataEdit._id}`, dataEdit);
      alert("Category Updated");
      setEditSection(true); 
      window.location.reload();
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (category) => {
    setDataEdit(category);
    setEditSection(true);
  };

  const handlePrice = (category) => {
    setDataEdit(category);
    setPriceSection(true);
  };

    //pricing
    const handleUpdatePrice = async (e) => {
        e.preventDefault();
        console.log("Updating Category with ID:", dataEdit._id);
        try {
          await axios.put(`/Category/update/${dataEdit._id}`, dataEdit);
          alert("Category Priced");
          setEditSection(true); 
          window.location.reload();
        } catch (err) {
          console.log(err);
          alert(err.message);
        }
      };

  

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Category/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div id="main">
      <div>
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          <i className="bi bi-plus-circle"></i> Add
        </button>
      </div>
      {addSection && !editSection && !priceSection && (
        <CategoryForm
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          data={data}
        />
      )}

      {editSection && !priceSection && (
        <CategoryForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          data={dataEdit}
        />
      )}

    {priceSection && (
        <CategoryPriceForm
          handleSubmit={handleUpdatePrice}
          handleOnChange={handleEditOnChange}
          data={dataEdit}
        />
      )}

      <div className="table-container">
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">Fruit</th>
              <th scope="col">Category</th>
              <th scope="col">Date</th>
              <th scope="col">Weight</th>
              <th scope="col">Quality</th>
              <th scope="col">Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((category) => (
                <tr key={category._id}>
                  <td>{category.fruit}</td>
                  <td>{category.category}</td>
                  <td>{category.date}</td>
                  <td>{category.weight}</td>
                  <td>{category.quality}</td>
                  <td>{category.price}</td>
                  <td className="action">
                    <div className="buttons">

                    <button
                        className="btn btn-edit"
                        onClick={() => handlePrice(category)}
                      >
                        <i class="bi bi-calculator-fill"></i>
                      </button>

                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(category)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(category._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Category;
