import { useState, useEffect } from 'react';
import { Modal, Button }from "react-bootstrap";
import Media from '../types/Media';
import TagSelector from './TagSelector';
import ArtistsSelect from './ArtistSelect';
import CategorySelect from './CategorySelect';
import { IMediaUpdateRequestBody, MediaRepository } from '../repositories/MediaRepository';
import SelectOption from '../types/SelectOption';
import AlbumSelect from './AlbumSelect';

type Props = {
    media: Media,
    isShown: boolean,
    onClose: Function,
    onSave: Function
}

export default function MediaInfoEditModal({ media, isShown, onClose, onSave }: Props) {

    const [newSource, setNewSource] = useState<string>(media.source);
    const [selectedTagOptions, setSelectedTagOptions] = useState<SelectOption[]>([]);
    const [newCategoryId, setNewCategoryId] = useState<number | undefined>(media.categoryID);
    const [newArtistId, setNewArtistId] = useState<number | undefined>(media.artistID);
    const [newAlbumId, setNewAlbumId] = useState<number | undefined>(media.albumID);

    useEffect(() => {
        let selectedTags: SelectOption[] = [];
        media.tags.forEach(tag => {
            selectedTags.push({value: tag.id, label: tag.name});
        });
        setSelectedTagOptions(selectedTags);
    }, []);

    const handleSaveClick = () => {
        let mediaEditRequest: IMediaUpdateRequestBody = { ID: media.id }

        let newTags: number[] = [];
        selectedTagOptions.map(tagOption => newTags.push(tagOption.value as number));
        mediaEditRequest.tagIDs = newTags;
        mediaEditRequest.source = newSource;

        if (media.categoryID != newCategoryId) {
            mediaEditRequest.categoryID = newCategoryId;
        }

        new MediaRepository().update(mediaEditRequest).then(updatedMedia => onSave(updatedMedia));
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
                        <p>Catgory:</p>
                        <CategorySelect selectedCategory={{ value: newCategoryId, label: "" }} onChange={(option) => setNewCategoryId(option?.value)} isCreatable={true}/>
                    </div>
                    <div className="info_edit_modal_element">
                        <p>Artist:</p>
                        <ArtistsSelect selectedArtist={{ value: newCategoryId, label: "" }} onChange={(option) => setNewArtistId(option?.value)} isCreatable={true}/>
                    </div>
                    <div className="info_edit_modal_element">
                        <p>Album:</p>
                        <AlbumSelect selectedAlbum={{ value: newCategoryId, label: "" }} onChange={(option) => setNewAlbumId(option?.value)} isCreatable={true}/>
                    </div>
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
