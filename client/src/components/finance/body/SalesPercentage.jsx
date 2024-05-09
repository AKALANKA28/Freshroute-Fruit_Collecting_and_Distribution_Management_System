import React, { useEffect, useState } from 'react'

const SalesPercentage = () => {
    const [todaysSalesAmount, setTodaysSalesAmount] = useState(0);
    const [yesterdaysSalesAmount, setYesterdaysSalesAmount] = useState(0);
    const [todaysSalesPercentage, setTodaysSalesPercentage] = useState(0);

    useEffect(() => {
        // Fetch today's sales data from backend API
        const today = new Date();
        const startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);

        fetch(`http://localhost:8070/sales/?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`)
            .then(res => res.json())
            .then(data => {
                // Calculate total sales amount for today
                const todayTotalAmount = data.reduce((total, sale) => total + sale.amount, 0);
                setTodaysSalesAmount(todayTotalAmount);
            })
            .catch(error => console.error('Error fetching today\'s sales data:', error));

        // Fetch yesterday's sales data from backend API
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStartDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 0, 0, 0);
        const yesterdayEndDate = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 59, 59);

        fetch(`http://localhost:8070/sales/?startDate=${yesterdayStartDate.toISOString()}&endDate=${yesterdayEndDate.toISOString()}`)
            .then(res => res.json())
            .then(data => {
                // Calculate total sales amount for yesterday
                const yesterdayTotalAmount = data.reduce((total, sale) => total + sale.amount, 0);
                setYesterdaysSalesAmount(yesterdayTotalAmount);
            })
            .catch(error => console.error('Error fetching yesterday\'s sales data:', error));
    }, []);

    useEffect(() => {
        // Calculate today's sales percentage relative to yesterday
        if (yesterdaysSalesAmount !== 0) {
            const percentage = ((todaysSalesAmount - yesterdaysSalesAmount) / yesterdaysSalesAmount) * 100;
            setTodaysSalesPercentage(percentage);
        }
    }, [todaysSalesAmount, yesterdaysSalesAmount]);

    return (
        <div>
            <h3>Today's Sales Percentage: {todaysSalesPercentage.toFixed(2)}%</h3>
        </div>
    );
}



export default SalesPercentage
