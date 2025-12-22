import React from 'react'
import { FaHome, FaSignInAlt, FaTruck, FaUserPlus, FaUserShield, FaUtensils } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import PublicLayout from '../components/PublicLayout'
import '../styles/home.css';

const Home = () => {
  return (
    <PublicLayout> 
      <section className='hero py-5 text-center' style={{backgroundImage:"url('/images/food1.jpg')", backgroundSize:'cover'}}>
        <div style={{backgroundColor:"rgba(0, 0, 0, 0.5)" , padding:" 40px 20px", borderRadius:"10px"}}>
          <h1 className='display-4'> Quick & Hot Food, Delivered to You</h1>
          <p className='lead'> Craving something tasty? Let's get it to your door!</p>
          <form method="GET" action='/search' className='d-flex mt-3' style={{maxWidth:"600px", margin:"0 auto"}}>
            <input type="text" name="q" placeholder="I would like to eat..." className="form-control" style={{borderTopRightRadius:"0px", borderBottomRightRadius:"0px"}}></input>
            <button className="btn btn-warning px-4"  style={{borderTopLeftRadius:"0px", borderBottomLeftRadius:"0px"}}>Search</button>
          </form>
      </div>
      </section>
    </PublicLayout>
  )
}

export default Home
