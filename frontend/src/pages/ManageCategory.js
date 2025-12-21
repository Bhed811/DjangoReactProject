import React from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link } from 'react-router-dom'

const ManageCategory = () => { 
  return (
    <AdminLayout>
      <div>
        <h3 className='text-center text-primary mb-4'>
          {/* <i className='fas fa-list-alt me-1'></i> */}
          Manage Food Category</h3>
        
        <h5 className='text-end text-muted'>
          <i className='fas fa-database '></i> Total Categories
          <span className='ms-2 badge bg-success'> 10</span>
        </h5>
        <div className='mb-3'>
          <input type='text' className='form-control w-50 ' placeholder='Search Category' />
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
            <tr>
              <td className='text-center'>1</td>
              <td className='text-center'>catA</td>
              <td className='text-center'>Date1</td>
              <td className='text-center' >
                <Link className='btn btn-sm btn-primary'>
                  <i className='fas fa-edit me-1'></i> Edit
                </Link>
                <button className='btn btn-sm btn-danger ms-2 '>
                  <i className='fas fa-trash me-1'></i> Delete
                </button>
              </td>
            </tr>
            <tr>
              <td className='text-center'>2</td>
              <td className='text-center'>catB</td>
              <td className='text-center'>Date2</td>
              <td className='text-center' >
                <Link className='btn btn-sm btn-primary'>
                  <i className='fas fa-edit me-1'></i> Edit
                </Link>
                <button className='btn btn-sm btn-danger ms-2 '>
                  <i className='fas fa-trash me-1'></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}

export default ManageCategory
