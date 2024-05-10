import React, {useEffect, useRef, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import "../OrderList.css"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8070/";

function OrderExecutionForm({show, onHide, formData}) {

    const [executionDetails, setExecutionDetails] = useState([]);
    const [ totalFilledQuantity,setTotalFiledQuantity ] = useState(0);

    useEffect(() => {
        if (show) {
            setExecutionDetails(formData.executionHistory);
            setTotalFiledQuantity(formData.filledQuantity);
        }
    }, [show]);


    return (
        <Modal show={show} onHide={onHide}  size="lg">
            <Modal.Header closeButton >
                <Modal.Title>Order Execution</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="w-100 row  mb-1 p-0">
                    <div className="col-2"></div>
                    <div className="col-10 d-flex flex-row justify-content-end p-0" style={{paddingLeft: '10px'}}>
                        <label style={{
                            margin: 0,
                            alignSelf: "center",
                            textAlign: "center",
                            marginRight: '10px',
                            marginLeft: '50px'
                        }}>Filled Quantity : </label>
                        <input className="form-control" style={{width: '200px'}} type="text" name="orderId"
                               value={totalFilledQuantity} readOnly={true}/>
                    </div>
                </div>
                <div className="scrollable-content-y">
                    <div className="row mb-3 ">
                        <div className="col-6">
                            <label className="form-label">Fruit Type:</label>
                            <input className="form-control" type="text" name="fruit" readOnly={true}
                                   value={formData.fruit}
                                   disabled={true}/>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Fruit Category:</label>
                            <input className="form-control" type="text" name="category" readOnly={true}
                                   value={formData.category}
                                   disabled={true}/>
                        </div>
                    </div>
                    <div className="row mb-3 ">
                        <div className="col-6">
                            <label className="form-label">Quality:</label>
                            <input className="form-control" type="text" name="quality" readOnly={true}
                                   value={formData.quality}
                                   disabled={true}/>
                        </div>
                        <div className="col-6">
                            <label className="form-label">Customer:</label>
                            <input className="form-control" type="text" name="customer" readOnly={true}
                                   value={formData.customer}
                                   disabled={true}/>
                        </div>
                    </div>
                    <div className="row mb-3 ">
                        <div className="col-6">
                            <label className="form-label">Quantity</label>
                            <input className="form-control" type="text" name="quantity" readOnly={true}
                                   value={formData.quantity}
                                   disabled={true}/>
                        </div>
                        <div className="col-6"></div>
                    </div>



                    <table className="table table-bordeless datatable">
                        <thead className="table-light">
                        <tr>
                            <th className="col">Supplier</th>
                            <th className="col">Quantity (kg)</th>
                            <th className="col">Price</th>
                            <th className="col">Cost (Rs)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {executionDetails &&
                            executionDetails.length > 0 &&
                            executionDetails.map((item) => (
                                <tr key={item.supplierId} style={{minHeight:'100px'}}>
                                    <td>{item.supplierName}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.price}</td>
                                    <td>{parseFloat(item.quantity) * parseFloat(item.price)}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="Success" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderExecutionForm;
