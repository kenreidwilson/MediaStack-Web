import React, { Component } from 'react';

class MediaThumbnail extends Component {
    state = {
        media: this.props.data
    };

    render() {
        let classes = "thumbnail ";
        classes += this.state.media.album == null ? "media_thumbnail" : "album_thumbnail";
        let alt = this.state.media.tags.toString();
        return (
            <a href={`/media?media=${this.state.media.hash}`}>
                <img 
                    alt={alt} 
                    className={classes} 
                    src={`http://localhost:8000/api/media/${this.state.media.hash}/thumbnail`}>
                </img>
            </a>
        );
    }
}
 
export default MediaThumbnail;
