import React,{useState, useEffect} from 'react'
import './OrderList.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import axios from 'axios';
import OrderAssignForm from "./OrderAssignForm";
import RequestedOrderTable from "./RequestedOrderTable";
import { PDFViewer } from "@react-pdf/renderer";
import RequestedOrderReport from "./RequestedOrderReport";
import { Button, Modal } from "react-bootstrap";
axios.defaults.baseURL = "http://localhost:8070/";
const RequestedOrderList = () => {

    const [items, setItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [clearFilter, setClearFilter] = useState(false);
    const [formData, setFormData] = useState({
        orderId: "",
        fruit: "",
        category: "",
        quality: "",
        customer:"",
        quantity: "",
        placedDate: "",
        dueDate: "",
        opId: "",
        opName: ""
    });

    const handleOnInputChange = (event) => {
        const { opName, opId } = event.target;
        setFormData( {...formData, opName: opName, opId: opId})
    };

    const handleClosePopup = () => setShowPopup(false);


    useEffect(() => {
        getOrderList();  // load data initially
    }, []);

    const getOrderList = async () => {
        try {
            const response = await axios.get("/om/pendingOrderList");
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

        try {
            const request = {
                orderId: formData.orderId,
                opName: formData.opName,
                opId: formData.opId
            };
            const response = await axios.post(`/om/assignOrder`, request);
            alert("Successful");
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while assigning the order");
            }
        }
        getOrderList();
    }

    const handleSearchOnClick = async (filterData) => {
        try {
            const response = await axios.post("/om/PendingOrderList", filterData);
            setItems(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting filtered data");
            }
        }
    }

    const handleAssign = (item) =>{
        setFormData({
            orderId: item._id,
            fruit: item.fruit,
            category: item.category,
            quality: item.quality,
            quantity: item.quantity,
            customer: item.customerName,
            placedDate: item.placedDate,
            dueDate: item.dueDate,
            opId: "",
            opName: ""
        })
        setShowPopup(true);
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
                                <div className="card-title">Requested Order Details
                                    <h6>Manage Orders</h6>
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
                                <Modal.Title>Requested Order Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PDFViewer width="100%" height="500px">
                                <RequestedOrderReport dataList={items} />
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
                                             
                                         ]
                                     }
                                     clearInputField={clearFilter}
                                     handleSearch={handleSearchOnClick}
                                />
                            </div>
                            <div className="scrollable-content-x">
                                <RequestedOrderTable items={items} updateTable={getOrderList} handleAssign={handleAssign}/>
                            </div>
                        </div>
                        <div>
                            <OrderAssignForm
                                show={showPopup}
                                onHide={handleClosePopup}
                                formData={formData}
                                handleSubmit={handleSubmit}
                                handleOnChange={handleOnInputChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default RequestedOrderList;
