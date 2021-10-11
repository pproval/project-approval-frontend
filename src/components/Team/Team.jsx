import React from 'react'
import Navbar from '../Navbar/Navbar'
import TeamMember from '../TeamMember/TeamMember'

// Styles
import './Team.css'

export default function Team() {
    return (
        <>
            <Navbar />
            <div className="Team">
                <div className="Team-container">
                    <div className="Team-header">
                        <h1 style={{ fontSize: "40px" }}>Team Name/Project Name</h1>
                    </div>
                    <div className="Team-body">
                        <TeamMember />
                        <TeamMember />
                        <TeamMember />
                        <TeamMember />
                    </div>
                </div>
            </div>
        </>
    )
}
