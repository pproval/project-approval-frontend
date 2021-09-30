import React from 'react'
import LinkButton from '../LinkButton/LinkButton';

// Styles
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="Navbar">
            <div className="Navbar-container">
                <div className="Navbar-logo">
                    <h1>Pproval</h1>
                </div>
                <ul className="Navbar-links">
                    <li className="Navbar-link"><LinkButton content="About" routeLink="/home" /></li>
                    <li className="Navbar-link"><LinkButton content="Login" routeLink="/login" /></li>
                    <li className="Navbar-link"><LinkButton content="Register" routeLink="/register" /></li>
                </ul>
            </div>
        </div>
    )
}
