import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8070/";

const dateFormat = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
}

const OngoingOrderTable = ({items, handleExecute}) => {

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/quality/delete/${id}`);
            updateQualityList();
            alert('Successfully Deleted');

        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                alert(error.response.data.error);
            } else {
                alert("An error occurred while deleting the quality record");
            }
        }
    };

    const handleEdit = (itemData) => {
        editItem(itemData);
    }
    return (
        <>
            <div>
                <table className="table table-bordeless datatable">
                    <thead className="table-light">
                    <tr>
                        <th className="col">Fruit Type</th>
                        <th className="col">Fruit Category</th>
                        <th className="col">Quality</th>
                        <th className="col">Quantity</th>
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
}

export default OngoingOrderTable;
