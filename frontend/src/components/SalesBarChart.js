import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const SalesBarChart = () => {
    const [data, setData] = useState([])
    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/monthly-sales-summary/')
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <div className='card p-3 shadow'>
            <h5 className='text-primary'>Monthly Sales</h5>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default SalesBarChart
