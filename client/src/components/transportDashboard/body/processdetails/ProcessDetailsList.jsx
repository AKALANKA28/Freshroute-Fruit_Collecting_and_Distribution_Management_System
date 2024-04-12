import React, { useEffect, useState } from "react";
import axios from "axios";
import ScheduleForm from "./ScheduleForm";
import AddscheduleModal from "./AddscheduleModal";

axios.defaults.baseURL = "http://localhost:8070/";

function ScheduleDetailsList() {

const [editSection, setEditSection] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [data, setData] = useState({

    schedule_ID:"",
    vehicle_no:"",
    driver_name:"",
    pickup_location:"",
    destination: "",
    date:"",
    quantity:"",

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
      await axios.post("/schedule/add", data);
      alert("Schedule Added");
      window.location.reload();
      getFetchData();// Fetch update data after adding
      setAddSection(false);
      setData({

        schedule_ID:"",
        vehicle_no:"",
        driver_name:"",
        pickup_location:"",
        destination: "",
        date:"",
        quantity:"",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    schedule_ID:"",
    vehicle_no:"",
    driver_name:"",
    pickup_location:"",
    destination: "",
    date:"",
    quantity:"",
      });


  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/schedule/");
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
    console.log("Updating Schedule with ID:", dataEdit._id);
   axios.patch(`http://localhost:8070/schedule/update/${dataEdit._id}`, dataEdit)
  .then(() => {
    alert("Schedule Updated");
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

  const handleEdit = (schedule) =>{
    setDataEdit(schedule)   
    setEditSection(true)
  };


  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete("/schedule/delete/"+id).then(() => {;
      alert("Successfully Deleted");
      window.location.reload();
      getFetchData();})
    } catch (err) {
      alert(err.message);
    }
  };


  return (
    <>
      <div id="main" className="main">
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setAddSection(true)}>
          <i className="bi bi-plus-circle"></i>
              Add Schedule
        </button>
      </div>
      <AddscheduleModal
        show={addSection}
        handleClose={() => setAddSection(false)}
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        rest={data}
      />

        {editSection && (
          <ScheduleForm
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            rest={dataEdit}
          />
        )}

        <div id = "main">
           <table className="table table-bordeless datatable">
             <thead className="table-light">
               <tr>
                 <th scope="col">Schedule_ID</th>
                 <th scope="col">Vehicle_No</th>
                 <th scope="col">Driver_Name</th>
                 <th scope="col">Pickup_Location</th>
                 <th scope="col">Destination</th>
                 <th scope="col">Date</th>
                 <th scope="col">Quantity</th>
                 <th>Action</th>
               </tr>
             </thead>
             <tbody>
               {dataList.length ? (
                 dataList.map((schedule) => (
                   <tr key={schedule._id}>
                     <td>{schedule.schedule_ID}</td>
                     <td>{schedule.vehicle_no}</td>
                     <td>{schedule.driver_name}</td>
                     <td>{schedule.pickup_location}</td>
                     <td>{schedule.destination}</td>
                     <td>{schedule.date}</td>
                     <td>{schedule.quantity}</td>
                    
                     <td>
                       <button
                         className="btn btn-edit"
                         onClick={() => handleEdit(schedule)}
                       >
                         Edit
                       </button>
                       <button
                         className="btn btn-delete"
                         onClick={() => handleDelete(schedule._id)}
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

export default ScheduleDetailsList;