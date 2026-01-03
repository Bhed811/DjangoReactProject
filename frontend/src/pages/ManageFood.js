import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout'
import { Link } from 'react-router-dom'
import { CSVLink } from 'react-csv'
import { ToastContainer, toast } from 'react-toastify'

const ManageFood = () => {
  const [foods, setFoods] = useState([]);
  const [allFoods, setAllFoods] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/foods/')
      .then(response => response.json())
      .then(data => {
        setFoods(data)
        setAllFoods(data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleSearch = (s) => {
    const keywords = s.toLowerCase();
    if (keywords === '') {
      setFoods(allFoods);
    }
    const filtered = allFoods.filter((foo) => foo.item_name.toLowerCase().includes(keywords));
    setFoods(filtered);
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/edit-food/${id}/`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success(data.message);
        setFoods(prev => prev.filter(food => food.id !== id));
        setAllFoods(prev => prev.filter(food => food.id !== id));
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
          Manage Food Items</h3>

        <h5 className='text-end text-muted'>
          <i className='fas fa-database '></i> Total Food Items
          <span className='ms-2 badge bg-success'> {foods.length}</span>
        </h5>
        <div className='mb-3 d-flex justify-content-between'>
          <input type='text' className='form-control w-50 ' placeholder='Search Food Items by name...' onChange={(e) => handleSearch(e.target.value)} />
          <CSVLink data={foods} filename={"foods.csv"} className='btn btn-success ms-3'>
            <i className='fas fa-file-csv me-1'></i> Export to CSV
          </CSVLink>
        </div>
        <table className='table table-bordered table-hover'>
          <thead className='table-dark'>
            <tr>
              <th className='text-center'>S. No.</th>
              <th className='text-center'>Category Name</th>
              <th className='text-center'>Food Item Name</th>
              <th className='text-center'>Action</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food, index) => (

              <tr key={food.id}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{food.category_name}</td>
                <td className='text-center'>{food.item_name}</td>
                <td className='text-center' >
                  <Link to={`/edit-food/${food.id}`} className='btn btn-sm btn-primary'>
                    <i className='fas fa-edit me-1'></i> Edit
                  </Link>
                  <button onClick={() => handleDelete(food.id)} className='btn btn-sm btn-danger ms-2 '>
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

export default ManageFood
