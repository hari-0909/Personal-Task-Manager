import {schedule,days} from "../data/schedule"
import {useState,useEffect} from "react"

import {
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
ResponsiveContainer,
LineChart,
Line,
CartesianGrid
} from "recharts"

export default function Progress(){

const [checks,setChecks]=useState({})
const [history,setHistory]=useState([])

useEffect(()=>{
const saved=localStorage.getItem("grid")
if(saved)setChecks(JSON.parse(saved))

const weekly=JSON.parse(localStorage.getItem("weekly_history")||"[]")
setHistory(weekly)

},[])

const calculate_metrics=()=>{

const result={
dsa:0,
devops:0,
project:0,
barc:0
}

schedule.forEach((row,r)=>{

if(row.type==="break")return

days.forEach((_,c)=>{

const key=r+"-"+c

if(checks[key]){

if(row.category==="dsa")result.dsa+=row.duration
if(row.category==="devops")result.devops+=row.duration
if(row.category==="project")result.project+=row.duration
if(row.category==="barc")result.barc+=row.duration

}

})

})

return result
}

const format_time=(hours)=>{
const h=Math.floor(hours)
const m=Math.round((hours-h)*60)
return `${h}h ${m}m`
}

const metrics=calculate_metrics()

const chart_data=[
{name:"DSA",hours:metrics.dsa},
{name:"DevOps",hours:metrics.devops},
{name:"Projects",hours:metrics.project},
{name:"PSU",hours:metrics.barc}
]

return(

<div style={{display:"flex",flexDirection:"column",gap:"30px"}}>

<h2 style={{fontSize:"22px",fontWeight:"700"}}>Performance Dashboard</h2>

{/* METRIC CARDS */}

<div style={{display:"flex",gap:"20px"}}>

<div className="card">
<div className="metric-label">DSA Time</div>
<div className="metric">{format_time(metrics.dsa)}</div>
</div>

<div className="card">
<div className="metric-label">DevOps Time</div>
<div className="metric">{format_time(metrics.devops)}</div>
</div>

<div className="card">
<div className="metric-label">Project Time</div>
<div className="metric">{format_time(metrics.project)}</div>
</div>

<div className="card">
<div className="metric-label">BARC Study</div>
<div className="metric">{format_time(metrics.barc)}</div>
</div>

</div>

{/* CHARTS ROW */}

<div style={{display:"flex",gap:"30px"}}>

{/* WORK DISTRIBUTION */}

<div className="card" style={{flex:1}}>

<h3 style={{marginBottom:"15px"}}>Work Distribution</h3>

<ResponsiveContainer width="100%" height={280}>

<BarChart data={chart_data}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="name"/>

<YAxis/>

<Tooltip/>

<Bar dataKey="hours" fill="#22c55e"/>

</BarChart>

</ResponsiveContainer>

</div>

{/* WEEKLY PROGRESS */}

<div className="card" style={{flex:1}}>

<h3 style={{marginBottom:"15px"}}>Weekly Progress</h3>

<ResponsiveContainer width="100%" height={280}>

<LineChart data={history}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="week"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="score"
stroke="#22c55e"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

</div>

</div>

)

}