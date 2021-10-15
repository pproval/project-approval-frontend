import React, { useContext, useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

// Images
import Profile from '../StudentDashboard/Images/Profile.png'

// Styles
import './AdminDashboard.css'

export default function AdminDashboard() {
    const { currentUser } = useContext(AuthContext);
    // const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState();

    useEffect(() => {
        // Attaching a listener on the current user's document in DB
        // Whenever there is change/update, callback is fired and it updates userdata state
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        console.log(userData);
    })

    return (
        <>
            {userData == null ? <LoadingScreen /> :
                <>
                    <Navbar role={3} />
                    <div className="StudentDashboard">
                        <div className="StudentDashboard-container">
                            <div className="StudentDashboard-header">
                                <img src={Profile} alt="profile" className="profile-img" />
                                <div className="StudentDashboard-metadata">
                                    <h1 style={{ fontSize: "40px" }}>{userData.username}</h1>
                                    <h3 style={{ color: "rgba(4, 255, 171, 1)" }}>Admin </h3>
                                </div>
                            </div>
                            <div className="TeacherDashboard-body">
                                <div className="TeacherDashboard-body-container">
                                    <h2 className="TeacherDashboard-body-title">Users</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}
