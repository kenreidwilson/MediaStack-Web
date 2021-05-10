import React from 'react';
import Media from '../../model/Media';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail'
import './MediaThumbnails.css'

type Props = {
    showAlbumCoverOnly: boolean,
    mediaList: Media[]
}

const MediaThumbnails = ({showAlbumCoverOnly, mediaList}: Props) => {
    return ( 
        <div id="thumbnails">
            {mediaList.map(media => 
                <a href={showAlbumCoverOnly && media.albumID !== null ? 
                    `/album?id=${media.albumID}` : 
                    `/media?id=${media.id}`}>
                    <div className="thumbnail_container">
                        {showAlbumCoverOnly && media.albumID !== null ? <span id="album_id_badge" className="badge badge-primary">Album</span> : null}
                        <MediaThumbnail 
                            key={media.id} 
                            media={media}
                        />
                    </div>
                </a>
            )}
        </div>
    );
}

export default MediaThumbnails;