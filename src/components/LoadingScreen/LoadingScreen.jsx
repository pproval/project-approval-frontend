import React from 'react'
import ReactLoading from 'react-loading';
import './LoadingScreen.css';

function LoadingScreen() {
    return (
        <div className="loading-screen">
            <ReactLoading
                type={"bars"}
                color={"#04ffab"}
            />
        </div>
    )
}

export default LoadingScreen;
