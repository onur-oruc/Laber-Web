import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
//import "./BarChart.css"
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


export default function PieChart({chartTitle, values, labels}) {
	const [options, setOptions] = useState({})
    const [_dataPoints, setDataPoints] = useState([])
    const [isOptionsSet, setIsOptionsSet] = useState(false);

    // const options = {
    //     theme: "light1",
    //     animationEnabled: true,
    //     exportFileName: "New Year Resolutions",
    //     exportEnabled: true,
    //     title:{
    //         text: chartTitle
    //     },
    //     data: [{
    //         type: "pie",
    //         showInLegend: true,
    //         legendText: "{label}",
    //         toolTipContent: "{label}: <strong>{y}%</strong>",
    //         indexLabel: "{y}%",
    //         indexLabelPlacement: "inside",
    //         dataPoints: [
    //             { y: 32, label: "Health" },
    //             { y: 22, label: "Finance" },
    //             { y: 15, label: "Education" },
    //             { y: 19, label: "Career" },
    //             { y: 5, label: "Family" },
    //             { y: 7, label: "Real Estate" }
    //         ]
    //     }]
    // }

    useEffect(() => {
        for (var i = 0; i < labels.length; i++) { 
            const labelValuePairObj = { y:values[i], label: labels[i]}
            setDataPoints(arr => [...arr, labelValuePairObj])
        }
        const obj = {
            width: 600,
            theme: "light1",
            animationEnabled: true,
            exportFileName: chartTitle +"-pie-chart",
            exportEnabled: true,
            title: { 
                text: chartTitle
            },
            data: [{type: "column",
            type: "pie",
                    showInLegend: true,
                    legendText: "{label}",
                    toolTipContent: "{label}: <strong>{y}</strong>",
                    indexLabel: "{y}",
                    indexLabelPlacement: "inside",
                    dataPoints: _dataPoints
            }]
        }
        console.log("dataPoints in PieChart: ", _dataPoints);
        setOptions(obj)
        setIsOptionsSet(true);
    }, [isOptionsSet])

    return (
    <div>
        <CanvasJSChart options = {options}
            /* onRef={ref => this.chart = ref} */
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
    </div>
    );	
}