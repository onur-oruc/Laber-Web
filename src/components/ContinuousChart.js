import React from 'react'
import {  LineChart, Line, XAxis, YAxis, CartesianGrid, Label, Tooltip, Legend, ResponsiveContainer } from "recharts"

function ContinuousGraph() {
    const sampleData = [
        {
          name: 'Page A',
          uv: 4000,
          pv: 2400,
          amt: 2400,
        },
        {
          name: 'Page B',
          uv: 3000,
          pv: 1398,
          amt: 2210,
        },
        {
          name: 'Page C',
          uv: 2000,
          pv: 9800,
          amt: 2290,
        },
        {
          name: 'Page D',
          uv: 2780,
          pv: 3908,
          amt: 2000,
        },
        {
          name: 'Page E',
          uv: 1890,
          pv: 4800,
          amt: 2181,
        },
        {
          name: 'Page F',
          uv: 2390,
          pv: 3800,
          amt: 2500,
        },
        {
          name: 'Page G',
          uv: 3490,
          pv: 4300,
          amt: 2100,
        },
      ];
  return (
    <>
    <h2>Title</h2>
      <ResponsiveContainer width="100%" height="40%">
          <LineChart
            width={500}
            height={300}
            data={sampleData}
            margin={{
              top: 25,
              right: 30,
              left: 20,
              bottom: 25,
            }}
          >
          <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={"name"} >
              <Label value="X-axis" offset={-10} position="insideBottomRight" />  
            </XAxis>
            <YAxis label={{ offset:-10, value: 'pv of page', angle: -90, position: 'insideLeft' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
          </LineChart>
      </ResponsiveContainer>
    </>
  )
}

export default ContinuousGraph