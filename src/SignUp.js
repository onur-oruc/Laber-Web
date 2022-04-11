import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Footer from './components/Footer';
import axios from 'axios';

function Login() {
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState('');
    const[password, setPassword] = useState("");
    const[companyName, setCompanyName] = useState('');
    const[fullname, setFullname] = useState('');
    const[username, setUsername] = useState('');
    const[isSignedUp, setIsSignedUp] = useState(false);

    let navigate = useNavigate();

    function signUp() {
      console.log("in signUp");
      axios.post('http://192.168.1.171:5000/add_customer', {
                email: email,
                name: fullname,
                username: username,
                phone: phone,
                password: password,
                companyName: companyName
            }).then(response => {
              console.log(response.data);
                        console.log("1")
                        if (response.data.message === "success") {
                          console.log("2")     
                          alert("your a be created");
                          navigate("/Analysis");
                        } else if (response.data.message === "failed") {
                          console.log("3")
                            alert("your account could not be created");
                        }
                    }
                ).catch(function (error) {
                  console.log(error);
                });
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
                  id="email" 
                  placeholder='Email' 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}/>
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
                <input 
                  autoFocus
                  id="phone" 
                  placeholder='Phone number' 
                  type="text" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}/>
                <button id="signup_button" className="signup_button" type="submit" onClick={signUp}>Sign up</button>
              </form>
            </div>
            
            <div className="loginScreen__gradient"/>
          </div>
          </div>
    )
}

export default Login
