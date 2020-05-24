import React, { Component } from 'react';

class MediaImage extends Component {
    state = {
        media : this.props.mediaData
    }

    render() { 
        return (
            <img alt={this.state.media.tags.toString()} src={`http://localhost:8000/api/media/${this.state.media.hash}`}></img>
        );
    }
}
 
export default MediaImage;