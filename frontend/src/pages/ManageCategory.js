import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link, useNavigate } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { ToastContainer, toast } from 'react-toastify'

const ManageCategory = () => {
  const adminUser = localStorage.getItem('adminUser');
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminUser) {
      navigate('/admin-login');
      return;
    }
    fetch('http://127.0.0.1:8000/api/categories/')
      .then(response => response.json())
      .then(data => {
        setCategories(data)
        setAllCategories(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (s) => {
    const keywords = s.toLowerCase();
    if (keywords === '') {
      setCategories(allCategories);
    }
    const filtered = allCategories.filter((category) => category.category_name.toLowerCase().includes(keywords));
    setCategories(filtered);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/category/${id}/`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        setCategories(prev => prev.filter(category => category.id !== id));
        setAllCategories(prev => prev.filter(category => category.id !== id));
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
          Manage Food Category</h3>

        <h5 className='text-end text-muted'>
          <i className='fas fa-database '></i> Total Categories
          <span className='ms-2 badge bg-success'> {categories.length}</span>
        </h5>
        <div className='mb-3 d-flex justify-content-between'>
          <input type='text' className='form-control w-50 ' placeholder='Search Category by name...' onChange={(e) => handleSearch(e.target.value)} />
          <CSVLink data={categories} filename={"categories.csv"} className='btn btn-success ms-3'>
            <i className='fas fa-file-csv me-1'></i> Export to CSV
          </CSVLink>
        </div>
        <table className='table table-bordered table-hover'>
          <thead className='table-dark'>
            <tr>
              <th className='text-center'>S. No.</th>
              <th className='text-center'>Category Name</th>
              <th className='text-center'>Creation Date</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (

              <tr key={category.id}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{category.category_name}</td>
                <td className='text-center'>{new Date(category.creation_date).toLocaleString()}</td>
                <td className='text-center' >
                  <Link to={`/edit-category/${category.id}`} className='btn btn-sm btn-primary'>
                    <i className='fas fa-edit me-1'></i> Edit
                  </Link>
                  <button onClick={() => handleDelete(category.id)} className='btn btn-sm btn-danger ms-2 '>
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

export default ManageCategory
