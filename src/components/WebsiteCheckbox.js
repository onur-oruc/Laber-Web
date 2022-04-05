import * as React from 'react';
import { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../CreateTask.css'
import FormLabel from '@mui/material/FormLabel';

// https://mui.com/components/checkboxes/
// ikisini de seçip, sonra birini seçmeyi bıraktığında işler bozuluyor.
export default function WebsiteCheckbox({handleChangeTwitter, handleChangeFB, isTwitterSelected, isFacebookSelected}) {
  const [error, setError] = useState(true);
  useEffect(() => {
    if (isFacebookSelected === true || isTwitterSelected === true) {
      setError(false);
    } else {
      setError(true);
    }
    console.log("error: " + error);
  }, [isFacebookSelected, isTwitterSelected])
  return (
    <>
    <FormLabel component="legend">Select Website</FormLabel>
    <FormGroup className='WebsiteCheckbox'>
        <FormControlLabel onChange={handleChangeTwitter} control={<Checkbox />} label="Twitter" />
        <FormControlLabel onChange={handleChangeFB} control={<Checkbox />} label="Facebook" />
    </FormGroup>
    </>
  );
}
