import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';

function PrivateRoute({ privateComponent: Component, ...restProps }) {
    const { currentUser } = useContext(AuthContext);
    return (
        <Route {...restProps} render={(props) => {
            return currentUser ? <Component {...props} /> : <Redirect to="/home" />
        }} />
    );
}

export default PrivateRoute;
