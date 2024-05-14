import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import CardFilter from './CardFilter';

const RecentAddedQuality = () => {
    const [items, setItems] = useState([]);
    const [filter, setFilter] = useState('Today');

    const handleFilterChange = filter => {
        setFilter(filter);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/Category/"); // Fetch data using Axios
                const data = response.data; // Get data from response

                // Filter data where qualityDesc exists but price does not
                const filteredData = data.filter(item => item.qualityDesc && !item.price);

                // Update state with filtered data
                setItems(filteredData);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        };

        fetchData(); // Call fetchData function
    }, []);

    return (
        <div className='card top-selling overflow-auto'>
            <CardFilter filterChange={handleFilterChange} />

            <div className="card-body pd-0">
                <h5 className="card-title">
                    Recent Added Quality To Be Priced <span>| {filter}</span>
                </h5>

                <table className='table table-borderless'>
                    <thead className="table-light">
                        <tr>
                            <th scope='col'>Image</th>
                            <th scope='col'>Fruit</th>
                            <th scope='col'>Category</th>
                            <th scope='col' style={{ width: '45%' }}>Quality</th> 
                            <th scope='col' style={{ width: '45%' }}>Condition</th> 
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(item => (
                            <tr key={item._id}>
                                <td>
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl} 
                                            alt="Fruit Image"
                                            style={{ width: "50px", height: "50px" }}
                                        />
                                    )}
                                </td>
                                <td>{item.fruit}</td>
                                <td>{item.category}</td>
                                <td>{item.qualityDesc}</td>
                                <td>{item.storageCond}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RecentAddedQuality;
