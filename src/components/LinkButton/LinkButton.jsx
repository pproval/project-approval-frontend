import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkButton({ content, routeLink }) {
    return (
        <Link style={{ textDecoration: "none", color: "blue", fontSize: "50px" }} to={routeLink}>{content}</Link>
    );
}