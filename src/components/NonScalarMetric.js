import React from 'react'
import { InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FormLabel from '@mui/material/FormLabel';
import './ScalarMetric.css'

function NonScalarMetric({name, keys, nonScalarMetrics, setNonScalarMetrics}) {
    const deleteNonScalar = () => {
        if (nonScalarMetrics) {
            setNonScalarMetrics(nonScalarMetrics.filter(item => item.name !== name));
        }
    }
  return (
    <div className="ScalarMetric__ScalarMetric">
        <FormLabel>
        <p> <span><strong>Metric: </strong></span>{name} </p>
        <p> <span><strong>Parameters: </strong></span></p>
            {Object.keys(keys).map((key, key2) => (
                    // <>
                    //     { (parseInt(key) !== keys.length-1) ?
                    //         (<>{keys[key] + ", "}</>)
                    //         :(<>{keys[key] + ""}</>)
                    //     }
                    // </>
                    <p><span><strong>*</strong></span>{keys[key]}</p>
                ))    
            }
        </FormLabel>
        <IconButton 
            aria-label="delete"
            onClick={deleteNonScalar}>
            <DeleteIcon />
        </IconButton>
    </div>
  )
}

export default NonScalarMetric