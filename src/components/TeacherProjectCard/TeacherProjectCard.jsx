import React from 'react'
import { Link } from 'react-router-dom';

export default function TeacherProjectCard({ projectData }) {

    const displayProjectStatus = (status) => {
        switch (status) {
            case 1: return "Synopsis Submitted";
            case 2: return "Synopsis Approved";
            case 3: return "Progress Report Submitted";
            case 4: return "Final Report Submitted";
            case 5: return "Grade Received";
            default: return "Project Created"
        }
    }

    const path = `/project/${projectData?.pid}`;

    return (
        <div className="TeacherDashboard-project">
            <div>
                <h2 style={{ color: "white" }}>{projectData?.title}</h2>
                <h4 style={{ color: "rgba(255, 255, 255, 0.5)" }}>Status: {displayProjectStatus(projectData?.status)}</h4>
            </div>
            {/* the following link will go to /project/projectId where projectId is passed from the TeacherDashboard*/}
            <Link to={path} className="Project-doc-view"><h3>View</h3></Link>
        </div>
    )
}
