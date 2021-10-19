import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { database } from '../../firebase/firebase';
import StudentDashboard from '../StudentDashboard/StudentDashboard';
import TeacherDashboard from '../TeacherDashboard/TeacherDashboard';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Dashboard() {
    // This is the main wrapper component to conditionally render out student,teacher or admin dashboard
    // based on the current logged in user's role

    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        // Attaching a listener on the current user's document in DB
        // Whenever there is change/update, callback is fired and it updates userdata state
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        return unsubscribe;
    }, [currentUser]);

    const role = userData?.role; // This is just a placeholder value for now, later it will be the current user's role

    const displayDashboard = (role) => {
        switch (role) {
            case 2:
                return <>{userData === null ? <LoadingScreen /> : <TeacherDashboard userData={userData} />}</>
            case 3:
                return <>{userData === null ? <LoadingScreen /> : <AdminDashboard userData={userData} />}</>
            default:
                return <>{userData === null ? <LoadingScreen /> : <StudentDashboard userData={userData} />}</>
        }
    }

    return (
        <div>
            {displayDashboard(role)}
        </div>
    )
}
