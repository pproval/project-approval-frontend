import React from 'react';
import Navbar from '../Navbar/Navbar';
import LinkButton from '../LinkButton/LinkButton';
import HomeFigure from '../Figures/HomeFigure/HomeFigure';

//Styles
import './Home.css';

function Home() {
    return (
        <>
            <Navbar />
            <div className="Home">
                <div className="Home-container">
                    <div className="Home-left">
                        <HomeFigure />
                    </div>
                    <div className="Home-right">
                        <h1 className="Home-title">
                            Project Approval System
                        </h1>
                        <div className="Home-get-started">
                            <LinkButton content="Get Started" routeLink="/register" special={true} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;
