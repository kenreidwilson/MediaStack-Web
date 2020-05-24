import React, { Component } from 'react';

class MediaVideo extends Component {
    state = {
        media : this.props.mediaData
    }
    
    render() { 
        return (
            <video controls autoplay muted>
                <source
                    src={`http://localhost:8000/api/media/${this.state.media.hash}`}
                    type="video/mp4"
                >
                </source>
            </video>
        );
    }
}
 
export default MediaVideo;