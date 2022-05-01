import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import "./Analysis.css"
import ContinuousChart from './components/ContinuousChart'
import {useAuth} from './context/AuthProvider'
import {useNavigate} from 'react-router-dom'
import Unauthorized from './components/Unauthorized'

function Analysis() {
  const {auth} = useAuth();
  console.log("auth in Analysis: ", auth);
  let navigate = useNavigate();

  useEffect(() => {
    console.log("in Analysis in useEffect")
    navigate('/Analysis');
  }, [])

  return (
    <div>
      {
      (sessionStorage.getItem("access_token") && sessionStorage.getItem("access_token") != "" && sessionStorage.getItem("access_token") != undefined) 
      ?
        (<div className='Analysis-background' >
          <Navbar/>       
          <div className="Analysis">
            <br/>sa<br/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
          </div>
        </div>) 
      : 
        (<Unauthorized/>) }
    </div>
  )
}

export default Analysis