import Media from '../../types/Media';
import React from 'react';
import useMediaFiles from '../../hooks/useMediaFiles';

type Props = {
    media: Media,
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>, media: Media) => void | undefined,
    onLoad?: () => void | undefined
}

export default function MediaContainer({ media, onClick, onLoad }: Props) {

    const getMediaComponent = () => {
        switch(media.type) {
            case 1:
                return <MediaImage 
                    onLoad={onLoad}
                    onClick={onClick}
                    media={media}
                />;
            case 2:
                return <MediaImage 
                    onLoad={onLoad}
                    onClick={onClick}
                    media={media}
                />;
            case 3:
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

    return getMediaComponent();
}

function MediaImage({ media, onClick = () => {}, onLoad }: Props) {
    
    const { getFileLink } = useMediaFiles();
    
    return <img style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onClick={(e) => onClick(e, media)}
                onLoad={() => onLoad ? onLoad() : () => {}} 
                alt={media.tags.toString()} 
                src={getFileLink(media)}/>
}

function MediaVideo({ media, onLoad }: Props) {

    const { getFileLink } = useMediaFiles();
    const { innerWidth: width } = window;

    const getVideoStyle = () => {
        if (width <= 768) {
            return { width: 'auto', height: 'auto'};
        }
        return { maxWidth: '100%', height: '75vh' };
    }

    return <video 
                style={getVideoStyle()}
                src={getFileLink(media)} 
                onLoadStart={onLoad} 
                autoPlay
                controls 
                loop
                muted 
                key={media.id}/>
}
