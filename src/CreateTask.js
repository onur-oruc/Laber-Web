import React from 'react'
import Navbar from './components/Navbar'
import TaskDetails from './components/TaskDetails'
import { useState } from 'react'
import axios from "axios"
import Button from '@mui/material/Button'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import format from "date-fns/format"
import { setHours, setMinutes } from 'date-fns'

//https://reactdatepicker.com/
function CreateTask() {
  const [keywords, updateKeyword] = useState([]);
  const [hashtags, setHastags] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [endDate, setEndDate] = useState(new Date());

  const deneme = () => {
    axios.get('http://192.168.1.171:5000/fetch_tweets/'+ keywords[0]).then(response => {
      console.log(response.data);
    });
  }
  const [isOpen, setIsOpen] = useState(false);
  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };
  return (
    <div>
        <Navbar/>
        <div className="CreateTask">
          <div className="CreateTask__Keywords">
            <TaskDetails array={keywords} arrayUpdater={updateKeyword} label="Keyword"/>
            <TaskDetails array={hashtags} arrayUpdater={setHastags} label="Hashtag"/>
            <TaskDetails array={metrics} arrayUpdater={setMetrics} label="Metric"/>
          </div>
          <div className="CreateTask__Middle">
            <div className="CreateTask__DatePicker">
              <div className='CreateTask__label'>
                <label>Start Date</label>
              </div>
              <DatePicker selected={startDate} onChange={date => setStartDate(date)}/>
            </div>
            <div className="CreateTask__DatePicker">
              <div className='CreateTask__label'>
                <label>End Date</label>
              </div>
              <button className="CreateTask_CustomPicker" onClick={handleClick}>
                {format(startDate, "MMMM d, yyyy h:mm aa")}
              </button>
              {isOpen && (
                <DatePicker 
                  selected={startDate} 
                  onChange={
                    (date) => {setStartDate(date)
                    setIsOpen(!isOpen);
                  }}
                  inline
                  showTimeSelect
                  excludeTimes={[
                    setHours(setMinutes(new Date(), 0), 17),
                    setHours(setMinutes(new Date(), 30), 18),
                    setHours(setMinutes(new Date(), 30), 19),
                    setHours(setMinutes(new Date(), 30), 17),
                  ]}
                  dateFormat="MMMM d, yyyy h:mm aa" />
              )}
            </div>
          </div>
        </div>
        <Button onClick={deneme}>Create</Button>
    </div>
  )
}

export default CreateTask