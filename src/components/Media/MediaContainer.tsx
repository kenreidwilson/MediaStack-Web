import Media from '../../types/Media';
import React from 'react';
import useMediaFiles from '../../hooks/useMediaFiles';

type Props = {
    media: Media,
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>, media: Media) => void | undefined,
    onLoad?: () => void | undefined,
    style?: React.CSSProperties
}

export default function MediaContainer({ media, onClick, onLoad, style }: Props) {

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
                    style={mediaStyle}
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

const MediaVideo = ({ media, onLoad, style }: Props) => {

    const { getFileLink } = useMediaFiles();

    return <video 
                style={style}
                src={getFileLink(media)} 
                onLoadStart={onLoad} 
                autoPlay
                controls 
                loop
                muted 
                key={media.id}/>
}
