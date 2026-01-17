import React, { useState, useEffect } from 'react'
import AdminLayout from '../components/AdminLayout';
import SalesBarChart from '../components/SalesBarChart';
import { useNavigate } from 'react-router-dom'
import '../styles/adminDashboard.css'
const AdminDashboard = () => {
    const adminUser = localStorage.getItem('adminUser');
    const [metrics, setMetrics] = useState({
        total_orders: 0,
        new_orders: 0,
        confirmed_orders: 0,
        food_preparing: 0,
        food_picked_up: 0,
        food_delivered: 0,
        cancelled_orders: 0,
        total_users: 0,
        total_categories: 0,
        today_sales: 0,
        week_sales: 0,
        month_sales: 0,
        year_sales: 0,
        total_reviews: 0,
        total_wishlists: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (!adminUser) {
            navigate('/admin-login');
            return;
        }
        fetch('http://127.0.0.1:8000/api/dashboard-metrics/')
            .then(response => response.json())
            .then(data => {
                setMetrics(data)
            })
            .catch(error => console.error(error));
    }, []);

    const cardDate = [
        { title: 'Total Orders', key: 'total_orders', color: 'primary', icon: 'fas fa-shopping-cart' },
        { title: 'Total Users', key: 'total_users', color: 'warning', icon: 'fas fa-users' },
        { title: 'Total Categories', key: 'total_categories', color: 'danger', icon: 'fas fa-list' },
        { title: 'Total Foods', key: 'total_foods', color: 'success', icon: 'fas fa-utensils' },
        { title: 'New Orders', key: 'new_orders', color: 'warning', icon: 'fas fa-cart-plus' },
        { title: 'Confirmed Orders', key: 'confirmed_orders', color: 'danger', icon: 'fas fa-check-circle' },
        { title: 'Food Preparing', key: 'food_preparing', color: 'success', icon: 'fas fa-utensils' },
        { title: 'Food Picked Up', key: 'food_picked_up', color: 'primary', icon: 'fas fa-motorcycle' },
        { title: 'Food Delivered', key: 'food_delivered', color: 'danger', icon: 'fas fa-motorcycle' },
        { title: 'Cancelled Orders', key: 'cancelled_orders', color: 'success', icon: 'fas fa-times-circle' },
        { title: 'Total Reviews', key: 'total_reviews', color: 'primary', icon: 'fas fa-star' },
        { title: 'Total Wishlists', key: 'total_wishlists', color: 'warning', icon: 'fas fa-heart' },
        { title: 'Today Sales', key: 'today_sales', color: 'success', icon: 'fas fa-dollar-sign' },
        { title: 'Week Sales', key: 'week_sales', color: 'primary', icon: 'fas fa-dollar-sign' },
        { title: 'Month Sales', key: 'month_sales', color: 'warning', icon: 'fas fa-dollar-sign' },
        { title: 'Year Sales', key: 'year_sales', color: 'danger', icon: 'fas fa-dollar-sign' },
    ]

    return (
        <AdminLayout>
            <div className='row g-3'>
                {cardDate.map((card, index) => (
                    <div className='col-md-3' key={index}>
                        <div className={`card card-hover text-white bg-${card.color}`}>
                            <div className='card-body d-flex justify-content-between align-items-center'>
                                <div>
                                    <h5 className='card-title'>{card.title}</h5>
                                    <h2>{(card.title.includes("Sales")) ? `Rs.${metrics[card.key]}` : `${metrics[card.key]}`}</h2>
                                </div>
                                <i className={`fas ${card.icon} fa-2x`}></i>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
            <div className='row mt-4'>
                <div className='col-md-6'>
                    <SalesBarChart />
                </div>
            </div>
        </AdminLayout>
    )
}

export default AdminDashboard;
