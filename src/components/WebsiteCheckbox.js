import * as React from 'react';
import { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../CreateTask.css'
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';

// https://mui.com/components/checkboxes/
// ikisini de seçip, sonra birini seçmeyi bıraktığında işler bozuluyor.
export default function WebsiteCheckbox({handleChangeTwitter, handleChangeFB, isTwitterSelected, isFacebookSelected}) {
  const [error, setError] = useState(true);

  useEffect(() => {
    if (isFacebookSelected === false && isTwitterSelected === false) {
      setError(true);
    } else {
      setError(false);
    }
    console.log("error: " + error);
  }, [isFacebookSelected, isTwitterSelected, error])

  return (
    <>
    <Box sx={{ display: 'flex' }}>
        <FormControl 
        required
        error={error}
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard">
      <FormLabel component="legend">Select a Website</FormLabel>
      <FormGroup className='WebsiteCheckbox'>
          <FormControlLabel onChange={handleChangeTwitter} control={<Checkbox />} label="Twitter" />
          <FormControlLabel onChange={handleChangeFB} control={<Checkbox />} label="Facebook" />
      </FormGroup>
    </FormControl>
    </Box>
    </>
  );
}
