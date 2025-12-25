import React, { useState, useEffect, use } from 'react'
import PublicLayout from '../components/PublicLayout'
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';

const Cart = () => {

    const userId = localStorage.getItem('userId');
    const [cartItems, setCartItems] = useState([]);
    const [grandTotal, setGrandTotal] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {

        if (!userId) {
            navigate('/login');
            return;
        }

        fetch(`http://127.0.0.1:8000/api/cart/${userId}`)
            .then(response => response.json())
            .then(data => {
                setCartItems(data);
                const total = data.reduce((sum, item) => sum + item.food.item_price * item.quantity, 0);
                setGrandTotal(total);
            })
            .catch(error => console.error(error));

    }, [userId]);




    return (
        <PublicLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='container py-5'>
                <h2 className='mb-4 text-center'>
                    <FaShoppingCart className='me-1 icon-fix' /> Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p className='text-center text-muted'>Your cart is empty</p>
                ) : (
                    <>
                        <div className='row'>
                            {cartItems.map((item, index) => (
                                <div className='col-md-6 mb-4'>
                                    <div className='card shadow-sm'>
                                        <div className='row'>
                                            <div className='col-md-4'>
                                                <img src={`http://127.0.0.1:8000${item.food.image}`} className='img-fluid rounded-start' style={{ width: '100%', maxHeight: '300px' }} />
                                            </div>
                                            <div className='col-md-8'>
                                                <div className='card-body'>
                                                    <h5 className='card-title'>
                                                        {item.food.item_name}
                                                    </h5>
                                                    <p className='card-text text-muted small'>{item.food.item_description}</p>
                                                    <p className='fw-bold text-success'>Rs. {item.food.item_price}</p>
                                                    <div className='d-flex align-items-center mb-2'>
                                                        <button className='btn btn-sm btn-outline-secondary me-2' disabled={item.quantity <= 1} >
                                                            <FaMinus />
                                                        </button>
                                                        <span className='fw-bold px-2'>{item.quantity}</span>
                                                        <button className='btn btn-sm btn-outline-secondary ms-2'  >
                                                            <FaPlus />
                                                        </button>
                                                    </div>
                                                    <button className='btn btn-sm btn-outline-danger  px-3'  >
                                                        <FaTrash className='me-2 icon-fix' /> Remove
                                                    </button>

                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>
        </PublicLayout>

    )
}

export default Cart
