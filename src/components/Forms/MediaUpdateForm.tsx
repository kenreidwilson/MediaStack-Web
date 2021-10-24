import IMediaUpdateRequest from '../../types/IMediaUpdateRequest';
import SelectOption from '../../types/SelectOption';
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import AlbumSelect from '../Selects/AlbumSelect';
import ArtistSelect from '../Selects/ArtistSelect';
import CategorySelect from '../Selects/CategorySelect';
import TagSelect from '../Selects/TagSelect';

type Props = {
    request: IMediaUpdateRequest,
    onChange?: (request: IMediaUpdateRequest) => void,
    isCreatable?: boolean,
    showSource?: boolean,
    showCategory?: boolean,
    showArtist?: boolean,
    showAlbum?: boolean,
    showTags?: boolean
}

export default function MediaUpdateForm({ 
    request, 
    onChange = () => {}, 
    isCreatable = false, 
    showSource = true, 
    showCategory = true, 
    showArtist = true, 
    showAlbum = true,
    showTags = true }: Props) {
        
    const [newSource, setNewSource] = useState<string | undefined>(request.source);
    const [selectedTagOptions, setSelectedTagOptions] = useState<SelectOption[]>(request.tagIDs ? request.tagIDs.map(id => {return { value: id }}) : []);
    const [newCategoryOption, setNewCategoryOption] = useState<SelectOption | undefined>(request.categoryID ? { value: request.categoryID } : undefined);
    const [newArtistOption, setNewArtistOption] = useState<SelectOption | undefined>(request.artistID ? { value: request.artistID } : undefined);
    const [newAlbumOption, setNewAlbumOption] = useState<SelectOption | undefined>(request.albumID ? { value: request.albumID } : undefined);

    useEffect(() => {
        onChange(
            { 
                ID: request.ID,
                tagIDs: selectedTagOptions.length === 0 ? undefined : selectedTagOptions.map(to => to.value),
                categoryID: newCategoryOption ? newCategoryOption.value : undefined,
                artistID: newArtistOption ? newArtistOption.value : undefined,
                albumID: newAlbumOption ? newAlbumOption.value: undefined,
                source: newSource
            }
        );
    }, [newSource, selectedTagOptions, newCategoryOption, newArtistOption, newAlbumOption]);

    return (
        <Form>
            {showCategory ? 
                <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <CategorySelect selectedCategory={newCategoryOption} onCategoryChange={setNewCategoryOption} isCreatable={isCreatable}/>
                </Form.Group> : null}
            
            {showArtist ? 
                <Form.Group>
                    <Form.Label>Artist</Form.Label>
                    <ArtistSelect isDisabled={newCategoryOption === undefined} selectedArtist={newArtistOption} onArtistChange={setNewArtistOption} isCreatable={isCreatable}/>
                </Form.Group> : null}
            
            {showAlbum ? 
                <Form.Group>
                    <Form.Label>Album</Form.Label>
                    <AlbumSelect isDisabled={newArtistOption === undefined} selectedAlbum={newAlbumOption} onAlbumChange={setNewAlbumOption} isCreatable={isCreatable}/>
                </Form.Group> : null}
            
            {showSource ? 
                <Form.Group>
                    <Form.Label>Source</Form.Label>
                    <Form.Control value={newSource} onChange={(event) => setNewSource(event.target.value)}/>
                </Form.Group> : null}

            {showTags ? 
                <Form.Group>
                    <Form.Label>Tags</Form.Label>
                    <TagSelect selectedTags={selectedTagOptions} onTagsChange={setSelectedTagOptions} isCreatable={isCreatable}/>
                </Form.Group> : null}
        </Form>
    );
}
