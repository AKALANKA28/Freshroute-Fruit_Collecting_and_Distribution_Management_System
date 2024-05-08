import React, {useState, useEffect} from 'react'
import '../OrderList.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import axios from 'axios';
import OngoingOrderTable from "./OngoingOrderTable";
import OngoingOrderExecutionForm from "./OngoingOrderExecutionForm";
import { PDFViewer } from "@react-pdf/renderer";
import OngoingOrderReport from './OngoingOrderReport';
import { Button, Modal } from "react-bootstrap";

axios.defaults.baseURL = "http://localhost:8070/";
const OngoingOrderList = () => {

    const [items, setItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({});
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
            const response = await axios.get("/op/ongoingOrderList");
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
            const response = await axios.post("/op/ongoingOrderList", filterData);
            setItems(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting filtered data");
            }
        }
    }

    const handleExecute = (item) => {
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
            opName: item.opName,
            executionHistory: item.executionHistory,
            filledQuantity: item.filledQuantity,
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
                                <div className="card-title">Ongoing Orders
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
                                <Modal.Title>Ongoing Order Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PDFViewer width="100%" height="500px">
                                <OngoingOrderReport dataList={items} />
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
                            <div className="text-end" style={{marginRight: '30px'}}>
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
                                                }
                                               ]
                                           }
                                           clearInputField={clearFilter}
                                           handleSearch={handleSearchOnClick}
                                />
                            </div>
                            <div className="scrollable-content-x">
                                <OngoingOrderTable items={items} updateTable={getOrderList}
                                                    handleExecute={handleExecute}/>
                            </div>
                        </div>
                        <div>
                            <OngoingOrderExecutionForm
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
export default OngoingOrderList
