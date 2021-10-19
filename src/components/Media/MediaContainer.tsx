import Media from '../../types/Media';
import React from 'react';

type Props = {
    media: Media,
    onClick?: (event: React.MouseEvent<HTMLImageElement, MouseEvent>) => void | undefined,
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

    return <div style={{textAlign: 'center'}}>
        {getMediaComponent()}
    </div>;
}

function MediaImage({ media, onClick, onLoad }: Props) {
    
    const { innerWidth: width } = window;

    const getImageStyle = () => {
        if (width <= 768) {
            return { width: 'auto', height: 'auto'};
        }
        return { maxWidth: '100%', height: '75vh' };
    }
    
    return <img style={getImageStyle()}
                onClick={onClick}
                onLoad={() => onLoad ? onLoad() : () => {}} 
                alt={media.tags.toString()} 
                src={`${process.env.REACT_APP_API}/media/file?id=${media.id}`}/>
}

function MediaVideo({ media, onLoad }: Props) {

    const { innerWidth: width } = window;

    const getVideoStyle = () => {
        if (width <= 768) {
            return { width: 'auto', height: 'auto'};
        }
        return { maxWidth: '100%', height: '75vh' };
    }

    return <video 
                style={getVideoStyle()}
                src={`${process.env.REACT_APP_API}/media/file?id=${media.id}`} 
                onLoadStart={onLoad} 
                autoPlay
                controls 
                loop
                muted 
                key={media.id}/>
}
