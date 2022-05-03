import React from 'react';
import { useState, useEffect } from 'react';
import './Login.css';
// import Footer from './components/Footer';
import axios from './api/axios';
import Analysis from './Analysis';
import {useAuth} from './context/AuthProvider'
import {useNavigate} from 'react-router-dom'
import { toastifyWarnOptions, toastifyErrOptions } from './context/ToastifyOptions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errMsg, setErrMsg] = useState('');
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
        toast.warn('🦄 Email and/or password is wrong !', toastifyWarnOptions );
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
        toast.error('🦄 No server response!', toastifyErrOptions );
      } else if (err.response?.status === 400) {
        toast.error('🦄 Missing Username or Password!', toastifyErrOptions );
      } else if (err.response?.status === 401) {
        toast.error('🦄 You are unauthorized to take this action', toastifyErrOptions );
      } else if (err.response?.status === 404) {
        toast.error('🦄 User cannot be found', toastifyErrOptions );
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
      <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"></meta>
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
                placeholder='Password deploy 2' 
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
          <ToastContainer />
          </div>) 
        : 
         <Analysis/>}  
    </div>
  )
}

export default Login
