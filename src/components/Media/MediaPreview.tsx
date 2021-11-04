import Media from '../../types/Media';
import { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import useSwipeable from '../../hooks/useSwipeable';
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
    const { enable, disable } = useSwipeable(previewRef, onNext, onPrevious);

    useEffect(() => {
        if (show) {
            enable();
        } else {
            disable();
        }
    }, [show]);

    return (
        <Modal centered={true} size='xl' show={show} onHide={onClose}>
            <Modal.Body ref={previewRef} style={{ ...theme.style, maxHeight: '80vh' }}>
                <MediaContainer media={media} />
            </Modal.Body>
            <Modal.Footer>
                <Button>asdf</Button>
            </Modal.Footer>
        </Modal>
    );
}
