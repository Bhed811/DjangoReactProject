import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const WeeklyUsersChart = () => {
    const [data, setData] = useState([])
    useEffect(() => {

        fetch('http://127.0.0.1:8000/api/weekly-users-registrations/')
            .then(response => response.json())
            .then(data => {
                setData(data)
            })
            .catch(error => console.error(error));
    }, []);
    return (
        <div className='card p-3 shadow'>
            <h5 className='text-primary'>Weekly New Users</h5>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line dataKey="new_users" fill="#9fd884ff" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}
export default WeeklyUsersChart
