import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from '../api/axios';
import Typography from '@mui/material/Typography';

function ScalarMetricSlider({taskNameProp, scalarMetricName, value}) {
    const [min, setMin] = useState(null);
    const [max, setMax] = useState(null);

    const marks = [
        {
          value: min,
          label: min,
        },
        {
          value: value,
          label: value
        },
        {
          value: max,
          label: max,
        },
    ];

    useEffect(() => {
        // get request to get min and max values of a scalar metric with task name = taskName
        const getMinMaxForScalarMetric = async() => {
            try {
                const response = await axios.get('/get_min_max_for_task/'
                    +sessionStorage.getItem("email")+'/'+taskNameProp+
                    '/'+scalarMetricName,
                    {
                        headers: {
                                'Authorization': "Bearer " + sessionStorage.getItem("access_token")
                            }
                    } 
                )
                console.log("task name: ", taskNameProp, " Scalar Metric Slider response: ", response?.data)
                
                if(!Object.keys(response.data).length){
                    console.log("no data found");
                } else {
                    setMin(response?.data[0])
                    setMax(response?.data[1])
                }
            } catch (error) {

            }
        }

        getMinMaxForScalarMetric()
    }, [])

    useEffect(() => {

    }, [min, max])

    return (
        <div className='ScalarMetricSlider__div'>
            <Box sx={{ width: 300 }}>
                <Typography id="input-slider" gutterBottom>
                    {scalarMetricName}
                </Typography>
                <Slider
                    aria-label="Custom marks"
                    defaultValue={value}
                    step={1}
                    valueLabelDisplay="auto"
                    marks={marks}
                    min={min}
                    max={max}
                    color="secondary"
                />
            </Box>
        </div>
    )
}

export default ScalarMetricSlider