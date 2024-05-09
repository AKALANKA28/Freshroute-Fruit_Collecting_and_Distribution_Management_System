import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./OrderList.css"
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8070/";
function OrderAssignForm({ show, onHide, formData, handleSubmit, handleOnChange }) {

    const [orderProcessor, setOrderProcessor] = useState([]);

    useEffect(() => {
        if (show) {
            getOrderProcessor()
        }
    }, [show])

    const handleOrderProcessorChange = (event) => {
        const { value } = event.target;
        orderProcessor.map((op) => {
            if (op._id === value) {
                event.target.opName = op.name;
                event.target.opId = value;
            }
        })
        handleOnChange(event);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault()
        handleSubmit();
        onHide();
    };

    const getOrderProcessor = async () => {
        try {
            const response = await axios.get("/om/processorList");
            const orderProcessorList = response.data;
            if (orderProcessorList) {
                setOrderProcessor(orderProcessorList);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting categorized quality list");
            }
        }
    }


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Assign Order</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleOnSubmit}>
                <Modal.Body>
                    <div className="scrollable-content-y" >
                        <Form.Group className="mb-3" controlId="formOrderId" hidden={true} >
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" name="orderId" value={formData.orderId} readOnly={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formFruit">
                            <Form.Label>Fruit Type</Form.Label>
                            <Form.Control type="text" name="fruit" readOnly={true} value={formData.fruit} disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Fruit Category</Form.Label>
                            <Form.Control type="text" name="category" readOnly={true} value={formData.category}
                                          disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuality">
                            <Form.Label>Quality</Form.Label>
                            <Form.Control type="text" name="quality" readOnly={true} value={formData.quality} disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCustomer">
                            <Form.Label>Customer</Form.Label>
                            <Form.Control type="text" name="customer" readOnly={true} value={formData.customer}
                                          disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Quantity (kg)</Form.Label>
                            <Form.Control type="text" name="quantity" readOnly={true} value={formData.quantity}
                                          disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="fromOrderProcessor">
                            <Form.Label>Order Processor</Form.Label>
                            <Form.Select name="orderProcessor" required onChange={handleOrderProcessorChange} value={formData.opId}>
                                <option value="">Select Order Processor</option>
                                {orderProcessor.map((op, index) => (
                                    <option key={index} value={op._id}>
                                        {op.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="Success" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="secondary" type="submit">
                        Assign
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default OrderAssignForm;
