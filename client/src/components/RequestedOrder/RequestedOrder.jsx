import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../buyerManager/sidebar/Sidebar';
import Header from '../buyerManager/header/header';
import { useNavigate } from 'react-router-dom';

function RequestedOrder() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        retrieveRequests();
    }, []);

    const retrieveRequests = () => {
        axios.get("http://localhost:8070/requests/all").then((res) => {
            if(res.data.success){
                setRequests(res.data.existingRequest);
            }
        });
    }


    const onDelete = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this Order?');

        if (isConfirmed) {
            axios.delete(`http://localhost:8070/request/delete/${id}`)
                .then(() => {
                    retrieveRequests();
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
    // const confirmOrder = (id) => {
    //     const isConfirmed = window.confirm('Are you sure you want to confirm this order?');
        
    //     if (isConfirmed) {
    //         axios.post("http://localhost:8070/normalOrder/add", { requestId: id })
    //             .then(() => {
    //                 axios.delete(`http://localhost:8070/request/delete/${id}`)
    //                     .then(() => {
    //                         alert('Order confirmed successfully!');
    //                         navigate("NormalOrder"); // Navigate to the Normal Order page
    //                     })
    //                     .catch((err) => {
    //                         console.error(err);
    //                     });
    //             })
    //             .catch((err) => {
    //                 console.error(err);
    //             });
    //     }
    // }

    const confirmOrder = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to confirm this order?');
        
        if (isConfirmed) {
            axios.put(`http://localhost:8070/requestor/update/${id}`)
                .then(() => {
                    alert('Order confirmed successfully!');
                    window.location.href = "http://localhost:3000/NormalOrder";  // Navigate to the Normal Order page
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }
    

    
    
    
    
    

    return (
        <div>
        <Header />
        <Sidebar />
        <div id='main'>
            <div className='container' style={{ marginTop: "100px", position: "relative" }}>
                {requests.length > 0 ? (
                    <table className='table table-hover'>
                        <thead>
                            <tr>
                                <th scope='col'>#</th>
                                <th scope='col'>Customer</th>
                                <th scope='col'>Fruit</th>
                                <th scope='col'>Sub Category</th>
                                <th scope='col'>Quality</th>
                                <th scope='col'>Quantity</th>
                                <th scope='col'>Due Date</th>
                                <th scope='col'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request, index) => (
                                <tr key={index}>
                                    <th scope='row'>{index + 1}</th>
                                    <td>{request.rname}</td>
                                    <td>{request.fruit}</td>
                                    <td>{request.category}</td>
                                    <td>{request.quantity}</td>
                                    <td>{request.quality}</td>
                                    <td>{request.datetobe}</td>
                                    <td>
                                        <button className='btn' style={{ backgroundColor: "green", width: "40px", height: "40px", borderRadius: "100%", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }} onClick={() => confirmOrder(request._id)}>
                                            <i className="fas fa-check" style={{ color: "black" }}></i>
                                        </button>
                                        &nbsp;
                                        <button className='btn' style={{ backgroundColor: "red", width: "40px", height: "40px", borderRadius: "100%", boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)" }} onClick={() => onDelete(request._id)}>
                                            <i className='fas fa-trash-alt' style={{ color: "black" }}></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No requests available</p>
                )}
            </div>
        </div>
    </div>
    );
}

export default RequestedOrder;
