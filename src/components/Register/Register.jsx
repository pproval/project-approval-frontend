import React from 'react';
import { Formik, Form, useField } from 'formik';
import { signUpValidationSchema } from '../../validations/validationSchema';
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
    return (
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
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
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
    )
}

export default Register;
