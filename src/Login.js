import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Footer from './components/Footer';
import axios from 'axios';

function Login() {
    const sleep = (milliseconds) => {
      return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[isDataOk, setIsDataOk] = useState(false);
    let navigate = useNavigate();

    function signIn() {
      axios.post('http://192.168.1.171:5000/get_customer', {email: email, password: password})
        .then(response => {
              alert("response.data: " + response.data);
              if (response.data === null) {
                alert('email or password is wrong ');
              }
              else if (response.data)
              {
                navigate("/Analysis");
                alert(" setIsDataOk(true);")
                setIsDataOk(true);
                setIsLoggedIn(true);
                if(isDataOk) {
                  alert("setIsDataOk === true")
                  setIsLoggedIn(true);
                }
              }
            }
        ).catch(function (error) {
          console.log(error);
        });
    }
    
    useEffect(() => {
      alert(isLoggedIn);
      alert("isDataOk: " + isDataOk )
      if (isLoggedIn) {
        alert("in isloggedin useeffect");
        navigate("Analysis", {replace: true});
      }
    }, [isLoggedIn])

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
          </div>
          </div>
    )
}

export default Login
