import React from 'react'
import Lock from '../Images/Lock.png'

//Styles
import './LoginFigure.css'

export default function LoginFigure() {
    return (
        <div className="LoginFigure">
            <div className="Login-rect1"></div>
            <div className="Login-rect2"></div>
            <img className="Login-img" src={Lock} alt="Lock" />
        </div>
    )
}
