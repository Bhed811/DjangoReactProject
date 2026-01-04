import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link, useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { ToastContainer, toast } from 'react-toastify'

const ManageUser = () => {
    const adminUser = localStorage.getItem('adminUser');
    const [users, setUsers] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch('http://127.0.0.1:8000/api/users/')
            .then(response => response.json())
            .then(data => {
                setUsers(data)
                setAllUsers(data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleSearch = (s) => {
        const keywords = s.toLowerCase();
        if (keywords === '') {
            setUsers(allUsers);
        }
        const filtered = allUsers.filter((user) =>
            user.first_name.toLowerCase().includes(keywords) ||
            user.last_name.toLowerCase().includes(keywords) ||
            user.email.toLowerCase().includes(keywords)
        );
        setUsers(filtered);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/delete_user/${id}/`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.status === 200) {
                toast.success(data.message);
                setUsers(prev => prev.filter(user => user.id !== id));
                setAllUsers(prev => prev.filter(user => user.id !== id));
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.error(error);
            toast.error("Server error");
        }
    };
    return (
        <AdminLayout>
            <ToastContainer position='top-right' autoClose={2000} />
            <div>
                <h3 className='text-center text-primary mb-4'>
                    {/* <i className='fas fa-list-alt me-1'></i> */}
                    Users List</h3>

                <h5 className='text-end text-muted'>
                    <i className='fas fa-database '></i> Total Users
                    <span className='ms-2 badge bg-success'> {users.length}</span>
                </h5>
                <div className='mb-3 d-flex justify-content-between'>
                    <input type='text' className='form-control w-50 ' placeholder='Search Users by name or email...' onChange={(e) => handleSearch(e.target.value)} />
                    <CSVLink data={users} filename={"users.csv"} className='btn btn-success ms-3'>
                        <i className='fas fa-file-csv me-1'></i> Export to CSV
                    </CSVLink>
                </div>
                <table className='table table-bordered table-hover'>
                    <thead className='table-dark'>
                        <tr>
                            <th className='text-center'>S. No.</th>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Mobile</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (

                            <tr key={user.id}>
                                <td className='text-center'>{index + 1}</td>
                                <td className='text-center'>{user.first_name} {user.last_name}</td>
                                <td className='text-center'>{user.mobile} </td>
                                <td className='text-center'>{user.email} </td>
                                <td className='text-center' >

                                    <button onClick={() => handleDelete(user.id)} className='btn btn-sm btn-danger ms-2 '>
                                        <i className='fas fa-trash me-1'></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </AdminLayout>
    )
}

export default ManageUser
