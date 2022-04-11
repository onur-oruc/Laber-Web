import React from 'react';
import { useState, useContext } from 'react';
import './Login.css';
// import Footer from './components/Footer';
import axios from './api/axios';
import Analysis from './Analysis';
import AuthContext from './context/AuthProvider';


function Login() {
  const { setAuth } = useContext(AuthContext);

  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[isLoggedIn, setIsLoggedIn] = useState(false);

  const signIn = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/get_customer', 
        {email: email, password: password})
      
      if (response.data === null) {
        alert('email or password is wrong ');
      } else if (response.data) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      alert("No Server Response");
    }
  }

  return (
    <div>
      {!isLoggedIn ? (<div className="login__background">
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
            <h1>Sign In</h1>
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
            <button id="signin_button" className="signin_button" type="submit" onClick={signIn}>Sign In</button>
            
            <div className="support">
              <div className="need__help">
                <span className="loginScreen__help">Need help?</span>
                <br/><br/>
              </div>
            </div>
                  
            <div className="login__footer">
              <div className="sign_up">
                <span className="loginScreen__gray">Don't have an account? </span>
                <span className="loginScreen__link"><a id="signup_now" className="loginScreen__link" href="/SignUp">Sign up.</a></span>
              </div>
            </div> 
          </form>
        </div>
        <div className="loginScreen__gradient"/>
      </div>) : <Analysis/>}  
    </div>
  )
}

export default Login
