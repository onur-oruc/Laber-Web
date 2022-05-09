import {React, useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import FormData from 'form-data'
import { toastifyWarnOptions, toastifyErrOptions, toastifySuccessOptions } from '../context/ToastifyOptions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from '../api/axios';
import './UploadData.css'

// https://www.geeksforgeeks.org/how-to-create-a-upload-file-button-in-reactjs/
const UploadData = ({zipFile, setZipFile, taskName, customerEmail}) => {
  const [fileToBeUploaded, setFileToBeUploaded] = useState([])
  const [isUploadDone, setIsUploadDone] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  
  let formData = new FormData()
  const [uploadFile, setUploadFile] = useState("")
  const handleFileReader = async(event) => {
    const config = {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("access_token") }
    }
    // let reader = new FileReader();
    // console.log("zip file size: ", event.target.files.length)
    // reader.readAsDataURL(event.target.files[0]);
    // reader.onload = (e) => {
    //   setZipFile({data:reader.result.split(',').pop(),fileName:event.target.files[0].name})
    // }; 
    // console.log("event.target.files: ", event.target.files.length)
    // formData.append('taskName', taskName)
    // formData.append("customerEmail", customerEmail)
    console.log("event.target: ", event.target);
    setFileCount(event.target.files.length)
    for (let i = 0; i < event.target.files.length; i++) {
      console.log("every image: ", event.target.files[i])
      formData.append(`image`, event.target.files[i])
      let reader = new FileReader()
      reader.readAsDataURL(event.target.files[i])
      reader.onload = (e) => {
        const result = reader.result.split(',')
        console.log("result: ", result);
        console.log("base: ", result[1])
        setZipFile(arr => [...arr, result[1]])
       // const response = axios.post('/add_custom_data', {file: result[1]}, config);
      }
      setFileToBeUploaded(arr => [...arr, event.target.files[i]])
    }
    for (var key of formData.entries()) {
      console.log("key 1 ve 2: "+ key[0] + ', ' + key[1]['data'])
    }
    setIsUploadDone(true) 
  }

  const uploadHandler = () => {
    console.log('uploadFile xx', formData)
  };


  return (
    // <div style={{
     
    // }}>
    //   <div style={{ width: '100%' }}>
    //     <h3>Upload Your Data (Optional)</h3> 
    //   </div>
    //   <input
    //     type="file"
    //     name="file"
    //     style={{ display: 'none' }}
    //     id="contained-button-file"
    //   />
    //   <label htmlFor="contained-button-file">
    //     <Button variant="contained" color="primary" component="span">
    //       Upload
    //     </Button>
    //   </label>
    // </div>
    <div>
      {/* <label>Select File</label>
      <input 
        type="file" 
        name="file"
        onChange={handleFile} ></input> */}
      <label for="file-upload" className='custom-file-upload'>Select Images</label>
      <br/>
       <input id="file-upload"
        multiple
        onChange={handleFileReader}                
        type="file"
        // accept=".zip,.rar,.7zip"
       />
       { fileCount !== 0 
        ?
          (<label>{fileCount} files</label>)
        :
          <label>No file chosen</label>
       }
    </div>
  );
}

export default UploadData