import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import {Button} from "react-bootstrap";

const RecentOrderTable = ({ items }) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [displayAll, setDisplayAll] = useState(false)
    useEffect(() => {
        setDisplayedItems(items.slice(0,5))
    }, [items]);
    const handleViewAll = ()=> {
        if (!displayAll) {
            setDisplayedItems(items);
        } else {
            setDisplayedItems(items.slice(0,5))
        }
        setDisplayAll(!displayAll);
    }
    const getStatusClass = (sts) => {
        switch (sts) {
            case "ASSIGNED":
                return "not-started";
            case "IN_PROGRESS":
                return "in-progress";
            case "COMPLETED":
                return "completed";
            default:
                return "";
        }
    }
    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th scope='col' style={{ width: '5%' }}>#</th>
                        <th className="col" style={{ width: '15%' }}>Fruit</th>
                        <th className="col" style={{ width: '15%' }}>Category</th>
                        <th className="col" style={{ width: '15%' }}>Quality</th>
                        <th className="col" style={{ width: '15%' }}>Quantity</th>
                        <th className="col" style={{ width: '15%' }}>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedItems.map((order, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{order.fruit}</td>
                            <td>{order.category}</td>
                            <td>{order.quality}</td>
                            <td>{order.quantity}</td>
                            <td>
                                <div className={`status-box ${getStatusClass(order.orderStatus)}`}>
                                    {order.orderStatus}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button to="/PredictionDetails" className="btn btn-primary btn-sm" onClick={handleViewAll}>{displayAll? "Show Less" : "View All"}</Button>
            </div>
        </div>
    );
};

export default RecentOrderTable;
