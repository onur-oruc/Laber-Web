import React from 'react'
import Navbar from './components/Navbar'
import TaskDetails from './components/TaskDetails'
import { useState } from 'react';
import axios from "axios";
import Button from '@mui/material/Button'

function CreateTask() {
  const [keywords, updateKeyword] = useState([]);
  const [hashtags, setHastags] = useState([]);
  const [metrics, setMetrics] = useState([]);

  const deneme = () => {
    axios.get('http://192.168.1.171:5000/fetch_tweets/'+ keywords[0]).then(response => {
      console.log(response.data);
    });
  }
  return (
    <div>
        <Navbar/>
        <div className="CreateTask__Keywords">
          <TaskDetails array={keywords} arrayUpdater={updateKeyword} label="Keyword"/>
          <TaskDetails array={hashtags} arrayUpdater={setHastags} label="Hashtag"/>
          <TaskDetails array={metrics} arrayUpdater={setMetrics} label="Metric"/>
        </div>
        <Button onClick={deneme}>Create</Button>
    </div>
  )
}

export default CreateTask