import React from 'react'

// Image
import Profile from '../StudentDashboard/Images/Profile.png'

// Styles
import './TeamMemberFlat.css'

export default function TeamMemberFlat() {
    return (
        <div className="TeamMemberFlat">
            <img src={Profile} alt="profile" className="TeamMemberFlat-Profile" />
            <div style={{ textAlign: "center" }}>
                <h3>FisrtName LastName</h3>
            </div>
        </div>
    )
}
