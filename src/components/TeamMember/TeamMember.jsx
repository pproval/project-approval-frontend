import React from 'react'

// Image
import Profile from '../StudentDashboard/Images/Profile.png'

// Styles
import './TeamMember.css'

export default function TeamMember({ name = 'FirstName LastName', college = 'College', course = 'Course', branch = 'Branch', eno = 'Enrollment No' }) {
    return (
        <div className="TeamMember">
            <img src={Profile} alt="profile" className="TeamMember-Profile" />
            <div style={{ textAlign: "center" }}>
                <h3>{name}</h3>
                <h4>{college + ' (' + course + ' - ' + branch + ')'}</h4>
                <h4>{eno}</h4>
            </div>
        </div>
    )
}
