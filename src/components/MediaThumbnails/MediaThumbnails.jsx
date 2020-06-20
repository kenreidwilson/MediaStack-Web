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
                if ('cover' in object) {
                    object.media.forEach(media => {
                        mediaList.push({ 'hash': media, 'album': object.name})
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
                    <a href={this.props.collapseAlbums && object.album !== null ? 
                        `/album?album=${object.name}` : 
                        `/media?media=${object.hash}`}>
                        <MediaThumbnail 
                            key={object.hash} 
                            mediaId={this.props.collapseAlbums && object.album !== null ? 
                                object.cover :
                                object.hash} 
                            classes={this.props.collapseAlbums && object.album !== null ?
                                "thumbnail album_thumbnail" :
                                "thumbnail media_thumbnail"}
                        />
                    </a>
                )}
            </div>
        );
    }
}
