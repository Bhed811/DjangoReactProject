import React, { useState, useEffect } from 'react'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'
import '../styles/admin.css'

const AdminLayout = ({ children }) => {

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/dashboard-metrics/')
      .then(response => response.json())
      .then(data => {
        setNewOrders(data.new_orders)
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
      else {
        setSidebarOpen(true);
      }
    }

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }

  }, []);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  }

  return (
    <div className='d-flex'>
      {sidebarOpen && <AdminSidebar />}

      <div id="page-content-wrapper" className={`w-100 ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
        <AdminHeader toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} newOrders={newOrders} />
        <div className='container-fluid mt-4'>
          {children}
        </div>
      </div>

    </div>
  )
}

export default AdminLayout
