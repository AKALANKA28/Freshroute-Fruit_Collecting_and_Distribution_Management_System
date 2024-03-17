// //C:\Users\HP\Documents\GitHub\MERN_Project\client\src\components\orderManagement\body\QualityList\QualityListComponent.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import AddQuality from "./AddQuality";

// axios.defaults.baseURL = "http://localhost:8070/";

// function qualityList() {
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [data, setData] = useState({
//     fruit_category: "",
//     grade: "",
//     quality_desc: "",
//     storage_cond: "",
   
//   });

//   const [dataEdit, setDataEdit] = useState({
//     _id: "",
//     fruit_category: "",
//     grade: "",
//     quality_desc: "",
//     storage_cond: "",
   
//   });

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Add data
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/Farmer/add", data);
//       alert("Quality Added");
//       getFetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   // Get data
//   const [dataList, setDataList] = useState([]);

//   const getFetchData = async () => {
//     try {
//       const response = await axios.get("/Farmer/");
//       setDataList(response.data);
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   useEffect(() => {
//     getFetchData();
//   }, []);

//   // Edit data
//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     console.log("Updating Quality with ID:", dataEdit._id);
//     try {
//       await axios.put(/Farmer/update/${dataEdit._id}, dataEdit);
//       alert("Quality Updated");
//     } catch (err) {
//       console.log(err);
//       alert(err.message);
//     }
//   };

//   const handleEditOnChange = (e) => {
//     const { value, name } = e.target;
//     setDataEdit((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (quality) => {
//     setDataEdit(quality);
//     setEditSection(true);
//   };

//   // Delete data
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(/Farmer/delete/${id});
//       alert("Successfully Deleted");
//       getFetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   return (
//     <>
//       <sidebar />
//       <div id="main" >
//         <button className="btn btn-add main" onClick={() => setAddSection(true)}>
//         <i className="bi bi-plus-circle"></i>
//           Add Quality
//         </button>
//       </div>
//         {addSection && (
//           <AddQuality
//             handleSubmit={handleSubmit}
//             handleOnChange={handleOnChange}
//             rest={data}
//           />
//         )}

//         {editSection && (
//           <AddQuality
//             handleSubmit={handleUpdate}
//             handleOnChange={handleEditOnChange}
//             rest={dataEdit}
//           />
//         )}

//         <div id = "main">
//           <table className="table table-bordeless datatable">
//             <thead className="table-light">
//               <tr>
//                 <th scope="col">Fruit Type</th>
//                 <th scope="col">Grade</th>
//                 <th scope="col">Quality Description</th>
//                 <th scope="col">Storage Conditions</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {dataList.length ? (
//                 dataList.map((quality) => (
//                   <tr key={quality._id}>
//                     <td>{quality.fruit_category}</td>
//                     <td>{quality. grade}</td>
//                     <td>{quality.quality_desc}</td>
//                     <td>{quality.storage_cond}</td>
//                     <td>
//                       <button
//                         className="btn btn-edit"
//                         onClick={() => handleEdit(quality)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-delete"
//                         onClick={() => handleDelete(quality._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="7">No Data</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//     </>
//   );
// }

// export default SuppliersList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import AddQuality from "./AddQuality";

axios.defaults.baseURL = "http://localhost:8070/";

function QualityListComponent() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [data, setData] = useState({
    fruit_category: "",
    grade: "",
    quality_desc: "",
    storage_cond: "",
  });

  const [dataEdit, setDataEdit] = useState({
    _id: "",
    fruit_category: "",
    grade: "",
    quality_desc: "",
    storage_cond: "",
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
      await axios.post("/Farmer/add", data);
      alert("Quality Added");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  // Get data
  const [dataList, setDataList] = useState([]);

  const getFetchData = async () => {
    try {
      const response = await axios.get("/Farmer/");
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
    console.log("Updating Quality with ID:", dataEdit._id);
    try {
      await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
      alert("Quality Updated");
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

  const handleEdit = (quality) => {
    setDataEdit(quality);
    setEditSection(true);
  };

  // Delete data
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Farmer/delete/${id}`);
      alert("Successfully Deleted");
      getFetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <sidebar />
      <div id="main">
        <button className="btn btn-add main" onClick={() => setAddSection(true)}>
          <i className="bi bi-plus-circle"></i> Add Quality
        </button>
      </div>
      {addSection && (
        <AddQuality
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          rest={data}
        />
      )}

      {editSection && (
        <AddQuality
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          rest={dataEdit}
        />
      )}

      <div id="main">
        <table className="table table-bordeless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">Fruit Type</th>
              <th scope="col">Grade</th>
              <th scope="col">Quality Description</th>
              <th scope="col">Storage Conditions</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((quality) => (
                <tr key={quality._id}>
                  <td>{quality.fruit_category}</td>
                  <td>{quality.grade}</td>
                  <td>{quality.quality_desc}</td>
                  <td>{quality.storage_cond}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(quality)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(quality._id)}
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

export default QualityListComponent;