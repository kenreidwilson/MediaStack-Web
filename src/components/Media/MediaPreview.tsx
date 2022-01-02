import { Media } from '../../types';
import { useContext, useEffect, useRef, useState } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import useSwipeable from '../../hooks/useSwipeable';
import { Card } from 'react-bootstrap';
import { Backdrop } from '@mui/material';
import MediaContainer from './MediaContainer';

type Props = {
    media: Media,
    show: boolean,
    onNext?: () => Promise<void>,
    onPrevious?: () => Promise<void>,
    onMediaClick?: (event: React.MouseEvent, media: Media) => void,
    onClose?: () => void
}

export default function MediaPreview({ media, show, onNext, onPrevious, onMediaClick = () => {}, onClose }: Props) {

    const { theme } = useContext(ThemeContext);
    const previewRef = useRef<HTMLDivElement | null>(null);
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true);
    }, [media]);

    const handleNext = async () => {
        onNext && await onNext();
        await resetPosition();
    }

    const handlePrevious = async () => {
        onPrevious && await onPrevious();
        await resetPosition();
    };

    const { enable, disable, resetPosition } = useSwipeable(
        { divRef: previewRef, onNext: handleNext, onPrevious: handlePrevious });

    useEffect(() => {
        if (show) {
            enable();
        } else {
            disable();
        }
    }, [show]);

    const onMediaContainerClick = (
        event: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLVideoElement>, 
        media: Media) => {

        //TODO: Close if not clicking on image.

        onMediaClick(event, media);
    }

    return (
        <Backdrop style={{ zIndex: 10, touchAction: 'none' }} open={show} onClick={onClose}>
            <div 
                ref={previewRef} 
                style={{ ...theme.style, maxHeight: '70vh', maxWidth: '97vw', overflow: 'hidden', backgroundColor: 'none', borderRadius: '10px' }}>
                {isLoading && <p>Loading...</p>}
                <div 
                    style={{ visibility: isLoading ? 'hidden' : 'visible', height: '70vh', width: '97vw' }}>
                    
                    <MediaContainer 
                        onClick={onMediaContainerClick} 
                        onLoad={() => setIsLoading(false)} 
                        media={media} 
                        videoProps={{ controls: false }}/>
                </div>
            </div>
        </Backdrop>
    );
}
