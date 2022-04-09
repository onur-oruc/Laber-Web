import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Footer from './components/Footer';


function Login() {
    const[emailOrPhone, setEmailOrPhone] = useState("");
    const[password, setPassword] = useState("");


    let navigate = useNavigate();

    function signIn() {
        navigate("/Analysis");
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
                <h1>Sign In</h1>
                <input 
                  autoFocus
                  id="emailorphone" 
                  placeholder='Email or phone number' 
                  type="email" 
                  value={setEmailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}/>
                <input 
                  id="password" 
                  placeholder='Password' 
                  type="password"
                  value={setPassword}
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
                      <span className="loginScreen__link"><a id="signup_now" className="loginScreen__link" href="/SignUp">Sign up now.</a></span>
                    </div>
                  </div> 
              </form>
            </div>
            
            <div className="loginScreen__gradient"/>
          </div>
          </div>
    )
}

export default Login
