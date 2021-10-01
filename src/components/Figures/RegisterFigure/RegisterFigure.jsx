import React from 'react'
import Rocket from '../Images/Rocket.png'

// Styles
import './RegisterFigure.css'

export default function RegisterFigure() {
    return (
        <div className="RegisterFigure">
            <div className="Register-rect1"></div>
            <div className="Register-rect2"></div>
            <img className="Register-img" src={Rocket} alt="Rocket" />
        </div>
    )
}
