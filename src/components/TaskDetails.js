import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button'
import { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import '../CreateTask.css';
// https://mui.com/components/text-fields/

function TaskDetails({array, arrayUpdater, label}) {
    const [newKeyword, setNewKeyword] = useState("");
    const [clicked, setClicked] = useState("");
    const onSubmit = () => {
        arrayUpdater(arr => [...arr, newKeyword]);
        if (clicked)
            setClicked(false);
        else 
            setClicked(true);
    }
    const handleDelete = (keyword) => {
        arrayUpdater(array.filter(item => item !== keyword));
    }
    useEffect(() => {
        console.log(array);
    }, [clicked, array])
    return (
        <div className='CreateTask__div'>
            <TextField 
                id="outlined-basic" 
                label={label}
                variant="outlined"
                onChange={(e) => setNewKeyword(e.target.value)}
            />
           <div className="CreateTask__AddButton">
                <Button variant='outlined' size="small" onClick={onSubmit}>Add</Button>
            </div>
            <div className="CreateTask__Box">
                {array.map((keyword, id) => (
                    <Chip
                        key={id}
                        label={keyword}
                        color="primary"
                        variant="outlined"
                        onDelete={() => {
                            handleDelete(keyword);
                    }}/>
                ))
                }
            </div>
        </div>
    )
}

export default TaskDetails