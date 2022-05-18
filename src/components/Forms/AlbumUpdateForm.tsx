import { AlbumUpdateRequest, SelectOption } from '../../types';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import ArtistSelect from '../Selects/ArtistSelect';
import CategorySelect from '../Selects/CategorySelect';
import TagSelect from '../Selects/TagSelect';

type Props = {
    request: AlbumUpdateRequest,
    onChange?: (request: AlbumUpdateRequest) => void,
    isCreatable?: boolean,
    showCategory?: boolean,
    showArtist?: boolean,
    showSource?: boolean,
    showRemoveTags?: boolean,
    showAddTags?: boolean,
    showScore?: boolean
}

export default function AlbumUpdateForm({ 
    request, 
    onChange,
    isCreatable = false, 
    showSource = true, 
    showCategory = true, 
    showArtist = true, 
    showAddTags = true,
    showRemoveTags = true,
    showScore = false }: Props) {
    
    const [newCategoryOption, setNewCategoryOption] = useState<SelectOption | undefined>(request.categoryID ? { value: request.categoryID } : undefined);
    const [newArtistOption, setNewArtistOption] = useState<SelectOption | undefined>(request.artistID ? { value: request.artistID } : undefined);
    const [selectedAddTagOptions, setSelectedAddTagOptions] = useState<SelectOption[]>(request.addTagIDs ? request.addTagIDs.map(id => {return { value: id }}) : []);
    const [selectedRemoveTagOptions, setSelectedRemoveTagOptions] = useState<SelectOption[]>(request.removeTagIDs ? request.removeTagIDs.map(id => {return { value: id }}) : []);
    const [newSource, setNewSource] = useState<string | undefined>(request.source);
    const [newScore, setNewScore] = useState<number | undefined>(request.score);
    
    useEffect(() => {
        if (onChange === undefined) {
            return;
        }

        onChange(
            {
                ID: request.ID,
                categoryID: newCategoryOption?.value,
                artistID: newArtistOption?.value,
                addTagIDs: selectedAddTagOptions.length === 0 ? undefined : selectedAddTagOptions.map(to => to.value),
                removeTagIDs: selectedRemoveTagOptions.length === 0 ? undefined : selectedRemoveTagOptions.map(to => to.value),
                score: newScore,
                source: newSource
            }
        );

    }, [newCategoryOption, newArtistOption, selectedAddTagOptions, selectedRemoveTagOptions, newScore, newSource]);

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
            
            {showSource ? 
                <Form.Group>
                    <Form.Label>Source</Form.Label>
                    <Form.Control value={newSource} onChange={(event) => setNewSource(event.target.value)}/>
                </Form.Group> : null}

            {showAddTags ? 
                <Form.Group>
                    <Form.Label>Add Tags</Form.Label>
                    <TagSelect selectedTags={selectedAddTagOptions} onTagsChange={setSelectedAddTagOptions} isCreatable={isCreatable}/>
                </Form.Group> : null}

            {showRemoveTags ? 
                <Form.Group>
                    <Form.Label>Remove Tags</Form.Label>
                    <TagSelect selectedTags={selectedRemoveTagOptions} onTagsChange={setSelectedRemoveTagOptions} isCreatable={isCreatable}/>
                </Form.Group> : null}

            {showScore ? 
                <Form.Group>
                    <Form.Label>Score</Form.Label>
                    
                </Form.Group>: null}
        </Form>
    );
}
