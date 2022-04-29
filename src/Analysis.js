import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import "./Analysis.css"
import ContinuousChart from './components/ContinuousChart'
import {useAuth} from './context/AuthProvider'
import {useNavigate} from 'react-router-dom'

function Analysis() {
  const {auth} = useAuth();
  console.log("auth in Analysis: ", auth);
  let navigate = useNavigate();

  useEffect(() => {
    console.log("in Analysis in useEffect")
    navigate('/Analysis');
  }, [])

  return (
    <div className='Analysis-background' >
        <Navbar/>       
        <div className="Analysis">
            <br/> sa<br/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
            <ContinuousChart/>
        </div>
    </div>
  )
}

export default Analysis