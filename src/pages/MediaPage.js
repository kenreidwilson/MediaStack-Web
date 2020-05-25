import React from "react";
import Media from '../components/Media';
import Nav from '../components/Nav';

const MediaPage = () => {
    return (
        <React.Fragment>
            <Nav />
            <Media mediaHash={new URL(window.location.href).searchParams.get("media")}/>
        </React.Fragment>
    );
}

export default MediaPage;
