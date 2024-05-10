import React from 'react';
import {Modal} from 'react-bootstrap';

function ConfirmationPopup({message, onConfirm, show, handleClose}) {

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>{message}</Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-light" onClick={handleClose}>Cancel</button>
                    <button type="button" className="btn btn-warning" onClick={handleConfirm}>Confirm</button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ConfirmationPopup;
