import React from 'react';
import MediaVideo from './MediaVideo/MediaVideo'
import MediaImage from './MediaImage/MediaImage'
import Media from '../../model/Media';
import './MediaContainer.css'

type Props = {
    media: Media,
    onLoad: Function,
    onClick?: Function
}

export default function MediaContainer({media, onLoad, onClick}: Props) {
 
    const onLoadFunction = () => {
        onLoad();
    }

    const getMediaComponent = ({media, onLoad, onClick}: Props) => {
        switch(media.type) {
            case 0:
                return <MediaImage 
                    onImageLoad={onLoad}
                    onImageClick={onClick}
                    media={media}
                />;
            case 1:
                return <MediaImage 
                    onImageLoad={onLoad}
                    onImageClick={onClick}
                    media={media}
                />;
            case 2:
                return <MediaVideo 
                    onLoad={onLoad}
                    media={media}
                />;
            default:
                return null;
        }
    }

    if (media === null) {
        return null;
    }

    return (
        <div id="media">
            {getMediaComponent({media, onLoad: onLoadFunction, onClick})}
        </div>
    );
}
