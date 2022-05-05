import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import "./Analysis.css"
import ContinuousChart from './components/ContinuousChart'
import {useAuth} from './context/AuthProvider'
import {useNavigate} from 'react-router-dom'
import Unauthorized from './components/Unauthorized'
import { toastifyWarnOptions, toastifyErrOptions, toastifySuccessOptions } from './context/ToastifyOptions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from './api/axios';

function Analysis() {
  const [tasks, setTasks] = useState([]);
  const {auth} = useAuth();
  console.log("auth in Analysis: ", auth);
  let navigate = useNavigate();

  useEffect(() => {
    navigate('/Analysis');
    // get task results
    // get task names
    const getTasks = async() => {
      try {
        const response = await axios.get('/get_customer_tasks/'+sessionStorage.getItem("email")
          ,
          {
            headers: {
              'Authorization': "Bearer " + sessionStorage.getItem("access_token")
            }
          }
        )
        console.log("Analysis response: ", response);
        setTasks(response);
        if (response.data.message === "success") {
          
        } else if (response.data.message === "failed") {
        }
      } catch(error) {
        toast.error('🦄 An error occured. Please try againa!', toastifyErrOptions);
      }
    }

    getTasks();
  }, [])

  useEffect(() => {
    console.log("tasks: ", tasks.data['amber heard']);
  }, [tasks])
  
  return (
    <div>
      {
      (sessionStorage.getItem("access_token") && sessionStorage.getItem("access_token") !== "" && sessionStorage.getItem("access_token") !== undefined) 
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