import React, { Component, ReactEventHandler } from 'react';
import Media from '../../../model/Media';

import './MediaVideo.css'

type Props = {
    onLoad: ReactEventHandler,
    media: Media
}

export default class MediaVideo extends Component<Props> {    
    render() { 
        return (
            <video id="mediaVideo" 
                src={`${process.env.REACT_APP_API}/media/${this.props.media.ID}/file`} 
                onLoadStart={this.props.onLoad} 
                autoPlay
                controls 
                loop
                muted 
                key={this.props.media.ID}/>
        );
    }
}
