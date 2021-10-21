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

    const displaySynopsis = (status) => {
        // Status 0 means that the project has been initiated but the synopsis has not been submitted yet
        if (status === 0) {
            return (
                <div className="Project-doc">
                    <h2>Upload Synopsis</h2>
                    <div className="Project-doc-box">
                        <form className="Project-doc-form">
                            <input type="file" className="Project-doc-input"></input>
                        </form>
                        <a href="" className="Project-doc-view"><h3>Upload</h3></a>
                    </div>
                </div>
            )
        }

        // Status 1 means that the synopsis has been uploaded but it has not been approved yet
        // Hence it can still be re-uploaded
        if (status === 1) {
            return (
                <div className="Project-doc">
                    <h2>Synopsis</h2>
                    <div className="Project-doc-box">
                        <h3>Minor Project Synopsis-Project Approval System</h3>
                        <form className="Project-doc-form">
                            <input type="file" className="Project-doc-input"></input>
                        </form>
                        <a href="" className="Project-doc-view"><h3>Re-Upload</h3></a>
                        <a href="" className="Project-doc-view"><h3>View</h3></a>
                    </div>
                </div>
            )
        }

        // Status 2 and above will mean that the synopsis has been uploaded and approved and now
        // It can only be viewed, not re-uploaded
        if (status >= 2) {
            return (
                <div className="Project-doc">
                    <h2>Synopsis</h2>
                    <div className="Project-doc-box">
                        <h3>Minor Project Synopsis-Project Approval System</h3>
                        <a href="" className="Project-doc-view"><h3>View</h3></a>
                    </div>
                </div>
            )
        }
    }

    const displayProgressReport = (status) => {
        //Status 2 will also mean that now the progress report can be uploaded
        if (status === 2) {
            return (
                <div className="Project-doc">
                    <h2>Upload Progress Report</h2>
                    <div className="Project-doc-box">
                        <form className="Project-doc-form">
                            <input type="file" className="Project-doc-input"></input>
                        </form>
                        <a href="" className="Project-doc-view"><h3>Upload</h3></a>
                    </div>
                </div>
            )
        }

        // Status 3 and above will mean that the progress report has been uploaded
        if (status >= 3) {
            return (
                <div className="Project-doc">
                    <h2>Progress Report</h2>
                    <div className="Project-doc-box">
                        <h3>Minor Project Progress Report-Project Approval System</h3>
                        <a href="" className="Project-doc-view"><h3>View</h3></a>
                    </div>
                </div>
            )
        }
    }

    const displayFinalReport = (status) => {
        // Final report can now be uploaded
        if (status === 3) {
            return (
                <div className="Project-doc">
                    <h2>Upload Final Report</h2>
                    <div className="Project-doc-box">
                        <form>
                            <input type="file" className="Project-doc-input"></input>
                        </form>
                        <a href="" className="Project-doc-view"><h3>Upload</h3></a>
                    </div>
                </div>
            )
        }

        // Final report has now been uploaded
        if (status >= 4) {
            return (
                <div className="Project-doc">
                    <h2>Final Report</h2>
                    <div className="Project-doc-box">
                        <h3>Final Report-Project Approval System</h3>
                        <a href="" className="Project-doc-view"><h3>View</h3></a>
                    </div>
                </div>
            )
        }
    }

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
            {loading ? <LoadingScreen /> :
                <>
                    <Navbar />
                    {
                        projectData === undefined ?
                            <div>
                                <h1 style={{ color: 'white' }}>You need to create a Project First!</h1>
                                <Link to="/project/new">
                                    <button>Create Project</button>
                                </Link>
                            </div>
                            :
                            <div className="Project">
                                <div className="Project-container">
                                    <div className="Project-header">
                                        <h1 className="Project-title">{projectData?.title}</h1>
                                        <h3 className="Project-creator">
                                            Created By: {userData?.username}
                                        </h3>
                                    </div>
                                    <div className="Project-body">
                                        <div className="Project-body-container">
                                            <div className="Project-status">
                                                <h2>Status</h2>
                                                <div className="Project-status-box">
                                                    <ProjectStatus status={projectData?.status} />
                                                </div>
                                            </div>
                                            <div className="Project-description">
                                                <h2>Description</h2>
                                                <div className="Project-description-box">
                                                    <h4 style={{ textAlign: "justify" }}>
                                                        {projectData?.description}
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
                                            {displaySynopsis(projectData?.status)}
                                            {displayProgressReport(projectData?.status)}
                                            {displayFinalReport(projectData?.status)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                    }

                </>}

        </>
    )
}
