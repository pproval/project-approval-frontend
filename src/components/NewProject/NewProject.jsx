import React, { useContext, useState, useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Formik, Form, useField } from 'formik';
import { AuthContext } from '../../context/AuthProvider';
import { storage, database } from '../../firebase/firebase';
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
            {/* {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null} */}
        </>
    );
};

export default function NewProject() {

    const { currentUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const history = useHistory();

    const handleProjectCreation = async (values) => {
        console.log(values);
        try {
            setLoading(true);
            let uid = currentUser.uid;
            console.log(uid);
            let projectId = uuidv4();

            const projectObject = {
                pid: projectId,
                status: 0,
                title: values.title,
                description: values.desc,
                createdBy: uid,
                team: [uid, "2", "3", "4"],
                mentor: "",
                synopsis: "Synopsis URL",
                progressReport: "PR URL",
                finalReport: "Final Report URL",
                repositoryURL: "",
                grade: "Ungraded",
                remarks: ""
            }

            await database.projects.doc(projectId).set(projectObject);
            console.log(uid);
            await database.users.doc(uid).update({
                projectId: projectId,
            });
            console.log(uid);

            // When team will be assigned, loop over the team uids and update the project ID
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
                    <Formik
                        initialValues={{
                            title: '',
                            desc: '',
                        }}

                        onSubmit={(values) => {
                            handleProjectCreation(values);
                        }}
                    >
                        <Form style={{ color: 'white' }}>
                            <TextField
                                label="Title "
                                name="title"
                                type="text"
                                placeholder="Project Name"
                            />

                            <TextField
                                label="Description "
                                name="desc"
                                type="text"
                                placeholder="Describe what your project is about."
                            />
                            <button type="submit">Create</button>
                        </Form>
                    </Formik>
                </>}
        </>
    )
}
