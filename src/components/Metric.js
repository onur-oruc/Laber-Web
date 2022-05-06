import React from 'react'
import {useState, useEffect} from 'react'
import Button from '@mui/material/Button'
import '../CreateTask.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@material-ui/core/TextField';
import './ExpertPreferences.css'
import Chip from '@mui/material/Chip';
import ScalarMetric from './ScalarMetric';
import NonScalarMetric from './NonScalarMetric'
import { toastifyWarnOptions} from '../context/ToastifyOptions';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Metric({scalarMetrics, setScalarMetrics, nonScalarMetrics, setNonScalarMetrics}) {
    const [metricType, setMetricType] = useState('');
    const [metricName, setMetricName] = useState('');
    const [minScalar, setMinScalar] = useState();
    const [maxScalar, setMaxScalar] = useState();
    const [metricKeys, setMetricKeys] = useState([]);
    const [newMetricKey, setNewMetricKey] = useState('');

    const onSubmit = () => {
        setMetricKeys(arr => [...arr, newMetricKey]);
    }

    const handleDelete = (keyword) => {
        setMetricKeys(metricKeys.filter(item => item !== keyword));
    }

    useEffect(() => {
        console.log("metric: " + metricType);
    }, [metricType])

    const isScalarMetricValid = () => {
        if (!metricName || metricName === undefined || metricName === '') {
            toast.warn('🦄 Enter a metric name!', toastifyWarnOptions );
            return false;
        }
        if ( !minScalar || minScalar === undefined || minScalar === '') {
            toast.warn('🦄 Specify the minimum value of the metric!', toastifyWarnOptions );
            return false;
        }
        if ( !maxScalar || maxScalar === undefined || maxScalar === '') {
            toast.warn('🦄 Specify the maximum value of the metric!', toastifyWarnOptions );
            return false;
        }
        if ( minScalar < 0) {
            toast.warn('🦄 Minimum value for the metric cannot be negative!', toastifyWarnOptions );
            return false;
        }
        if ( minScalar > maxScalar) {
            toast.warn('🦄 Minimum value for the metric cannot be bigger than maximum value!', toastifyWarnOptions );
            return false;
        }
        return true;
    }

    const isNonScalarMetricValid = () => {
        if (!metricName || metricName === undefined || metricName === '') {
            toast.warn('🦄 Enter a metric name!', toastifyWarnOptions );
            return false;
        }
        if(!metricKeys.length) {
            toast.warn('🦄 Enter at least one metric key!', toastifyWarnOptions );
            return false;
        }

        return true;
    }

    const addMetric = () => {
        let executed = false;
        if (metricType === 'scalar') {
            if (isScalarMetricValid()) {
                const scalarMetricObj = {name: metricName, min: minScalar, max:maxScalar}
                setScalarMetrics(arr => [...arr, scalarMetricObj]);
                executed = true;
            }
        } else if (metricType === 'non-scalar') {
            if (isNonScalarMetricValid()) {
                const nonScalarMetricObj = {name: metricName, metricKeys: metricKeys}
                setNonScalarMetrics(arr => [...arr, nonScalarMetricObj]);
                executed = true;
            }
        }
        if (executed) {
            // clear states
            setMetricType('');
            setMetricName('');
            setMinScalar();
            setMaxScalar();
            setMetricKeys([]);
            setNewMetricKey('');
        }
    }

    return (
        <div>
            <div >
                <div className='Metric__Name'>
                <TextField 
                    id="outlined-basic" 
                    label={"Metric Name"}
                    variant="outlined"
                    onChange={(e) => setMetricName(e.target.value)}
                />
                </div>
                <div className='Metric__Name'>
                    <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">Metric Type</FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            name="radio-buttons-group"
                            value={metricType}
                            onChange={(event) => {
                                setMetricType(event.target.value);
                            }}
                        >
                            <div className="Metric__MetricType">
                                <FormControlLabel value="scalar" control={<Radio />} label="Scalar" />
                                <FormControlLabel value="non-scalar" control={<Radio />} label="Non-scalar" />
                            </div>
                        </RadioGroup>
                    </FormControl>
                </div>
                {metricType === 'scalar' ? ( <div className='ExpertPreferences_Age'>
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={minScalar} 
                            pattern="[0-9]*"
                            onChange={(e) => {
                                setMinScalar((v) => (e.target.validity.valid ? e.target.value : v));
                            }} />
                        <label className={minScalar && 'filled'} >
                            Min Value
                        </label>
                    </div>
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={maxScalar} 
                            pattern="[0-9]*"
                            onChange={(e) => {
                                setMaxScalar((v) => (e.target.validity.valid ? e.target.value : v));
                            }} />
                        <label className={maxScalar && 'filled'} >
                            Max Value
                        </label>    
                    </div>
                </div>) : (<div></div>)}
                {metricType === 'non-scalar' ? (<div className='CreateTask__div'>
                    <div className='Metric__Name'>
                        <TextField 
                            id="outlined-basic" 
                            label={"Metric Key"}
                            variant="outlined"
                            onChange={(e) => setNewMetricKey(e.target.value)}
                        />
                        <div className="CreateTask__AddButton">
                            <Button variant='outlined' size="small" onClick={onSubmit}>Add</Button>
                        </div>
                        <div className="CreateTask__Box">
                            {metricKeys.map((keyword, id) => (
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
                </div>) : (<div></div>)}
                <div className="CreateTask__AddButton">
                    <Button variant='outlined' size="small" onClick={addMetric}>Add a Metric</Button>
                </div>
            </div>
            <div>
            {scalarMetrics.map((metric, id) => (
                // metric.name + " " + metric.min + " " + metric.max 
                <ScalarMetric 
                    key={id} 
                    name={metric.name} 
                    min={metric.min} 
                    max={metric.max}
                    scalarMetrics={scalarMetrics}
                    setScalarMetrics={setScalarMetrics}/>
                ))
            }
            {nonScalarMetrics.map((metric, id) => (
                // metric.name + " " + metric.metricKeys
                <NonScalarMetric 
                    key={id}
                    name={metric.name}
                    keys={metric.metricKeys}
                    nonScalarMetrics={nonScalarMetrics}
                    setNonScalarMetrics={setNonScalarMetrics}/>
                ))
            }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Metric