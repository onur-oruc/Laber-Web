import { React } from 'react'
import { InputLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import FormLabel from '@mui/material/FormLabel';
import './ScalarMetric.css'

function ScalarMetric({name, min, max, scalarMetrics, setScalarMetrics}) {
    const deleteScalar = () => {
        if (scalarMetrics) {
            console.log("inside deleteScalar in if")
            setScalarMetrics(scalarMetrics.filter(item => item.name !== name));
        }
    }
    return (
        <div className="ScalarMetric__ScalarMetric">
            <FormLabel>
            <p> <span><strong>Metric: </strong></span>{name} </p>
            <p> <span><strong>Min: </strong></span>{min}</p>
            <p> <span><strong>Max: </strong></span>{max} </p>
                {/* {"Metric: "} {name} 
                {", Min: "} {min}
                {" Max: "} {max} */}
            </FormLabel>
            <IconButton 
                aria-label="delete"
                onClick={deleteScalar}>
                <DeleteIcon />
            </IconButton>
        </div>
  )
}

export default ScalarMetric