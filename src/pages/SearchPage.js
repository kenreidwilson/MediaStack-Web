import React from "react";
import MediaThumbnails from '../components/MediaThumbnails';
import Nav from '../components/Nav';

const SearchPage = () => {
    return (
        <React.Fragment>
            <Nav />
            <MediaThumbnails mediaSet={"general"} searchQuery={new URL(window.location.href).searchParams.get("query")}/>
        </React.Fragment>
    );
}

export default SearchPage;
