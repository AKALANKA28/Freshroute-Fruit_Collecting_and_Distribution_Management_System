import React,{useState, useEffect} from 'react'
import './Quality.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import QualityTable from "./QualityTable";
import axios from 'axios';
import QualityPopupForm from "./QualityPopupForm";
axios.defaults.baseURL = "http://localhost:8070/";
const QualityList = () => {

    const [items, setItems] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [tab, setTab] = useState("A")
    const [isEdit, setIsEdit] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        fruit: "",
        category: "",
        quality: "",
        qualityDesc: "",
        storageCond: ""
    });

    const handleOnInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'fruit') {
            setFormData({ ...formData, category: "", id: "", quality: "" });
        }
        if (name === 'category') {
            setFormData({ ...formData, id: "", quality: "" });
        }
        if (name === 'quality') {
            const { selectedId } = event.target;
            setFormData({ ...formData, [name]: value, id: selectedId });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleCloseModal = () => setShowModal(false);


    useEffect(() => {
        getQualityList();  // load data initially
    }, []);

    const getQualityList = async () => {
        try {

            const response = await axios.get("/quality");
            const responseData = response.data;
            setItems(responseData);

            setTableData(responseData.filter((item) => item.quality === tab))
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting quality list");
            }
        }

    };

    const handleSubmit = async(data)=>{

        try {
            const response = await axios.put("/quality/update", data);
            alert(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while adding");
            }
        }
        getQualityList();
    }



    const handleAddNew = () =>{
        setIsEdit(false);
        setFormData({
            id: "",
            fruit: "",
            category: "",
            quality: "",
            qualityDesc: "",
            storageCond: ""
        });
        setShowModal(true);
    };
    const handleEdit = (item) =>{
        setIsEdit(true);
        const dataObj = {
            id: item._id,
            fruit: item.fruit,
            category: item.category,
            quality: item.quality,
            qualityDesc: item.qualityDesc,
            storageCond: item.storageCond
        }
        setFormData(dataObj);
        setShowModal(true);
    };

    const handleSearchOnClick = async (filterData) => {
        try {
            const response = await axios.post("/quality/filteredQualities", filterData);
            setItems(response.data);
            setTableData(items.filter((item) => item.quality === tab));
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting filtered data");
            }
        }
    }

    const handleTabChange = (value) => {
        setTab(value);
        setTableData(items.filter((item) => item.quality === value))
    }

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
                                  Quality Details<span></span>
                                  <h6>Manage Quality</h6>
                              </div>
                          </div>

                          {/*---------------- pdf,excel report generating icon and refresh -------------------*/}
                          <ul className="table-top-head">
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
                              <button type="button" className="btn btn-added" onClick={handleAddNew}>
                                  <i className="bi bi-plus-circle" style={{marginRight: '10px'}}></i>
                                  Add Quality
                              </button>
                          </div>

                          {/* --------------------imported search bar and table data ------------------------*/}
                      </div>
                      <div className="w-100">

                      </div>
                      <ul className="nav nav-tabs m-0 mt-2 justify-content-start" id="myTab" role="tablist">
                          <li className="nav-item m-0 " role="presentation">
                              <button className="nav-link active tab-height" id="home-tab" data-bs-toggle="tab"
                                      data-bs-target="#home-tab-pane" type="button" role="tab"
                                      aria-controls="home-tab-pane" aria-selected="true" onClick={() => handleTabChange("A")}>Grade A
                              </button>
                          </li>
                          <li className="nav-item m-0" role="presentation">
                              <button className="nav-link tab-height" id="profile-tab" data-bs-toggle="tab"
                                      data-bs-target="#profile-tab-pane" type="button" role="tab"
                                      aria-controls="profile-tab-pane" aria-selected="false" onClick={() => handleTabChange("B")}>Grade B
                              </button>
                          </li>
                          <li className="nav-item" role="presentation">
                              <button className="nav-link tab-height" id="contact-tab" data-bs-toggle="tab"
                                      data-bs-target="#contact-tab-pane" type="button" role="tab"
                                      aria-controls="contact-tab-pane" aria-selected="false" onClick={() => handleTabChange("C")}>Grade C
                              </button>
                          </li>
                          <li className="nav-item w-75 text-end">
                              <SearchBar enableFilterType={true}
                                         filterColumns={
                                             [
                                                 {
                                                     name: "Fruit Type",
                                                     tag: "fruit"
                                                 },
                                                 {
                                                     name: "Fruit Category",
                                                     tag: "category"
                                                 },
                                                 {
                                                     name: "Grade",
                                                     tag: "quality"
                                                 },
                                                 {
                                                     name: "Quality Description",
                                                     tag: "qualityDesc"
                                                 },
                                                 {
                                                     name: "Storage Conditions",
                                                     tag: "storageCond"
                                                 }
                                             ]
                                         }
                                         handleSearch={handleSearchOnClick}
                              />
                          </li>
                      </ul>

                      <QualityTable items={tableData} updateQualityList={getQualityList} editItem={handleEdit}/>
                  </div>
                  <div>
                      <QualityPopupForm
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
