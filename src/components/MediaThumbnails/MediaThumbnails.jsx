import React, { Component } from 'react';
import MediaThumbnail from '../MediaThumbnail/MediaThumbnail'

import './MediaThumbnails.css'

export default class MediaThumbnails extends Component {

    state = {
        mediaList : []
    }

    componentDidMount = () => {
        if (this.props.collapseAlbums) {
            this.setState({ mediaList : this.props.mediaList })
        } else {
            let mediaList = [];
            this.props.mediaList.forEach(object => {
                if ('cover_id' in object) {
                    object.media.forEach(media => {
                        mediaList.push({ 'id': media, 'album_id': object.id})
                    })
                } else {
                    mediaList.push(object);
                }
            })
            this.setState({ mediaList })
        }
    }

    render() {
        if (this.props.mediaList === null) {
            return null;
        }

        return ( 
            <div id="thumbnails">
                {this.state.mediaList.map(object => 
                    <a href={this.props.collapseAlbums && object.album_id !== null ? 
                        `/album?id=${object.id}` : 
                        `/media?id=${object.id}`}>
                        <div className="thumbnail_container">
                            {object.album_id !== null ? <span id="album_id_badge" class="badge badge-primary">Album</span> : null}
                            <MediaThumbnail 
                                key={object.hash} 
                                mediaId={this.props.collapseAlbums && object.album_id !== null ? 
                                    object.cover_id :
                                    object.id} 
                                classes={this.props.collapseAlbums && object.album_id !== null ?
                                    "thumbnail album_thumbnail" :
                                    "thumbnail media_thumbnail"}
                            />
                        </div>
                    </a>
                )}
            </div>
        );
    }
}
