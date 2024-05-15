import React, { useState } from "react";
import "../Expenses/expense.css";
import Excel from "../../../../assests/img/icons/excel.png";
import Pdf from "../../../../assests/img/icons/pdf.png";
import Refresh from "../../../../assests/img/icons/refresh.png";
import SearchBar from "../../components/SearchBar";
import PaymentsTable from "./PaymentsTable";
import StaffPayments from "./StaffPayments";

const Payments = () => {
  const [tab, setTab] = useState("A");

  const handleTabChange = (value) => {
    setTab(value);
  };

  return (
    <main className="main">
      <div className="body" id="body">
        <div className="card recent-sales overflow-auto">
          <div
            className="card-body"
            style={{ minHeight: "615px", maxHeight: "615px" }}
          >
            <div className="page-header">
              <div className="add-item d-flex">
                <div className="card-title">
                  Payments Details<span></span>
                  <h6>Manage Your Payments</h6>
                </div>
              </div>

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
                    <a href="#" onClick={() => handleTabChange(tab)}>
                      <img src={Refresh} alt="Refresh Icon" className="icon" />
                    </a>
                  </div>
                </li>
              </ul>
            </div>
            <div className="w-100"></div>
            <ul
              className="nav nav-tabs m-0 mt-2 pt-0 pb-0 justify-content-start border-bottom"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item m-0" role="presentation">
                <button
                  className={`nav-link ${tab === 'A' ? 'active' : ''} tab-height active-tab`}
                  onClick={() => handleTabChange("A")}
                >
                  Vehicle Owners' Payments
                </button>
              </li>
              <li className="nav-item m-0" role="presentation">
                <button
                  className={`nav-link ${tab === 'B' ? 'active' : ''} tab-height`}
                  onClick={() => handleTabChange("B")}
                >
                  Employees' Payments
                </button>
              </li>
              <li className="nav-item" role="presentation">
                <button
                  className={`nav-link ${tab === 'C' ? 'active' : ''} tab-height`}
                  onClick={() => handleTabChange("C")}
                >
                  Farmers' Payments
                </button>
              </li>
              <li className="nav-item w-75 text-end">
                {/* Your search bar */}
              </li>
            </ul>

            {tab === 'A' && <PaymentsTable />}
            {tab === 'B' && <StaffPayments />}
            {/* Add other tab components as needed */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payments;
