import { React, useEffect } from 'react'
import Navbar from './components/Navbar'
import TaskDetails from './components/TaskDetails'
import { useState } from 'react'
import Button from '@mui/material/Button'
import 'react-datepicker/dist/react-datepicker.css'
import { setHours, setMinutes } from 'date-fns'
import DatePickerComponent from './components/DatePickerComponent'
import WebsiteCheckbox from './components/WebsiteCheckbox'
import ExpertPreferences from './components/ExpertPreferences'
import GenderRadioButton from './components/GenderRadioButton'
import LanguageSelection from './components/LanguageSelection'
import UploadData from './components/UploadData'
import TextField from '@material-ui/core/TextField'
import Metric from './components/Metric'
import MetricV2 from './components/MetricV2';
import axios from './api/axios';
import AuthContext from './context/AuthProvider';


function CreateTask() {
  const [keywords, updateKeyword] = useState([]);
  const [hashtags, setHastags] = useState([]);
  const [minSentiment, setMinSentiment] = useState();
  const [maxSentiment, setMaxSentiment] = useState();
  const [minSarcasm, setMinSarcasm] = useState();
  const [maxSarcasm, setMaxSarcasm] = useState();
  const [standMetric, setStandMetric] = useState([]);
  const [isBot, setIsBot] = useState([])

  const [scalarMetrics, setScalarMetrics] = useState([]);
  const [nonScalarMetrics, setNonScalarMetrics] = useState([]);
  const [numMetrics, setNumMetrics] = useState(0);
  const [startDate, setStartDate] = useState(setHours(setMinutes(new Date(), 30), 16));
  const [endDate, setEndDate] = useState(new Date());
  const [isOpenStart, setIsOpenStart] = useState(false);
  const [isOpenEnd, setIsOpenEnd] = useState(false);
  const [isTwitterSelected, setTwitterSelected] = useState(false);
  const [isFacebookSelected, setFacebookSelected] = useState(false);
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [languages, setLanguages] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [isFemale, setIsFemale] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [isTransgender, setIsTransgender] = useState(false);
  const [isGenderNeutral, setIsGenderNeutral] = useState(false);
  const [isNonBinary, setIsNonBinary] = useState(false);
  const [isAny, setIsAny] = useState(false);

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
  
  const displayNewMetricField = () => {
    setNumMetrics(numMetrics + 1);
  }
  
  const createTask = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/add_task', 
        {
          customerEmail: "adem0606@gmail.com",
          taskName: taskName, 
          keywords: keywords,
          hashtags: hashtags,
          // sentimentMin:  minSentiment,
          // sentimentMax: maxSentiment,
          // sarcasmMax: maxSarcasm,
          // sarcasmMin: minSarcasm,
          // standMetric: standMetric,
          // isBot: isBot,
          scalarMetrics: scalarMetrics,
          nonScalarMetrics: nonScalarMetrics,
          isTwitterSelected: isTwitterSelected,
          isFacebookSelected: isFacebookSelected,
          startDate: startDate,
          endDate: endDate,
          minAge: minAge,
          maxAge: maxAge,
          isFemale: isFemale,
          isMale: isMale,
          isTransgender: isTransgender,
          isGenderNeutral: isGenderNeutral,
          isNonBinary: isNonBinary,
          isAny: isAny,
          languages: languages
        }
      )
    } catch (err) {
      alert("No Server Response");
    }
  }

  useEffect(() => {
    console.log("scalar metrics: " + JSON.stringify(scalarMetrics));
    console.log("non-scalar metrics: " + JSON.stringify(nonScalarMetrics));
  }, [scalarMetrics, nonScalarMetrics])

  return (
    <div>
        <Navbar/>
        <div className="CreateTask">
          <div className="CreateTask__Keywords">
            <TaskDetails array={keywords} arrayUpdater={updateKeyword} label="Keyword"/>
            <TaskDetails array={hashtags} arrayUpdater={setHastags} label="Hashtag"/>
            <Metric scalarMetrics={scalarMetrics} setScalarMetrics={setScalarMetrics}
                    nonScalarMetrics={nonScalarMetrics} setNonScalarMetrics={setNonScalarMetrics} />
            {/* <MetricV2 
              minSentiment={minSentiment} 
              setMinSentiment={setMinSentiment} 
              maxSentiment = {maxSentiment}
              setMaxSentiment={setMaxSentiment}
              minSarcasm={minSarcasm} 
              setMinSarcasm={setMinSarcasm} 
              maxSarcasm={maxSarcasm} 
              setMaxSarcasm={setMaxSarcasm}
              standMetric={standMetric}
              setStandMetric={setStandMetric} 
              isBot={isBot} 
              setIsBot={setIsBot}/> */}
          </div>
          <div className="CreateTask__Middle">
          <TextField style={{ width: 185}}
                id="outlined-basic" 
                label={"Task Name"}
                variant="outlined"
                onChange={(e) => setTaskName(e.target.value)}
            />
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
              <GenderRadioButton 
                isFemale={isFemale} 
                setIsFemale={setIsFemale}
                isMale={isMale}
                setIsMale={setIsMale}
                isTransgender={isTransgender}
                setIsTransgender={setIsTransgender}
                isGenderNeutral={isGenderNeutral}
                setIsGenderNeutral={setIsGenderNeutral}
                isNonBinary={isNonBinary}
                setIsNonBinary={setIsNonBinary}
                isAny={isAny}
                setIsAny={setIsAny}
                 />
            </div>
            <div style={{ color: 'blue', marginTop: 25 }}> 
              <LanguageSelection array={languages} arrayUpdater={setLanguages} />
            </div>
          </div>
        </div>
        <div className='CreateTask__TopButtons'>
          <div className='CreateTask__UploadButton'>
            <UploadData/> 
          </div>
          <div className='CreateTask__SubmitButton'>
            <Button 
              variant='contained' 
              color='success'
              onClick={createTask}>
              Create Task
            </Button>
          </div>
        </div>
    </div>
  )
}

export default CreateTask