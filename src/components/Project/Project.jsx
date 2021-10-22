import React, { useEffect, useState, useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider';
import { database, storage } from '../../firebase/firebase';
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
    const [file, setFile] = useState(null);
    const [projectData, setProjectData] = useState();
    const [error, setError] = useState(null);

    const handleFileUpload = (e) => {
        console.log("handleFileUpload");
        let file = e.target.files[0];
        if (file != null && file.type === 'application/pdf') {
            console.log(file);
            setFile(file);
        }
        else if (file.type !== 'application/pdf') {
            console.log("Only pdf files are supported");
        }
    }

    const handleUpload = async (e, code) => {
        e.preventDefault();
        try {
            setLoading(true);
            let pid = projectData?.pid;
            console.log(pid);
            let uploadTaskListener;

            if (code === 0 || code === 1) {
                // Creates projects/pid directories and stores file with synopsis name
                uploadTaskListener = storage.ref(`/projects/${pid}/synopsis`).put(file);
            }
            else if (code === 2) {
                // Creates/updates projects/pid directories and stores file with progress-report name
                uploadTaskListener = storage.ref(`/projects/${pid}/progress-report`).put(file);
            }
            else if (code === 3) {
                uploadTaskListener = storage.ref(`/projects/${pid}/final-report`).put(file);
            }

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes -- tracks progress
            // 2. Error observer, called on failure -- error handler
            // 3. Completion observer, called on successful completion -- task completion

            uploadTaskListener.on('state_changed', progressTracker, errorHandler, taskSuccessful);

            function progressTracker(snapshot) {
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
            }

            function errorHandler(err) {
                setError(err.message);
                setTimeout(() => setError(''), 2000);
                setLoading(false);
            }

            async function taskSuccessful() {
                // link of synopsis just stored
                let downloadURL = await uploadTaskListener.snapshot.ref.getDownloadURL();
                console.log(downloadURL);
                if (code === 0 || code === 1) {
                    await database.projects.doc(pid).update({
                        synopsis: downloadURL,
                        status: 1,
                    });
                    console.log("Synopsis uploaded");
                }
                else if (code === 2) {
                    await database.projects.doc(pid).update({
                        progressReport: downloadURL,
                        status: 3,
                    });
                    console.log("Progress Report uploaded");
                }
                else if (code === 3) {
                    await database.projects.doc(pid).update({
                        finalReport: downloadURL,
                        status: 4,
                    });
                    console.log("Progress Report uploaded");
                }

                setLoading(false);
                history.push('/project');
            }
        }
        catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 2000);
            setLoading(false);
        }
    }

    const viewFile = (e, URL) => {
        if (URL !== null && URL !== undefined) {
            window.open(URL);
        }
    }

    const displaySynopsis = (status) => {
        // Status 0 means that the project has been initiated but the synopsis has not been submitted yet
        if (status === 0) {
            return (
                <div className="Project-doc">
                    <h2>Upload Synopsis</h2>
                    <div className="Project-doc-box">
                        <form className="Project-doc-form">
                            <input onChange={(e) => handleFileUpload(e)} type="file" className="Project-doc-input"></input>
                        </form>
                        <button disabled={file === null ? true : file.type === 'application/pdf' ? false : true} onClick={(e) => handleUpload(e)} className="Project-doc-view"><h3>Upload</h3></button>
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
                            <input type="file" onChange={(e) => handleFileUpload(e)} className="Project-doc-input"></input>
                        </form>
                        <button disabled={file === null ? true : file.type === 'application/pdf' ? false : true} onClick={(e) => handleUpload(e)} className="Project-doc-reupload"><h3>Re-Upload</h3></button>
                        <button onClick={(e) => viewFile(e, projectData?.synopsis)} className="Project-doc-view"><h3>View</h3></button>
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
                        <button onClick={(e) => viewFile(e, projectData?.synopsis)} className="Project-doc-view"><h3>View</h3></button>
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
                            <input type="file" onChange={(e) => handleFileUpload(e)} className="Project-doc-input"></input>
                        </form>
                        <button disabled={file === null ? true : file.type === 'application/pdf' ? false : true} onClick={(e) => handleUpload(e, 2)} className="Project-doc-view"><h3>Upload</h3></button>
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
                        <button onClick={(e) => viewFile(e, projectData?.progressReport)} className="Project-doc-view"><h3>View</h3></button>
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
                            <input type="file" onChange={(e) => handleFileUpload(e)} className="Project-doc-input"></input>
                        </form>
                        <button disabled={file === null ? true : file.type === 'application/pdf' ? false : true} onClick={(e) => handleUpload(e, 3)} className="Project-doc-view"><h3>Upload</h3></button>
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
                        <button onClick={(e) => viewFile(e, projectData?.finalReport)} className="Project-doc-view"><h3>View</h3></button>
                    </div>
                </div>
            )
        }
    }

    useEffect(() => {
        setLoading(true);
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        setLoading(false);
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
