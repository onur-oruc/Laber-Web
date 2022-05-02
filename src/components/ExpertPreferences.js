import React from 'react'
import './ExpertPreferences.css'

//https://codesandbox.io/s/floating-label-input-zveb7?from-embed=&file=/src/styles.css:395-1249
function ExpertPreferences({minAge, setMinAge, maxAge, setMaxAge}) {
  return (
    <div>
        <div className='ExpertPreferences_Age'>
            <div className="input-container">
                <input 
                    type="number" 
                    value={minAge} 
                    pattern="[0-9]*"
                    onChange={(e) => {
                        setMinAge((v) => (e.target.validity.valid ? e.target.value : v));
                    }} />
                <label className={minAge && 'filled'} >
                    Min Age
                </label>
            </div>
            <div className="input-container">
                <input 
                    type="text" 
                    value={maxAge} 
                    pattern="[0-9]*"
                    onChange={(e) => {
                        setMaxAge((v) => (e.target.validity.valid ? e.target.value : v));
                    }} />
                <label className={maxAge && 'filled'} >
                    Max Age
                </label>    
            </div>
        </div>
    </div>
  )
}

export default ExpertPreferences