import React, {useState, useEffect} from 'react'
import AdminLayout from '../components/AdminLayout'
import { FaUser, FaSignInAlt } from 'react-icons/fa'
import { toast, ToastContainer, toastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddFood = () => {

    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState(
        {
            category:'',
            item_name:'',
            item_price:'',
            item_description:'',
            image:null,
            item_quantity:'',
        }
    );
    
    useEffect(() => {
      fetch ('http://127.0.0.1:8000/api/categories/')
      .then(response => response.json())
        .then(data => {
          setCategories(data)
        })
      .catch(error => console.error(error));
    }, []);   

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    }
    const handleFileChange = (e) => {
        
        setFormData((prev) => ({
            ...prev,
            image: e.target.files[0]
        }));
    }

  const handleSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      data.append('category', formData.category);
      data.append('item_name', formData.item_name);
      data.append('item_price', formData.item_price);
      data.append('item_description', formData.item_description);
      data.append('image', formData.image);
      data.append('item_quantity', formData.item_quantity);
          try {
              const response = await fetch('http://127.0.0.1:8000/api/add-food-item/', {
                  method: 'POST',
                  body: data
              })
      
              const result = await response.json();
      
              if (response.status === 201) {
                  toast.success(result.message);
                  setFormData({
                      category: '',
                      item_name: '',
                      item_price: '',
                      item_description: '',
                      image: null,
                      item_quantity: '',
                  });
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
                            <i className='fas fa-plus-circle me-2 text-primary'></i>Add Food Item
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
                        <input name='item_name' type="text" className='form-control' value={formData.item_name} onChange={handleChange} placeholder='Enter Food Item Name' required/>
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>
                            Description</label>
                        <textarea name='item_description'  className='form-control' value={formData.item_description} onChange={handleChange} placeholder='Enter Description' required/>
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>
                            Quantity</label>
                        <input name='item_quantity' type="text" className='form-control' value={formData.item_quantity} onChange={handleChange} placeholder='eg: 2pcs, Large, etc.' required/>
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>
                            Price(₹)</label>
                        <input name='item_price' type="number" step={0.01} className='form-control' value={formData.item_price}  onChange={handleChange} placeholder='Enter Item price' required/>
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>
                            Image</label>
                        <input name='image' type="file" accept='image/*' className='form-control'  onChange={handleFileChange} placeholder='Enter Item price' required/>
                    </div>  

                    <button type='submit' className='btn btn-primary'>
                        <i className='fas fa-plus '></i> Add Food Item</button>  
                </form>
                    </div>
                </div>
                <div className='col-md-4 d-flex justify-content-center align-items-center'>
                    <i className='fas fa-utensils' style={{ fontSize: '180px' , color: '#e5e5e5'}}></i>
                </div>
        </div>
      </AdminLayout>
  )
}

export default AddFood
