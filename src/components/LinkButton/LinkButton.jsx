import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './LinkButton.css'

export default function LinkButton({ content, routeLink, special }) {
    return (
        <Link className={special ? "LinkButton-special" : "LinkButton"} to={routeLink}><h3>{content}</h3></Link>
    );
}