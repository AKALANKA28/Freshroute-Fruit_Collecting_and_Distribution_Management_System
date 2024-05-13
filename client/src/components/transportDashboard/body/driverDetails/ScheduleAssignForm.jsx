import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import "./OrderList.css"
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8070/";
function ScheduleAssignForm({ show, onHide, formData, handleSubmit, handleOnChange }) {

    const [vehicle, setVehicle] = useState([]);

    useEffect(() => {
        if (show) {
            getVehicle()
        }
    }, [show])

    const handleVehicleChange = (event) => {
        const { value } = event.target;
        vehicle.map((op) => {
            if (op.id === value) {
                event.target.opName = op.name;
                event.target.opId = value;
            }
        })
        handleOnChange(event);
    };

    const handleOnSubmit = () => {
        handleSubmit();
        onHide();
    };

    const getVehicle = async () => {
        try {
            const response = await axios.get("/vehicle/");
            const vehicleList = response.data;
            if (vehicleList) {
                setVehicle(vehicleList.opList);
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
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" name="fruit" readOnly={true} value={formData.fruit} disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Driver Name</Form.Label>
                            <Form.Control type="text" name="category" readOnly={true} value={formData.category}
                                          disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuality">
                            <Form.Label>Pickup Location</Form.Label>
                            <Form.Control type="text" name="quality" readOnly={true} value={formData.quality} disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formCustomer">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control type="text" name="customer" readOnly={true} value={formData.customer}
                                          disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formQuantity">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="text" name="quantity" readOnly={true} value={formData.quantity}
                                          disabled={true}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="vehicle">
                            <Form.Label>Vehicle</Form.Label>
                            <Form.Select name="vehicle" required onChange={handleVehicleChange} value={formData.opId}>
                                <option value="">Select Vehicle</option>
                                {vehicle.map((vehicle, index) => (
                                    <option key={index} value={vehicle.id}>
                                        {vehicle.vehicle_no}
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

export default ScheduleAssignForm;
