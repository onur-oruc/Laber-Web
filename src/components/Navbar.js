import React from 'react'
import logo from '../assets/netflix_logo.png';
import './Navbar.css';

function Navbar() {
  return (
    <div className='Navbar-header'>
      <img src={logo} className="App-headerImage" alt="logo" />
       <div className='Navbar-links'>
        <a href="/Analysis">Analysis</a>
        <a href="/Account">Account</a>
        <a href="/CreateTask">Create Task</a>
        <a href="/Payment">Payment</a>
        <button> Log Out </button>
       </div>
    </div>
  )
}

export default Navbar