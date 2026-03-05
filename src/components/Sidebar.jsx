import {NavLink} from "react-router-dom"

export default function Sidebar(){

return(

<div className="sidebar">

<div className="logo">
Relentless
</div>

<nav className="nav">

<NavLink
to="/"
className={({isActive}) =>
`nav-button ${isActive ? "active" : ""}`
}
>
Execution Grid
</NavLink>

<NavLink
to="/progress"
className={({isActive}) =>
`nav-button ${isActive ? "active" : ""}`
}
>
Progress
</NavLink>

<NavLink
to="/tasks"
className={({isActive}) =>
`nav-button ${isActive ? "active" : ""}`
}
>
Tasks
</NavLink>

</nav>

</div>

)

}