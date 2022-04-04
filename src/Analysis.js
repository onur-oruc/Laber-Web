import React from 'react'
import Navbar from './components/Navbar'
import "./Analysis.css"
import ContinuousChart from './components/ContinuousChart'

function Analysis() {
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