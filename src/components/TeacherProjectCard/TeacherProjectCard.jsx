import React from 'react'
import { Link } from 'react-router-dom';

export default function TeacherProjectCard() {
    return (
        <div className="TeacherDashboard-project">
            <div>
                <h2 style={{ color: "white" }}>Project Title</h2>
                <h4 style={{ color: "rgba(255, 255, 255, 0.5)" }}>Project Status: Synopsis Submitted</h4>
            </div>
            {/* the following link will go to /project/projectId where projectId is passed from the TeacherDashboard*/}
            <Link to="/project/63f4c1d7-cea3-4efc-a3bf-ebf6320279b9" className="Project-doc-view"><h3>View</h3></Link>
        </div>
    )
}
