import { React } from 'react'
import { InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function ScalarMetric({name, min, max, scalarMetrics, setScalarMetrics}) {
    const deleteScalar = () => {
        if (scalarMetrics) {
            console.log("inside deleteScalar in if")
            setScalarMetrics(scalarMetrics.filter(item => item.name !== name));
        }
    }
    return (
        <div className="ScalarMetric__ScalarMetric">
            <InputLabel>
                {"name: "} {name} 
                {", min: "} {min}
                {" max: "} {max}
            </InputLabel>
            <IconButton 
                aria-label="delete"
                onClick={deleteScalar}>
                <DeleteIcon />
            </IconButton>
        </div>
  )
}

export default ScalarMetric