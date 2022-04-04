import React from 'react'
import {useNavigate} from "react-router-dom"

function Login() {
    let navigate = useNavigate();
    return (
        <div>
            Login
            <button onClick={() => navigate("/analysis")}> GO </button>
        </div>
    )
}

export default Login