import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { database } from '../../firebase/firebase';
import { Link, useHistory } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import TeamMemberFlat from '../TeamMember/TeamMemberFlat'
import ProjectStatus from '../ProjectStatus/ProjectStatus'

// Styles
import './Project.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

export default function Project() {

    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [projectData, setProjectData] = useState();

    useEffect(() => {
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = database.projects.doc(userData?.projectId).onSnapshot((doc) => {
            // console.log(doc.data());
            setProjectData(doc.data());
        });
        setLoading(false);
        return unsubscribe;
    }, [userData]);

    return (
        <>
            {loading ? <LoadingScreen /> : <>
                <Navbar />
                {
                    projectData === undefined ?
                        <>
                            <h1 style={{ color: 'white' }}>You need to create a Project First!</h1>
                            <Link to="/project/new">
                                <button>Create Project</button>
                            </Link>
                        </>
                        :
                        <>
                            <div className="Project">
                                <div className="Project-container">
                                    <div className="Project-header">
                                        <h1 className="Project-title">{projectData?.title}</h1>
                                        <h3 className="Project-creator">Created By: {userData?.username}</h3>
                                    </div>
                                    <div className="Project-body">
                                        <div className="Project-body-container">
                                            <div className="Project-status">
                                                <h2>Status</h2>
                                                <div className="Project-status-box">
                                                    <ProjectStatus status={2} />
                                                </div>
                                            </div>
                                            <div className="Project-description">
                                                <h2>Description</h2>
                                                <div className="Project-description-box">
                                                    <h4 style={{ textAlign: "justify" }}>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="Project-mentor">
                                                <h2>Mentor</h2>
                                                <TeamMemberFlat />
                                            </div>
                                            <div className="Project-team">
                                                <h2>Team</h2>
                                                <div className="Project-team-box">
                                                    <TeamMemberFlat />
                                                    <TeamMemberFlat />
                                                    <TeamMemberFlat />
                                                    <TeamMemberFlat />
                                                </div>
                                                <Link to="/team" className="Project-viewteam"><h3>View Team</h3></Link>
                                            </div>
                                            <div className="Project-doc">
                                                <h2>Synopsis</h2>
                                                <div className="Project-doc-box">
                                                    <h3>Minor Project Synopsis-Project Approval System</h3>
                                                    <a href="" className="Project-doc-view"><h3>View</h3></a>
                                                </div>
                                            </div>
                                            <div className="Project-doc">
                                                <h2>Progress Report</h2>
                                                <div className="Project-doc-box">
                                                    <h3>Minor Project Progress Report-Project Approval System</h3>
                                                    <a href="" className="Project-doc-view"><h3>View</h3></a>
                                                </div>
                                            </div>
                                            <div className="Project-doc">
                                                <h2>Final Report</h2>
                                                <div className="Project-doc-box">
                                                    <h3>Final Report-Project Approval System</h3>
                                                    <a href="" className="Project-doc-view"><h3>View</h3></a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>}

            </>}

        </>
    )
}
