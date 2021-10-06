import React from 'react'

// Styles
import './Sidebar.css'

export default function Sidebar({ open }) {
    return (
        <div className={open ? "Sidebar-open" : "Sidebar-close"} >
            <a href="" className="Sidebar-links"><h3>Dasboard</h3></a>
            <a href="" className="Sidebar-links"><h3>Profile</h3></a>
            <a href="" className="Sidebar-links"><h3>Team</h3></a>
            <a href="" className="Sidebar-links"><h3>Project</h3></a>
        </div>
    )
}
