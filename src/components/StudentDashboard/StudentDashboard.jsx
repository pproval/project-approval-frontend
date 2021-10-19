import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

// Images
import Profile from './Images/Profile.png'
import Add from './Images/Add.png'

// Styles
import './StudentDashboard.css';

function StudentDashboard({ userData }) {

    return (
        <>
            <Navbar role={1} />
            <div className="StudentDashboard">
                <div className="StudentDashboard-container">
                    <div className="StudentDashboard-header">
                        <img src={Profile} alt="profile" className="profile-img" />
                        <div className="StudentDashboard-metadata">
                            <h1 style={{ fontSize: "40px" }}>{userData?.username}</h1>
                            <h3 style={{ color: "rgba(255, 255, 255, 0.5)" }}>{userData?.college} ({userData?.degree}, {userData?.branch})</h3>
                        </div>
                    </div>
                    <div className="StudentDashboard-body">
                        <div className="StudentDashboard-body-container">
                            <h2 className="StudentDashboard-body-title">Project</h2>
                            <div className="StudentDashboard-projects">
                                <div className="project">
                                    <h3 style={{ color: "white" }}>Project Name</h3>
                                    <Link to="/project" className="project-view-btn"><h3>View</h3></Link>
                                </div>
                                <Link to="/project/new" className="project-add">
                                    <img src={Add} alt="add" style={{ height: "50px" }} />
                                    <h3>Create Project</h3>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentDashboard;
