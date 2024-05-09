import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import SalesReport from "../body/Sales/SalesReport";
function PDFReport({ dataList }) {
  return (
    <div>
      <PDFViewer width="1000" height="650" className="app">
        <SalesReport dataList={dataList} />
      </PDFViewer>
    </div>
  );
}

export default PDFReport;
