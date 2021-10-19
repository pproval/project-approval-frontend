import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { database } from '../../firebase/firebase';
import Navbar from '../Navbar/Navbar';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';

import ProfileImage from './Images/Profile.png'

// Styles
import './Profile.css'

export default function Profile() {

    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [editable, setEditable] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = database.users.doc(currentUser.uid).onSnapshot((doc) => {
            setUserData(doc.data());
        });
        return unsubscribe;
    }, [currentUser]);

    const TextField = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <>
                <label htmlFor={props.id || props.name}>{label}</label>
                <input className="text-input" {...field} {...props} />
                {/* To be managed while styling */}
                {/* {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null} */}
            </>
        );
    };

    const Spinner = ({ label, ...props }) => {
        const [field, meta] = useField(props);
        return (
            <div>
                <label htmlFor={props.id || props.name}>{label}</label>
                <select {...field} {...props} />
                {/* {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null} */}
            </div>
        );
    };

    const handleSave = async (values, role) => {
        console.log(values);
        setLoading(true);
        if (role === 1) {
            await database.users.doc(currentUser.uid).update({
                username: userData?.username !== values.Name ? values.Name : userData?.username,
                college: userData?.college !== values.College ? values.College : userData?.college,
                degree: userData?.degree !== values.Degree ? values.Degree : userData?.degree,
                branch: userData?.branch !== values.Branch ? values.Branch : userData?.branch,
                eno: userData?.eno !== values.Enroll ? values.Enroll : userData?.eno,
            });
        }
        else {
            await database.users.doc(currentUser.uid).update({
                username: userData?.username !== values.Name ? values.Name : userData?.username,
                college: userData?.college !== values.College ? values.College : userData?.college,
            });
        }

        setLoading(false);
    }

    return (
        <>
            {
                userData === null ? <LoadingScreen /> :
                    <>
                        <Navbar role={userData?.role} />
                        <img src={ProfileImage} alt="profile" className="profile-img" />
                        {/* <button style={{ color: 'black', backgroundColor: 'rgba(4, 255, 171)', width: '50px' }} onClick={}>Update Image</button> */}
                        <button style={{ color: 'black', backgroundColor: 'rgba(4, 255, 171)', width: '50px' }} onClick={() => setEditable(!editable)}>EDIT</button>
                        {
                            editable === false ?
                                <>
                                    <p><span>Name: </span>{userData?.username}</p>
                                    <p><span>Email: </span>{userData?.email}</p>
                                    <p><span>College: </span>{userData?.college}</p>
                                    <p><span>Role: </span>{userData?.role === 1 ? <>Student</> : userData?.role === 2 ? <>Teacher</> : <></>}</p>
                                    <p>{userData?.role === 1 ? <><span>Degree: </span>{userData?.degree}</> : <></>}</p>
                                    <p>{userData?.role === 1 ? <><span>Branch: </span>{userData?.branch}</> : <></>}</p>
                                    <p>{userData?.role === 1 ? <><span>Enrollment No: </span>{userData?.eno}</> : <></>}</p>
                                </>
                                :
                                <>
                                    {
                                        userData?.role === 1 ?
                                            <>
                                                <Formik
                                                    initialValues={{
                                                        Name: userData?.username,
                                                        College: userData?.college,
                                                        Degree: userData?.degree,
                                                        Branch: userData?.branch,
                                                        Enroll: userData?.eno,
                                                    }}

                                                    onSubmit={(values) => {
                                                        handleSave(values, 1);
                                                    }}
                                                >
                                                    <Form style={{ color: 'white' }}>
                                                        <TextField
                                                            label="Name "
                                                            name="Name"
                                                            type="text"
                                                            placeholder="Jane Doe"
                                                        />

                                                        <Spinner label="College " name="College">
                                                            <option value="">Select your college</option>
                                                            <option value="MSIT">Maharaja Surajmal Institute of Technology</option>
                                                        </Spinner>

                                                        <Spinner label="Degree " name="Degree">
                                                            <option value="">Select your degree</option>
                                                            <option value="B.Tech">Bachelor of Technology</option>
                                                            <option value="B.E">Bachelor of Engineering</option>
                                                        </Spinner>

                                                        <Spinner label="Branch " name="Branch">
                                                            <option value="">Select your branch</option>
                                                            <option value="CSE">Computer Science & Engineering</option>
                                                            <option value="IT">Information Technology</option>
                                                            <option value="ECE">Electronics & Communication Engineering</option>
                                                            <option value="EEE">Electrical & Electronics Engineering</option>
                                                        </Spinner>

                                                        <TextField
                                                            label="Enrollment No "
                                                            name="Enroll"
                                                            type="number"
                                                            placeholder="12345678910"
                                                        />

                                                        <button disabled={loading} type="submit">Save</button>
                                                    </Form>
                                                </Formik>
                                            </>
                                            :
                                            <>
                                                <Formik
                                                    initialValues={{
                                                        Name: userData?.username,
                                                        College: userData?.college,
                                                    }}

                                                    onSubmit={(values) => {
                                                        handleSave(values, 2);
                                                    }}
                                                >
                                                    <Form style={{ color: 'white' }}>
                                                        <TextField
                                                            label="Name "
                                                            name="Name"
                                                            type="text"
                                                            placeholder="Jane Doe"
                                                        />

                                                        <Spinner label="College " name="College">
                                                            <option value="">Select your college</option>
                                                            <option value="MSIT">Maharaja Surajmal Institute of Technology</option>
                                                        </Spinner>

                                                        <button disabled={loading} type="submit">Save</button>
                                                    </Form>
                                                </Formik>
                                            </>
                                    }
                                </>
                        }
                    </>
            }
        </>
    )
}
