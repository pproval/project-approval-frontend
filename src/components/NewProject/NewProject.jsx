import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Formik, Form, useField } from 'formik';
import { AuthContext } from '../../context/AuthProvider';
import { database } from '../../firebase/firebase';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
// import * as Yup from 'yup';

// Styles
import './NewProject.css'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
        </>
    );
};

export default function NewProject() {

    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [students, setStudents] = useState();
    const [teachers, setTeachers] = useState();
    const history = useHistory();

    useEffect(() => {
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        return unsubscribe;
    }, [currentUser]);

    useEffect(() => {
        let studentsArr;
        let teachersArr;
        const unsubscribe = database.users.orderBy('createdAt', 'desc').onSnapshot((querySnapshot) => {
            studentsArr = [];
            teachersArr = [];
            querySnapshot.forEach((doc) => {
                if (doc.data().role === 1) studentsArr.push({ ...doc.data() });
                else if (doc.data().role === 2) teachersArr.push({ ...doc.data() });
            })
            // console.log(studentsArr);
            // console.log(teachersArr);
            setStudents(studentsArr);
            setTeachers(teachersArr);
        });
        return unsubscribe;
    }, []);

    const handleProjectCreation = async (values) => {
        // console.log(values);
        let mentor = teachers.filter((teacher) => {
            return values.mentor === teacher.username;
        });
        // console.log(mentor);
        let team = [{
            name: userData?.username,
            uid: userData?.userId,
            college: userData?.college,
            eno: userData?.eno,
            course: userData?.degree,
            branch: userData?.branch
        }];
        
        students.forEach((student) => {
            if (student.eno === values.one || student.eno === values.two || student.eno === values.three) {
                team.push({
                    name: student.username,
                    uid: student.userId,
                    college: student.college,
                    eno: student.eno,
                    course: student.degree,
                    branch: student.branch
                });
            }
        })

        // console.log(team);

        try {
            setLoading(true);
            let uid = userData?.userId;
            // console.log(uid);
            let projectId = uuidv4();

            const projectObject = {
                createdAt: database.getCurrentTimeStamp(),
                pid: projectId,
                status: 0,
                title: values.title,
                description: values.desc,
                createdBy: userData?.username,
                teamName: values.teamName,
                team: team,
                mentor: mentor[0]?.username,
                synopsis: "Synopsis URL",
                progressReport: "PR URL",
                finalReport: "Final Report URL",
                repositoryURL: "",
                grade: "Ungraded",
                remarks: ""
            }

            await database.projects.doc(projectId).set(projectObject);
            await database.users.doc(mentor[0]?.userId).update({
                projectList: [...mentor[0]?.projectList, projectId]
            });

            team.forEach(async (member, index, team) => {
                await database.users.doc(member.uid).update({
                    projectId: projectId,
                    team: team,
                    teamName: values.teamName,
                    projectTitle: values.title,
                });
            })

            // console.log(uid);
            setLoading(false);
            history.push('/project');
        }
        catch (err) {
            console.log(err.message);
            setError(err.message);
            setTimeout(() => setError(''), 2000);
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />
            {loading ? <LoadingScreen /> :
                <>
                    {error !== null ? <>{error}</> : <></>}
                    <div className="NewProject">
                        <div className="NewProject-container">
                            <div className="NewProject-header">
                                <h1
                                    className="NewProject-title"
                                    style={{ color: "white", fontSize: "40px" }}
                                >
                                    New Project
                                </h1>
                            </div>
                            <div className="NewProject-body">
                                <div className="NewProject-body-container">
                                    <h2 style={{ color: "rgba(71, 71, 71, 1)" }}>Fill out the following form</h2>
                                    <Formik
                                        initialValues={{
                                            title: '',
                                            desc: '',
                                            teamName: '',
                                            mentor: '',
                                            one: '',
                                            two: '',
                                            three: '',
                                        }}

                                        onSubmit={(values) => {
                                            handleProjectCreation(values);
                                        }}
                                    >
                                        <Form className="NewProject-form">
                                            <TextField
                                                name="title"
                                                type="text"
                                                placeholder="Project Title"
                                                className="NewProject-form-text"
                                            />

                                            <TextField
                                                name="desc"
                                                type="text"
                                                placeholder="Describe what your project is about. (About 200 words)"
                                                className="NewProject-form-text NewProject-form-desc"
                                            />

                                            <TextField
                                                name="teamName"
                                                type="text"
                                                placeholder="Team's Name"
                                                className="NewProject-form-text NewProject-form-desc"
                                            />

                                            <TextField
                                                name="mentor"
                                                type="text"
                                                placeholder="Please enter your mentor's full name"
                                                className="NewProject-form-text NewProject-form-desc"
                                            />

                                            <TextField
                                                name="one"
                                                type="number"
                                                placeholder="Enter enrollment number of your teammate"
                                                className="NewProject-form-text NewProject-form-desc"
                                            />

                                            <TextField
                                                name="two"
                                                type="number"
                                                placeholder="Enter enrollment number of your teammate"
                                                className="NewProject-form-text NewProject-form-desc"
                                            />

                                            <TextField
                                                name="three"
                                                type="number"
                                                placeholder="Enter enrollment number of your teammate"
                                                className="NewProject-form-text NewProject-form-desc"
                                            />

                                            <button type="submit" className="NewProject-button">
                                                <h3>Create</h3>
                                            </button>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
        </>
    )
}
