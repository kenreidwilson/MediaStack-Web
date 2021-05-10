import React, { ReactEventHandler } from 'react';
import Media from '../../../model/Media';

import './MediaVideo.css'

type Props = {
    onLoad: ReactEventHandler,
    media: Media
}

const MediaVideo = ({media, onLoad}: Props) => ( 
    <video id="mediaVideo" 
                src={`${process.env.REACT_APP_API}/media/${media.id}/file`} 
                onLoadStart={onLoad} 
                autoPlay
                controls 
                loop
                muted 
                key={media.id}/>
)

export default MediaVideo;