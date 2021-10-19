import Media from '../../types/Media';
import IMediaUpdateRequest from '../../types/IMediaUpdateRequest';
import { useState } from 'react';
import { Modal, Button }from 'react-bootstrap';
import useMedia from '../../hooks/useMedia';
import MediaUpdateForm from '../Forms/MediaUpdateForm';

type Props = {
    media: Media,
    isShown: boolean,
    onClose: () => void,
    onSave: (updatedMedia: Media) => void
}

export default function MediaInfoModal({ media, isShown, onClose, onSave }: Props) {

    const { update } = useMedia();

    const [updateRequest, setUpdateRequest] = useState<IMediaUpdateRequest>(
        { 
            ID: media.id,
            categoryID: media.categoryID,
            artistID: media.artistID,
            albumID: media.albumID,
            source: media.source,
            tagIDs: media.tags.map(tag => tag.id)
        }
    );

    const handleSaveClick = () => {
        update(updateRequest).then(updatedMedia => onSave(updatedMedia));
    }

    return (
        <>
            <Modal show={isShown} onHide={() => onClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Edit Media Info`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <MediaUpdateForm request={updateRequest} onChange={setUpdateRequest}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={() => onClose()}>Close</Button>
                    <Button variant='primary' onClick={() => handleSaveClick()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
      </>
    );
}
