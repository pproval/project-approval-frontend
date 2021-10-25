import React, { useState, useContext, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthProvider';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import AdminUserCard from '../AdminUserCard/AdminUserCard';

// Images
import Profile from '../StudentDashboard/Images/Profile.png'

export default function StudentList() {

    const [userData, setUserData] = useState(null);
    const { currentUser } = useContext(AuthContext);
    const [users, setUsers] = useState(null);

    useEffect(() => {
        // Attaching a listener on the current user's document in DB
        // Whenever there is change/update, callback is fired and it updates userdata state
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        let usersCollection;
        const unsubscribe = database.users.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            usersCollection = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.data());
                // user is not admin
                if (doc.data().role === 1)
                    usersCollection.push({ ...doc.data() });
            })
            // console.log(usersCollection);
            setUsers(usersCollection);
        });
        return unsubscribe;
    }, []);

    return (
        <>
            <Navbar role={3} />
            <div className="StudentDashboard">
                <div className="StudentDashboard-container">
                    <div className="StudentDashboard-header">
                        <img src={Profile} alt="profile" className="profile-img" />
                        <div className="StudentDashboard-metadata">
                            <h1 style={{ fontSize: "40px" }}>{userData?.username}</h1>
                            <h3 style={{ color: "rgba(4, 255, 171, 1)" }}>Admin </h3>
                        </div>
                    </div>
                    <div className="TeacherDashboard-body">
                        <div className="TeacherDashboard-body-container">
                            <h2 className="TeacherDashboard-body-title" style={{ marginBottom: "20px" }}>Students</h2>
                            {/* Map through all the users in the user collection and display only students*/}
                            {users !== null ? users.length === 0 ? <h1>There are no students currently!</h1> : <>
                                {
                                    users.map((user) => {
                                        return <AdminUserCard userData={user} key={user?.userId} role={user?.role} />
                                    })
                                }
                            </> : <></>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
