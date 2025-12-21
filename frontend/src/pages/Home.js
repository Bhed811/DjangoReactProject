import React from 'react'
import { FaHome, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container">
    <Link className="navbar-brand fw-bold" to="#"><FaUtensils className='me-2 icon-fix'/> Food Ordering System</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item ms-1">
          <Link className="nav-link active" aria-current="page" to="#"><FaHome className='me-1 icon-fix'/>Home</Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link" to="#"><FaUtensils className='me-1 icon-fix'/>Menu</Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link" to="#"><FaTruck className='me-1 icon-fix'/>Track</Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link" to="#"><FaUserPlus className='me-1 icon-fix'/>Register</Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link" to="#"><FaSignInAlt className='me-1 icon-fix'/>Login</Link>
        </li>
        <li className="nav-item mx-1">
          <Link className="nav-link" to="#"><FaUserShield className='me-1 icon-fix'/>Admin</Link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </div>
  )
}

export default Home
