import React, { useEffect, useState } from "react";
import CardFilter from "./CardFilter";

const TopCards = () => {
  const [totalSalesAmount, setTotalSalesAmount] = useState(0);
  const [totalExpenseAmount, setTotalExpenseAmount] = useState(0);
  const [totalRevenueAmount, setTotalRevenueAmount] = useState(0);
  const [filter, setFilter] = useState("This Week");

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  useEffect(() => {
    const fetchSales = async () => {
      try {
        let url;
        switch (filter) {
          case "Today":
            url = "http://localhost:8070/user/allorders?date=today";
            break;
          case "Week":
            url = "http://localhost:8070/user/allorders?date=week";
            break;
          case "Month":
            url = "http://localhost:8070/user/allorders?date=month";
            break;
          case "Year":
            url = "http://localhost:8070/user/allorders?date=year";
            break;
          default:
            url = "http://localhost:8070/user/allorders";
        }
        const response = await fetch(url);
        const data = await response.json();
        const sum = data.reduce((total, sale) => total + sale.totalPrice, 0);
        setTotalSalesAmount(sum);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };

    const fetchExpenses = async () => {
      try {
        let url;
        switch (filter) {
          case "Today":
            url = "http://localhost:8070/expense?date=today";
            break;
          case "Week":
            url = "http://localhost:8070/expense?date=week";
            break;
          case "Month":
            url = "http://localhost:8070/expense?date=month";
            break;
          case "Year":
            url = "http://localhost:8070/expense?date=year";
            break;
          default:
            url = "http://localhost:8070/expense";
        }
        const response = await fetch(url);
        const data = await response.json();
        const sum = data.reduce((total, expense) => total + expense.amount, 0);
        setTotalExpenseAmount(sum);
      } catch (error) {
        console.error("Error fetching expenses data:", error);
      }
    };

    const fetchRevenue = async () => {
      try {
        let url;
        switch (filter) {
          case "Today":
            url = "http://localhost:8070/revenue?date=today";
            break;
          case "Week":
            url = "http://localhost:8070/revenue?date=week";
            break;
          case "Month":
            url = "http://localhost:8070/revenue?date=month";
            break;
          case "Year":
            url = "http://localhost:8070/revenue?date=year";
            break;
          default:
            url = "http://localhost:8070/revenue";
        }
        const response = await fetch(url);
        const data = await response.json();
        setTotalRevenueAmount(data.totalRevenue || 0);
      } catch (error) {
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchSales();
    fetchExpenses();
    fetchRevenue();
  }, [filter]);

  
  return (
    <div>
      <div className="col-12">
        <div className="row">
          <div className="col-xxl-4  col-md-6">
            <div className="card info-card sales-card">
              <CardFilter filterChange={handleFilterChange} />
              <div className="card-body">
                <h5 className="card-title">
                  Income<span> | {filter} </span>
                </h5>

                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-cart"></i>
                  </div>
                  <div className="ps-3">
                    <h6 className="card-price">
                      Rs. {totalSalesAmount.toLocaleString("en-US")}
                    </h6>

                    {/* <span className= {`${
                                sales.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`} */}
                    <span className="text-danger small pt-1 fw-bold">
                      {" "}
                      -2%
                      {/* {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                % */}
                    </span>
                    <span className="text-muted small pt-2 ps-1">
                      decrease
                      {/* {card.percentage > 0 ? 'increase' : 'decrease'} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
              <CardFilter filterChange={handleFilterChange} />
              <div className="card-body">
                <h5 className="card-title">
                  Expense<span> | {filter} </span>
                </h5>

                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-graph-down"></i>{" "}
                  </div>
                  <div className="ps-3">
                    <h6 className="card-price">
                      Rs. {totalExpenseAmount.toLocaleString("en-US")}
                    </h6>
                    {/* <span className= {`${
                                sales.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`} */}
                    <span className="text-success small pt-1 fw-bold">
                      {" "}
                      5%
                      {/* {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                % */}
                    </span>
                    <span className="text-muted small pt-2 ps-1">
                      increase
                      {/* {card.percentage > 0 ? 'increase' : 'decrease'} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
              <CardFilter filterChange={handleFilterChange} />
              <div className="card-body">
                <h5 className="card-title">
                  Revenue<span> | {filter} </span>
                </h5>

                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i class="bi bi-graph-up-arrow"></i>{" "}
                  </div>
                  <div className="ps-3">
                    <h6 className="card-price">
                      Rs. {totalRevenueAmount.toLocaleString("en-US")}
                    </h6>
                    {/* <span className= {`${
                                sales.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`} */}
                    <span className="text-danger small pt-1 fw-bold">
                      {" "}
                      -0.9%
                      {/* {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                % */}
                    </span>
                    <span className="text-muted small pt-2 ps-1">
                      decrease
                      {/* {card.percentage > 0 ? 'increase' : 'decrease'} */}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopCards;
