import {React, useState, useEffect } from 'react'
import '../CreateTask.css';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import { InputLabel } from '@mui/material';

function MetricV2({minSentiment, setMinSentiment, maxSentiment, setMaxSentiment,
                    minSarcasm, setMinSarcasm, maxSarcasm, setMaxSarcasm,
                    standMetric, setStandMetric, isBot, setIsBot}) {

    const [newStandMetric, setNewStandMetric] = useState('');
    const [standCount, setStandCount] = useState(0);
    const [newBotMetric, setNewBotMetric] = useState('');
    const [botCount, setBotCount] = useState(0);

    const onSubmitBot = () => {
        if (botCount < 3) {
            setBotCount(botCount+1);
            setIsBot(arr => [...arr, newBotMetric]);
        }
    }

    const handleDeleteBot = (keyword) => {
        setIsBot(isBot.filter(item => item !== keyword));
        setBotCount(botCount-1);
    }

    const onSubmitStand = () => {
        if (standCount < 3) {
            setStandCount(standCount+1);
            setStandMetric(arr => [...arr, newStandMetric]);
        }
    }

    const handleDeleteStand = (keyword) => {
        setStandMetric(standMetric.filter(item => item !== keyword));
        setStandCount(standCount-1);
    }

    useEffect(() => {
        console.log("stand: ", standCount);
        console.log("bot: ", botCount);
    }, [botCount, standCount])
    return (
        <div  className="Metric__Box">
            <div className='Metric__Name'>
                <InputLabel>
                    Sentiment
                </InputLabel>
                <div className='ExpertPreferences_Age'>
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={minSentiment} 
                            pattern="[0-9]*"
                            onChange={(e) => {
                                setMinSentiment((v) => (e.target.validity.valid ? e.target.value : v));
                            }} />
                        <label className={minSentiment && 'filled'} >
                            Min Value
                        </label>
                    </div>
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={maxSentiment} 
                            pattern="[0-9]*"
                            onChange={(e) => {
                                setMaxSentiment((v) => (e.target.validity.valid ? e.target.value : v));
                            }} />
                        <label className={maxSentiment && 'filled'} >
                            Max Value
                        </label>    
                    </div>
                </div>
            </div>
            <div className='Metric__Name'>
                <InputLabel>
                    Sarcasm
                </InputLabel>
                <div className='ExpertPreferences_Age'>
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={minSarcasm} 
                            pattern="[0-9]*"
                            onChange={(e) => {
                                setMinSarcasm((v) => (e.target.validity.valid ? e.target.value : v));
                            }} />
                        <label className={minSarcasm && 'filled'} >
                            Min Value
                        </label>
                    </div>
                    <div className="input-container">
                        <input 
                            type="text" 
                            value={maxSarcasm} 
                            pattern="[0-9]*"
                            onChange={(e) => {
                                setMaxSarcasm((v) => (e.target.validity.valid ? e.target.value : v));
                            }} />
                        <label className={maxSarcasm && 'filled'} >
                            Max Value
                        </label>    
                    </div>
                </div>
            </div>
            <div className='CreateTask__div'>
                <div className='Metric__Name'>
                    <div className='Metric__Name'>
                        <InputLabel>
                            Stand
                        </InputLabel>
                        <TextField 
                            id="outlined-basic" 
                            label={"Metric Key"}
                            variant="outlined"
                            onChange={(e) => setNewStandMetric(e.target.value)}
                        />
                        <div className="CreateTask__AddButton">
                            <Button variant='outlined' size="small" onClick={onSubmitStand}>Add</Button>
                        </div>
                        <div className="CreateTask__Box">
                            {standMetric.map((keyword, id) => (
                                <Chip
                                    key={id}
                                    label={keyword}
                                    color="primary"
                                    variant="outlined"
                                    onDelete={() => {
                                        handleDeleteStand(keyword);
                                }}/>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='CreateTask__div'>
                <div className='Metric__Name'>
                    <div className='Metric__Name'>
                    <InputLabel>
                        Bot
                    </InputLabel>
                        <TextField 
                            id="outlined-basic" 
                            label={"Metric Key"}
                            variant="outlined"
                            onChange={(e) => setNewBotMetric(e.target.value)}
                        />
                        <div className="CreateTask__AddButton">
                            <Button variant='outlined' size="small" onClick={onSubmitBot}>Add</Button>
                        </div>
                        <div className="CreateTask__Box">
                            {isBot.map((keyword, id) => (
                                <Chip
                                    key={id}
                                    label={keyword}
                                    color="primary"
                                    variant="outlined"
                                    onDelete={() => {
                                        handleDeleteBot(keyword);
                                }}/>
                            ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default MetricV2
