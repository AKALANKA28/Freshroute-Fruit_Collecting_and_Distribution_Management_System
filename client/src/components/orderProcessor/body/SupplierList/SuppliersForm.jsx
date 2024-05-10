import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "../OrderList.css"
import axios from "axios";

function SuppliersForm({ show, onHide, formData }) {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Form onSubmit={(event)=>{event.preventDefault(); onHide();}}>
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
                            <Form.Select name="orderProcessor" disabled={true} >
                                <option value="">{formData.opId}</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="Success" onClick={onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default SuppliersForm;
