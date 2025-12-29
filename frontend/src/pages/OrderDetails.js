import React, { useState, useEffect } from 'react'
import PublicLayout from '../components/PublicLayout'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const OrderDetails = () => {
    const userId = localStorage.getItem('userId');
    const [orderItems, setOrderItems] = useState([]);
    const [orderAddress, setOrderAddress] = useState(null);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const { order_number } = useParams();
    useEffect(() => {

        if (!userId) {
            navigate('/login');
            return;
        }

        fetch(`http://127.0.0.1:8000/api/orders/by_order_number/${order_number}/`)
            .then(response => response.json())
            .then(data => {
                setOrderItems(data);
                const totalAmt = data.reduce((sum, item) => sum + item.food.item_price * item.quantity, 0);
                setTotal(totalAmt);
            })
            .catch(error => console.error(error));

    }, [order_number]);

    return (
        <PublicLayout>
            <div className='container py-5'>
                <h3 className='mb-4 text-primary'>Order # {order_number}</h3>
                <div className='row'>
                    <div className='col-md-8'>
                        {orderItems.map((item, index) => (
                            <div className='card mb-3 shadow-sm'>
                                <div className='row card-body'>
                                    <div className='col-md-4'>
                                        <img src={`http://127.0.0.1:8000${item.food.image}`} className='img-fluid rounded-start rounded ' style={{ width: '100%', height: '100%' }} />
                                    </div>
                                    <div className='col-md-8'>
                                        <h5 className="card-title">{item.food.item_name} ({item.food.item_quantity}) </h5>
                                        <p className="card-text"><strong>Price:</strong> {item.food.item_price}</p>
                                        <p className="card-text"><strong>Quantity:</strong> {item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div className='col-md-4'>

                    </div>
                </div>
            </div>
        </PublicLayout>
    )
}

export default OrderDetails
