import React from 'react';
import { useState, useContext, useEffect } from 'react';
import './Login.css';
// import Footer from './components/Footer';
import axios from './api/axios';
import Analysis from './Analysis';
import {useAuth} from './context/AuthProvider'
import {useNavigate} from 'react-router-dom'


function Login() {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [token, setToken] = useState('');
  const {aEmail, aPass, aToken} = {auth};
  let navigate = useNavigate();
  
  const signIn = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/get_customer', 
        {email: email, password: password}
        // ,{
        //   headers: {"Access-Control-Allow-Origin": "*",
        //   'Access-Control-Allow-Credentials':true}
        // }
        )
      if (response.data === null) {
        alert('email or password is wrong ');
      } else if (response.data) {
        const accessToken = response?.data?.access_token
        sessionStorage.setItem("access_token", accessToken);
        sessionStorage.setItem("email", email);
        const roles = response?.data?.roles;
        console.log("email: ", email);
        setAuth({email, password, accessToken});
        setIsLoggedIn(true);
        setEmail('');
        setPassword('');
      }
    } catch (err) {
      if (!err?.response) {
        alert("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else if (err.response?.status === 404) {
        setErrMsg('User cannot be found');
      } else {
        setErrMsg('Login Failed');
      }
    }
  }

  useEffect(() => { 
    if (sessionStorage.getItem("access_token")) { // in presence of valid access token
      navigate('/Analysis');
    } else {
      navigate("/");
    } 
  }, []);

   
  return (
    <div>
      {
        !isLoggedIn 
        ? 
          (<div className="login__background">
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
                placeholder='Password deploy' 
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
          </div>) 
        : 
         <Analysis/>}  
    </div>
  )
}

export default Login
