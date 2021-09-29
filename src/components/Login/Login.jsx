import React from 'react';
import { Formik, Form, useField } from 'formik';
import { loginValidationSchema } from '../../validations/validationSchema';
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

function Login() {
    return (
        <>
            <LinkButton content=" Home " routeLink="/home" />
            <LinkButton content=" Login " routeLink="/login" />
            <LinkButton content=" Register " routeLink="/register" />


            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={loginValidationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
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

                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </>
    )
}

export default Login;
