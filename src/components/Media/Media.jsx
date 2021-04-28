import React, { Component } from 'react';

import MediaVideo from './MediaVideo/MediaVideo'
import MediaImage from './MediaImage/MediaImage'

import './Media.css'

export default class Media extends Component {
    getMediaComponent = () => {
        switch(this.props.media.type) {
            case 0:
                return <MediaImage 
                    onImageLoad={this.props.onLoad}
                    onImageClick={this.props.onImageClick}
                    media={this.props.media}
                />;
            case 1:
                return <MediaImage 
                    onImageLoad={this.props.onLoad}
                    onImageClick={this.props.onImageClick}
                    media={this.props.media}
                />;
            case 2:
                return <MediaVideo 
                    onLoad={this.props.onLoad}
                    media={this.props.media}
                />;
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
