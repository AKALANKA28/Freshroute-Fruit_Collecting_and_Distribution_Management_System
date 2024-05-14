import React, { useState, useEffect } from "react";
import "../Expenses/expense.css";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from "../../components/SearchBar";
import PaymentsTable from "./PaymentsTable";

import axios from "axios";
// import QualityPopupForm from "./QualityPopupForm";
axios.defaults.baseURL = "http://localhost:8070/";
const Payments = () => {
  const [items, setItems] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tab, setTab] = useState("A");
  const [isEdit, setIsEdit] = useState(false);
  const [showModal, setShowModal] = useState(false);



  const handleSearchOnClick = async (filterData) => {
    try {
      const response = await axios.post(
        "/om/quality/filteredQualities",
        filterData
      );
      setItems(response.data);
      setTableData(items.filter((item) => item.quality === tab));
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error);
      } else {
        alert("An error occurred while getting filtered data");
      }
    }
  };

  const handleTabChange = (value) => {
    setTab(value);
    setTableData(items.filter((item) => item.quality === value));
  };

  return (
    <main className="main">
      <div className="body" id="body">
        <div className="card recent-sales overflow-auto">
          {/* ---------------------------table filter---------------------- */}
          <div
            className="card-body"
            style={{ minHeight: "615px", maxHeight: "615px" }}
          >
            <div className="page-header">
              <div className="add-item d-flex">
                {/* --------------------------table name ---------------------------*/}
                <div className="card-title">
                  Payments Details<span></span>
                  <h6>Manage Your Payments</h6>
                </div>
              </div>

              {/*---------------- pdf,excel report generating icon and refresh -------------------*/}
              <ul className="table-top-head">
                <li>
                  <div className="button-container">
                    <a href="#">
                      <img src={Pdf} alt="Pdf Icon" className="icon" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="button-container">
                    <a href="#">
                      <img src={Excel} alt="Excel Icon" className="icon" />
                    </a>
                  </div>
                </li>
                <li>
                  <div className="button-container">
                    <a href="#" onClick={{}}>
                      <img src={Refresh} alt="Refresh Icon" className="icon" />
                    </a>
                  </div>
                </li>
              </ul>

              {/* --------------------add button------------------ */}

              {/* --------------------imported search bar and table data ------------------------*/}
            </div>
            <div className="w-100"></div>
            <ul
              className="nav nav-tabs m-0 mt-2 pt-0 pb-0 justify-content-start border-bottom"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item m-0" role="presentation">
                <button
                  className="nav-link active tab-height active-tab"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="home-tab-pane"
                  aria-selected="true"
                  onClick={() => handleTabChange("A")}
                >
                  Vehicle Owners' Payments
                </button>
              </li>
              <li className="nav-item m-0" role="presentation">
                <button
                  className="nav-link tab-height"
                  id="profile-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#profile-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="profile-tab-pane"
                  aria-selected="false"
                  onClick={() => handleTabChange("B")}
                >
                  Farmers' Payments
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link tab-height"
                  id="contact-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#contact-tab-pane"
                  type="button"
                  role="tab"
                  aria-controls="contact-tab-pane"
                  aria-selected="false"
                  onClick={() => handleTabChange("C")}
                >
                  Employees' Payments
                </button>
              </li>
              <li className="nav-item w-75 text-end">
                {/* <SearchBar enableFilterType={true}
             filterColumns={
                 [
                     {
                         name: "Fruit Type",
                         tag: "fruit"
                     },
                     {
                         name: "Fruit Category",
                         tag: "category"
                     },
                     {
                         name: "Grade",
                         tag: "quality"
                     },
                     {
                         name: "Quality Description",
                         tag: "qualityDesc"
                     },
                     {
                         name: "Storage Conditions",
                         tag: "storageCond"
                     }
                 ]
             }
             handleSearch={handleSearchOnClick}
        /> */}
              </li>
            </ul>

            <PaymentsTable items={tableData} />
          </div>
        </div>
      </div>
    </main>
  );
};
export default Payments;
