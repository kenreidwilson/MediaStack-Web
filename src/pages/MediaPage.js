import React from "react";
import Media from '../components/Media';

const MediaPage = () => {
    return (
        <Media mediaHash={new URL(window.location.href).searchParams.get("media")}/>
    );
}

export default MediaPage;
