import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ConfirmationPopup from "../ConfirmationPopup";

axios.defaults.baseURL = "http://localhost:8070/";


const QualityTable = ({items, updateQualityList, editItem, isViewOnly}) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [recordId, setRecordId] = useState();
    const handleCloseConfirmationPopup = () => setShowConfirmation(false);
    const handleEdit = (itemData) => {
        editItem(itemData);
    }
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/om/quality/delete/${id}`);
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
    const onClickDelete = (id)=> {
      setRecordId(id);
      setShowConfirmation(true);
    }
    const handleConfirm = async () => {
      handleDelete(recordId);
    }

    return (
        <>
            <div>
                <table className="table table-bordeless datatable">
                    <thead className="table-light">
                    <tr>
                        <th className="col">Fruit Type</th>
                        <th className="col">Fruit Category</th>
                        <th className="col">Grade</th>
                        <th className="col" style={{minWidth:'300px'}}>Quality Description</th>
                        <th className="col" style={{minWidth:'300px'}}>Storage Conditions</th>
                        {!isViewOnly && <th className="col">Action</th>}
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
                                <td>{item.qualityDesc}</td>
                                <td>{item.storageCond}</td>
                                {!isViewOnly && <td>
                                    <div className="buttons">
                                        <button
                                            className="btn btn-edit"
                                            onClick={() => handleEdit(item)} >
                                            <i className="bi bi-pencil-square"></i>
                                        </button>
                                        <button
                                            className="btn btn-delete"
                                            onClick={() => onClickDelete(item._id)} >
                                            <i className="bi bi-trash3-fill"></i>
                                        </button>
                                    </div>
                                </td>}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div>
                    <ConfirmationPopup
                        message="Are you sure you want to proceed?"
                        onConfirm={handleConfirm}
                        handleClose={handleCloseConfirmationPopup}
                        show={showConfirmation}
                    />
                </div>
            </div>
        </>
    );
};

export default QualityTable;
