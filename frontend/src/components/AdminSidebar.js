import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {FaCopy, FaEdit, FaSearch, FaThLarge, FaUserCheck, FaUserEdit, FaUsers} from 'react-icons/fa'
const AdminSidebar = () => {

    const [openMenus, setOpenMenus] = useState({
        category: false,
        food: false,
        order: false
    });

    const toggleMenu = (menu) => {
        setOpenMenus((prev) => ( {...prev, [menu]: !prev[menu] }));
    };

    return (
        <div className="bg-dark text-white sidebar">
            <div className="text-center p-3 border-bottom">
                <img src="/images/admin.png" className="img-fluid rounded-circle mb-2" width="70"/>
                <h6 className='mmb-0'>Admin</h6>      
            </div>            

            <div className='list-group list-group-flush'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    <FaThLarge className='me-2 ' />Dashboard</Link>
                
                <div className='list-group list-group-flush'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    <FaUsers className='me-2 '/>Reg Users</Link>
            </div>

            <button onClick={() => toggleMenu('category')} className='list-group-item list-group-item-action bg-dark text-white'>
                <FaEdit className='me-2 '/>Food Category
            </button>
                {openMenus.category && (
                    <div className='ps-4'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    Add Category</Link>
                
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    Manage Category</Link>
            </div>
                )}
            

            <button onClick={() => toggleMenu('food')} className='list-group-item list-group-item-action bg-dark text-white'>
                <FaEdit className='me-2 '/>Food Item
            </button>
                {openMenus.food && (
                    <div className='ps-4'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    Add Food Item</Link>
                
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    Manage Food Item</Link>
            </div>
                )}
            

            <button onClick={() => toggleMenu('order')} className='list-group-item list-group-item-action bg-dark text-white'>
                <FaEdit className='me-2 '/>Orders
            </button>
                {openMenus.order && (
                   <div className='ps-4'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    Add Order</Link>
                
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    Manage Orders</Link>
            </div> 
                )}
            

            
            <div className='list-group list-group-flush'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    <FaSearch className='me-2'/>Search</Link>
            </div>

            <div className='list-group list-group-flush'>
                <Link className='list-group-item list-group-item-action bg-dark text-white'>
                    <FaEdit className='me-2'/>Manage Reviews</Link>
            </div>

                
            </div>

            
        </div>
    )
}

export default AdminSidebar
