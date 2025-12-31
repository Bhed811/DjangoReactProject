import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link, useNavigate } from 'react-router-dom'

const OrdersCancelled = () => {
    const [orders, setOrders] = useState([]);
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch('http://127.0.0.1:8000/api/orders-cancelled/')
            .then(response => response.json())
            .then(data => {
                setOrders(data)
            })
            .catch(error => console.error(error));
    }, []);

    return (
        <AdminLayout>
            <div>
                <h3 className='text-center text-primary mb-4'>
                    {/* <i className='fas fa-list-alt me-1'></i> */}
                    Details of Orders Cancelled</h3>

                <h5 className='text-end text-muted'>
                    <i className='fas fa-database '></i> Total Cancelled Orders
                    <span className='ms-2 badge bg-success'> {orders.length}</span>
                </h5>

                <table className='table table-bordered table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'>S. No.</th>
                            <th className='text-center'>Order no.</th>
                            <th className='text-center'>Order Time</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (

                            <tr key={order.id}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{order.order_number}</td>
                                <td className='text-center'>{new Date(order.order_time).toLocaleString()}</td>
                                <td className='text-center' >
                                    <a href={`/admin-view-order-detail/${order.order_number}`} className='btn btn-sm btn-primary'>
                                        <i className='fas fa-edit me-1'></i> View Order Details
                                    </a>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default OrdersCancelled
