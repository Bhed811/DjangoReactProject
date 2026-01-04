import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { useParams, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

const EditFood = () => {
    const adminUser = localStorage.getItem('adminUser');
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [imagePreview, setImagePreview] = useState(null);

    const [formData, setFormData] = useState(
        {
            category: '',
            item_name: '',
            item_price: '',
            item_description: '',
            image: '',
            item_quantity: '',
            is_available: ''
        }
    );
    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`)
            .then(response => response.json())
            .then(data => {
                setFormData(data);
                setImagePreview(`http://127.0.0.1:8000${data.image}`);
            })
            .catch(error => console.error(error));

        fetch(`http://127.0.0.1:8000/api/categories/`)
            .then(response => response.json())
            .then(data => {
                setCategories(data);
            })
            .catch(error => console.error(error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file
            }));

            setImagePreview(URL.createObjectURL(file));
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('category', formData.category);
        data.append('item_name', formData.item_name);
        data.append('item_price', formData.item_price);
        data.append('item_description', formData.item_description);
        data.append('image', formData.image);
        data.append('item_quantity', formData.item_quantity);
        data.append('is_available', formData.is_available ? 'true' : 'false');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`, {
                method: 'PUT',
                body: data
            })

            const result = await response.json();

            if (response.status === 200) {
                toast.success(result.message);
                setTimeout(() => {
                    navigate('/manage-food');
                }, 2000);
            }
            else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error('Error Connecting to server');
        }
    };

    return (
        <AdminLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div className='row'>
                <div className='col-md-8'>
                    <div className='shadow-sm p-4 rounded'>
                        <h4 className='mb-4'>
                            <i className='fas fa-edit me-2 text-primary'></i>Edit Food Item
                        </h4>

                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Food Category</label>
                                <select name='category' className='form-select' value={formData.category} onChange={handleChange} required>
                                    <option value=''>--Select Category--</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>{category.category_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Food Item Name</label>
                                <input name='item_name' type="text" className='form-control' value={formData.item_name} onChange={handleChange} placeholder='Enter Food Item Name' required />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Description</label>
                                <textarea name='item_description' className='form-control' value={formData.item_description} onChange={handleChange} placeholder='Enter Description' required />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Quantity</label>
                                <input name='item_quantity' type="text" className='form-control' value={formData.item_quantity} onChange={handleChange} placeholder='eg: 2pcs, Large, etc.' required />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>
                                    Price(₹)</label>
                                <input name='item_price' type="number" step={0.01} className='form-control' value={formData.item_price} onChange={handleChange} placeholder='Enter Item price' required />
                            </div>
                            <div className='mb-3 from-check form-switch'>
                                <input name='is_available' type="checkbox" className='form-check-input'
                                    checked={formData.is_available} onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })} />
                                <label className='form-check-label ms-2'>
                                    {formData.is_available ? 'Available' : 'Not Available'}</label>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Image</label>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="form-control"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div className='col-md-6'>
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt={formData.item_name}
                                                className="img-fluid"
                                                style={{ maxHeight: '100px' }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>


                            <button type='submit' className='btn btn-primary'>
                                <i className='fas fa-edit '></i> Update Food Item</button>
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
