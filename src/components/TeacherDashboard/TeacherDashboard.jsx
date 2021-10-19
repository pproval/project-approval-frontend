import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'

// Images
import Profile from '../StudentDashboard/Images/Profile.png'

// Styles
import './TeacherDashboard.css'

export default function TeacherDashboard({ userData }) {

    return (

        <>
            <Navbar role={2} />
            <div className="StudentDashboard">
                <div className="StudentDashboard-container">
                    <div className="StudentDashboard-header">
                        <img src={Profile} alt="profile" className="profile-img" />
                        <div className="StudentDashboard-metadata">
                            <h1 style={{ fontSize: "40px" }}>{userData?.username}</h1>
                            <h3 style={{ color: "rgba(255, 255, 255, 0.5)" }}>{userData?.college} </h3>
                        </div>
                    </div>
                    <div className="TeacherDashboard-body">
                        <div className="TeacherDashboard-body-container">
                            <h2 className="TeacherDashboard-body-title">Projects</h2>
                            <div className="TeacherDashboard-projectlist">
                                <div className="TeacherDashboard-project">
                                    <div>
                                        <h2 style={{ color: "white" }}>Project Title</h2>
                                        <h4 style={{ color: "rgba(255, 255, 255, 0.5)" }}>Project Status: Synopsis Submitted</h4>
                                    </div>
                                    <Link to="/project" className="Project-doc-view"><h3>View</h3></Link>
                                </div>
                                <div className="TeacherDashboard-project">
                                    <div>
                                        <h2 style={{ color: "white" }}>Project Title</h2>
                                        <h4 style={{ color: "rgba(255, 255, 255, 0.5)" }}>Project Status: Synopsis Submitted</h4>
                                    </div>
                                    <Link to="/project" className="Project-doc-view"><h3>View</h3></Link>
                                </div>
                                <div className="TeacherDashboard-project">
                                    <div>
                                        <h2 style={{ color: "white" }}>Project Title</h2>
                                        <h4 style={{ color: "rgba(255, 255, 255, 0.5)" }}>Project Status: Synopsis Submitted</h4>
                                    </div>
                                    <Link to="/project" className="Project-doc-view"><h3>View</h3></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
