import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'

// Images
import Profile from './Images/Profile.png'
import Add from './Images/Add.png'

// Styles
import './Dashboard.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function Dashboard() {

    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState();

    return (
        <>
            {loading ? <LoadingScreen /> :
                <>
                    <Navbar />
                    <div className="Dashboard">
                        <div className="Dashboard-container">
                            <div className="Dashboard-header">
                                <img src={Profile} alt="profile" className="profile-img" />
                                <div className="Dashboard-metadata">
                                    <h1 style={{ fontSize: "40px" }}>FirstName SecondName</h1>
                                    <h3 style={{ color: "rgba(255, 255, 255, 0.5)" }}>College Name (Degree, Branch)</h3>
                                </div>
                            </div>
                            <div className="Dashboard-body">
                                <div className="Dashboard-body-container">
                                    <h2 className="Dashboard-body-title">Project</h2>
                                    <div className="Dashboard-projects">
                                        <div className="project">
                                            <h3 style={{ color: "white" }}>Project Name</h3>
                                            <Link to="/project" className="project-view-btn"><h3>View</h3></Link>
                                        </div>
                                        <Link to="/project/new" className="project-add">
                                            <img src={Add} alt="add" style={{ height: "50px" }} />
                                            <h3>Create Project</h3>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Dashboard;
