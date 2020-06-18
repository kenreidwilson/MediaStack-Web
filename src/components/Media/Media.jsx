import React, { Component } from 'react';
import $ from 'jquery'

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

class MediaVideo extends Component {    
    render() { 
        return (
            <video autoplay="true" controls loop="true" muted id="mediaVideo">
                <source
                    src={`${process.env.REACT_APP_API}${this.props.media.file}`}
                    type="video/mp4">
                </source>
            </video>
        );
    }
}
 
class MediaImage extends Component {

    componentDidMount = () => {
        if (typeof this.props.onImageClick !== 'undefined') {
            $("#mediaImage").on("click", (event) => {
                this.props.onImageClick(event);
            });
        }
    }

    render() { 
        return (
            <img id="mediaImage" alt={this.props.media.tags.toString()} src={`${process.env.REACT_APP_API}${this.props.media.file}`}></img>
        );
    }
}
