import * as React from 'react';
import { useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function GenderRadioButton({value, setGender}) {
    const [value3, setValue] = useState('');
    useEffect(() => {
        console.log("gender inside GenderRadioButton: " + value3);
    }, [value3])
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        value={value}
        onChange={(event) => {
            setGender(event.target.value);
        }}
      >
        <FormControlLabel value="female" control={<Radio />} label="Female" />
        <FormControlLabel value="male" control={<Radio />} label="Male" />
        <FormControlLabel value="transgender" control={<Radio />} label="Transgender" />
        <FormControlLabel value="gender neutral" control={<Radio />} label="Gender Neutral" />
        <FormControlLabel value="non-binary" control={<Radio />} label="Non-binary" />
        <FormControlLabel value="other" control={<Radio />} label="Other" />
        <FormControlLabel value="any" control={<Radio />} label="Any" />
      </RadioGroup>
    </FormControl>
  )
}

export default GenderRadioButton