import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { database } from '../../firebase/firebase';
import Navbar from '../Navbar/Navbar'
import ProjectStatus from '../ProjectStatus/ProjectStatus'
import TeamMemberFlat from '../TeamMember/TeamMemberFlat'


// Styles
import './TeacherProject.css'


export default function TeacherProject(props) {
    const projectId = props.match.params.projectId;
    const path=`/project/${projectId}/team`;
    const [projectData, setProjectData] = useState();
    const [loading, setLoading] = useState(false);
    const [remarks, setRemarks] = useState('');

    const viewFile = (e, URL) => {
        if (URL !== null && URL !== undefined) {
            window.open(URL);
        }
    }

    const submitRemark = async (e) => {
        e.preventDefault();
        setLoading(true);
        await database.projects.doc(projectId).update({
            remarks: remarks,
        });
        setLoading(false);
    }

    const changeStatus = async (e, code) => {
        setLoading(true);
        if (code === 1) {
            await database.projects.doc(projectId).update({
                status: 2,
            })
        }
        // else if(code === 3) {
        //     await database.projects.doc(projectId).update({
        //         status: 4,
        //     })
        // }
        // else if(code === 4) {
        //     await database.projects.doc(projectId).update({
        //         status: 5,
        //     })
        // }
        setLoading(false);
    }

    const displaySynopsis = (status) => {
        // Status 1 means that the synopsis has been uploaded and it can be approved if seems ok
        if (status === 1) {
            return (
                <div className="Project-doc">
                    <h2>Synopsis</h2>
                    <div className="Project-doc-box">
                        <h3>Minor Project Synopsis-Project Approval System</h3>
                        <div className="TeacherProject-btn-grp">
                            <button
                                className="Project-doc-reupload"
                                disabled={loading}
                                onClick={(e) => changeStatus(e, 1)}
                            >
                                <h3>Approve</h3>
                            </button>
                            <button
                                onClick={(e) => viewFile(e, projectData?.synopsis)}
                                className="Project-doc-view"
                            >
                                <h3>View</h3>
                            </button>
                        </div>
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

    const displayGrade = (status) => {

        // Final report has been submitted and now grade can be assigned
        if (status == 4) {
            return (
                <div className="Project-doc">
                    <h2>Grade</h2>
                    <div className="Project-doc-box">
                        Final grade form will come here
                    </div>
                </div>
            )
        }

        // Once the grade has been assigned, it will only be visible in view only mode with the project status of 5
        if (status >= 5) {
            return (
                <div className="Project-doc">
                    <h2>Grade</h2>
                    <div className="Project-doc-box">
                        Final grade will be displayed here
                    </div>
                </div>
            )
        }
    }

    const displayRemarks = () => {
        return (
            <div className="Project-doc">
                <h2>Remarks</h2>
                <div className="TeacherProject-remarks-box">
                    {
                        projectData?.remarks !== '' ?
                            <>
                                <div className="TeacherProject-remark">
                                    <h3 className="TeacherProject-remarks-name">{projectData.mentor}: </h3>
                                    <h4 className="TeacherProject-remarks-text">{projectData?.remarks}</h4>
                                </div>
                            </> : <></>
                    }

                    <div className="TeacherProject-add-remark">
                        <h3 className="TeacherProject-remarks-name">{projectData.mentor}: </h3>
                        <form className="TeacherProject-remarks-form">
                            <input
                                name="remarks"
                                type="text"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Enter remarks"
                                className="TeacherProject-remarks-input"
                            />
                            <button
                                disabled={loading}
                                className="TeacherProject-remarks-submit"
                                type="submit"
                                onClick={(e) => submitRemark(e)}
                            >
                                <h3>Submit</h3>
                            </button>
                        </form>
                    </div>
                </div>
            </div >
        )
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
            {projectData === undefined ?
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
                                    <Link to={path} className="Project-viewteam"><h3>View Team</h3></Link>
                                </div>
                                {displaySynopsis(projectData?.status)}
                                {displayProgressReport(projectData?.status)}
                                {displayFinalReport(projectData?.status)}
                                {displayGrade(projectData?.status)}
                                {displayRemarks()}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}
