import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import LinkButton from '../LinkButton/LinkButton';
import Hamburger from '../Hamburger/Hamburger';
import Sidebar from '../Sidebar/Sidebar';

// Styles
import './Navbar.css';

export default function Navbar({ role }) {
    const { logout, currentUser } = useContext(AuthContext);
    const [hamburgerState, setHamburgerState] = useState(false);

    const hamburgerClicked = () => {
        setHamburgerState(hamburgerState => !hamburgerState);
    }

    const handleSignout = async (e) => {
        try {
            await logout();
        }
        catch (err) {
            console.log(err.message);
        }
    }

    return (
        <>
            {(currentUser === null) ?
                <div className="Navbar">
                    <div className="Navbar-container">
                        <div className="Navbar-logo">
                            <h1>Pproval</h1>
                        </div>
                        <ul className="Navbar-links">
                            <li className="Navbar-link"><LinkButton content="About" routeLink="/home" special={false} /></li>
                            <li className="Navbar-link"><LinkButton content="Login" routeLink="/login" special={false} /></li>
                            <li className="Navbar-link"><LinkButton content="Register" routeLink="/register" special={true} /></li>
                        </ul>
                    </div>
                </div>
                :
                <>
                    <div className={hamburgerState ? "Navbar-open" : "Navbar"}>
                        <div className="Navbar-container">
                            <div className="Navbar-logo">
                                <div onClick={hamburgerClicked}>
                                    <Hamburger open={hamburgerState} />
                                </div>
                                <h1>Pproval</h1>
                            </div>
                            <ul className="Navbar-links-logout">
                                <li className="Navbar-link"><a onClick={handleSignout} href="" className="Logout-button"><h3>Logout</h3></a></li>
                            </ul>
                        </div>
                    </div>
                    <Sidebar open={hamburgerState} role={role} />
                </>
            }
        </>
    )
}
