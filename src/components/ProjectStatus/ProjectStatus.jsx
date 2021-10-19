import React from 'react'

// Styles
import './ProjectStatus.css'

export default function ProjectStatus({ status }) {
    // Based on the status prop passed, the following indicator will have either green or white color 
    // as its background

    const displayStatus = (status) => {
        switch (status) {
            case 1: return "Synopsis Submitted";
            case 2: return "Synopsis Approved";
            case 3: return "Progress Report Submitted";
            case 4: return "Final Report Submitted";
            case 5: return "Grade Received";
            default: return "Project Created"
        }
    }

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
                <h3>Current Status : <span style={{ color: "rgba(4, 255, 171, 1)" }}>{displayStatus(status)}</span></h3>
            </div>
        </div>
    )
}
