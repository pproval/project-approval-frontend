import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

function Dummy() {

    const { logout } = useContext(AuthContext);

    const handleSignout = async (e) => {
        try {
            await logout();
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div>
            <h1>This is an awesome app!</h1>
            <button onClick={handleSignout}>Log out</button>
        </div>
    )
}

export default Dummy;
