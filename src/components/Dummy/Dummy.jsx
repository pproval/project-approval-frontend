import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import Navbar from '../Navbar/Navbar'

function Dummy() {

    return (
        <>
            <Navbar />
            <div>
                <h1>This is the dummy page for user</h1>
            </div>
        </>
    )
}

export default Dummy;
