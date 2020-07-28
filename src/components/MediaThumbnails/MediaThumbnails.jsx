import React, { useState, useEffect } from 'react';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail'

import './MediaThumbnails.css'

export default function MediaThumbnails({showAlbumCoverOnly, mediaList, albumList, sortFunction}) {

    const [shownMediaList, setShownMediaList] = useState([]);

    function determineMediaToShow() {
        let mediaListToShow = [];
        mediaList.forEach(media => {
            mediaListToShow.push(media);
        });
        albumList.forEach(album => {
            if (showAlbumCoverOnly) {
                mediaListToShow.push(album.media[0]);
            } else {
                mediaListToShow = mediaListToShow.concat(album.media);
            }
        });
        return mediaListToShow;
    }

    useEffect(() => {
        let mediaListToShow = determineMediaToShow();
        sortFunction(mediaListToShow).then(() => {
            setShownMediaList(mediaListToShow);
        })
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
