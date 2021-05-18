import React from 'react';
import Media from '../../../model/Media';

import './MediaVideo.css'

type Props = {
    onLoad: Function,
    media: Media
}

export default function MediaVideo({media, onLoad}: Props) {

    const onLoadEventHandler = () => {
        onLoad();
    }

    return (
        <video id="mediaVideo" 
                src={`${process.env.REACT_APP_API}/media/${media.id}/file`} 
                onLoadStart={onLoadEventHandler} 
                autoPlay
                controls 
                loop
                muted 
                key={media.id}/>
    );
}
