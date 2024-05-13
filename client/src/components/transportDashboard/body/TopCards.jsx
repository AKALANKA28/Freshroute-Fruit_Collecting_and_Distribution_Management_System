import React, { useEffect, useState } from 'react'
import CardFilter from './CardFilter'

const TopCards = () => {
    const [numberOfVehicles, setNumberOfVehicles] = useState(0);
    const [numberOfSchedules, setNumberOfSchedules] = useState(0);
    const [numberOfProcess, setNumberOfProcess] = useState(0);


    const [filter, setFilter] = useState('Today');
    const handleFilterChange = filter => {
        setFilter(filter)
    };

    const [vehicle, setVehicle] = useState([]);
    const [schedule, setSchedule] = useState([]);
    const [process, setProcess] = useState([]);

    const fetchVehicle = () => {
        fetch("http://localhost:8070/vehicle/")
            .then(res => res.json())
            .then(data => {
                // Calculate number of vehicles
                const sum = data.length;
                setNumberOfVehicles(sum);
            })
            .catch(error => console.error('Error fetching vehicle data:', error));
    };

    const fetchSchedule = () => {
        fetch("http://localhost:8070/schedule/")
            .then(res => res.json())
            .then(data => {
                // Calculate number of Schedules
                const sum = data.length;
                setNumberOfSchedules(sum);
            })
            .catch(error => console.error('Error fetching schedules data:', error));
    };

    const fetchProcess = () => {
        fetch("http://localhost:8070/process/")
            .then(res => res.json())
            .then(data => {
                const sum = data.length; 
                setNumberOfProcess(sum);  
                     })
            .catch(error => console.error('Error fetching Process data:', error));
    };

    useEffect(() => {
        fetchVehicle();
        fetchSchedule();
        fetchProcess();
    }, []);
    
  return (
    <div>
      <div className="col-12">
        <div className="row">
        <div className="col-xxl-4  col-md-6">
            <div className="card info-card sales-card">
                <CardFilter filterChange={handleFilterChange} />
                <div className="card-body">
                    <h5 className="card-title">
                        Vehicles<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className= "bi bi-truck"></i>
                        </div>
                        <div className="ps-3">
                        <h6 className='card-price'>
                                {numberOfVehicles.toLocaleString('en-US')}
                        </h6>

                            {/* <span className= {`${
                                sales.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`} */}
                            {/* <span className= 'text-danger small pt-1 fw-bold'> -2%    */}
                                {/* {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                % */}
                                                           
                            {/* </span>
                            <span className="text-muted small pt-2 ps-1">
                                decrease
                                {card.percentage > 0 ? 'increase' : 'decrease'} */}
                            {/* </span> */}
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
                    Schedules<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-list-check"></i>
                        </div>
                        <div className="ps-3">
                        <h6 className='card-price'>
                                 {numberOfSchedules.toLocaleString('en-US')}
                        </h6>
                            {/* <span className= {`${
                                sales.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`} */}
                            {/* <span className= 'text-success small pt-1 fw-bold'> 5%   
                                {/* {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                % */}
                                                           
                            {/* </span>
                            <span className="text-muted small pt-2 ps-1">
                                increase */}
                                {/* {card.percentage > 0 ? 'increase' : 'decrease'} */}
                            {/* </span> */} */
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
                        Process<span> | {filter} </span>
                    </h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                        <i class="bi bi-list-task"></i>
                        </div>
                        <div className="ps-3">
                        <h6 className='card-price'>
                                 {numberOfProcess.toLocaleString('en-US')}
                        </h6>
                            {/* <span className= {`${
                                card.percentage > 0 ? 'text-success' : 'text-danger' 
                                } small pt-1 fw-bold`}
                            >
                                {card.percentage > 0 
                                ? card.percentage * 100 
                                : -card.percentage * 100} 
                                %
                                
                            </span> */}
                            {/* <span className="text-muted small pt-2 ps-1">
                                {card.percentage > 0 ? 'increase' : 'decrease'}
                            </span> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>   
        </div>
      </div>
    </div>
  )
}

export default TopCards
