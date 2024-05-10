import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function SalesPopupForm({ show, onHide, formData, isEdit, handleSubmit, handleOnChange }) {

    const [fruitType, setFruitType] = useState(["Mango", "Banana", "Apple"]);
    const [grade, setGrade] = useState(["A", "B", "C"]);

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


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit? "Edit Sales" : "Add Sales"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleOnSubmit}>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="fromFruitType">
                        <Form.Label>Customer Name</Form.Label>
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
                            {grade.map((value, index) => (
                                <option key={index} value={value}>{value}</option>
                            ))}
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

export default SalesPopupForm;
