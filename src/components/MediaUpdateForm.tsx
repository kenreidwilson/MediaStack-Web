import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { IMediaUpdateRequest } from '../repositories/MediaRepository';
import SelectOption from '../types/SelectOption';
import AlbumSelect from './AlbumSelect';
import ArtistSelect from './ArtistSelect';
import CategorySelect from './CategorySelect';
import TagSelect from './TagSelect';

type Props = {
    request: IMediaUpdateRequest,
    onChange?: (request: IMediaUpdateRequest) => void,
    isCreatable?: boolean
}

export default function MediaUpdateForm({ request, onChange, isCreatable = false }: Props) {
    const [newSource, setNewSource] = useState<string | undefined>(request.source);
    const [selectedTagOptions, setSelectedTagOptions] = useState<SelectOption[]>(request.tagIDs ? request.tagIDs.map(id => {return { value: id }}) : []);
    const [newCategoryOption, setNewCategoryOption] = useState<SelectOption | undefined>(request.categoryID ? { value: request.categoryID } : undefined);
    const [newArtistOption, setNewArtistOption] = useState<SelectOption | undefined>(request.artistID ? { value: request.artistID } : undefined);
    const [newAlbumOption, setNewAlbumOption] = useState<SelectOption | undefined>(request.albumID ? { value: request.albumID } : undefined);

    useEffect(() => {
        if (onChange === undefined) { 
            return;
        }

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
            <Form.Group>
                <Form.Label>Category</Form.Label>
                <CategorySelect selectedCategory={newCategoryOption} onCategoryChange={setNewCategoryOption} isCreatable={isCreatable}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Artist</Form.Label>
                <ArtistSelect selectedArtist={newArtistOption} onArtistChange={setNewArtistOption} isCreatable={isCreatable}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Album</Form.Label>
                <AlbumSelect selectedAlbum={newAlbumOption} onAlbumChange={setNewAlbumOption} isCreatable={isCreatable}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Source</Form.Label>
                <Form.Control value={newSource} onChange={(event) => setNewSource(event.target.value)}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Tags</Form.Label>
                <TagSelect selectedTags={selectedTagOptions} onTagsChange={setSelectedTagOptions} isCreatable={isCreatable}/>
            </Form.Group>
        </Form>
    );
}
