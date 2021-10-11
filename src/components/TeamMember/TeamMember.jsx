import React from 'react'

// Image
import Profile from '../Dashboard/Images/Profile.png'

// Styles
import './TeamMember.css'

export default function TeamMember() {
    return (
        <div className="TeamMember">
            <img src={Profile} alt="profile" className="TeamMember-Profile" />
            <div style={{ textAlign: "center" }}>
                <h3>FisrtName LastName</h3>
                <h4>College (Course-Branch)</h4>
                <h4>Enrollment No</h4>
            </div>
        </div>
    )
}
