import React from 'react';
import axios from 'axios';
import moment from "moment";

axios.defaults.baseURL = "http://localhost:8070/";

const dateFormat = (dateString) => {
    return  moment(dateString).format("YYYY-MM-DD");
}

const AssignedOrderTable = ({items, handleExecute}) => {

    return (
        <>
            <div>
                <table className="table table-bordeless datatable">
                    <thead className="table-light">
                    <tr>
                        <th className="col">Fruit Type</th>
                        <th className="col">Fruit Category</th>
                        <th className="col">Quality</th>
                        <th className="col">Quantity (kg)</th>
                        <th className="col date-field">Placed Date</th>
                        <th className="col date-field">Due Date</th>
                        <th className="col">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {items &&
                        items.length > 0 &&
                        items.map((item) => (
                            <tr key={item._id}>
                                <td>{item.fruit}</td>
                                <td>{item.category}</td>
                                <td>{item.quality}</td>
                                <td>{item.quantity}</td>
                                <td>{dateFormat(item.placedDate)}</td>
                                <td>{dateFormat(item.dueDate)}</td>
                                <td>
                                    <div className="buttons">
                                        <button type="button" className="btn btn-outline-warning"
                                                onClick={() => handleExecute(item)}>
                                            Execute
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default AssignedOrderTable;
