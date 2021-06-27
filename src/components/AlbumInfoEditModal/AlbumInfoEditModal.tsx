import React, { useState, useEffect } from 'react';
import { Modal, Button }from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { TagsRequest, TagCreationRequest } from '../../api/requests/TagRequests'
import AlbumEditRequest from '../../api/requests/RequestBodies/AlbumEditRequestBody';
import { AlbumInfoChangeRequest } from '../../api/requests/AlbumRequests';
import Album from '../../model/Album';
import Media from '../../model/Media';

import './AlbumInfoEditModal.css'

type Props = {
    album: Album,
    mediaList: Media[]
    isShown: boolean,
    onClose: Function,
    onSave: Function
}

type TagOption = {
    label: string,
    value?: any
}

export default function AlbumInfoEditModal({album, mediaList, isShown, onClose, onSave}: Props) {

    const [newAlbumSource, setNewAlbumSource] = useState<string>("");
    const [addTagOptions, setAddTagOptions] = useState<TagOption[]>([]);
    const [selectedAddTagOptions, setSelectedAddTagOptions] = useState<TagOption[]>([]);
    const [removeTagOptions, setRemoveTagOptions] = useState<TagOption[]>([]);
    const [selectedRemoveTagOptions, setSelectedRemoveTagOptions] = useState<TagOption[]>([]);
    const [isTagOptionsLoading, setIsTagOptionsLoading] = useState<boolean>(false);

    useEffect(() => {
        setNewAlbumSource(getAlbumSource());
        
        setIsTagOptionsLoading(true);
        new TagsRequest().send().then(response => {
            let _removeTagOptions: TagOption[] = [];
            let _addTagOptions: TagOption[] = [];
            response.tags.forEach(tag => {
                let tagFound = false;
                mediaList.forEach(media => {
                    if (!tagFound && media.tags.find(t => t.id === tag.id)) {
                        _removeTagOptions.push({label: tag.name, value: tag.id});
                        tagFound = true;
                    }
                });
                if (!tagFound) {
                    _addTagOptions.push({label: tag.name, value: tag.id});
                }
            });
            setAddTagOptions(_addTagOptions);
            setRemoveTagOptions(_removeTagOptions);
            setIsTagOptionsLoading(false);

        }).catch(() => setIsTagOptionsLoading(false));
    }, []);

    const getAlbumSource = () => {
        let albumSource: string = "";

        mediaList.forEach(media => {
            if (media.source !== null) {
                if (albumSource !== null && media.source !== albumSource) {
                    return "";
                }
                albumSource = media.source;
            }
        });

        return albumSource;
    };

    const createTag = (tagName: string) => {
        setIsTagOptionsLoading(true);
        new TagCreationRequest(tagName).send().then(newTag => {
            setAddTagOptions([...addTagOptions, { value: newTag.id, label: newTag.name }]);
            setSelectedAddTagOptions([...selectedAddTagOptions, { value: newTag.id, label: newTag.name }]);
        });
        setIsTagOptionsLoading(false);
    };

    const handleSave = () => {

        let albumEditRequest: AlbumEditRequest = new AlbumEditRequest();

        let addTagIDs: number[] = [];
        selectedAddTagOptions.map(tagOption => addTagIDs.push(tagOption.value as number));
        albumEditRequest.addTagIDs = addTagIDs;

        let removeTagIDs: number[] = [];
        selectedRemoveTagOptions.map(tagOption => removeTagIDs.push(tagOption.value as number));
        albumEditRequest.removeTagIDs = removeTagIDs;

        albumEditRequest.source = newAlbumSource;

        new AlbumInfoChangeRequest(album.id, albumEditRequest).send().then(response => {
            onSave(response);
        });
    };
    
    return ( 
        <>
            <Modal show={isShown} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{`Edit Album Info`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div id="info_edit_modal_body">
                    <h5 className="info_edit_modal_seperator">Album </h5>
                    <div className="info_edit_modal_element">
                        <p>Source: </p>
                        <form className="info_edit_modal_source_form">
                            <input type="text" value={newAlbumSource} onChange={(value) => setNewAlbumSource(value.target.value)} />
                        </form>
                    </div>
                    <div className="info_edit_modal_element">
                        <p>Add Tags:</p>
                        <CreatableSelect 
                            placeholder="Enter Tags..."
                            value={selectedAddTagOptions}
                            options={addTagOptions}
                            onChange={(newSelectedTagOptions: any) => setSelectedAddTagOptions(newSelectedTagOptions ? newSelectedTagOptions as TagOption[] : [])}
                            onCreateOption={(tagName: any) => createTag(tagName as string)}
                            isSearchable
                            isMulti
                            isLoading={isTagOptionsLoading}
                        />
                    </div>
                    <div className="info_edit_modal_element">
                        <p>Remove Tags:</p>
                        <Select 
                            placeholder="Enter Tags..."
                            value={selectedRemoveTagOptions}
                            options={removeTagOptions}
                            onChange={(newSelectedTagOptions: any) => setSelectedRemoveTagOptions(newSelectedTagOptions ? newSelectedTagOptions as TagOption[] : [])}
                            isSearchable
                            isMulti
                            isLoading={isTagOptionsLoading}
                        />
                    </div>
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                    <Button variant="primary" onClick={handleSave}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
      </>
     );
}
