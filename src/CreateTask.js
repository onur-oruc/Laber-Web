import { React, useEffect } from 'react'
import Navbar from './components/Navbar'
import TaskDetails from './components/TaskDetails'
import { useState } from 'react'
import axios from "axios"
import Button from '@mui/material/Button'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import DatePickerComponent from './components/DatePickerComponent'
import WebsiteCheckbox from './components/WebsiteCheckbox'
import ExpertPreferences from './components/ExpertPreferences'
import GenderRadioButton from './components/GenderRadioButton'
import LanguageSelection from './components/LanguageSelection'
import UploadData from './components/UploadData'

function CreateTask() {
  const [keywords, updateKeyword] = useState([]);
  const [hashtags, setHastags] = useState([]);
  const [metrics, setMetrics] = useState([]);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [endDate, setEndDate] = useState(new Date());
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [isTwitterSelected, setTwitterSelected] = useState(false);
  const [isFacebookSelected, setFacebookSelected] = useState(false);
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [gender, setGender] = useState('');

  const deneme = () => {
    axios.get('http://192.168.1.171:5000/fetch_tweets/'+ keywords[0]).then(response => {
      console.log(response.data);
    });
  }
  
  const handleChangeTwitter = (e) => {
    setTwitterSelected(!isTwitterSelected);
    console.log("Twitter selected: " + isTwitterSelected);
  }

  const handleChangeFacebook = (e) => {
    setFacebookSelected(!isFacebookSelected);
    console.log("FB selected: " + isFacebookSelected);
  }

  const handleClickStart = (e) => {
    e.preventDefault();
    setIsOpenStart(!isOpenStart);
  };
  const handleClickEnd = (e) => {
    e.preventDefault();
    setIsOpenEnd(!isOpenEnd);
  };
  
  useEffect(() => {
    console.log("gender: " + gender);
  }, [gender])
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
            <WebsiteCheckbox 
              handleChangeTwitter={handleChangeTwitter} 
              handleChangeFB={handleChangeFacebook}
              isTwitterSelected={isTwitterSelected}
              isFacebookSelected={isFacebookSelected}/>
            <div className="CreateTask__DatePicker">
              <div className="CreateTask">
                <label>Select a Time Interval</label>
              </div>
              <DatePickerComponent 
                handleClick={handleClickStart} 
                date={startDate} 
                setDate={setStartDate} 
                isOpen={isOpenStart}
                setIsOpen={setIsOpenStart}
                label="Start Date"/>
            </div>
            <div className="CreateTask__DatePicker">
              <DatePickerComponent 
                handleClick={handleClickEnd} 
                date={endDate} 
                setDate={setEndDate} 
                isOpen={isOpenEnd}
                setIsOpen={setIsOpenEnd}
                label="End Date"/>
            </div>
          </div>
          <div className="CreateTask__Preferences">
            <ExpertPreferences 
              minAge={minAge} 
              setMinAge={setMinAge}
              maxAge={maxAge}
              setMaxAge={setMaxAge}/>
            <div style={{ color: 'blue', lineHeight : 10, marginTop: 50 }}> 
              <GenderRadioButton value={gender} setGender={setGender} />
            </div>
            <div style={{ color: 'blue', marginTop: 25 }}> 
              <LanguageSelection />
            </div>
          </div>
        </div>
        <div className='CreateTask__TopButtons'>
          <div className='CreateTask__UploadButton'>
            <UploadData/> 
          </div>
          <div className='CreateTask__SubmitButton'>
            <Button variant='contained' color='success'>
              Create Task
            </Button>
          </div>
        </div>
    </div>
  )
}

export default CreateTask