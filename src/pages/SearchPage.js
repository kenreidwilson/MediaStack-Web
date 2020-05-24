import React from "react";
import MediaThumbnails from '../components/MediaThumbnails';

const SearchPage = () => {
    return (
        <MediaThumbnails mediaSet={"general"} searchQuery={new URL(window.location.href).searchParams.get("query")}/>
    );
}

export default SearchPage;
