import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'

const SearchOrder = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchTerm.trim()) {
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/search-orders/?q=${searchTerm}`);

            const data = await response.json();

            if (response.status === 200) {
                setOrders(data)
                setSubmitted(true);
            }
            else {
                toast.error(data.message || "Something went wrong");
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
                    Search Orders</h3>

                <form onSubmit={handleSearch} className='d-flex mt-3' style={{ maxWidth: "600px", margin: "0 auto" }}>
                    <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter Order Number" className="form-control" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}></input>
                    <button type='submit' className="btn btn-warning px-4 ms-2" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}>Search</button>
                </form>


                {submitted && (
                    <div>
                        <h5 className='text-end text-muted'>
                            <i className='fas fa-database '></i> Total Orders Found
                            <span className='ms-2 badge bg-success'> {orders.length}</span></h5>

                        <table className='table table-bordered table-hover mt-5'>
                            <thead className='table-dark'>
                                <tr>
                                    <th className='text-center'>S. No.</th>
                                    <th className='text-center'>Order no.</th>
                                    <th className='text-center'>Order Time</th>
                                    <th className='text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.length > 0 ? (

                                    orders.map((order, index) => (
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
                                    ))

                                ) : (
                                    <tr>
                                        <td colSpan="4" className='text-center'>No orders found</td>
                                    </tr>
                                )}


                            </tbody>
                        </table>
                    </div>
                )}


            </div>
        </AdminLayout>
    )
}

export default SearchOrder
