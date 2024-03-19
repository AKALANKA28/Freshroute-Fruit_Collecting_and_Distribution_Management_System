import React, { useEffect, useState } from "react";
import axios from "axios";
import PredictionForm from "./PredictionForm";
import AddPredictionModal from "./AddPredictionModal";

axios.defaults.baseURL = "http://localhost:8070/";

function PredictionsList() {
  
  const [editSection, setEditSection] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [data, setData] = useState({
    fruitType: "",
    quality: "",
    quantity: "",
    price: "",
    dateCanBeGiven: "",
  });

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/Farmer/add", data);
      alert("Prediction Added");
      window.location.reload();
      setAddSection(false);
      setData({
        fruitType: "",
        quality: "",
        quantity: "",
        price: "",
        dateCanBeGiven: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const [dataEdit, setDataEdit] = useState({
        _id: "",
        fruitType: "",
        quality: "",
        quantity: "",
        price: "",
        dateCanBeGiven: "",
      });


  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Prediction/");
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
    console.log("Updating Prediction with ID:", dataEdit._id);
    try {
      await axios.put(`/Prediction/update/${dataEdit._id}`, dataEdit);
      alert("Prediction Updated");
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

  const handleEdit = (farmer) => {
    setDataEdit(farmer);
    setEditSection(true);
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Prediction/delete/${id}`);
      alert("Successfully Deleted Supply Prediction");
      window.location.reload();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <>
      <div id="main col-8" className="text-center">
        <button type="button" className="btn btn-add" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setAddSection(true)}>
          <i className="bi bi-plus-circle"></i>
              Add Supply Prediction
        </button>
      </div>
      <AddPredictionModal
        show={addSection}
        handleClose={() => setAddSection(false)}
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        rest={data}
      />

        {editSection && (
          <PredictionForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            rest={dataEdit}
          />
        )}

        <div id = "main col-8">
           <table className="table table-bordeless datatable">
             <thead className="table-light">
               <tr>
                 <th scope="col">Fruit Type</th>
                 <th scope="col">Quality</th>
                 <th scope="col">Quantity</th>
                 <th scope="col">Price</th>
                 <th scope="col">Date Can Be Given</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
               {dataList.length ? (
                 dataList.map((prediction) => (
                   <tr key={prediction._id}>
                     <td>{prediction.fruitType}</td>
                     <td>{prediction.quality}</td>
                     <td>{prediction.quantity}</td>
                     <td>{prediction.price}</td>
                     <td>{prediction.dateCanBeGiven}</td>
                     <td>
                       <button
                         className="btn btn-edit"
                         onClick={() => handleEdit(prediction)}
                       >
                         Edit
                       </button>
                       <button
                         className="btn btn-delete"
                         onClick={() => handleDelete(prediction._id)}
                       >
                         Delete
                       </button>
                     </td>
                   </tr>
                 ))
               ) : (
                 <tr>
                   <td colSpan="7">No Data</td>
                 </tr>
               )}
             </tbody>
           </table>
         </div>

    </>
  );
}

export default PredictionsList;