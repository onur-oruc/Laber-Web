import * as React from 'react';
import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function DataTypeSelectionRadioButton({taskDataType, setTaskDataType}) {
    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
      setValue(event.target.value);
      if (event.target.value === 'Twitter') {
        setTaskDataType(0)
      } else if (event.target.value === 'Custom Image') {
        setTaskDataType(1)
      }
    };
  
    return (
      <FormControl>
        <FormLabel style={{color: '#1976d2'}}id="demo-controlled-radio-buttons-group">Task Data Type</FormLabel>
        <RadioGroup
            row
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
        >
            <FormControlLabel value="Twitter" control={<Radio />} label="Tweet" />
            <FormControlLabel value="Custom Image" control={<Radio />} label="Upload Images" />
        </RadioGroup>
      </FormControl>
    );
  }