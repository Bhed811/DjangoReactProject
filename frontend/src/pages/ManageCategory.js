import React, { useState, useEffect} from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv'
const ManageCategory = () => { 
  
  
  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  useEffect(() => {
    fetch ('http://127.0.0.1:8000/api/categories/')
    .then(response => response.json())
      .then(data => {
        setCategories(data)
        setAllCategories(data);
      })
    .catch(error => console.error(error));
  }, []); 
  
  const handleSearch = (s) => {
    const keywords = s.toLowerCase();
    if(keywords === '') {
      setCategories(allCategories);
    }
    const filtered=allCategories.filter((category) => category.category_name.toLowerCase().includes(keywords));
    setCategories(filtered);
  };

  return (
    <AdminLayout>
      <div>
        <h3 className='text-center text-primary mb-4'>
          {/* <i className='fas fa-list-alt me-1'></i> */}
          Manage Food Category</h3>
        
        <h5 className='text-end text-muted'>
          <i className='fas fa-database '></i> Total Categories
          <span className='ms-2 badge bg-success'> {categories.length}</span>
        </h5>
        <div className='mb-3 d-flex justify-content-between'>
          <input type='text' className='form-control w-50 ' placeholder='Search Category by name...' onChange={(e) => handleSearch(e.target.value)}  />
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

            <tr>
              <td className='text-center'>{index + 1}</td>
              <td className='text-center'>{category.category_name}</td>
              <td className='text-center'>{new Date(category.creation_date).toLocaleString()}</td>
              <td className='text-center' >
                <Link className='btn btn-sm btn-primary'>
                  <i className='fas fa-edit me-1'></i> Edit
                </Link>
                <button className='btn btn-sm btn-danger ms-2 '>
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
