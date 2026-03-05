import {schedule,days} from "../data/schedule"
import {useState,useEffect} from "react"

const total_tasks=schedule.filter(s=>!s.type).length
const WEEK_MS=7*24*60*60*1000

export default function Grid(){

const [checks,setChecks]=useState({})

useEffect(()=>{

const saved=localStorage.getItem("grid")
if(saved)setChecks(JSON.parse(saved))

auto_week_check()

},[])

const toggle=(r,c)=>{
const key=r+"-"+c
const updated={...checks,[key]:!checks[key]}
setChecks(updated)
localStorage.setItem("grid",JSON.stringify(updated))
}

const day_completion=(day_index)=>{
let done=0

schedule.forEach((row,r)=>{
if(row.type==="break")return
const key=r+"-"+day_index
if(checks[key])done++
})

return Math.round((done/total_tasks)*100)
}

const week_score=()=>{
let total=0
days.forEach((_,i)=>total+=day_completion(i))
return Math.round(total/7)
}

const calculate_metrics=()=>{

const result={
dsa:0,
devops:0,
project:0,
barc:0,
exercise:0,
meditation:0
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

if(row.category==="exercise")result.exercise++
if(row.category==="meditation")result.meditation++

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

const deep_work=metrics.dsa+metrics.devops+metrics.project+metrics.barc
const score=week_score()

const save_week=()=>{

const history=JSON.parse(localStorage.getItem("weekly_history")||"[]")

const new_week={
week:history.length+1,
score,
deep_work,
dsa:metrics.dsa,
devops:metrics.devops,
barc:metrics.barc
}

history.push(new_week)

localStorage.setItem("weekly_history",JSON.stringify(history))

}

const reset_grid=()=>{
setChecks({})
localStorage.removeItem("grid")
localStorage.setItem("week_start",Date.now())
}

const auto_week_check=()=>{

let start=localStorage.getItem("week_start")

if(!start){
localStorage.setItem("week_start",Date.now())
return
}

start=parseInt(start)

if(Date.now()-start>WEEK_MS){

save_week()
reset_grid()

}

}

return(

<div>

{/* METRIC CARDS */}

<div style={{display:"flex",gap:"20px",marginBottom:"50px"}}>

<div className="card">
<div className="metric-label">Week Score</div>
<div className="metric">{score}%</div>
</div>

<div className="card">
<div className="metric-label">Deep Work</div>
<div className="metric">{format_time(deep_work)}</div>
</div>

<div className="card">
<div className="metric-label">DSA</div>
<div className="metric">{format_time(metrics.dsa)}</div>
</div>

<div className="card">
<div className="metric-label">DevOps</div>
<div className="metric">{format_time(metrics.devops)}</div>
</div>

<div className="card">
<div className="metric-label">PSU</div>
<div className="metric">{format_time(metrics.barc)}</div>
</div>

</div>


{/* EXECUTION GRID */}

<div style={{marginBottom:"70px"}}>

<table className="grid-table">

<thead>
<tr>
<th>Time</th>
<th>Task</th>
{days.map(d=><th key={d}>{d}</th>)}
</tr>
</thead>

<tbody>

{schedule.map((row,r)=>{

if(row.type==="break"){
return(
<tr key={r}>
<td colSpan="9" style={{textAlign:"center",fontSize:"12px"}}>
──── {row.label} ────
</td>
</tr>
)
}

return(
<tr key={r}>

<td>{row.time}</td>
<td>{row.task}</td>

{days.map((_,c)=>{

const key=r+"-"+c

return(
<td key={c} style={{textAlign:"center"}}>

<input
type="checkbox"
checked={checks[key]||false}
onChange={()=>toggle(r,c)}
/>

</td>
)

})}

</tr>
)

})}

</tbody>

</table>

</div>


{/* DAILY CIRCLES */}

<div style={{display:"flex",gap:"50px"}}>

{days.map((d,i)=>{

const percent=day_completion(i)

const radius=36
const circumference=2*Math.PI*radius
const offset=circumference-(percent/100)*circumference

return(

<div key={d} style={{textAlign:"center"}}>

<svg width="90" height="90">

<circle
cx="45"
cy="45"
r={radius}
stroke="#e5e7eb"
strokeWidth="8"
fill="none"
/>

<circle
cx="45"
cy="45"
r={radius}
stroke="#22c55e"
strokeWidth="8"
fill="none"
strokeDasharray={circumference}
strokeDashoffset={offset}
strokeLinecap="round"
transform="rotate(-90 45 45)"
/>

<text
x="50%"
y="50%"
textAnchor="middle"
dy=".3em"
>
{percent}%
</text>

</svg>

<div>{d}</div>

</div>

)

})}

</div>

</div>

)
}