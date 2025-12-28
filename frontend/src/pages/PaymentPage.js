import React, { useState, useEffect, use } from 'react'
import PublicLayout from '../components/PublicLayout'
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaMinus, FaPlus, FaShoppingCart, FaTrash } from 'react-icons/fa';

const PaymentPage = () => {

    const userId = localStorage.getItem('userId');
    const [paymentMode, setPaymentMode] = useState('');
    const [address, setAddress] = useState('');
    const [cardDetails, setCardDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });
    const navigate = useNavigate();

    const handlePlaceOrder = async () => {

        if (paymentMode === 'online') {
            const { cardNumber, expiryDate, cvv } = cardDetails;

            if (!cardNumber || !expiryDate || !cvv) {
                toast.error('Please enter card details');
                return;
            }
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/api/place_order/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    address: address,
                    paymentMode: paymentMode,
                    cardNumber: paymentMode === 'online' ? cardDetails.cardNumber : '',
                    expiryDate: paymentMode === 'online' ? cardDetails.expiryDate : '',
                    cvv: paymentMode === 'online' ? cardDetails.cvv : ''
                })
            })

            const result = await response.json();

            if (response.status === 201) {
                toast.success(result.message);
                setAddress('');
                setPaymentMode('');
                setCardDetails({
                    cardNumber: '',
                    expiryDate: '',
                    cvv: ''
                })
                setTimeout(() => {
                    navigate('/my-orders');
                }, 2000)

            }
            else {
                toast.error(result.message || "Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error('Error Connecting to server');
        }

    }


    return (
        <PublicLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='container py-5'>
                <h3 className='text-center  text-primary mb-4'>
                    <i className='fas fa-credit-card me-2'></i>Checkout and Payment
                </h3>
                <div className='card p-4 shadow-sm'>
                    <div className='mb-3'>
                        <label className='form-label fw-semibold'>Delivery Address</label>
                        <textarea className='form-control border-primary-subtle'
                            rows={3} placeholder='Enter your delivery address'
                            value={address} required onChange={(e) => setAddress(e.target.value)}></textarea>
                    </div>
                    <div className=' form-check mb-3'>
                        <input className='form-check-input'
                            type='radio' name='paymentMode'
                            required
                            value='cod' checked={paymentMode === 'cod'}
                            onChange={(e) => setPaymentMode('cod')} />
                        <label className=''>Cash on Delivery</label>
                    </div>
                    <div className=' form-check mb-3'>
                        <input className='form-check-input'
                            type='radio' name='paymentMode'
                            value='online' checked={paymentMode === 'online'}
                            required
                            onChange={(e) => setPaymentMode('online')} />
                        <label className=''>Online Payment</label>
                    </div>

                    {paymentMode === 'online' && (
                        <div className='row'>
                            <div className='col-md-6'>
                                <label className='form-label'>Card Number</label>
                                <input className='form-control'
                                    type='text' value={cardDetails.cardNumber}
                                    placeholder='1234 **** **** ****'
                                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}>
                                </input>
                            </div>
                            <div className='col-md-3'>
                                <label className='form-label'>Expiry Date</label>
                                <input className='form-control'
                                    type='text' value={cardDetails.expiryDate}
                                    placeholder='MM/YY'
                                    onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}>
                                </input>
                            </div>
                            <div className='col-md-3'>
                                <label className='form-label'>CVV</label>
                                <input className='form-control'
                                    type='text' value={cardDetails.cvv}
                                    placeholder='1**'
                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}>
                                </input>
                            </div>
                        </div>
                    )}
                    <button className='btn btn-primary mt-4 w-100' onClick={handlePlaceOrder}>
                        <i className='fas fa-check-circle me-2'></i>
                        Confrim and Place Order
                    </button>
                </div>
            </div>
        </PublicLayout>
    )
}

export default PaymentPage
