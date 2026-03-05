import {useState,useEffect} from "react"

export default function Tasks(){

const [tasks,setTasks]=useState([])
const [text,setText]=useState("")

useEffect(()=>{
const saved=localStorage.getItem("tasks")
if(saved)setTasks(JSON.parse(saved))
},[])

const save=(new_tasks)=>{
setTasks(new_tasks)
localStorage.setItem("tasks",JSON.stringify(new_tasks))
}

const add_task=()=>{

if(!text.trim())return

const new_tasks=[...tasks,{text,done:false}]

save(new_tasks)

setText("")
}

const toggle_task=(index)=>{

const updated=[...tasks]

updated[index].done=!updated[index].done

save(updated)

}

const delete_task=(index)=>{

const updated=tasks.filter((_,i)=>i!==index)

save(updated)

}

return(

<div style={{display:"flex",gap:"30px"}}>

{/* ADD TASK PANEL */}

<div className="card" style={{width:"320px"}}>

<h3 style={{marginBottom:"20px"}}>Important Tasks</h3>

<input
placeholder="Add task..."
value={text}
onChange={e=>setText(e.target.value)}
style={{
width:"100%",
padding:"10px",
borderRadius:"8px",
border:"1px solid #ddd",
marginBottom:"12px"
}}
/>

<button
onClick={add_task}
style={{
width:"100%",
padding:"10px",
background:"#22c55e",
color:"white",
border:"none",
borderRadius:"8px",
fontWeight:"600"
}}
>
Add Task
</button>

</div>

{/* TASK LIST */}

<div className="card" style={{flex:1}}>

<h3 style={{marginBottom:"20px"}}>Task List</h3>

{tasks.length===0 && (
<div style={{color:"#888"}}>No tasks yet</div>
)}

{tasks.map((task,i)=>(

<div
key={i}
style={{
display:"flex",
alignItems:"center",
justifyContent:"space-between",
padding:"10px 0",
borderBottom:"1px solid #eee"
}}
>

<div style={{display:"flex",alignItems:"center",gap:"10px"}}>

<input
type="checkbox"
checked={task.done}
onChange={()=>toggle_task(i)}
/>

<span
style={{
textDecoration:task.done?"line-through":"none",
color:task.done?"#999":"#111"
}}
>
{task.text}
</span>

</div>

<button
onClick={()=>delete_task(i)}
style={{
border:"none",
background:"transparent",
cursor:"pointer",
fontSize:"16px"
}}
>
✕
</button>

</div>

))}

</div>

</div>

)

}