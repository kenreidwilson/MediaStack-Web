import React, { useState, useEffect } from 'react';
import { Modal, Button }from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import { TagsRequest, TagCreationRequest } from '../../api/requests/TagRequests'
import Media from '../../model/Media';
import MediaEditRequest from '../../api/requests/RequestBodies/MediaEditRequest';
import { MediaInfoChangeRequest } from '../../api/requests/MediaRequests';

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
    const [tagOptions, setTagOptions] = useState<TagOption[]>([]);
    const [selectedTagOptions, setSelectedTagOptions] = useState<TagOption[]>([]);
    const [isTagOptionsLoading, setIsTagOptionsLoading] = useState<boolean>(false);

    useEffect(() => {
        setIsTagOptionsLoading(true);
        new TagsRequest().send().then(response => {
            let _tagOptions: TagOption[] = [];
            response.forEach(tag => {
                _tagOptions.push({ value: tag.id, label: tag.name });
            });
            setTagOptions(_tagOptions);

            let selectedTags: TagOption[] = [];
            media.tags.forEach(tag => {
                selectedTags.push(_tagOptions.find(to => to.value === tag.id) as TagOption);
            });
            setSelectedTagOptions(selectedTags);
            setIsTagOptionsLoading(false);
        }).then(() => setIsTagOptionsLoading(false));
    }, []);

    const createTag = async (tagName: string) => {
        setIsTagOptionsLoading(true);
        await new TagCreationRequest(tagName).send().then(newTag => {
            setTagOptions([...tagOptions, { value: newTag.id, label: newTag.name }]);
            setSelectedTagOptions([...selectedTagOptions, { value: newTag.id, label: newTag.name }]);
        });
        setIsTagOptionsLoading(false);
    }

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
                        <CreatableSelect 
                            placeholder="Enter Tags..."
                            value={selectedTagOptions}
                            options={tagOptions}
                            onChange={(newTagOptions: any) => setSelectedTagOptions(newTagOptions ? newTagOptions : [])}
                            onCreateOption={(inputValue: any) => createTag(inputValue as string)}
                            isSearchable
                            isMulti
                            isLoading={isTagOptionsLoading}
                        />
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
