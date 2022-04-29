import React from 'react'
import logo from '../assets/netflix_logo.png';
import './Navbar.css';
import {Link} from 'react-router-dom';

function Navbar() {
  return (
    <div className='Navbar-header'>
      <img src={logo} className="App-headerImage" alt="logo" />
       <div className='Navbar-links'>
        <Link to="/Analysis">Analysis</Link>
        <Link to="/Account">Account</Link>
        <Link to="/CreateTask">Create Task</Link>
        <Link to="/Payment">Payment</Link>
        <button> Log Out </button>
       </div>
    </div>
  )
}

export default Navbar