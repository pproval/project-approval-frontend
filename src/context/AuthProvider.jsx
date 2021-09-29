import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';

export const AuthContext = React.createContext();

function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const register = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const logout = () => {
        return auth.signOut();
    }

    useEffect(() => {
        // Attaching observer on auth object, provided by firebase
        // The callback will always run on mounting + whenever any change observed in auth obj
        // onAuthStateChanged also returns a cleanup function
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    const contextObject = {
        currentUser,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={contextObject} >
            {!loading && children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
