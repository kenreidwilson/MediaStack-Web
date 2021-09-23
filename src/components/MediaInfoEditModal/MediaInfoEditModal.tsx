import React, { useState, useEffect } from 'react';
import { Modal, Button }from "react-bootstrap";
import Media from '../../model/Media';
import MediaEditRequest from '../../api/requests/RequestBodies/MediaEditRequest';
import { MediaInfoChangeRequest } from '../../api/requests/MediaRequests';
import TagSelector from '../ModelSelects/TagSelector/TagSelector';

type Props = {
    media: Media,
    isShown: boolean,
    onClose: Function,
    onSave: Function
}

type TagOption = {
    label: string,
    value?: any
}

export default function MediaInfoEditModal({ media, isShown, onClose, onSave }: Props) {

    const [newSource, setNewSource] = useState<string>(media.source);
    const [selectedTagOptions, setSelectedTagOptions] = useState<TagOption[]>([]);

    useEffect(() => {
        let selectedTags: TagOption[] = [];
        media.tags.forEach(tag => {
            selectedTags.push({value: tag.id, label: tag.name});
        });
        setSelectedTagOptions(selectedTags);
    }, []);

    const handleSaveClick = () => {
        let mediaEditRequest: MediaEditRequest = new MediaEditRequest();

        let newTags: number[] = [];
        selectedTagOptions.map(tagOption => newTags.push(tagOption.value as number));
        mediaEditRequest.tagIDs = newTags;
        mediaEditRequest.source = newSource;

        new MediaInfoChangeRequest(media.id, mediaEditRequest).send().then(updatedMedia => onSave(updatedMedia));
    }

    return (
        <>
            <Modal show={isShown} onHide={() => onClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Edit Media Info`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="info_edit_modal_body">
                    <div className="info_edit_modal_element">
                        <p>Source: </p>
                        <form className="info_edit_modal_source_form">
                            <input type="text" value={newSource} onChange={(event: any) => setNewSource(event.target.value)}/>
                        </form>
                    </div>
                    <div className="info_edit_modal_element">
                        <p>Tags:</p>
                        <TagSelector selectedTags={selectedTagOptions} onChange={setSelectedTagOptions} isCreatable={true}/>
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                    <Button variant="primary" onClick={() => handleSaveClick()}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
      </>
    );
}
