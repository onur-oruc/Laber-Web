import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Login.css';
import Footer from './components/Footer';
import axios from './api/axios';
import Login from './Login';
import FormLabel from '@mui/material/FormLabel';
import { toastifyWarnOptions, toastifyErrOptions, toastifySuccessOptions } from './context/ToastifyOptions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function SignUp() {
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState('');
    const[password, setPassword] = useState("");
    const[companyName, setCompanyName] = useState('');
    const[fullname, setFullname] = useState('');
    const[username, setUsername] = useState('');
    const[isSignedUp, setIsSignedUp] = useState(false);
    const[isPwdValidRegex, setIsPwdValidRegex] = useState(false);
    
    //8 to 15 characters which contain at least one lowercase letter,
    // one uppercase letter, one numeric digit, and one special character
    const validPwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

    const isPasswordValid = () => {
      if (String(password).match(validPwdRegex)) {
        setIsPwdValidRegex(true);
      } else {
        setIsPwdValidRegex(false);
      }
    }

    const signUp = async (e) => {
      e.preventDefault();
      console.log("in signUp");
      if (isPwdValidRegex) {
        try {
          const response = await axios.post('/add_customer', {
              email: email,
              name: fullname,
              username: username,
              phone: phone,
              password: password,
              companyName: companyName
          })
          if (response.data.message === "success") {
            toast.success('🦄 Your account has been created successfully!', toastifySuccessOptions );
            setIsSignedUp(true);
          } else if (response.data.message === "failed") {
            toast.warn('🦄 Check your email and/or password!', toastifyWarnOptions );
            setIsSignedUp(false);
          }
        } catch(error) {
          toast.error('🦄 An error occured. Please try againa!', toastifyErrOptions);
        }
      }
    }

    useEffect(() => {
      isPasswordValid()
      console.log("password: ", password);
      console.log("valid: ", isPwdValidRegex);
    }, [password])

    return (
        <div>
          {isSignedUp ? <Login/> : (<div className="login__background">
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
                {
                  !isPwdValidRegex 
                  ? 
                    (<FormLabel 
                      style={{marginBottom: 15}}
                      id="incorrect-format-warning"
                      color='warning'
                      error={true}
                    > Password should be 8 to 15 characters which contains at least one lowercase letter, one uppercase letter, one numeric digit, and one special character *</FormLabel>)
                  :
                    <></>
                }
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
              <div className="login__footer">
                <div className="sign_up">
                  <span className="loginScreen__gray">Already have an account? </span>
                  <span className="loginScreen__link"><a id="signup_now" className="loginScreen__link" href="/">Sign in.</a></span>
                </div>
              </div> 
            </div>
            <div className="loginScreen__gradient"/>
            <ToastContainer />
          </div>)}
          </div>
    )
}

export default SignUp
