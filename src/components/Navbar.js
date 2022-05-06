import React from 'react'
import logo from '../assets/laber_logo.png';
import './Navbar.css';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom'
import {useAuth} from '../context/AuthProvider'

function Navbar() {
  let navigate = useNavigate();
  const { setAuth } = useAuth();

  const logout = () => {
    if (sessionStorage.getItem("access_token")) {
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("email");
      setAuth({});
    }
    navigate("/");
  }
  return (
    <div className='Navbar-header'>
      <img src={logo} className="App-headerImage" alt="logo" />
       <div className='Navbar-links'>
        <Link to="/Analysis">Analysis</Link>
        {/* <Link to="/Account">Account</Link> */}
        <Link to="/CreateTask">Create Task</Link>
        {/* <Link to="/Payment">Payment</Link> */}
        <button onClick={logout}> Log Out </button>
       </div>
    </div>
  )
}

export default Navbar