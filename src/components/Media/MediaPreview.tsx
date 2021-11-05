import Media from '../../types/Media';
import { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import useSwipeable from '../../hooks/useSwipeable';
import { Backdrop } from '@mui/material';
import { Modal, Button, Card } from 'react-bootstrap';
import MediaContainer from './MediaContainer';

type Props = {
    media: Media,
    show: boolean,
    onNext?: () => void,
    onPrevious?: () => void,
    onClose?: () => void
}

export default function MediaPreview({ media, show, onNext, onPrevious, onClose }: Props) {

    const { theme } = useContext(ThemeContext);
    const previewRef = useRef<HTMLDivElement | null>(null);

    const handleNext = () => {
        onNext && onNext();
        resetPosition();
    }

    const handlePrevious = () => {
        onPrevious && onPrevious();
        resetPosition();
    }

    const { enable, disable, resetPosition } = useSwipeable(previewRef, handleNext, handlePrevious);

    useEffect(() => {
        if (show) {
            enable();
        } else {
            disable();
        }
    }, [show]);

    return (
        <Backdrop open={show} onClick={onClose}>
            <Card ref={previewRef} 
                style={{ ...theme.style, maxHeight: '70vh', maxWidth: '97vw', overflow: 'hidden' }}>
                <MediaContainer media={media} />
            </Card>
        </Backdrop>
    );
}
