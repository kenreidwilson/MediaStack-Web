import React, { Component } from 'react';

import './MediaVideo.css'

export default class MediaVideo extends Component {    
    render() { 
        return (
            <video 
                src={`${process.env.REACT_APP_API}${this.props.media.file}`} 
                onLoadStart={this.props.onLoad} 
                autoplay="true" 
                controls 
                loop="true" 
                muted 
                id="mediaVideo" 
                key={this.props.media.id}/>
        );
    }
}
