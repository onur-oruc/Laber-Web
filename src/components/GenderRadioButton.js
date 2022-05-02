import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';


function GenderRadioButton({ isFemale,
  setIsFemale,
  isMale,
  setIsMale,
  isTransgender,
  setIsTransgender,
  isGenderNeutral,
  setIsGenderNeutral,
  isNonBinary,
  setIsNonBinary}) {

  return (
    <>
    <Box sx={{ display: 'flex' }}>
        <FormControl 
        required
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard">
      <FormLabel component="legend">Select a Gender(s)</FormLabel>
      <FormGroup className='WebsiteCheckbox'>
          <FormControlLabel onChange={() => setIsFemale(!isFemale) } control={<Checkbox />} label="Female" />
          <FormControlLabel onChange={() => setIsMale(!isMale)} control={<Checkbox />} label="Male" />
          <FormControlLabel onChange={() => setIsTransgender(!isTransgender)} control={<Checkbox />} label="Transgender" />
          <FormControlLabel onChange={() => setIsGenderNeutral(!isGenderNeutral)} control={<Checkbox />} label="Gender Neutral" />
          <FormControlLabel onChange={() => setIsNonBinary(!isNonBinary)} control={<Checkbox />} label="Non-binary" />
      </FormGroup>
    </FormControl>
    </Box>
    </>
  )
}

export default GenderRadioButton