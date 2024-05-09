import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {Button} from "react-bootstrap";

const UndefinedQualityTable = ({ items }) => {
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
    const navigate = useNavigate();
    const handleAdd = ()=> {
        navigate("QualityList")
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
                        <th className="col" style={{ width: '15%' }}>Action</th>
                    </tr>
                </thead>

                <tbody>
                    {displayedItems.map((order, index) => (
                        <tr key={index}>
                            <th scope='row'>{index + 1}</th>
                            <td>{order.fruit}</td>
                            <td>{order.category}</td>
                            <td>{order.quality}</td>
                            <td>
                                <div className="buttons">
                                    <button className="btn-table edit" onClick={handleAdd}>
                                        <i className="bi bi-pencil-square"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Button to="/PredictionDetails" className="btn btn-primary btn-sm"
                        onClick={handleViewAll}>{displayAll ? "Show Less" : "View All"}</Button>
            </div>
        </div>
    );
};

export default UndefinedQualityTable;
