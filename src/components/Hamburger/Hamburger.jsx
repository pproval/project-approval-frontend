import React from 'react'

// Styles
import './Hamburger.css';

export default function Hamburger({ open }) {
    return (
        <div className="Hamburger">
            <div className={open ? "Hamburger-top-open" : "Hamburger-top"}></div>
            <div className={open ? "Hamburger-middle-open" : "Hamburger-middle"}></div>
            <div className={open ? "Hamburger-bottom-open" : "Hamburger-bottom"}></div>
        </div>
    )
}
