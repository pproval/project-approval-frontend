import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Formik, Form, useField } from 'formik';
import { loginValidationSchema } from '../../validations/validationSchema';
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

function Login() {

    const { login, currentUser } = useContext(AuthContext);
    const history = useHistory();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (currentUser !== null)
            history.push('/');
    }, []);

    const handleLogin = async (values) => {
        try {
            console.log('Logging in user...');
            setLoading(true);
            await login(values.email, values.password);
            console.log("Success");
            setLoading(false);
            history.push('/');
        } catch (err) {
            setError(err.message);
            setTimeout(() => setError(''), 2000)
            setLoading(false)
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
                            email: '',
                            password: '',
                        }}
                        validationSchema={loginValidationSchema}
                        onSubmit={(values) => {
                            handleLogin(values);
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
            }
        </>
    )
}

export default Login;
