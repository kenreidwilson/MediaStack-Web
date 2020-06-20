import React, { Component } from 'react';

import './MediaVideo.css'

export default class MediaVideo extends Component {    
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
