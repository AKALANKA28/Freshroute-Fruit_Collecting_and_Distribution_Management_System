// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import FarmerForm from "./FarmerForm";
// import AddFarmerModal from "./AddFarmerModal";

// axios.defaults.baseURL = "http://localhost:8070/";

// function SuppliersList() {

//   const [editSection, setEditSection] = useState(false);
//   const [addSection, setAddSection] = useState(false);
//   const [data, setData] = useState({
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/Farmer/add", data);
//       alert("Farmer Added");
//       window.location.reload();
//       setAddSection(false);
//       setData({
//         NIC: "",
//         username: "",
//         name: "",
//         email: "",
//         city: "",
//         lane: "",
//       });
//     } catch (err) {
//       alert(err.message);
//     }
//   };

//   const [dataEdit, setDataEdit] = useState({
//         _id: "",
//         NIC: "",
//         username: "",
//         name: "",
//         email: "",
//         city: "",
//         lane: "",
//       });


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
//     console.log("Updating Farmer with ID:", dataEdit._id);
//     try {
//       await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
//       alert("Farmer Updated");
//       window.location.reload();
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

//   const handleEdit = (farmer) => {
//     setDataEdit(farmer);
//     setEditSection(true);
//   };

//   // Delete data
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/Farmer/delete/${id}`);
//       alert("Successfully Deleted");
//       window.location.reload();
//       getFetchData();
//     } catch (err) {
//       alert(err.message);
//     }
//   };


//   return (
//     <>
//       <div id="main col-8" className="text-center">
//         <button type="button" className="btn btn-add" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => setAddSection(true)}>
//           <i className="bi bi-plus-circle"></i>
//               Add Farmer
//         </button>
//       </div>
//       <AddFarmerModal
//         show={addSection}
//         handleClose={() => setAddSection(false)}
//         handleSubmit={handleSubmit}
//         handleOnChange={handleOnChange}
//         rest={data}
//       />

//         {editSection && (
//           <FarmerForm
//             handleSubmit={handleUpdate}
//             handleOnChange={handleEditOnChange}
//             rest={dataEdit}
//           />
//         )}

//         <div id = "main col-8">
//            <table className="table table-bordeless datatable">
//              <thead className="table-light">
//                <tr>
//                  <th scope="col">NIC</th>
//                  <th scope="col">Username</th>
//                  <th scope="col">Name</th>
//                  <th scope="col">Email</th>
//                  <th scope="col">City</th>
//                  <th scope="col">Lane</th>
//                  <th>Action</th>
//                </tr>
//              </thead>
//              <tbody>
//                {dataList.length ? (
//                  dataList.map((farmer) => (
//                    <tr key={farmer._id}>
//                      <td>{farmer.NIC}</td>
//                      <td>{farmer.username}</td>
//                      <td>{farmer.name}</td>
//                      <td>{farmer.email}</td>
//                      <td>{farmer.city}</td>
//                      <td>{farmer.lane}</td>
//                      <td>
//                        <button
//                          className="btn btn-edit"
//                          onClick={() => handleEdit(farmer)}
//                        >
//                          Edit
//                        </button>
//                        <button
//                          className="btn btn-delete"
//                          onClick={() => handleDelete(farmer._id)}
//                        >
//                          Delete
//                        </button>
//                      </td>
//                    </tr>
//                  ))
//                ) : (
//                  <tr>
//                    <td colSpan="7">No Data</td>
//                  </tr>
//                )}
//              </tbody>
//            </table>
//          </div>

//     </>
//   );
// }

// export default SuppliersList;




import React, { useState, useEffect } from "react";
import axios from "axios";
import FarmerForm from "./FarmerForm";
import AddFarmerModal from "./AddFarmerModal";
import { PDFViewer } from "@react-pdf/renderer";
import SupplierReport from "./SupplierReport";

axios.defaults.baseURL = "http://localhost:8070/";

function SuppliersList() {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [addSection, setAddSection] = useState(false);
  const [data, setData] = useState({
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
  });
  const [dataEdit, setDataEdit] = useState({
    _id: "",
    NIC: "",
    username: "",
    name: "",
    email: "",
    city: "",
    lane: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/Farmer/");
      setDataList(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      alert("Farmer Added");
      window.location.reload();
      setAddSection(false);
      setData({
        NIC: "",
        username: "",
        name: "",
        email: "",
        city: "",
        lane: "",
      });
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Failed to add farmer. Please try again.");
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
      alert("Farmer Updated");
      setEditSection(false);
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Failed to update farmer. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/Farmer/delete/${id}`);
      alert("Farmer Deleted");
      fetchData();
    } catch (err) {
      console.log(err);
      alert("Failed to delete farmer. Please try again.");
    }
  };

 

  return (
    <>
      <div>
        <button className="btn btn-primary">
          Generate Report
        </button>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <PDFViewer width="1000" height="600">
            <SupplierReport dataList={dataList} />
          </PDFViewer>
        </div>
      )}
      <div id="main col-8" className="text-center">
        <button
          type="button"
          className="btn btn-add"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => setAddSection(true)}
        >
          <i className="bi bi-plus-circle"></i> Add Farmer
        </button>
      </div>
      <AddFarmerModal
        show={addSection}
        handleClose={() => setAddSection(false)}
        handleSubmit={handleSubmit}
        handleOnChange={handleOnChange}
        rest={data}
      />
      {editSection && (
        <FarmerForm
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          rest={dataEdit}
        />
      )}
      <div id="main col-8">
        <table className="table table-borderless datatable">
          <thead className="table-light">
            <tr>
              <th scope="col">NIC</th>
              <th scope="col">Username</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">City</th>
              <th scope="col">Lane</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length ? (
              dataList.map((farmer) => (
                <tr key={farmer._id}>
                  <td>{farmer.NIC}</td>
                  <td>{farmer.username}</td>
                  <td>{farmer.name}</td>
                  <td>{farmer.email}</td>
                  <td>{farmer.city}</td>
                  <td>{farmer.lane}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => handleEdit(farmer)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => handleDelete(farmer._id)}
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

export default SuppliersList;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { PDFViewer } from "@react-pdf/renderer";
// import AddFarmerModal from "./AddFarmerModal";
// import FarmerForm from "./FarmerForm";
// import SupplierReportModal from "./SupplierReportModal";

// axios.defaults.baseURL = "http://localhost:8070/";

// function SuppliersList() {
//   const [dataList, setDataList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [addSection, setAddSection] = useState(false);
//   const [reportSection, setReportSection] = useState(false); // State for the report modal
//   const [data, setData] = useState({
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });
//   const [dataEdit, setDataEdit] = useState({
//     _id: "",
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/Farmer/");
//       setDataList(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/Farmer/add", data);
//       alert("Farmer Added");
//       setAddSection(false);
//       setData({
//         NIC: "",
//         username: "",
//         name: "",
//         email: "",
//         city: "",
//         lane: "",
//       });
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to add farmer. Please try again.");
//     }
//   };

//   const handleEditOnChange = (e) => {
//     const { value, name } = e.target;
//     setDataEdit((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (farmer) => {
//     setDataEdit(farmer);
//     setEditSection(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
//       alert("Farmer Updated");
//       setEditSection(false);
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to update farmer. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/Farmer/delete/${id}`);
//       alert("Farmer Deleted");
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to delete farmer. Please try again.");
//     }
//   };

//   const handleViewPDF = () => {
//     // Logic to view the PDF
//     setReportSection(true); // Show the report modal
//   };

//   return (
//     <>
//       <div id="main col-8" className="text-center">
//         <button
//           type="button"
//           className="btn btn-add"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//           onClick={() => setAddSection(true)}
//         >
//           <i className="bi bi-plus-circle"></i> Add Farmer
//         </button>
//         <button
//           className="btn btn-primary mx-2"
//           onClick={handleViewPDF}
//         >
//           View PDF
//         </button>
//       </div>
//       <AddFarmerModal
//         show={addSection}
//         handleClose={() => setAddSection(false)}
//         handleSubmit={handleSubmit}
//         handleOnChange={handleOnChange}
//         rest={data}
//       />

//       <SupplierReportModal
//         show={reportSection} // Pass the state to control the visibility of the modal
//         handleClose={() => setReportSection(false)} // Function to close the modal
//         dataList={dataList} // Pass dataList to the SupplierReportModal component
//       />

//       {editSection && (
//         <FarmerForm
//           handleSubmit={handleUpdate}
//           handleOnChange={handleEditOnChange}
//           rest={dataEdit}
//         />
//       )}
//       <div id="main col-8">
//         <table className="table table-borderless datatable">
//           <thead className="table-light">
//             <tr>
//               <th scope="col">NIC</th>
//               <th scope="col">Username</th>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">City</th>
//               <th scope="col">Lane</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList.length ? (
//               dataList.map((farmer) => (
//                 <tr key={farmer._id}>
//                   <td>{farmer.NIC}</td>
//                   <td>{farmer.username}</td>
//                   <td>{farmer.name}</td>
//                   <td>{farmer.email}</td>
//                   <td>{farmer.city}</td>
//                   <td>{farmer.lane}</td>
//                   <td>
//                     <button
//                       className="btn btn-edit"
//                       onClick={() => handleEdit(farmer)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-delete"
//                       onClick={() => handleDelete(farmer._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No Data</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default SuppliersList;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FarmerForm from "./FarmerForm";
// import AddFarmerModal from "./AddFarmerModal";
// import { PDFViewer, Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
// import ReactDOM from "react-dom";

// axios.defaults.baseURL = "http://localhost:8070/";

// const styles = StyleSheet.create({
//   page: {
//     flexDirection: "row",
//     backgroundColor: "#E4E4E4",
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
//   heading: {
//     fontSize: 24,
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   row: {
//     flexDirection: "row",
//     marginBottom: 10,
//   },
//   label: {
//     width: "30%",
//     fontWeight: "bold",
//   },
//   value: {
//     width: "70%",
//   },
// });

// const SupplierReport = ({ dataList }) => {
//   return (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text style={styles.heading}>Supplier Details Report</Text>
//           {dataList.map((supplier, index) => (
//             <View key={index} style={styles.row}>
//               <Text style={styles.label}>Supplier Name:</Text>
//               <Text style={styles.value}>{supplier.name}</Text>
//             </View>
//             // Add other fields as necessary
//           ))}
//         </View>
//       </Page>
//     </Document>
//   );
// };

// function SuppliersList() {
//   const [dataList, setDataList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [addSection, setAddSection] = useState(false);
//   const [data, setData] = useState({
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });
//   const [dataEdit, setDataEdit] = useState({
//     _id: "",
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/Farmer/");
//       setDataList(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/Farmer/add", data);
//       alert("Farmer Added");
//       setAddSection(false);
//       setData({
//         NIC: "",
//         username: "",
//         name: "",
//         email: "",
//         city: "",
//         lane: "",
//       });
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to add farmer. Please try again.");
//     }
//   };

//   const handleEditOnChange = (e) => {
//     const { value, name } = e.target;
//     setDataEdit((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (farmer) => {
//     setDataEdit(farmer);
//     setEditSection(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
//       alert("Farmer Updated");
//       setEditSection(false);
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to update farmer. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/Farmer/delete/${id}`);
//       alert("Farmer Deleted");
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to delete farmer. Please try again.");
//     }
//   };

//   const handleViewPDF = () => {
//     ReactDOM.render(
//       <PDFViewer width="1000" height="600">
//         <SupplierReport dataList={dataList} />
//       </PDFViewer>,
//       document.getElementById("pdf-container")
//     );
//   };

//   return (
//     <>
//       <div id="main col-8" className="text-center">
//         <button
//           type="button"
//           className="btn btn-add"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//           onClick={() => setAddSection(true)}
//         >
//           <i className="bi bi-plus-circle"></i> Add Farmer
//         </button>
//         <button className="btn btn-primary mx-2" onClick={handleViewPDF}>
//           View PDF
//         </button>
//       </div>
//       <AddFarmerModal
//         show={addSection}
//         handleClose={() => setAddSection(false)}
//         handleSubmit={handleSubmit}
//         handleOnChange={handleOnChange}
//         rest={data}
//       />
//       {editSection && (
//         <FarmerForm
//           handleSubmit={handleUpdate}
//           handleOnChange={handleEditOnChange}
//           rest={dataEdit}
//         />
//       )}
//       <div id="main col-8">
//         <table className="table table-borderless datatable">
//           <thead className="table-light">
//             <tr>
//               <th scope="col">NIC</th>
//               <th scope="col">Username</th>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">City</th>
//               <th scope="col">Lane</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {dataList.length ? (
//               dataList.map((farmer) => (
//                 <tr key={farmer._id}>
//                   <td>{farmer.NIC}</td>
//                   <td>{farmer.username}</td>
//                   <td>{farmer.name}</td>
//                   <td>{farmer.email}</td>
//                   <td>{farmer.city}</td>
//                   <td>{farmer.lane}</td>
//                   <td>
//                     <button
//                       className="btn btn-edit"
//                       onClick={() => handleEdit(farmer)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-delete"
//                       onClick={() => handleDelete(farmer._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No Data</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <div id="pdf-container"></div>
//     </>
//   );
// }

// export default SuppliersList;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import FarmerForm from "./FarmerForm";
// import AddFarmerModal from "./AddFarmerModal";
// import { PDFViewer } from "@react-pdf/renderer";
// import SupplierReport from "./SupplierReport";

// axios.defaults.baseURL = "http://localhost:8070/";

// function SuppliersList() {
//   const [dataList, setDataList] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [addSection, setAddSection] = useState(false);
//   const [showPDFModal, setShowPDFModal] = useState(false);
//   const [data, setData] = useState({
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });
//   const [dataEdit, setDataEdit] = useState({
//     _id: "",
//     NIC: "",
//     username: "",
//     name: "",
//     email: "",
//     city: "",
//     lane: "",
//   });

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get("/Farmer/");
//       setDataList(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const handleOnChange = (e) => {
//     const { value, name } = e.target;
//     setData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("/Farmer/add", data);
//       alert("Farmer Added");
//       setAddSection(false);
//       setData({
//         NIC: "",
//         username: "",
//         name: "",
//         email: "",
//         city: "",
//         lane: "",
//       });
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to add farmer. Please try again.");
//     }
//   };

//   const handleEditOnChange = (e) => {
//     const { value, name } = e.target;
//     setDataEdit((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (farmer) => {
//     setDataEdit(farmer);
//     setEditSection(true);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`/Farmer/update/${dataEdit._id}`, dataEdit);
//       alert("Farmer Updated");
//       setEditSection(false);
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to update farmer. Please try again.");
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/Farmer/delete/${id}`);
//       alert("Farmer Deleted");
//       fetchData();
//     } catch (err) {
//       console.log(err);
//       alert("Failed to delete farmer. Please try again.");
//     }
//   };

//   const handleViewPDF = () => {
//     console.log("View PDF button clicked");
//     setShowPDFModal(true);
//   };

//   const handleModalClose = () => {
//     setShowPDFModal(false);
//   };

//   return (
//     <>
//       <div>
//         <button className="btn btn-primary" onClick={handleViewPDF}>
//           View PDF
//         </button>
//       </div>
//       {showPDFModal && (
//         <div className="modal fade" id="pdfModal" tabIndex="-1" aria-labelledby="pdfModalLabel" aria-hidden="true">
//           <div className="modal-dialog modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="pdfModalLabel">PDF Report</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleModalClose}></button>
//               </div>
//               <div className="modal-body">
//                 <PDFViewer width="100%" height="600">
//                   <SupplierReport dataList={dataList} />
//                 </PDFViewer>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       <div id="main col-8" className="text-center">
//         <button
//           type="button"
//           className="btn btn-add"
//           data-bs-toggle="modal"
//           data-bs-target="#exampleModal"
//           onClick={() => setAddSection(true)}
//         >
//           <i className="bi bi-plus-circle"></i> Add Farmer
//         </button>
//       </div>
//       <AddFarmerModal
//         show={addSection}
//         handleClose={() => setAddSection(false)}
//         handleSubmit={handleSubmit}
//         handleOnChange={handleOnChange}
//         rest={data}
//       />
//       {editSection && (
//         <FarmerForm
//           handleSubmit={handleUpdate}
//           handleOnChange={handleEditOnChange}
//           rest={dataEdit}
//         />
//       )}
//       <div id="main col-8">
//         <table className="table table-borderless datatable">
//           <thead className="table-light">
//             <tr>
//               <th scope="col">NIC</th>
//               <th scope="col">Username</th>
//               <th scope="col">Name</th>
//               <th scope="col">Email</th>
//               <th scope="col">City</th>
//               <th scope="col">Lane</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading ? (
//               <tr>
//                 <td colSpan="7">Loading...</td>
//               </tr>
//             ) : dataList.length ? (
//               dataList.map((farmer) => (
//                 <tr key={farmer._id}>
//                   <td>{farmer.NIC}</td>
//                   <td>{farmer.username}</td>
//                   <td>{farmer.name}</td>
//                   <td>{farmer.email}</td>
//                   <td>{farmer.city}</td>
//                   <td>{farmer.lane}</td>
//                   <td>
//                     <button
//                       className="btn btn-edit"
//                       onClick={() => handleEdit(farmer)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="btn btn-delete"
//                       onClick={() => handleDelete(farmer._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7">No Data</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// export default SuppliersList;