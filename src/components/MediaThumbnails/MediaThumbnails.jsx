import React, { Component } from 'react';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail'

import './MediaThumbnails.css'

export default class MediaThumbnails extends Component {
    render() {
        if (this.props.mediaList === null) {
            return null;
        }
        return ( 
            <div id="thumbnails">
                {this.props.mediaList.map(media => 
                    <a href={media.album === null ? 
                        `/media?media=${media.hash}` : 
                        `/album?album=${media.album}`}>
                        <MediaThumbnail key={media.hash} media={media} classes={
                            media.album === null ? 
                                "thumbnail media_thumbnail" : 
                                "thumbnail album_thumbnail"}/>
                    </a>
                )}
            </div>
        );
    }
}
