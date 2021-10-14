import React from 'react'
import Navbar from '../Navbar/Navbar'
import TeamMemberFlat from '../TeamMember/TeamMemberFlat'
import { Link } from 'react-router-dom'

// Styles
import './Project.css'

export default function Project() {
    return (
        <>
            <Navbar />
            <div className="Project">
                <div className="Project-container">
                    <div className="Project-header">
                        <h1 className="Project-title">Project Title</h1>
                        <h3 className="Project-creator">Created By: FirstName LastName</h3>
                    </div>
                    <div className="Project-body">
                        <div className="Project-body-container">
                            <div className="Project-status">
                                <h2>Status</h2>
                                <div className="Project-status-box"></div>
                            </div>
                            <div className="Project-description">
                                <h2>Description</h2>
                                <div className="Project-description-box">
                                    <h4 style={{ textAlign: "justify" }}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </h4>
                                </div>
                            </div>
                            <div className="Project-mentor">
                                <h2>Mentor</h2>
                                <TeamMemberFlat />
                            </div>
                            <div className="Project-team">
                                <h2>Team</h2>
                                <div className="Project-team-box">
                                    <TeamMemberFlat />
                                    <TeamMemberFlat />
                                    <TeamMemberFlat />
                                    <TeamMemberFlat />
                                </div>
                                <Link to="/team" className="Project-viewteam"><h3>View Team</h3></Link>
                            </div>
                            <div className="Project-doc">
                                <h2>Synopsis</h2>
                                <div className="Project-doc-box">
                                    <h3>Minor Project Synopsis-Project Approval System</h3>
                                    <a href="" className="Project-doc-view"><h3>View</h3></a>
                                </div>
                            </div>
                            <div className="Project-doc">
                                <h2>Progress Report</h2>
                                <div className="Project-doc-box">
                                    <h3>Minor Project Progress Report-Project Approval System</h3>
                                    <a href="" className="Project-doc-view"><h3>View</h3></a>
                                </div>
                            </div>
                            <div className="Project-doc">
                                <h2>Final Report</h2>
                                <div className="Project-doc-box">
                                    <h3>Final Report-Project Approval System</h3>
                                    <a href="" className="Project-doc-view"><h3>View</h3></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
