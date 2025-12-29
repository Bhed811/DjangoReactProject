import React, { useState, useEffect } from 'react'
import { FaCogs, FaHeart, FaHome, FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaTruck, FaUser, FaUserCircle, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/layout.css';
const PublicLayout = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const name = localStorage.getItem('userName');

  useEffect(() => {
    if (userId) {
      setIsLoggedIn(true);
      setUserName(name);
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    navigate('/login');
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="#"><FaUtensils className='me-2 ' /> Food Ordering System</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item ms-1">
                <Link className="nav-link " aria-current="page" to="/"><FaHome className='me-1 ' />Home</Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" to="#"><FaUtensils className='me-1 ' />Menu</Link>
              </li>
              <li className="nav-item mx-1">
                <Link className="nav-link" to="#"><FaTruck className='me-1 ' />Track</Link>
              </li>

              {!isLoggedIn ? (
                <> <li className="nav-item mx-1">
                  <Link className="nav-link" to="/register"><FaUserPlus className='me-1 ' />Register</Link>
                </li>
                  <li className="nav-item mx-1">
                    <Link className="nav-link" to="/login"><FaSignInAlt className='me-1 ' />Login</Link>
                  </li>
                  <li className="nav-item mx-1">
                    <Link className="nav-link" to="/admin-login"><FaUserShield className='me-1 ' />Admin</Link>
                  </li> </>
              ) : (<>
                <li className="nav-item mx-1">
                  <Link className="nav-link" to="/my-orders"><FaUser className='me-1 ' />My Orders</Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className="nav-link" to="/cart"><FaShoppingCart className='me-1 ' />Cart</Link>
                </li>
                <li className="nav-item mx-1">
                  <Link className="nav-link" to=""><FaHeart className='me-1 ' />Wishlist</Link>
                </li>

                <li class="nav-item dropdown text-capitalize">
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown">
                    <FaUserCircle className='me-1 ' />{userName}
                  </a>
                  <ul class="dropdown-menu">
                    <li><Link class="dropdown-item" to="#"><FaUser className='me-1 ' />Profile</Link></li>
                    <li><Link class="dropdown-item" to="#"><FaCogs className='me-1 ' />Settings</Link></li>
                    <li><hr class="dropdown-divider" /></li>
                    <li><button class="dropdown-item" onClick={handleLogout}><FaSignOutAlt className='me-1 ' />Logout</button></li>
                  </ul>
                </li>
              </>)}


            </ul>

          </div>
        </div>
      </nav>

      <div className='text-primary'>{children}</div>

      <footer className='text-center py-3 mt-5'>
        <div className='container '>
          <p>&copy; 2025 Food Ordering System. All Rights Reserved</p>

        </div>
      </footer>
    </div>
  )
}

export default PublicLayout
