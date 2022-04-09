import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Footer from './components/Footer';


function Login() {
    const[emailOrPhone, setEmailOrPhone] = useState("");
    const[password, setPassword] = useState("");
    const[companyName, setCompanyName] = useState('');
    const[fullname, setFullname] = useState('');
    const[username, setUsername] = useState('');


    let navigate = useNavigate();

    function signUp() {
        navigate("/analysis");
    }
    return (
        <div>
          <div className="login__background">
            <div className="nav_contents">
              <a href="#">
                <img
                  className="nav_logo"
                  src={""}
                  alt=""
                />
              </a>
            </div>
            <div className="loginScreen">
              <form> 
                <h1>Sign Up</h1>
                <input 
                  id="name" 
                  placeholder='Full name' 
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}/>
                <input 
                  id="username" 
                  placeholder='Username' 
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}/>
                <input 
                  autoFocus
                  id="emailorphone" 
                  placeholder='Email or phone number' 
                  type="email" 
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}/>
                <input 
                  id="password" 
                  placeholder='Password' 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}/>
                <input 
                  autoFocus
                  id="company" 
                  placeholder='Company name' 
                  type="text" 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}/>
                <button id="signup_button" className="signup_button" type="submit" onClick={signUp}>Sign up</button>
              </form>
            </div>
            
            <div className="loginScreen__gradient"/>
          </div>
          </div>
    )
}

export default Login
