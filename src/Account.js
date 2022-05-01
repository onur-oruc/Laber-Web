import React from 'react'
import Navbar from './components/Navbar'
import Unauthorized from './components/Unauthorized'

function Account() {
  return (
    <div>
        {
          (sessionStorage.getItem("access_token") && sessionStorage.getItem("access_token") != "" && sessionStorage.getItem("access_token") != undefined) 
          ?
            (<div><Navbar/> 
              Account
            </div>) 
          : 
            (<Unauthorized/>)
        }
    </div>
  )
}

export default Account