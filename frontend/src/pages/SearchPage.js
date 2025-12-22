import React from 'react'
import PublicLayout from '../components/PublicLayout'
import { Link } from 'react-router-dom'
import '../styles/home.css'
const SearchPage = () => {
    return (
      <PublicLayout>
            <div className='container py-4'>
                <h3 className='text-center text-primary'>Results for: burger</h3>
                <div className='row mt-4'>

                    <div className='col-md-4 mb-4'>
                        <div className='card hovereffect'>
                            <img src='/images/food1.jpg' className='card-img-top' style={{height:'180px'}}/>
                            <div className='card-body'>
                                <h5 className='card-title'>
                                    <Link to='#'> Burger</Link>
                                </h5>
                                <p className='card-text text-muted'>Description aasdas dasd</p>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='fw-bold'>₹100</span>
                                    <Link to='#' className='btn btn-outline-primary btn-sm'>
                                        <i className='fas fa-shopping-cart me-1'></i> Order Now</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        </div>
      </PublicLayout>
  )
}

export default SearchPage
