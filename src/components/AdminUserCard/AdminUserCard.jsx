import React, { useState } from 'react';
import { database } from '../../firebase/firebase';

// Styles 
import './AdminUserCard.css'

export default function AdminUserCard({ userData, role }) {

    const [loading, setLoading] = useState(false);
    // Function to change user role
    const changeUserRole = async (value) => {
        setLoading(true);
        await database.users.doc(userData?.userId).update({
            role: value,
        });
        setLoading(false);
    }
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
                <button disabled={loading} onClick={() => changeUserRole(2)} className="AdminUserCard-teacher-btn"><h3>Make Teacher</h3></button>
            )
            case 2: return (
                // Add event listner to the following button to change the role of the user
                // from teacher to student
                <button disabled={loading} onClick={() => changeUserRole(1)} className="AdminUserCard-student-btn"><h3>Make Student</h3></button>
            )
        }
    }
    return (
        <div className="AdminUserCard">
            <div className="AdminUserCard-details">
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h2 style={{ marginRight: "20px" }}>{userData?.username}</h2>
                    {displayLabel(role)}
                </div>
                <h3>{userData?.email}</h3>
            </div>
            <div className="AdminUserCard-btns">
                {displayButton(role)}
            </div>
        </div>
    )
}
