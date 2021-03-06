import {React} from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import format from "date-fns/format"
import { setHours, setMinutes } from 'date-fns'
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
//https://reactdatepicker.com/

function DatePickerComponent({handleClick, date, setDate, isOpen, setIsOpen, label}) {
  return (
    <div>
      <FormControl 
        required
        component="fieldset"
        sx={{ m: 1 }}
        variant="standard">
      <FormGroup className='WebsiteCheckbox'>
      <div className='CreateTask__label'>
        <label>{label}</label>
      </div>
      <button className="CreateTask_CustomPicker" onClick={handleClick}>
        {format(date, "dd-MM-yyyy h:mm aa")}
      </button>
      {isOpen && (
        <DatePicker 
          selected={date} 
          onChange={
            (date) => {setDate(date)
            setIsOpen(!isOpen);
          }}
          inline
          showTimeSelect
          excludeTimes={[
            setHours(setMinutes(new Date(), 0), 17),
            setHours(setMinutes(new Date(), 30), 18),
            setHours(setMinutes(new Date(), 30), 19),
            setHours(setMinutes(new Date(), 30), 17),
          ]}
          dateFormat="MMMM d, yyyy h:mm aa" />
      )}
      </FormGroup>
    </FormControl>
      
    </div>
  )
}

export default DatePickerComponent