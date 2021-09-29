import React from 'react';
import LinkButton from '../LinkButton/LinkButton';

function Home() {
    return (
        <>
            <LinkButton content=" About " routeLink="/home" />
            <LinkButton content=" Login " routeLink="/login" />
            <LinkButton content=" Register " routeLink="/register" />
            <h1>This is Pproval's Home page</h1>
        </>
    )
}

export default Home;
