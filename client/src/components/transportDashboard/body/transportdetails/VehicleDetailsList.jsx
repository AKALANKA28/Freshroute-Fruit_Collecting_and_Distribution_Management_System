import React, { useEffect, useState } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";
import AddvehicleModal from "./AddvehicleModal";

axios.defaults.baseURL = "http://localhost:8070/";

function VehicleDetailsList() {

   const [editSection, setEditSection] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [data, setData] = useState({

    vehicle_no:"",
    type:"",
    conditions:"",
    capacity : "",
    owner_name:"",
    nic:"",
    email:"",
    phone:"",
    Bank:"",
    Branch:"",
    account_no:"",

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
      await axios.post("/vehicle/add", data);
      alert("vehicle Added");
      window.location.reload();
      setAddSection(false);
      setData({

    vehicle_no:"",
    type:"",
    conditions:"",
    capacity : "",
    owner_name:"",
    nic:"",
    email:"",
    phone:"",
    Bank:"",
    Branch:"",
    account_no:"",

      });
    } catch (err) {
      alert(err.message);
    }
  };

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    vehicle_no:"",
    type:"",
    conditions:"",
    capacity : "",
    owner_name:"",
    nic:"",
    email:"",
    phone:"",
    Bank:"",
    Branch:"",
    account_no:"",

      });


  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/vehicle/");
      setDataList(response.data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

 //edit data
const handleUpdate = async(e) => {
  e.preventDefault()
  console.log("Updating Vehicle with ID:", dataEdit._id);
 axios.patch(`http://localhost:8070/vehicle/update/${dataEdit._id}`, dataEdit)
.then(() => {
  alert("Vehicle Updated");
  window.location.reload();
})
.catch((err) => {
  console.log(err);
  alert(err);
});

 
}

const handleEditOnChange = async(e) => {
  const {value,name} = e.target;
  setDataEdit((preve)=>{
    return{
      ...preve,
      [name] : value,
    }
    
  }) ;
};

const handleEdit = (vehicle) =>{
  setDataEdit(vehicle)   
  setEditSection(true)
};


  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/vehicle/delete/${id}`);
      alert("Successfully Deleted");
      window.location.reload();
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <>
      <div id="main">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setAddSection(true)}>
          <i className="bi bi-plus-circle"></i>
              Add Vehicle
        </button>
      </div>
      <AddvehicleModal
        show={addSection}
        handleClose={() => setAddSection(false)}
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        rest={data}
      />

        {editSection && (
          <VehicleForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            rest={dataEdit}
          />
        )}

        <div id = "main">
           <table className="table table-bordeless datatable">
             <thead className="table-light">
               <tr>
                 <th scope="col">Vehicle_No</th>
                 <th scope="col">Type</th>
                 <th scope="col">Conditions</th>
                 <th scope="col">Capacity</th>
                 <th scope="col">Owner_Name</th>
                 <th scope="col">NIC</th>
                 <th scope="col">Email</th>
                 <th scope="col">Phone</th>
                 <th scope="col">Bank</th>
                 <th scope="col">Branch</th>
                 <th scope="col">Account_No</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
               {dataList.length ? (
                 dataList.map((vehicle) => (
                   <tr key={vehicle._id}>
                     <td>{vehicle.vehicle_no}</td>
                     <td>{vehicle.type}</td>
                     <td>{vehicle.conditions}</td>
                     <td>{vehicle.capacity}</td>
                     <td>{vehicle.owner_name}</td>
                     <td>{vehicle.nic}</td>
                     <td>{vehicle.email}</td>
                     <td>{vehicle.phone}</td>
                     <td>{vehicle.Bank}</td>
                     <td>{vehicle.Branch}</td>
                     <td>{vehicle.account_no}</td>
                    
                     <td>
                       <button
                         className="btn btn-edit"
                         onClick={() => handleEdit(vehicle)}
                       >
                         Edit
                       </button>
                       <button
                         className="btn btn-delete"
                         onClick={() => handleDelete(vehicle._id)}
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

export default VehicleDetailsList;