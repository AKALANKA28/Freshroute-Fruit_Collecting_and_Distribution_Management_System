import React,{useState, useEffect} from 'react'
import './OrderList.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import axios from 'axios';
import OrderAssignForm from "./OrderAssignForm";
import AssignedOrderTable from "./AssignedOrderTable";
axios.defaults.baseURL = "http://localhost:8070/";

const AssignedOrderList = () => {

    const [items, setItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({ });

    const handleOnInputChange = (event) => {
        const { opName, opId } = event.target;
        setFormData( (prevState) =>{ return {...prevState, opName: opName, opId: opId}})
        console.log(formData)
    };

    const handleClosePopup = () => setShowPopup(false);


    useEffect(() => {
        getOrderList();  // load data initially
    }, []);

    const getOrderList = async () => {
        try {
            const response = await axios.get("/om/ongoingOrderList");
            const responseData = response.data;
            setItems(responseData);

        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting order list");
            }
        }

    };

    const handleSubmit = async()=>{
        if (isEdit) {
            try {
                const request = {
                    orderId: formData.orderId,
                    opName: formData.opName,
                    opId: formData.opId
                };
                const response = await axios.post(`/om/editAssignOrder`, request);
                alert("Successful");
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("An error occurred while assigning the order");
                }
            }
        } else {
            try {
                const response = await axios.delete(`/om/unAssignOrder/${formData.orderId}`);
            } catch (err) {
                if (err.response && err.response.data && err.response.data.error) {
                    alert(err.response.data.error);
                } else {
                    alert("An error occurred while removing the order");
                }
            }
        }
        getOrderList();
    }

    const handleSearchOnClick = async (filterData) => {
        try {
            const response = await axios.post("/om/quality/filteredQualities", filterData);
            setItems(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting filtered data");
            }
        }
    }

    const handleUnAssign = (item) =>{
        setFormData({
            orderId: item._id,
            fruit: item.fruit,
            category: item.category,
            quality: item.quality,
            quantity: item.quantity,
            customer: item.customerName,
            placedDate: item.placedDate,
            dueDate: item.dueDate,
            opId: item.opId,
            opName: item.opName
        })
        setShowPopup(true);
        setIsEdit(false);
    };

    const handleEdit = (item) =>{
        setFormData({
            orderId: item._id,
            fruit: item.fruit,
            category: item.category,
            quality: item.quality,
            quantity: item.quantity,
            customer: item.customerName,
            placedDate: item.placedDate,
            dueDate: item.dueDate,
            opId: item.opId,
            opName: item.opName
        })
        setShowPopup(true);
        setIsEdit(true);
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
                                <div className="card-title">Assigned Order Details
                                    <h6>Manage Order Processors</h6>
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
                                        <a href="#" onClick={() => getOrderList()}>
                                            <img src={Refresh} alt="Refresh Icon" className="icon"/>
                                        </a>
                                    </div>
                                </li>
                            </ul>

                          {/* --------------------imported search bar and table data ------------------------*/}
                        </div>
                        <div className="w-100">
                            <div className="w-25"></div>
                            <div className="text-end" style={{marginRight:'30px'}}>
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
                            </div>
                            <div className="scrollable-content-x">
                                <AssignedOrderTable items={items} updateTable={getOrderList} handleUnAssign={handleUnAssign} handleEdit={handleEdit}/>
                            </div>
                        </div>
                        <div>
                            <OrderAssignForm
                                show={showPopup}
                                onHide={handleClosePopup}
                                formData={formData}
                                handleSubmit={handleSubmit}
                                isEdit={isEdit}
                                handleOnChange={handleOnInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default AssignedOrderList;
