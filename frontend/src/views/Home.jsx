import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Home is here</h1>

      <Link to="/login" className='btn btn-primary m-3 '>
          Login
      </Link>
      <span>    </span>
      <Link to="/signup" className='btn btn-primary m-3 '>
          Register
      </Link>

    </div>
  )
}

export default Home
