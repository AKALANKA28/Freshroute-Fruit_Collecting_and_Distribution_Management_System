import React,{useState, useEffect} from 'react'
import '../OrderList.css'
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from '../SearchBar'
import axios from 'axios';
import CompletedOrderTable from './CompletedOrderTable';
import { PDFViewer } from "@react-pdf/renderer";
import CompletedOrderReport from "./CompletedOrderReport";
import { Button, Modal } from "react-bootstrap";
import * as XLSX from "xlsx";
import { writeFile } from "xlsx";
import CompltedExecutionForm from "./CompltedExecutionForm";
axios.defaults.baseURL = "http://localhost:8070/";

const CompletedOrderList = () => {

    const [items, setItems] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({});
    const [clearFilter, setClearFilter] = useState(false);


    const handleClosePopup = () => setShowPopup(false);


    useEffect(() => {
        getOrderList();  // load data initially
    }, []);

    const getOrderList = async () => {
        try {
            const response = await axios.get("/op/completedOrderList");
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
            const response = await axios.post("/op/CompletedOrderList", filterData);
            setItems(response.data);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting filtered data");
            }
        }
    }

    const handleView = (item) =>{
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

    //excel
    const generateExcelFile = () => {
        // Define the worksheet
        const ws = XLSX.utils.json_to_sheet(items);
      
        // Define the workbook
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Completed Order Report");
      
        // Generate the Excel file
        writeFile(wb, "completed_order_report.xlsx");
      };
      
      const handleExcelButtonClick = () => {
        getOrderList(); // Fetch the latest data if needed
        generateExcelFile();
      };

    return (
        <main className='main'>
            <div className="body" id='body'>
                <div className="card recent-sales overflow-auto">

                    {/* ---------------------------table filter---------------------- */}
                    <div className="card-body">
                        <div className="page-header">
                            <div className="add-item d-flex">

                              {/* --------------------------table name ---------------------------*/}
                                <div className="card-title">Completed Orders
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
                                            <a onClick={handleExcelButtonClick}>  
                                                <img src={Excel} alt="Excel Icon" className="icon"/>
                                            </a>
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
                                <Modal.Title>Completed Order Details</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <PDFViewer width="100%" height="500px">
                                <CompletedOrderReport dataList={items} />
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
                                <CompletedOrderTable items={items} handleView={handleView}/>
                            </div>
                        </div>
                        <div>
                            <CompltedExecutionForm
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
export default CompletedOrderList;
