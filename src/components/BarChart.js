import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
//import "./BarChart.css"
import CanvasJSReact from "./canvasjs.react";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// properties:
// https://canvasjs.com/docs/charts/chart-options/theme/

export default function BarChart({chartTitle, labels, values, min, max}) {

    // const options = {
    //     title: {
    //         text: "Basic Column Chart in React"
    //     },
    //     data: [{				
    //         type: "column",
    //         dataPoints: [
    //             { label: "Apple",  y: 2  },
    //             { label: "Orange", y: 67  },
    //             { label: "Banana", y: 2  }
    //         ]
    //    }]
    // }

    // const scalarMetricObj = {name: metricName, min: minScalar, max:maxScalar}
    //             executed = true;
    const [options, setOptions] = useState({})
    const [_dataPoints, setDataPoints] = useState([])
    const [isOptionsSet, setIsOptionsSet] = useState(false);

    useEffect(() => {
        for (var i = 0; i < labels.length; i++) { 
            const labelValuePairObj = { label: labels[i], y:values[i]}
            setDataPoints(arr => [...arr, labelValuePairObj])
        }
        const obj = {
            width: 800,
            exportFileName: chartTitle +"-bar-chart",
            exportEnabled: true,
            title: { 
                text: chartTitle
            },
            axisX: {
                title: "Metrics"
            },
            axisY: {
                title: "Score",
                minimum: min,
                maximum: max,
            },
            data: [{type: "column",
                    dataPoints: _dataPoints
            }]
        }
        console.log("dataPoints in Bar Chart: ", _dataPoints);
        setOptions(obj)
        setIsOptionsSet(true);
    }, [isOptionsSet])

    return (
      <div>
        <CanvasJSChart options = {options}
            /* onRef = {ref => this.chart = ref} */
        />
      </div>
    );
}


