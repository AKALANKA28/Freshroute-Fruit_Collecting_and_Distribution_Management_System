import React, {useEffect, useState} from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8070/";
function QualityPopupForm({ show, onHide, formData, isEdit, handleSubmit, handleOnChange }) {

    const [fruitDetail, setFruitDetail] = useState({});
    const [fruitCategory, setFruitCategory] = useState({});
    const [grade, setGrade] = useState([]);
    const [inputFieldDisable, setInputDisable] = useState({
        category: true,
        grade: true
    });

    useEffect(() => {
        if (show && !isEdit) {
            getDetail();
        }
        if (isEdit) {
            setInputDisable({ category: true, grade: true})
        }
    }, [show])

    const handleChange = (event) => {
        handleOnChange(event);
    };

    const handleOnSubmit = (event) => {
        event.preventDefault();
        const formData1 = new FormData(event.target);
        const formDataObj = Object.fromEntries(formData1.entries());
        formDataObj.qualityStatus = 1;
        handleSubmit(formDataObj);
        onHide();
    };

    const getDetail = async () => {
        try {
            const response = await axios.get("/om/quality/categorizedData");
            const fruitTypes = response.data;
            if (fruitTypes) {
                setFruitDetail(fruitTypes);
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                alert(err.response.data.error);
            } else {
                alert("An error occurred while getting categorized quality list");
            }
        }
    }

    const fruitOnChange = (e) => {
        if (isEdit) {
            return;
        }
        const { value } = e.target;
        if (value === "") {
            setFruitCategory({});
            setInputDisable({ category: true, grade: true});
        } else {
            setFruitCategory(fruitDetail[value]);
            setInputDisable({ category: false, grade: true})
        }
        setGrade([]);
        handleOnChange(e);
    }

    const categoryOnChange = (e) => {
        if (isEdit) {
            return;
        }
        const { value } = e.target;
        if (value === "") {
            setInputDisable({ category: false, grade: true});
            setGrade([])
        } else {
            setGrade(fruitCategory[value]);
            setInputDisable({ category: false, grade: false})
        }
        handleOnChange(e);
    }
    const gradeOnChange = (e) => {
        if (isEdit) {
            return;
        }
        const{ value } = e.target

        grade.map((obj) => {
            if (obj.quality === value) {
                e.target.selectedId = obj.id;
            }
        })

        handleOnChange(e);
    }

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{isEdit? "Edit Quality" : "Add Quality"}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleOnSubmit}>
                <Modal.Body>
                    <div className="scrollable-content-y">
                        <Form.Group className="mb-3" controlId="fromFruitName">
                            <Form.Label>Fruit Type</Form.Label>
                            <Form.Select name="fruit" required onChange={fruitOnChange} value={formData.fruit}
                                         disabled={isEdit}>
                                <option value="">{isEdit ? formData.fruit : "Select Fruit"}</option>
                                {!isEdit && Object.keys(fruitDetail).map((fruit, index) => (
                                    <option key={index} value={fruit}>
                                        {fruit}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="fromFruitCategory">
                            <Form.Label>Fruit Category</Form.Label>
                            <Form.Select name="category" required onChange={categoryOnChange} value={formData.category}
                                         disabled={inputFieldDisable.category}>
                                <option value="">{isEdit ? formData.category : "Select Category"}</option>
                                {!isEdit && Object.keys(fruitCategory).map((category, index) => (
                                    <option key={index} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGrade">
                            <Form.Label>Grade</Form.Label>
                            <Form.Select name="quality" required onChange={gradeOnChange} value={formData.quality}
                                         disabled={inputFieldDisable.grade}>
                                <option value="">{isEdit ? formData.quality : "Select Grade"}</option>
                                {!isEdit && grade.map((grade, index) => (
                                    <option key={index} value={grade['quality']}>
                                        {grade['quality']}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formId" hidden={true}>
                            <Form.Label>Id</Form.Label>
                            <Form.Control type="text" name="id" required placeholder="Description" value={formData.id}
                                          onChange={handleChange}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formDescription">
                            <Form.Label>Quality Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="qualityDesc"
                                required
                                placeholder="Description"
                                value={formData.qualityDesc}
                                onChange={handleChange}
                                rows={4} // Adjust the number of rows as needed
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formStorageCondition">
                            <Form.Label>Storage Conditions</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="storageCond"
                                required
                                placeholder="Description"
                                value={formData.storageCond}
                                onChange={handleChange}
                                rows={4} // Adjust the number of rows as needed
                            />
                        </Form.Group>
                    </div>

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
