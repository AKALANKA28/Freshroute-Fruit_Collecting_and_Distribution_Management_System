import React,{useState, useEffect} from 'react'
import './OrderList.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import axios from 'axios';
import OrderAssignForm from "./OrderAssignForm";
import AssignedOrderTable from "./AssignedOrderTable";
import { PDFViewer } from "@react-pdf/renderer";
import AssignedOrderReport from './AssignedOrderReport';
import { Button, Modal } from "react-bootstrap";

axios.defaults.baseURL = "http://localhost:8070/";

const AssignedOrderList = () => {

    const [items, setItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [formData, setFormData] = useState({ });
    const [clearFilter, setClearFilter] = useState(false);

    const handleOnInputChange = (event) => {
        const { opName, opId } = event.target;
        setFormData(  {...formData, opName: opName, opId: opId})
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
                alert(response.data.status);
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
                alert(response.data.status);
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
            const response = await axios.post("/om/OngoingOrderList", filterData);
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

    //pdf
    const [showReportModal, setShowReportModal] = useState(false);
    const handleCloseReportModal = () => setShowReportModal(false);
    const handleShowReportModal = () => setShowReportModal(true);

    return (
        <main className='main'>
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
                                            <a onClick={handleShowReportModal}>
                                                <img src={Pdf} alt="Pdf Icon" className="icon"/>
                                            </a>
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
                                        <a href="#" onClick={() => {
                                            getOrderList();
                                            setClearFilter(!clearFilter);
                                        }}>
                                            <img src={Refresh} alt="Refresh Icon" className="icon"/>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                            <Modal show={showReportModal} onHide={handleCloseReportModal}>
                            <Modal.Header closeButton>
                                <Modal.Title>Assigned Order Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PDFViewer width="100%" height="500px">
                                <AssignedOrderReport dataList={items} />
                                </PDFViewer>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleCloseReportModal}>
                                Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        
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
                                                 tag: "fruit",
                                                 type: "text"
                                             },
                                             {
                                                 name: "Fruit Category",
                                                 tag: "category",
                                                 type: "text"
                                             },
                                             {
                                                 name: "Quality",
                                                 tag: "quality",
                                                 type: "text"
                                             },
                                             {
                                                 name: "Quantity",
                                                 tag: "quantity",
                                                 type: "number"
                                             },
                                             {
                                                 name: "Placed Date",
                                                 tag: "placedDate",
                                                 type: "date"
                                             },
                                             {
                                                 name: "Due Date",
                                                 tag: "dueDate",
                                                 type: "date"
                                             },
                                             {
                                                 name: "Order Processor",
                                                 tag: "opName",
                                                 type: "text"
                                             }
                                         ]
                                     }
                                     clearInputField={clearFilter}
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
