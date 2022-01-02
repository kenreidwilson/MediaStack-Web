import { Media } from '../../types';
import React from 'react';
import useMediaFiles from '../../hooks/useMediaFiles';

type mediaClickEvent = React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLVideoElement>;

type videoProps = {
    autoPlay?: boolean,
    controls?: boolean,
    loop?: boolean,
    muted?: boolean
}

type Props = {
    media: Media,
    onClick?: (event: mediaClickEvent, media: Media) => void,
    onLoad?: () => void | undefined,
    style?: React.CSSProperties,
    videoProps?: videoProps
}

export default function MediaContainer({ media, onClick, onLoad, style, videoProps }: Props) {

    const mediaStyle: React.CSSProperties = 
        { width: '100%', height: '100%', objectFit: 'contain', ...style };

    const getMediaComponent = () => {
        switch(media.type) {
            case 1:
                return <MediaImage 
                    media={media}
                    onLoad={onLoad}
                    onClick={onClick}
                    style={mediaStyle}
                />;
            case 2:
                return <MediaImage 
                    media={media}
                    onLoad={onLoad}
                    onClick={onClick}
                    style={mediaStyle}
                />;
            case 3:
                return <MediaVideo 
                    media={media}
                    onLoad={onLoad}
                    onClick={onClick}
                    style={mediaStyle}
                    videoProps={videoProps}
                />;
            default:
                return null;
        }
    }

    return getMediaComponent();
}

const MediaImage = ({ media, onClick = () => {}, onLoad, style }: Props) => {
    
    const { getFileLink } = useMediaFiles();
    
    return <img style={style}
                onClick={(e) => onClick(e, media)}
                onLoad={onLoad} 
                alt={media.tags.toString()} 
                src={getFileLink(media)}/>
}

const MediaVideo = ({ 
    media, 
    onLoad, 
    onClick = () => {}, 
    style, 
    videoProps = { autoPlay: true, controls: true, loop: true, muted: true } }: Props) => {

    const { getFileLink } = useMediaFiles();

    return <video 
                style={style}
                src={getFileLink(media)} 
                onLoadStart={onLoad} 
                onClick={(e) => onClick(e, media)}
                autoPlay={videoProps.autoPlay !== undefined ? videoProps.autoPlay : true}
                controls={videoProps.controls !== undefined ? videoProps.controls : true}
                loop={videoProps.loop !== undefined ? videoProps.loop : true}
                muted ={videoProps.muted !== undefined ? videoProps.muted : true}
                key={media.id}/>
}
