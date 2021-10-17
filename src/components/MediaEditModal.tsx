import { useState } from 'react';
import { Modal, Button }from "react-bootstrap";
import Media from '../types/Media';
import { IMediaUpdateRequest, MediaRepository } from '../repositories/MediaRepository';
import MediaUpdateForm from './MediaUpdateForm';

type Props = {
    media: Media,
    isShown: boolean,
    onClose: () => void,
    onSave: (updatedMedia: Media) => void
}

export default function MediaInfoModal({ media, isShown, onClose, onSave }: Props) {

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
        new MediaRepository().update(updateRequest).then(updatedMedia => onSave(updatedMedia));
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
                    <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                    <Button variant="primary" onClick={() => handleSaveClick()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
      </>
    );
}
