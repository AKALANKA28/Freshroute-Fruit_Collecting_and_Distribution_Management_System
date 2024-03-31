import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8070/";
function QualityPopupForm({ show, onHide, formData, isEdit, handleSubmit, handleOnChange }) {

    const [fruitType, setFruitType] = useState([]);

    useEffect(() => {
        if (show) {
            getFruitTypes();
        }
    }, [show])

    const handleChange = (event) => {
        handleOnChange(event);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const formData1 = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData1.entries());
        handleSubmit(formDataObj);
        onHide();
    };

    const getFruitTypes = async () => {
        try {
            const response = await axios.get("/FruitType");
            const fruitTypes = response.data;
            if (fruitTypes) {
                const fruitTypeNames = fruitTypes.map((ft)=> ft.name);
                setFruitType(fruitTypeNames);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting quality list");
            }
        }
    }
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit? "Edit Quality" : "Add Quality"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleOnSubmit}>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="fromFruitType">
                        <Form.Label>Fruit Type</Form.Label>
                        <Form.Select name="fruitCategory" required onChange={handleChange} value={formData.fruitCategory}>
                            <option value="">Select Category</option>
                            {fruitType.map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="fromQualityCategory">
                        <Form.Label>Grade</Form.Label>
                        <Form.Select name="grade" required onChange={handleChange} value={formData.grade}>
                            <option value="">Select Grade</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formDescription">
                        <Form.Label>Fruit </Form.Label>
                        <Form.Control type="text" name="qualityDesc" required placeholder="Description" value={formData.qualityDesc} onChange={handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStorageCondition">
                        <Form.Label>Storage Conditions</Form.Label>
                        <Form.Control type="text" name="storageCond" required placeholder="Description" value={formData.storageCond} onChange={handleChange}/>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="Success" onClick={onHide}>
                        Close
                    </Button>
                    <Button variant="secondary" type="submit">
                        Submit
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default QualityPopupForm;
