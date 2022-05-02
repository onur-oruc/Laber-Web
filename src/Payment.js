import React from 'react'
import Navbar from './components/Navbar'
import Unauthorized from './components/Unauthorized'
//https://react.semantic-ui.com/elements/label/
//https://codesandbox.io/s/420ge4?module=/example.js&file=/example.js

function Payment() {
  return (
    <div>
       {(sessionStorage.getItem("access_token") && sessionStorage.getItem("access_token") !== "" && sessionStorage.getItem("access_token") !== undefined) ?
        (<div><Navbar/> 
          Payment
        </div>) : (<Unauthorized/>)}
    </div>
  )
}

export default Payment