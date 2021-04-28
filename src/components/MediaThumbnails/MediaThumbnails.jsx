import React, { useState, useEffect } from 'react';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail'

import './MediaThumbnails.css'

export default function MediaThumbnails({showAlbumCoverOnly, mediaList}) {

    const [shownMediaList, setShownMediaList] = useState([]);

    function determineMediaToShow() {
        let mediaListToShow = [];
        mediaList.forEach(media => {
            if (typeof media !== 'undefined') mediaListToShow.push(media);
        });
        return mediaListToShow;
    }

    useEffect(() => {
        let mediaListToShow = determineMediaToShow();
        setShownMediaList(mediaListToShow);
    }, []);
    
    return ( 
        <div id="thumbnails">
            {shownMediaList.map(object => 
                <a href={showAlbumCoverOnly && object.album_id !== null ? 
                    `/album?id=${object.album_id}` : 
                    `/media?id=${object.id}`}>
                    <div className="thumbnail_container">
                        {showAlbumCoverOnly && object.album_id !== null ? <span id="album_id_badge" class="badge badge-primary">Album</span> : null}
                        <MediaThumbnail 
                            key={object.hash} 
                            mediaId={object.id} 
                            classes={"thumbnail"}
                        />
                    </div>
                </a>
            )}
        </div>
    );
}
