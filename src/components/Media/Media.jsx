import React, { Component } from 'react';

import MediaVideo from './MediaVideo/MediaVideo'
import MediaImage from './MediaImage/MediaImage'

import './Media.css'

export default class Media extends Component {
    getMediaComponent = () => {
        switch(this.props.media.type) {
            case "image":
                return <MediaImage 
                    onImageClick={this.props.onImageClick}
                    media={this.props.media}
                />;
            case "animated_image":
                return <MediaImage 
                    onImageClick={this.props.onImageClick}
                    media={this.props.media}
                />;
            case "video":
                return <MediaVideo media={this.props.media}/>;
            default:
                return null;
        }
    }

    render() { 
        if (this.props.media === null) {
            return null;
        }
        return (
            <div id="media">
                {this.getMediaComponent()}
            </div>
        );
    }
}
