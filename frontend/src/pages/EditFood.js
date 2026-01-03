import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const EditFood = () => {
    const [categoryName, setCategoryName] = useState('');
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/category/${id}/`)
            .then(response => response.json())
            .then(data => {
                setCategoryName(data.category_name);
            })
            .catch(error => console.error(error));
    }, [id]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/category/${id}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category_name: categoryName })
            })
            const data = await response.json();
            if (response.status === 200) {
                toast.success(data.message);
                setTimeout(() => {
                    navigate('/manage-category');
                }, 1000)
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error Connecting to server');
        }
    }
    return (
        <AdminLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='row'>
                <div className='col-md-8'>
                    <div className='shadow-sm p-4 rounded'>
                        <h4 className='mb-4'>
                            <i className='fas fa-edit me-2 text-primary'></i>Edit Food Category
                        </h4>

                        <form onSubmit={handleUpdate}>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Category Name</label>
                                <input type="text" className='form-control' value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder='Enter Category Name' required />
                            </div>

                            <button type='submit' className='btn btn-primary'>
                                {/* <i className='fas fa-edit'></i> */}
                                Update Category Name</button>
                        </form>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <i className='fas fa-utensils' style={{ fontSize: '180px', color: '#e5e5e5' }}></i>
                </div>
            </div>
        </AdminLayout>
    )
}

export default EditFood
