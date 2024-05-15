import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8070/";

const SalaryTable = () => {
    const [dataList, setDataList] = useState([]);
    

    useEffect(() => {
        
        getFetchData();
    }, []);

   

    const getFetchData = async () => {
        try {
            const response = await axios.get("/Salary/");
            if (response && response.data) {
                setDataList(response.data);
            }
        } catch (err) {
            alert(err.message);
        }
    };



    const handleStatus = status => {
    switch (status) {
        case 'Approved':
            return 'success';
            break;
        case 'Warning':
            return 'warning';
            break;
         case 'Rejected':
            return 'danger';
            break;
         default:
            return 'success';    
    }   
    };

  return (
    <div>
      <table className='table table-bordeless datatable'>
        <thead className="table-light">
            <tr>
           
                <th className="col"d>Date</th>
                <th className="col"d>Job Role</th>
                <th className="col"d>Salary</th>
             
            </tr>
        </thead>
        <tbody>
        {dataList.length ? (
                            dataList.map((salary, index) => (
                <tr key={index}>
                    
                        
                    <td>{salary.date}</td>
                    <td>
                    {salary.jobrole}
                        
                    </td>
                    
                    <td>{salary.salary ? `Rs.${salary.salary.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}` : ''}</td>
                    
                </tr>
              ))
            ) : (
                <div>No Data</div>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default SalaryTable
