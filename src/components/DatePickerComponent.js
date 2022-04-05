import React from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import format from "date-fns/format"
import { setHours, setMinutes } from 'date-fns'

//https://reactdatepicker.com/

function DatePickerComponent({handleClick, date, setDate, isOpen, setIsOpen}) {
  return (
    <div>
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
    </div>
  )
}

export default DatePickerComponent