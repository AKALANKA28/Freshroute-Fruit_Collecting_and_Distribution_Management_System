import React,{useState, useEffect} from 'react'
import './ReqOrder.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import ReqOrderTable from "./ReqOrderTable";
import axios from 'axios';
import ReqOrderPopupForm from "./ReqOrderPopupForm";
axios.defaults.baseURL = "http://localhost:8070/";
const QualityList = () => {

    const [items, setItems] = useState([]); // to store table data

    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        fruitCategory: "",
        grade: "",
        qualityDesc: "",
        storageCond: ""
    });

    const handleOnInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);


    useEffect(() => {
      getQualityList();  // load data initially
    }, []);

    const getQualityList = async () => {
        try {
            const response = await axios.get("/quality");
            setItems(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting quality list");
            }
        }
    };

    const handleSubmit = async(data)=>{

        if (isEdit) {
            await editEntity(data);
        } else {
            await addEntity(data);
        }
        getQualityList();
    }

    const addEntity = async(data)=> {
        try {
            const response = await axios.post("/quality/add", data);
            alert(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while adding");
            }
        }
    }

    const editEntity = async(data)=>{
        try {
            const response = await axios.put(`/quality/update/${formData.id}`, data);
            alert(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while updating quality");
            }
        }
    }

    const handleAddNew = () =>{
        setIsEdit(false);
        setFormData({
            id: "",
            fruitCategory: "",
            grade: "",
            qualityDesc: "",
            storageCond: ""
        });
        setShowModal(true);
    };
    const handleEdit = (item) =>{
        setIsEdit(true);
        const dataObj = {
            id: item._id,
            fruitCategory: item.fruitCategory,
            grade: item.grade,
            qualityDesc: item.qualityDesc,
            storageCond: item.storageCond
        }
        setFormData(dataObj);
        setShowModal(true);
    };

    return (
        <main className='main' id='main'>
          <div className="body" id='body'>
              <div className="card recent-sales overflow-auto">

                  {/* ---------------------------table filter---------------------- */}
                  <div className="card-body">
                      <div className="page-header">
                          <div className="add-item d-flex">


                              {/* --------------------------table name ---------------------------*/}
                              <div className="card-title">
                                  Requested Orders<span></span>
                                  <h6>Manage Orders</h6>
                              </div>
                          </div>

                          {/*---------------- pdf,excel report generating icon and refresh -------------------*/}
                          <ul class="table-top-head">
                              <li>
                                  <div className="button-container">
                                      <a href="#">
                                          <img src={Pdf} alt="Pdf Icon" className="icon"/>
                                      </a>
                                  </div>
                              </li>
                              <li>
                                  <div className="button-container">
                                      <a href="#">
                                          <img src={Excel} alt="Excel Icon" className="icon"/>
                                      </a>
                                  </div>
                              </li>
                              <li>
                                  <div className="button-container">
                                      <a href="#" onClick={() => getQualityList()}>
                                          <img src={Refresh} alt="Refresh Icon" className="icon"/>
                                      </a>
                                  </div>
                              </li>
                          </ul>


                          {/* --------------------add button------------------ */}

                          <div className="page-btn">
                              <button type="button" className="btn btn-added"  onClick={handleAddNew}>
                                  <i className="bi bi-plus-circle" style={{marginRight: '10px'}}></i>
                                  Add Quality
                              </button>
                          </div>

                          {/* --------------------imported search bar and table data ------------------------*/}
                      </div>
                      <SearchBar/>
                      <ReqOrderTable items={items} updateQualityList={getQualityList} editItem={handleEdit}/>
                  </div>
                  <div>
                      <ReqOrderPopupForm
                          show={showModal}
                          onHide={handleCloseModal}
                          formData={formData}
                          isEdit={isEdit}
                          handleSubmit={handleSubmit}
                          handleOnChange={handleOnInputChange}
                      />
                  </div>
              </div>
          </div>
        </main>
    )
}
export default QualityList
