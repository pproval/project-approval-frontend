import React from 'react'
import { Link } from 'react-router-dom'

// Styles
import './Sidebar.css'

export default function Sidebar({ open, role }) {

    // The role is hard coded as a prop for now, later it will be determined from the current logged in user
    const displayLinks = (role) => {
        switch (role) {
            case 2:
                return (
                    <div className="Sidebar-container">
                        <Link to="/" className="Sidebar-links"><h3>Dasboard</h3></Link>
                        <Link to="/profile" className="Sidebar-links"><h3>Profile</h3></Link>
                    </div>
                );
            case 3:
                return (
                    <div className="Sidebar-container">
                        <Link to="/" className="Sidebar-links"><h3>Dasboard</h3></Link>
                        <Link to="/studentlist" className="Sidebar-links"><h3>Students</h3></Link>
                        <Link to="/teacherlist" className="Sidebar-links"><h3>Teachers</h3></Link>
                    </div>
                );
            default:
                return (
                    <div className="Sidebar-container">
                        <Link to="/" className="Sidebar-links"><h3>Dasboard</h3></Link>
                        <Link to="/profile" className="Sidebar-links"><h3>Profile</h3></Link>
                        <Link to="/team" className="Sidebar-links"><h3>Team</h3></Link>
                        <Link to="/project" className="Sidebar-links"><h3>Project</h3></Link>
                    </div>
                );
        }
    }
    return (
        <div className={open ? "Sidebar-open" : "Sidebar-close"} >
            {displayLinks(role)}
        </div>
    )
}
