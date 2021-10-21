import React from 'react'

// Styles 
import './AdminUserCard.css'

export default function AdminUserCard({ role }) {

    // Function to display the role label next to the username
    const displayLabel = (role) => {
        switch (role) {
            case 1: return (
                <span className="AdminUserCard-student"><h5>Student</h5></span>
            )
            case 2: return (
                <span className="AdminUserCard-teacher"><h5>Teacher</h5></span>
            )
        }
    }

    // Function to display the role changing button according to the user role
    const displayButton = (role) => {
        switch (role) {
            case 1: return (
                // Add event listner to the following button to change the role of the user
                // from student to teacher
                <button className="AdminUserCard-teacher-btn"><h3>Make Teacher</h3></button>
            )
            case 2: return (
                // Add event listner to the following button to change the role of the user
                // from teacher to student
                <button className="AdminUserCard-student-btn"><h3>Make Student</h3></button>
            )
        }
    }
    return (
        <div className="AdminUserCard">
            <div className="AdminUserCard-details">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ marginRight: "20px" }}>FirstName Lastname</h2>
                    {displayLabel(role)}
                </div>
                <h3>email@id.com</h3>
            </div>
            <div className="AdminUserCard-btns">
                {displayButton(role)}
            </div>
        </div>
    )
}
