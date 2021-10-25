import React, { useState, useEffect } from 'react';
import { database } from '../../firebase/firebase';
// import { Link } from 'react-router-dom';
import Navbar from '../Navbar/Navbar'
import TeacherProjectCard from '../TeacherProjectCard/TeacherProjectCard';

// Images
import Profile from '../StudentDashboard/Images/Profile.png'

// Styles
import './TeacherDashboard.css'

export default function TeacherDashboard({ userData }) {

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        let projectIDs = userData?.projectList;
        let projectsArr;

        const unsubscribe = database.projects.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            projectsArr = [];
            querySnapshot.forEach((doc) => {
                let pid = doc.data().pid;
                if (projectIDs.includes(pid)) {
                    projectsArr.push(doc.data());
                }
            })
            setProjects(projectsArr);
        });

        return unsubscribe;
    }, []);

    return (

        <>
            <Navbar role={2} />
            <div className="StudentDashboard">
                <div className="StudentDashboard-container">
                    <div className="StudentDashboard-header">
                        <img src={Profile} alt="profile" className="profile-img" />
                        <div className="StudentDashboard-metadata">
                            <h1 style={{ fontSize: "40px" }}>{userData?.username}</h1>
                            <h3 style={{ color: "rgba(255, 255, 255, 0.5)" }}>{userData?.college} </h3>
                        </div>
                    </div>
                    <div className="TeacherDashboard-body">
                        <div className="TeacherDashboard-body-container">
                            <h2 className="TeacherDashboard-body-title">Projects</h2>
                            <div className="TeacherDashboard-projectlist">
                                {
                                    projects.length === 0 ? <><h1>No projects found under your name! Please check later.</h1></> :
                                        <>
                                            {
                                                projects.map((project) => {
                                                    return <TeacherProjectCard projectData={project} />
                                                })
                                            }
                                        </>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
