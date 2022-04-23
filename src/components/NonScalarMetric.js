import React from 'react'
import { InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function NonScalarMetric({name, keys, nonScalarMetrics, setNonScalarMetrics}) {
    const deleteNonScalar = () => {
        if (nonScalarMetrics) {
            setNonScalarMetrics(nonScalarMetrics.filter(item => item.name !== name));
        }
    }
  return (
    <div className="NonScalarMetric__NonScalarMetric">
        <InputLabel>
            {"name: "} {name} 
            {", keys: "} {keys}
        </InputLabel>
        <IconButton 
            aria-label="delete"
            onClick={deleteNonScalar}>
            <DeleteIcon />
        </IconButton>
    </div>
  )
}

export default NonScalarMetric