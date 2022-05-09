import { React, useEffect, useContext } from 'react'
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
import axios from './api/axios';
import {useAuth} from './context/AuthProvider'
import { toastifyWarnOptions, toastifyErrOptions, toastifySuccessOptions } from './context/ToastifyOptions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Unauthorized from './components/Unauthorized'
import DataTypeSelectionRadioButton from './components/DataTypeSelectionRadioButton'
import FormData from 'form-data'


function CreateTask() {
  const [keywords, updateKeyword] = useState([]);
  const [hashtags, setHastags] = useState([]);
  const [scalarMetrics, setScalarMetrics] = useState([]);
  const [nonScalarMetrics, setNonScalarMetrics] = useState([]);
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
  const [dataLink, setDataLink] = useState('');
  const [taskDataType, setTaskDataType] = useState(null) // 0: Twitter, 1: Upload Image
  const [zipFile, setZipFile] = useState("");
  
  const {auth, setAuth} = useAuth();

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

  const isDateInputsValid = () => {
    if (taskDataType === 0) {
      if (startDate.getTime() > endDate.getTime()) {
        toast.warn('🦄 End date cannot be before the start date!', toastifyWarnOptions );
        return false;
      }
    }
    return true;
  }

  useState(() => {
    console.log("task data type: ", taskDataType);
    // if (taskDataType === 1 )
  }, [taskDataType])

  const isRequiredFieldsFilled = () => {
    if (!taskName || taskName === undefined || taskName === '') {
      toast.warn('🦄 Enter a task name!', toastifyWarnOptions );
      return false;
    }
    if (!scalarMetrics.length && !nonScalarMetrics.length) {
      toast.warn('🦄 Enter at least one scalar/non-scalar metric!', toastifyWarnOptions );
      return false;
    }
    if (!minAge || minAge === undefined || minAge === '') {
      toast.warn('🦄 Specify the minimum age of experts!', toastifyWarnOptions );
      return false;
    }
    if (!maxAge || maxAge === undefined || maxAge === '') {
      toast.warn('🦄 Specify the maximum age of experts!', toastifyWarnOptions );
      return false;
    }
    if (minAge < 18) {
      toast.warn('🦄 Minimum age cannot be smaller than 18!', toastifyWarnOptions );
      return false;
    }
    if (minAge > maxAge) {
      toast.warn('🦄 Minimum age cannot be bigger than maximum age!', toastifyWarnOptions );
      return false;
    }
    if (!isFemale && !isMale && !isTransgender && !isNonBinary && !isGenderNeutral) {
      toast.warn('🦄 Select at least one gender!', toastifyWarnOptions );
      return false;
    }
    if (!languages.length) {
      toast.warn('🦄 Select at least one language!', toastifyWarnOptions );
      return false;
    }
    if (taskDataType === 0) { // Twitter
      if (!keywords.length && !hashtags.length) {
        toast.warn('🦄 Enter at least one keyword/hashtag!', toastifyWarnOptions );
        return false;
      } 
    }
    else if (taskDataType === 1) { // Custom Image Data

    }

    return true
  }

  const createTask = async(e) => {
    e.preventDefault();
    if (isRequiredFieldsFilled() && isDateInputsValid()) {
      try {
        const response = await axios.post('/add_task', 
          {
            customerEmail: sessionStorage.getItem("email"),
            taskName: taskName, 
            keywords: keywords,
            hashtags: hashtags,
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
            languages: languages,
            dataLink: dataLink,
            taskDataType: taskDataType,
            zipFile: zipFile
          }, 
          {
            headers: {
              'Authorization': "Bearer " + sessionStorage.getItem("access_token"),
              // 'Authorization': "Bearer " + auth.accessToken -> does NOT work after refresh
            }
          }
        )
        if (response.data !== null) {
          toast.error('🦄 Please enter a unique task name!', toastifyErrOptions );
        }
        else {
          toast.success('🦄 The task has been successfully created!', toastifySuccessOptions );
          // clear fields
          
        }
      } catch (err) {
        if (!err?.response) {
          toast.error('🦄 No server response!', toastifyErrOptions );
        } else if (err.response?.status === 401) {
          toast.error('🦄 You are unauthorized to take this action. Please login!', toastifyErrOptions );
        } else if (err.response?.status === 422) {
          toast.error('🦄 Authentication error. Please login!', toastifyErrOptions );
        }
      }
    }
  }
  
  // useEffect(() => {
  //   console.log("scalar metrics: " + JSON.stringify(scalarMetrics));
  //   console.log("non-scalar metrics: " + JSON.stringify(nonScalarMetrics));
  // }, [scalarMetrics, nonScalarMetrics])
  // useEffect(() => {
  //   setZipFile("")
  // }, [])

  useEffect(() => {
    // clear images, keywords and hashtags
    updateKeyword([])
    setHastags([])
    setZipFile("")
  }, [taskDataType])

  useEffect(() => {
    console.log("zipFile in CreateTask:  ", zipFile.length);
  }, [zipFile])

  return (
    <div>
      { (sessionStorage.getItem("access_token") && sessionStorage.getItem("access_token") !== "" && sessionStorage.getItem("access_token") !== undefined) 
      ?
        (<div>
            <Navbar/>
            <div className='CreateTask__DataTypeRadioButton'>
              <DataTypeSelectionRadioButton taskDataType={taskDataType} setTaskDataType={setTaskDataType}/>
            </div>
            <div className="CreateTask">
              <div className="CreateTask__Keywords">
              { taskDataType !== null &&
                
                (<div><h2 className='CreateTask__Headers'>TASK DETAILS</h2>
                { 
                  taskDataType === 0 && 
                  (<><TaskDetails array={keywords} arrayUpdater={updateKeyword} label="Keyword"/>
                  <TaskDetails array={hashtags} arrayUpdater={setHastags} label="Hashtag"/></>)
                }
                <Metric scalarMetrics={scalarMetrics} setScalarMetrics={setScalarMetrics}
                        nonScalarMetrics={nonScalarMetrics} setNonScalarMetrics={setNonScalarMetrics} />
                </div>)
              }
              </div>
            {taskDataType !== null && <div className="CreateTask__Middle">
              <h2 className='CreateTask__HeadersTaskName'>TASK NAME</h2>
              <TextField style={{ width: 185}}
                id="outlined-basic" 
                label={"Task Name"}
                variant="outlined"
                onChange={(e) => setTaskName(e.target.value)}
              />
              <div style={{ marginTop: 50}}>
                { taskDataType === 1 &&
                  <UploadData 
                    zipFile={zipFile} 
                    setZipFile={setZipFile}
                    taskName={taskName}
                    customerEmail={sessionStorage.getItem("email")}/> 
                }
              </div>
              <br/><br/><br/>
              {/* <WebsiteCheckbox 
                handleChangeTwitter={handleChangeTwitter} 
                handleChangeFB={handleChangeFacebook}
                isTwitterSelected={isTwitterSelected}
                isFacebookSelected={isFacebookSelected}/> */}
              { taskDataType === 0 && (<><div className="CreateTask__DatePicker">
                {/* <div className="CreateTask">
                  <label>Select a Time Interval</label>
                </div> */}
                <h2 className='CreateTask__HeadersTimeInterval'>TIME INTERVAL</h2>
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
                </div> </>)
              }
            </div> }
            { taskDataType !== null && <div className="CreateTask__Preferences">
              <h2 className='CreateTask__HeadersV2'>EXPERT PREFERENCES</h2>
              <ExpertPreferences 
                minAge={minAge} 
                setMinAge={setMinAge}
                maxAge={maxAge}
                setMaxAge={setMaxAge}/>
              <div style={{ color: '#1976d2', lineHeight : 10, marginTop: 50 }}> 
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
                  />
              </div>
              <div style={{ color: 'blue', marginTop: 25 }}> 
                <LanguageSelection array={languages} arrayUpdater={setLanguages} />
              </div>
            </div> }
          </div>
          <div className='CreateTask__TopButtons'>
            <div className='CreateTask__SubmitButton'>
              { (taskDataType === 0 || taskDataType === 1) &&
                <Button 
                  variant='contained' 
                  color='success'
                  onClick={createTask}>
                  Create Task
                </Button>
              } 
            </div>
          </div> 
          <ToastContainer />
        </div>) 
      : 
        (<Unauthorized/>)}
    </div>
  )
}

export default CreateTask