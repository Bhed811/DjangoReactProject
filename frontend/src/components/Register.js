import React, { useState } from 'react'
import PublicLayout from './PublicLayout'
import { toast, ToastContainer, toastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [formData, setFormData] = useState(
        {
            firstname: '',
            lastname: '',
            email: '',
            mobilenumber: '',
            password: '',
            repeatpassword: '',
        }
    );
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstname, lastname, email, mobilenumber, password, repeatpassword } = formData;
        if (password !== repeatpassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
            const response = await fetch('http://127.0.0.1:8000/api/register/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstname, lastname, email, mobilenumber, password })
            })

            const result = await response.json();

            if (response.status === 201) {
                toast.success(result.message);
                setFormData({
                    firstname: '',
                    lastname: '',
                    email: '',
                    mobilenumber: '',
                    password: '',
                    repeatpassword: '',
                });
                setTimeout(() => {
                        navigate('/login');
                    }, 2000);
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
        <PublicLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='container py-5'>
                <div className='row shadow-lg rounded-4'>
                    <div className='col-md-6 p-4'>
                        <h3 className='text-center mb-4'>
                            <i className='fas fa-user-plus me-2'></i>User Registration</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <input name='firstname' className='form-control' value={formData.firstname} onChange={handleChange} placeholder='First Name' required></input>
                            </div>
                            <div className='mb-3'>
                                <input name='lastname' className='form-control' value={formData.lastname} onChange={handleChange} placeholder='Last Name' required></input>
                            </div>
                            <div className='mb-3'>
                                <input name='email' className='form-control' value={formData.email} onChange={handleChange} placeholder='Email' required></input>
                            </div>
                            <div className='mb-3'>
                                <input name='mobilenumber' className='form-control' value={formData.mobilenumber} onChange={handleChange} placeholder='Mobile Number' required></input>
                            </div>
                            <div className='mb-3'>
                                <input name='password' type='password' className='form-control' value={formData.password} onChange={handleChange} placeholder='Password' required></input>
                            </div>
                            <div className='mb-3'>
                                <input name='repeatpassword' type='password' className='form-control' value={formData.repeatpassword} onChange={handleChange} placeholder='Repeat Password' required></input>
                            </div>
                            <button type='submit' className='btn btn-primary w-100'>
                                <i className='fas fa-user-check me-2'></i>Submit</button>
                        </form>
                    </div>
                    <div className='col-md-6 d-flex align-items-center justify-content-center'>
                        <div className='p-4 text-center'>
                            <img src="/images/registration.png" className='img-fluid' style={{ maxHeight: "400px" }} />
                            <h5 className='mt-2'> Registration is fast, secure and free.</h5>
                            <p className='tet-muted small'>Join our food family and enjou delicious food delivered to your door.</p>
                        </div>
                    </div>
                </div>


            </div>
        </PublicLayout>
    )
}

export default Register
