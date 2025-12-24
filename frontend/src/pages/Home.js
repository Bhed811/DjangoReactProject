import React, { useState, useEffect } from 'react'
import { FaHome, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import '../styles/home.css';

const Home = () => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {

    fetch('http://127.0.0.1:8000/api/random_foods')
      .then(response => response.json())
      .then(data => {
        setFoods(data)
      })
      .catch(error => console.error(error));

  }, []);
  return (
    <PublicLayout>
      <section className='hero py-5 text-center' style={{ backgroundImage: "url('/images/food1.jpg')", backgroundSize: 'cover' }}>
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: " 40px 20px", borderRadius: "10px" }}>
          <h1 className='display-4'> Quick & Hot Food, Delivered to You</h1>
          <p className='lead'> Craving something tasty? Let's get it to your door!</p>
          <form method="GET" action='/search' className='d-flex mt-3' style={{ maxWidth: "600px", margin: "0 auto" }}>
            <input type="text" name="q" placeholder="I would like to eat..." className="form-control" style={{ borderTopRightRadius: "0px", borderBottomRightRadius: "0px" }}></input>
            <button className="btn btn-warning px-4" style={{ borderTopLeftRadius: "0px", borderBottomLeftRadius: "0px" }}>Search</button>
          </form>
        </div>
      </section>
      <section className='py-5'>
        <div className='container '>
          <h2 className='text-center mb-4'>Most loved dishes this month
            <span className='badge bg-danger ms-2'>Top Picks</span>
          </h2>

          <div className='row mt-4'>
            {foods.length === 0 ? (
              <p className='text-center text-muted'>
                No results found
              </p>
            ) : (
              foods.map((food, index) => (

                <div className='col-md-4 mb-4'>
                  <div className='card hovereffect'>
                    <img src={`http://127.0.0.1:8000${food.image}`} className='card-img-top' style={{ height: '180px' }} />
                    <div className='card-body'>
                      <h5 className='card-title'>
                        <Link to={`/food/${food.id}`}> {food.item_name}</Link>
                      </h5>
                      <p className='card-text text-muted'>{food.item_description?.slice(0, 40)}...</p>
                      <div className='d-flex justify-content-between align-items-center'>
                        <span className='fw-bold'>₹{food.item_price}</span>
                        {food.is_available ?
                          (<Link to={`/food/${food.id}`} className='btn btn-outline-primary btn-sm'>
                            <i className='fas fa-shopping-cart me-1'></i> Order Now</Link>) :

                          (<div title='This food item is not availble right now, Please try again later'>
                            <button className='btn btn-outline-secondary btn-sm'>
                              <i className='fas fa-times-circle me-1'></i> Not Available</button>
                          </div>)
                        }

                      </div>

                    </div>
                  </div>
                </div>
              ))

            )}

          </div>

        </div>
      </section>

      <section className='py-5 bg-dark text-white text-center'>
        <div className='container '>
          <h2>Ordering in 3 Simple Steps</h2>
          <div className='row mt-4'>
            <div className='col-md-4'>
              <h4>1. Pick a dish you love</h4>
              <p>Explore hundreds of mouth-watering options and choose what you crave!</p>
            </div>
            <div className='col-md-4'>
              <h4>2. Share your location</h4>
              <p>Tell us where you are, and we will handle the rest.</p>
            </div>
            <div className='col-md-4'>
              <h4>3. Enjoy doorstep delivery</h4>
              <p>Relax while your meal arrives fast and fresh - pay when it's delivered.</p>
            </div>
          </div>
          <p>Pay easily with cash on Delivery - hastle free!</p>
        </div>
      </section>
      <section className='py-5 bg-warning text-center text-dark'>
        <h4> Ready to Satisfy Tour Hunger?</h4>
        <Link to="" className='btn btn-dark btn-lg mt-3'>
          Browse Full Menu </Link>

      </section>
    </PublicLayout >
  )
}

export default Home
