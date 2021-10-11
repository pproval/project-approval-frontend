import React from 'react'
import { Link } from 'react-router-dom'

// Styles
import './Sidebar.css'

export default function Sidebar({ open }) {
    return (
        <div className={open ? "Sidebar-open" : "Sidebar-close"} >
            <Link to="/" className="Sidebar-links"><h3>Dasboard</h3></Link>
            <Link to="/profile" className="Sidebar-links"><h3>Profile</h3></Link>
            <Link to="/team" className="Sidebar-links"><h3>Team</h3></Link>
            <Link to="/project" className="Sidebar-links"><h3>Project</h3></Link>
        </div>
    )
}
