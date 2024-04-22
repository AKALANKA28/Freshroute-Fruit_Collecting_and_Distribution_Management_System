import React,{useState, useEffect} from 'react'
import '../OrderList.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import axios from 'axios';
import OrderExecutionForm from "./OrderExecutionForm";
import AssignedOrderTable from "./AssignedOrderTable";
import { PDFViewer } from "@react-pdf/renderer";
import AssignedOrderReport from './AssignedOrderReport';
import { Button, Modal } from "react-bootstrap"
axios.defaults.baseURL = "http://localhost:8070/";

const AssignedOrderList = () => {

    const [items, setItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({ });
    const [clearFilter, setClearFilter] = useState(false);

    const handleClosePopup = () => setShowPopup(false);


    useEffect(() => {
        getOrderList();  // load data initially
    }, []);

    useEffect(() => {
        if (!showPopup) {
            getOrderList();
        }
    }, [showPopup]);

    const getOrderList = async () => {
        try {
            const response = await axios.get("/op/pendingOrderList");
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


    const handleSearchOnClick = async (filterData) => {
        try {
            const response = await axios.post("/op/pendingOrderList", filterData);
            setItems(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting filtered data");
            }
        }
    }

    const handleExecute = (item) =>{
        setFormData({
            id: item._id,
            orderId: item.orderId,
            fruit: item.fruit,
            category: item.category,
            quality: item.quality,
            quantity: item.quantity,
            customer: item.customer,
            placedDate: item.placedDate,
            dueDate: item.dueDate,
            opId: item.opId,
            opName: item.opName
        })
        setShowPopup(true);
    };

     //pdf
     const [showReportModal, setShowReportModal] = useState(false);
     const handleCloseReportModal = () => setShowReportModal(false);
     const handleShowReportModal = () => setShowReportModal(true);

    return (
        <main className='main' id='main'>
            <div className="body" id='body'>
                <div className="card recent-sales overflow-auto">

                    {/* ---------------------------table filter---------------------- */}
                    <div className="card-body">
                        <div className="page-header">
                            <div className="add-item d-flex">

                              {/* --------------------------table name ---------------------------*/}
                                <div className="card-title">Assigned Orders
                                    <h6></h6>
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
                                                tag: "fruit"
                                            },
                                            {
                                                name: "Fruit Category",
                                                tag: "category"
                                            },
                                            {
                                                name: "Quality",
                                                tag: "quality"
                                            },
                                            {
                                                name: "Quantity",
                                                tag: "quantity"
                                            },
                                            {
                                                name: "Placed Date",
                                                tag: "placedDate"
                                            },
                                            {
                                                name: "Due Date",
                                                tag: "dueDate"
                                            }
                                         ]
                                     }
                                     clearInputField={clearFilter}
                                     handleSearch={handleSearchOnClick}
                                />
                            </div>
                            <div className="scrollable-content-x">
                                <AssignedOrderTable items={items} updateTable={getOrderList} handleExecute={handleExecute}/>
                            </div>
                        </div>
                        <div>
                            <OrderExecutionForm
                                show={showPopup}
                                onHide={handleClosePopup}
                                formData={formData}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default AssignedOrderList;
