import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const WeeklySalesChart = () => {
    const [data, setData] = useState([])
    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/weekly-sales-summary/')
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <div className='card p-3 shadow'>
            <h5 className='text-primary'>Weekly Sales</h5>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#9fd884ff" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default WeeklySalesChart
