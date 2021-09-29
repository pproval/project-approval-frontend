import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import { signUpValidationSchema } from '../../validations/validationSchema';
import { database } from '../../firebase/firebase';
import { AuthContext } from '../../context/AuthProvider';
import LinkButton from '../LinkButton/LinkButton';

const MyTextInput = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <input className="text-input" {...field} {...props} />
            {/* To be enabled after styling */}
            {/* {meta.touched && meta.error ? (
                <div className="error">{meta.error}</div>
            ) : null} */}
        </>
    );
};

function Register() {

    const history = useHistory();
    const { register, currentUser } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser) {
            history.push('/');
        }
    }, []);

    const handleUserRegistration = async (values) => {
        console.log(values);
        try {
            setLoading(true);
            let res = await register(values.email, values.password);
            console.log(res);
            let uid = res.user.uid;
            console.log(uid);

            const userObject = {
                email: values.email,
                userID: uid,
                username: values.firstName + " " + values.lastName,
                createdAt: database.getCurrentTimeStamp(),
            }

            await database.users.doc(uid).set(userObject);
            setLoading(false);
            console.log("Registration successful!");
            history.push('/');
        }
        catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 2000);
            setLoading(false);
        }
    }

    return (
        <>
            {error ? <h1>{error}</h1> : <></>}
            {loading ? <h1>Loading...</h1> :
                <>
                    <LinkButton content=" Home " routeLink="/home" />
                    <LinkButton content=" Login " routeLink="/login" />
                    <LinkButton content=" Register " routeLink="/register" />

                    <Formik
                        initialValues={{
                            firstName: '',
                            lastName: '',
                            email: '',
                            password: '',
                            passwordConfirmation: '',
                        }}
                        validationSchema={signUpValidationSchema}
                        onSubmit={(values) => {
                            handleUserRegistration(values);
                        }}
                    >
                        <Form>
                            <MyTextInput
                                name="firstName"
                                type="text"
                                placeholder="First Name"
                            />

                            <MyTextInput
                                name="lastName"
                                type="text"
                                placeholder="Last Name"
                            />

                            <MyTextInput
                                name="email"
                                type="email"
                                placeholder="Email (john@xyz.com)"
                            />

                            <MyTextInput
                                name="password"
                                type="password"
                                placeholder="Password"
                            />

                            <MyTextInput
                                name="passwordConfirmation"
                                type="password"
                                placeholder="Confirm Password"
                            />

                            <button type="submit">Register</button>
                        </Form>
                    </Formik>
                </>
            }
        </>

    );
}

export default Register;
