import React from 'react'
import { FaUser, FaLock, FaSignInAlt } from 'react-icons/fa'
import '../styles/admin.css'

const AdminLogin = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100' style={{backgroundImage:"url('/images/adminbg.avif')", backgroundSize:'cover'}}>
        <div className='card p-4 shadow-lg' style={{maxWidth:"400px", width:"100%"}}>
            <h4 className='text-center mb-4'>
                  <FaUser className='me-1 icon-fix' /> Admin Login</h4> 
              
            <form>
                  <div className='mb-3'>
                      <label className='form-label'>
                          <FaUser className='me-1 icon-fix' />UserName</label>
                      <input type="text" className='form-control' placeholder='Enter admin username' required/>
                  </div>  

                  <div className='mb-3'>
                      <label className='form-label'>
                          <FaUser className='me-1 icon-fix' />Password</label>
                      <input type="password" className='form-control' placeholder='Enter password' required/>
                  </div> 

                  <button type='submit' className='btn btn-primary w-100'>
                      <FaSignInAlt className='me-1' /> Login</button>  
            </form>
        </div> 
    </div>
      
  )
}

export default AdminLogin
