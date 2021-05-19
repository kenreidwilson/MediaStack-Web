import React, { useState, useEffect } from 'react';
import { Modal, Button }from "react-bootstrap";
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select'
import { TagsRequest, TagCreationRequest } from '../../api/requests/TagRequests'
import AlbumEditRequest from '../../api/requests/RequestBodies/AlbumEditRequestBody';
import { AlbumInfoChangeRequest } from '../../api/requests/AlbumRequests';
import Album from '../../model/Album';
import Media from '../../model/Media';
import Tag from '../../model/Tag';

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

    const [newAlbumSource, setNewAlbumSource] = useState<string | undefined>(undefined);
    const [addTagOptions, setAddTagOptions] = useState<TagOption[]>([]);
    const [selectedAddTagOptions, setSelectedAddTagOptions] = useState<TagOption[]>([]);
    const [removeTagOptions, setRemoveTagOptions] = useState<TagOption[]>([]);
    const [selectedRemoveTagOptions, setSelectedRemoveTagOptions] = useState<TagOption[]>([]);
    const [isTagOptionsLoading, setIsTagOptionsLoading] = useState<boolean>(false);

    useEffect(() => {
        setNewAlbumSource(getAlbumSource());
        
        setIsTagOptionsLoading(true);
        let tagOptions: TagOption[] = [];
        new TagsRequest().send().then(response => {
            response.map(tag => tagOptions.push({ label: tag.name, value: tag.id }));
        });

        let _removeTagOptions: TagOption[] = [];
        mediaList.forEach(media => {
            media.tags.forEach(tag => {
                let tagOption: TagOption | null = getTagOptionForTag(tagOptions, tag);
                if (tagOption !== null && !_removeTagOptions.includes(tagOption)) {
                    _removeTagOptions.push(tagOption);
                }
            });
        }, []);
        setRemoveTagOptions(_removeTagOptions);

        let _addTagOptions: TagOption[] = [];
        tagOptions.forEach(tagOption => {
            if (!removeTagOptions.includes(tagOption)) {
                _addTagOptions.push(tagOption);
            }
        });
        setAddTagOptions(_addTagOptions);

        setIsTagOptionsLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getTagOptionForTag = (tagOptions: TagOption[], tag: Tag) => {
        tagOptions.forEach(tagOption => {
            if (tagOption.value === tag.id) {
                return tagOption;
            };
        })
        return null;
    };

    const getAlbumSource = () => {
        let albumSource: string | undefined = undefined;

        mediaList.forEach(media => {
            if (media.source !== null) {
                if (albumSource !== null && media.source !== albumSource) {
                    return undefined;
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
                            <input type="text" value={newAlbumSource} onChange={(value: any) => setNewAlbumSource(value as string)} />
                        </form>
                    </div>
                    <div className="info_edit_modal_element">
                        <p>Add Tags:</p>
                        <CreatableSelect 
                            placeholder="Enter Tags..."
                            value={selectedAddTagOptions}
                            options={addTagOptions}
                            onChange={(newSelectedTagOptions: any) => setSelectedAddTagOptions(newSelectedTagOptions as TagOption[])}
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
                            onChange={(newSelectedTagOptions: any) => setSelectedRemoveTagOptions(newSelectedTagOptions as TagOption[])}
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
