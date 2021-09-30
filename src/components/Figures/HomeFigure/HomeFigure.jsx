import React from 'react'

// Styles
import './HomeFigure.css';

// This is the figure/image which is displayed on the left side on the landing page.
export default function HomeFigure() {
    return (
        <>
            <div className="Home-circle-1"></div>
            <div className="Home-rect1">
                <div className="Home-rect2">
                    <div className="Home-rect-cir"></div>
                </div>
                <div className="Home-rect2">
                    <div className="Home-rect-cir"></div>
                </div>
                <div className="Home-rect2">
                    <div className="Home-rect-cir"></div>
                </div>
            </div>
            <div className="Home-circle-2"></div>
        </>
    )
}
