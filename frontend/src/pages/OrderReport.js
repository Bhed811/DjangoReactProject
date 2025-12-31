import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const OrderReport = () => {
    const [formData, setFormData] = useState({
        from_date: '',
        to_date: '',
        status: 'all'
    });
    const [orders, setOrders] = useState([]);
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://127.0.0.1:8000/api/order-between-dates/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const result = await response.json();

            if (response.status === 200) {
                setOrders(result)
            }
            else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error('Error Connecting to server');
        }
    };
    return (
        <AdminLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div>
                <h3 className='text-center text-primary mb-4'>
                    {/* <i className='fas fa-list-alt me-1'></i> */}
                    Between Dates Reports</h3>

                <form onSubmit={handleSubmit} className='mb-4'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <label>From Date</label>
                            <input type='date' name='from_date' value={formData.from_date} onChange={handleChange} className='form-control' required />
                        </div>
                        <div className='col-md-4'>
                            <label>To Date</label>
                            <input type='date' name='to_date' value={formData.to_date} onChange={handleChange} className='form-control' required />
                        </div>
                        <div className='col-md-4'>
                            <label>Status</label>
                            <select name='status' value={formData.status} onChange={handleChange} className='form-control' required >
                                <option value='all'>All</option>
                                <option value='not_confirmed'>Not Confirmed</option>
                                <option value='Order Confirmed'>Confirmed</option>
                                <option value='Food being Prepared'>Food Being Prepared</option>
                                <option value='Food Pickup'>Food Pickup</option>
                                <option value='Food Delivered'>Order Delivered</option>
                                <option value='Order Cancelled'>Order Cancelled</option>

                            </select>
                        </div>
                    </div>
                    <div className='text-center mt-2 '>
                        <button className='btn btn-primary' type='submit'>Submit</button>
                    </div>
                </form>

                <h5 className='text-end text-muted'>
                    <i className='fas fa-database '></i> Total Orders Found
                    <span className='ms-2 badge bg-success'> {orders.length}</span>
                </h5>

                {orders.length > 0 && (
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
                )}


            </div>
        </AdminLayout>
    )
}

export default OrderReport
