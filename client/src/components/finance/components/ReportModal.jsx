import React from "react";
import { Modal, Button } from "react-bootstrap";
import { PDFViewer } from "@react-pdf/renderer";
import SalesReport from "../body/Sales/SalesReport";
import './components.css'
function ReportModal({ show, handleClose, dataList }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <PDFViewer className="pdf-viewer" width="100%" height="500px">
          <SalesReport dataList={dataList} />
        </PDFViewer>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ReportModal;
