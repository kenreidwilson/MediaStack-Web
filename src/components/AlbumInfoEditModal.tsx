import { useState, useEffect } from 'react';
import { Modal, Button }from "react-bootstrap";
import Album from '../types/Album';
import Media from '../types/Media';

import './AlbumInfoEditModal.css'
import TagSelect from './TagSelect';
import { AlbumRepository, IAlbumUpdateRequest } from '../repositories/AlbumRepository';
import SelectOption from '../types/SelectOption';

type Props = {
    album: Album,
    mediaList: Media[]
    isShown: boolean,
    onClose: Function,
    onSave: Function
}

export default function AlbumInfoEditModal({album, mediaList, isShown, onClose, onSave}: Props) {

    const [newAlbumSource, setNewAlbumSource] = useState<string>("");
    const [selectedAddTagOptions, setSelectedAddTagOptions] = useState<SelectOption[]>([]);
    const [selectedRemoveTagOptions, setSelectedRemoveTagOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        setNewAlbumSource(getAlbumSource());
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

    const handleSave = () => {

        let albumEditRequest: IAlbumUpdateRequest = { albumID: album.id };

        let addTagIDs: number[] = [];
        selectedAddTagOptions.map(tagOption => addTagIDs.push(tagOption.value as number));
        albumEditRequest.addTagIDs = addTagIDs;

        let removeTagIDs: number[] = [];
        selectedRemoveTagOptions.map(tagOption => removeTagIDs.push(tagOption.value as number));
        albumEditRequest.removeTagIDs = removeTagIDs;

        albumEditRequest.source = newAlbumSource;

        new AlbumRepository().update(albumEditRequest).then(response => {
            onSave(response);
        });
    };
    
    return ( 
        <>
            <Modal show={isShown} onHide={() => onClose()}>
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
                        <TagSelect selectedTags={selectedAddTagOptions} onTagsChange={setSelectedAddTagOptions}/>
                    </div>
                    <div className="info_edit_modal_element">
                        <p>Remove Tags:</p>
                        <TagSelect selectedTags={selectedRemoveTagOptions} onTagsChange={setSelectedRemoveTagOptions}/>
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
