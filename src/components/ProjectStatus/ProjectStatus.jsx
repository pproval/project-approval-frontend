import React from 'react'

// Styles
import './ProjectStatus.css'

export default function ProjectStatus({ status }) {
    return (
        <div className="ProjectStatus">
            <div className="ProjectStatus-indicator">
                <div
                    className="ProjectStatus-stage"
                    style={status >= 0 ? ({ backgroundColor: "rgba(4, 255, 171, 1)" }) : ({ backgroundColor: "white" })}
                >
                </div>
                <div
                    className="ProjectStatus-stage"
                    style={status >= 1 ? ({ backgroundColor: "rgba(4, 255, 171, 1)" }) : ({ backgroundColor: "white" })}
                >
                </div>
                <div
                    className="ProjectStatus-stage"
                    style={status >= 2 ? ({ backgroundColor: "rgba(4, 255, 171, 1)" }) : ({ backgroundColor: "white" })}
                >
                </div>
                <div
                    className="ProjectStatus-stage"
                    style={status >= 3 ? ({ backgroundColor: "rgba(4, 255, 171, 1)" }) : ({ backgroundColor: "white" })}
                >
                </div>
                <div
                    className="ProjectStatus-stage"
                    style={status >= 4 ? ({ backgroundColor: "rgba(4, 255, 171, 1)" }) : ({ backgroundColor: "white" })}
                >
                </div>
                <div
                    className="ProjectStatus-stage"
                    style={status >= 5 ? ({ backgroundColor: "rgba(4, 255, 171, 1)" }) : ({ backgroundColor: "white" })}
                >
                </div>
            </div>
            <div className="ProjectStatus-text">
                <h3>Current Status : <span style={{ color: "rgba(4, 255, 171, 1)" }}>Synopsis Approved</span></h3>
            </div>
        </div>
    )
}
