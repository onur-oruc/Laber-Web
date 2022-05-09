import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import "./Analysis.css"
import "./components/BarChart.css"
import ContinuousChart from './components/ContinuousChart'
import {useAuth} from './context/AuthProvider'
import {useNavigate} from 'react-router-dom'
import Unauthorized from './components/Unauthorized'
import { toastifyWarnOptions, toastifyErrOptions, toastifySuccessOptions } from './context/ToastifyOptions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from './api/axios';
import Histogram from 'react-chart-histogram';
import BarChart from './components/BarChart'
import ScalarMetricSlider from './components/ScalarMetricSlider'
import PieChart from './components/PieChart'
import Button from '@mui/material/Button'

function Analysis() {
  const [tasks, setTasks] = useState([]);
  const [isTasksEmpty, setIsTasksEmpty] = useState(true);
  const {auth} = useAuth();
  const histogramOptions = { fillColor: '#9409e5', strokeColor: '#FFFFFF' };
  const [results, setResults] = useState({});
  console.log("auth in Analysis: ", auth);
  let navigate = useNavigate();

  const modifyResults = () => {
    setResults({})
    console.log("inside modifyResults")
  }

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
    console.log("tasks: ", tasks);
    console.log("tasks length, ", tasks.length)
    if (tasks.length > 0) {
      setIsTasksEmpty(false);
    }
  }, [tasks])

  const downloadResult = async(taskName) => {
    try {
      const response = await axios.get('/get_answers_in_json/'+ taskName, 
        {
          headers: {
            'Authorization': "Bearer " + sessionStorage.getItem("access_token"),
            // 'Authorization': "Bearer " + auth.accessToken -> does NOT work after refresh
          }
        }
      )
      console.log("json download: ", response.data);
    } catch (error) {

    }
  }

  return (
    <div>
      {
      (sessionStorage.getItem("access_token") && sessionStorage.getItem("access_token") !== "" && sessionStorage.getItem("access_token") !== undefined) 
      ?
        (<div className='Analysis-background' >
          <Navbar/>       
          <div className="Analysis">
          <p className='Analysis__PageTitle'><span><strong className="ResultsTitleFont">Results</strong></span></p> 
            {tasks?.data ?         
              (Object.keys(tasks.data).map((taskName, taskNameIndex) => (
                <div>
                  <p className='Analysis__TaskHeader'><span><strong>Task: </strong></span> {taskName}</p> 
                  {/* <Button onClick={() => {
                    downloadResult(taskName)
                  }}>Download Analysis</Button> */}
                  {
                    tasks?.data[taskName]['scalar'] ?
                    (
                      Object.keys(tasks.data[taskName]['scalar'][0]).map((scalarMetric, scalarMetricIndex) => (
                        <div className='ScalarMetricSlider__div'>
                          {/* <p>scalar result: {scalarMetric}: {tasks.data[taskName]['scalar'][scalarMetric]} </p> */}
                            {/* <p>scalar metric: {tasks.data[taskName]['scalar'][0][scalarMetric]}</p> */}
                            <ScalarMetricSlider 
                              taskNameProp={taskName} 
                              scalarMetricName={tasks.data[taskName]['scalar'][0][scalarMetric]}
                              value={tasks.data[taskName]['scalar'][1][scalarMetricIndex]}/>
                        </div>
                      ))
                    ):<></>
                  }
                  {
                    tasks?.data[taskName]['nonscalar'] ?
                    (
                      Object.keys(tasks.data[taskName]['nonscalar']).map((nonScalarMetric, nonScalarMetricIndex) => (
                        <div>
                          {/* <p>non scalar metric name: {nonScalarMetric}</p> */}
                          {
                            Object.keys(tasks.data[taskName]['nonscalar'][nonScalarMetric]).map((nonScalarMetricResult, nonScalarMetricReulstId) => (
                              <div>
                                {/* <p> {nonScalarMetric} : non scalar result: {nonScalarMetricResult} </p> */}
                                
                              </div> 
                            ))
                          }
                          <div className="BarChart__div">
                            {/* <p> hey 0 : {tasks.data[taskName]['nonscalar'][nonScalarMetric][0]}</p>
                            <p> hey 1 : type:{tasks.data[taskName]['nonscalar'][nonScalarMetric][1]}</p> */}
                             
                            {/* <Histogram
                              xLabels={tasks.data[taskName]['nonscalar'][nonScalarMetric][0]} 
                              yValues={tasks.data[taskName]['nonscalar'][nonScalarMetric][1]}
                              width='400'
                              height='200'
                              options={histogramOptions}
                            /> */}
                            <BarChart
                              chartTitle={nonScalarMetric} 
                              labels={tasks.data[taskName]['nonscalar'][nonScalarMetric][0]}
                              values={tasks.data[taskName]['nonscalar'][nonScalarMetric][1]}
                              min={null}
                              max={null}/>
                            <PieChart
                              chartTitle={nonScalarMetric}
                              labels={tasks.data[taskName]['nonscalar'][nonScalarMetric][0]}
                              values={tasks.data[taskName]['nonscalar'][nonScalarMetric][1]} />
                          </div>
                    
                        </div>
                      ))
                    ):<></>
                  }
                </div>
              ))) : <></>
            }
          </div>
        </div>) 
      : 
        (<Unauthorized/>) }
    </div>
  )
}

export default Analysis