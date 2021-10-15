import React from 'react'
import StudentDashboard from '../StudentDashboard/StudentDashboard'
import TeacherDashboard from '../TeacherDashboard/TeacherDashboard'
import AdminDashboard from '../AdminDashboard/AdminDashboard'

export default function Dashboard() {
    // This is the main wrapper component to conditionally render out student,teacher or admin dashboard
    // based on the current logged in user's role

    const role = 3; // This is just a placeholder value for now, later it will be the current user's role

    const displayDashboard = (role) => {
        switch (role) {
            case 2:
                return <TeacherDashboard />;
            case 3:
                return <AdminDashboard />;
            default:
                return <StudentDashboard />;
        }
    }

    return (
        <div>
            {displayDashboard(role)}
        </div>
    )
}
