import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../../firebase/firebase';
import Navbar from '../Navbar/Navbar'
import ProjectStatus from '../ProjectStatus/ProjectStatus'
import TeamMemberFlat from '../TeamMember/TeamMemberFlat'


export default function TeacherProject(props) {
    const projectId = props.match.params.projectId;
    const [projectData, setProjectData] = useState();

    const viewFile = (e, URL) => {
        if (URL !== null && URL !== undefined) {
            window.open(URL);
        }
    }

    const displaySynopsis = (status) => {
        // Status 1 means that the synopsis has been uploaded and it can be approved if seems ok
        if (status === 1) {
            return (
                <div className="Project-doc">
                    <h2>Synopsis</h2>
                    <div className="Project-doc-box">
                        <h3>Minor Project Synopsis-Project Approval System</h3>
                        <button className="Project-doc-reupload"><h3>Approve</h3></button>
                        <button onClick={(e) => viewFile(e, projectData?.synopsis)} className="Project-doc-view"><h3>View</h3></button>
                    </div>
                </div>
            )
        }

        // Status 2 and above will mean that the synopsis has been uploaded and approved and now
        // It can only be viewed
        if (status >= 2) {
            return (
                <div className="Project-doc">
                    <h2>Synopsis</h2>
                    <div className="Project-doc-box">
                        <h3>Minor Project Synopsis-Project Approval System</h3>
                        <button onClick={(e) => viewFile(e, projectData?.synopsis)} className="Project-doc-view"><h3>View</h3></button>
                    </div>
                </div>
            )
        }
    }

    const displayProgressReport = (status) => {

        // Status 3 and above will mean that the progress report has been uploaded
        if (status >= 3) {
            return (
                <div className="Project-doc">
                    <h2>Progress Report</h2>
                    <div className="Project-doc-box">
                        <h3>Minor Project Progress Report-Project Approval System</h3>
                        <button onClick={(e) => viewFile(e, projectData?.progressReport)} className="Project-doc-view"><h3>View</h3></button>
                    </div>
                </div>
            )
        }
    }

    const displayFinalReport = (status) => {

        // Final report has now been uploaded
        if (status >= 4) {
            return (
                <div className="Project-doc">
                    <h2>Final Report</h2>
                    <div className="Project-doc-box">
                        <h3>Final Report-Project Approval System</h3>
                        <button onClick={(e) => viewFile(e, projectData?.finalReport)} className="Project-doc-view"><h3>View</h3></button>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        const unsubscribe = database.projects.doc(projectId).onSnapshot((doc) => {
            setProjectData(doc.data());
        });
        return unsubscribe;
    }, [projectId]);

    return (

        <>
            <Navbar role={2} />
            {
                projectData === undefined ?
                    <><h1 style={{ color: 'white' }}>Loading...</h1></>
                    :
                    <div className="Project">
                        <div className="Project-container">
                            <div className="Project-header">
                                <h1 className="Project-title">{projectData?.title}</h1>
                                <h3 className="Project-creator">
                                    Created By: {projectData?.createdBy}
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
                                        <TeamMemberFlat member={projectData?.mentor} />
                                    </div>
                                    <div className="Project-team">
                                        <h2>Team</h2>
                                        <div className="Project-team-box">
                                            {
                                                projectData.team.map((member) => {
                                                    return <TeamMemberFlat key={member?.uid} member={member?.name} />
                                                })
                                            }
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
        </>
    )
}
