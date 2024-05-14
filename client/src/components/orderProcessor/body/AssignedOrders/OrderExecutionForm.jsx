import React, {useEffect, useRef, useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import "../OrderList.css"
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8070/";

function OrderExecutionForm({show, onHide, formData}) {

    const [supplier, setSupplier] = useState(null);
    const [supplierList, setSupplierList] = useState([]);
    const [executionDetails, setExecutionDetails] = useState([]);
    const [invalidQuantity, setInvalidQuantity] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const quantityInputRef = useRef(null);
    const [ totalFilledQuantity,setTotalFiledQuantity ] = useState(0);

    useEffect(() => {
        if (show) {
            setQuantity(0);
            setInvalidQuantity(false);
            setSupplier(null);
            setExecutionDetails([]);
            setTotalFiledQuantity(0);
            getSupplierList();
        }
    }, [show]);


    const handleOrderSupplierChange = (event) => {
        const {value} = event.target;
        if (value === "") {
            setSupplier(null);
        } else {
            changeSupplier(value);
        }

        setTimeout(()=>{
            quantityInputRef.current.focus();
        },5)
        setQuantity('')
    };
    const changeSupplier = (id) => {
        const selectedSupplier = supplierList.find(sp => sp._id === id);
        if (selectedSupplier) {
            setSupplier({
                supplierName: selectedSupplier.supplierName,
                supplierId: selectedSupplier._id,
                quantity: selectedSupplier.quantity,
                price: selectedSupplier.price
            });
        }
    }

    const getSupplierList = async () => {
        try {
            const request = {
                fruit: formData.fruit,
                category: formData.category,
                quality: formData.quality
            }
            const response = await axios.post("/op/supplierList", request);
            setSupplierList(response.data)
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting supplier list");
            }
        }
    }

    const handleAdd = (event) => {
        let fillingQty = parseFloat(quantity);
        let totalFilledQty = parseFloat(totalFilledQuantity) + fillingQty;
        if (totalFilledQty > formData.quantity) {
            fillingQty= parseFloat(formData.quantity)-parseFloat(totalFilledQuantity);
            totalFilledQty = parseFloat(formData.quantity);
            setQuantity(0);
        }
        let remainingQty;
        const updatedSupplierList = supplierList.map((sp) => {
            if (sp._id === supplier.supplierId) {
                remainingQty = parseFloat(sp.quantity) - fillingQty;
                setSupplier({...supplier, quantity:remainingQty})
                return {...sp, quantity: remainingQty}
            } else {
                return sp;
            }
        })
        setSupplierList(updatedSupplierList);
        createExecutionDetailRecord(fillingQty);
        if ((parseFloat(quantity) > remainingQty)) {
            setInvalidQuantity(true);
        }
        setTotalFiledQuantity(totalFilledQty)
    }

    const createExecutionDetailRecord = (fillingQty) => {
        const existingRecord = executionDetails.find(exe => exe.supplierId === supplier.supplierId);
        if (existingRecord) {
            const updatedExeDetails = executionDetails.map((exe) => {
                if (exe.supplierId === supplier.supplierId) {
                    const qty = parseFloat(exe.quantity) + parseFloat(fillingQty);
                    return {...exe, quantity: qty, time: new Date()}
                } else {
                    return exe;
                }
            })
            setExecutionDetails(updatedExeDetails);
        } else {
            const exeRecord = {
                supplierId: supplier.supplierId,
                supplierName: supplier.supplierName? supplier.supplierName: "Heshan Perera",
                quantity: fillingQty,
                price: supplier.price,
                time: new Date()
            }
            const newExecutionHistory = [...executionDetails, exeRecord];
            setExecutionDetails(newExecutionHistory);
        }
    }
    const handleDelete = (item) => {

        const updatedSupplierList = supplierList.map((sp) => {
            if (sp._id === item.supplierId) {
                const newQty = parseFloat(sp.quantity) + parseFloat(item.quantity);
                if (supplier.supplierId === item.supplierId) {
                    setSupplier({...supplier, quantity:newQty})
                }
                return {...sp, quantity: newQty}
            } else {
                return sp;
            }
        })
        setSupplierList(updatedSupplierList);
        removeExecutionDetailRecord(item.supplierId);
        const newTotalQuantity = parseFloat(totalFilledQuantity) - parseFloat(item.quantity);
        setTotalFiledQuantity(newTotalQuantity);
    }
    const removeExecutionDetailRecord = (supplierId) => {
        const remainingRecords = executionDetails.filter((item, index) => item.supplierId !== supplierId);
        if (remainingRecords) {
            setExecutionDetails(remainingRecords);
        }
    }

    const handleQuantityChange = (event) => {
        const maxSupQty = parseFloat(supplier.quantity);
        const quantity = event.target.value;
        setQuantity(quantity);
        if (!quantity || (parseFloat(quantity) > maxSupQty) || parseFloat(quantity) <= 0) {
            setInvalidQuantity(true)
        } else {
            setInvalidQuantity(false)
        }
    }


    const handleSaveExecution = async (event) =>{
        event.preventDefault();
        let status = "IN_PROGRESS";
        if (parseFloat(totalFilledQuantity) === parseFloat(formData.quantity)) {
            status = "COMPLETED";
        }
        const data= {
            id: formData.id,
            orderId: formData.orderId,
            executionDetails: executionDetails,
            status:status,
            filledQuantity: totalFilledQuantity
        }
        try {
            const response = await axios.post("/op/executeOrder", data);
            const  supResponse = await axios.post("/op/updateSupplierDetails", {supplierList: supplierList})
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while adding");
            }
        }
        onHide();
    }


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
                            <label className="form-label">Quantity(kg)</label>
                            <input className="form-control" type="text" name="quantity" readOnly={true}
                                   value={formData.quantity}
                                   disabled={true}/>
                        </div>
                        <div className="col-6"></div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Supplier</label>
                        <select className="form-select" name="supplier" required disabled={totalFilledQuantity >= formData.quantity}
                                onChange={handleOrderSupplierChange} value={supplier? supplier.supplierId: "" }>
                            <option value="">Select Supplier</option>
                            { supplierList && supplierList.map((sp, index) => (
                                <option key={index} value={sp._id}>
                                    Supplier: {sp.supplierName? sp.supplierName: "Heshar Perera"} &nbsp;&nbsp;&nbsp;  Quantity: {sp.quantity}  &nbsp;&nbsp;&nbsp;  Price: {sp.price}/=
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="row mb-3">
                        <div className="col-6">
                            <label className="form-label">Enter Quantity:</label>
                            <input className={`form-control  ${invalidQuantity ? 'is-invalid' : ''}`} type="number" name="fillingQuantity"
                                   value={quantity}
                                   disabled={!supplier || totalFilledQuantity>= formData.quantity}
                                   onChange={handleQuantityChange}
                                   ref={quantityInputRef}
                                   />
                        </div>
                        <div className="col-3 d-flex flex-row">
                            <button type="button" disabled={!supplier || invalidQuantity || quantity ==='' || totalFilledQuantity >= formData.quantity}
                                    className="btn btn-primary align-self-end w-100" onClick={handleAdd}> ADD +
                            </button>
                        </div>
                    </div>

                    <table className="table table-bordeless datatable">
                        <thead className="table-light">
                        <tr>
                            <th className="col">Supplier</th>
                            <th className="col">Quantity</th>
                            <th className="col">Price</th>
                            <th className="col">Cost (Rs)</th>
                            <th className="col">Action</th>
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
                                    <td>
                                        <div className="buttons">
                                            <button className="btn-table delete" type="button" onClick={() =>handleDelete(item)}>
                                                <i className="bi bi-trash3-fill"></i>
                                            </button>
                                        </div>
                                    </td>
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
                <Button variant="secondary"
                        type="button"
                        disabled={executionDetails.length<=0}
                        onClick={handleSaveExecution}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default OrderExecutionForm;
