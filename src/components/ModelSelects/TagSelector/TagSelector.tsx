import React, { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import { TagsRequest, TagCreationRequest } from '../../../api/requests/TagRequests';

type Props = {
    selectedTags: TagOption[],
    onChange: Function,
    isCreatable: boolean
}

type TagOption = {
    label: string,
    value?: any
}

export default function TagSelector({ selectedTags, onChange, isCreatable } : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tagOptions, setTagOptions] = useState<TagOption[]>([]);

    useEffect(() => {
        getTags();
    }, []);

    // TODO: Use context to pass this in.
    const getTags = async () => {
        setIsLoading(true);
        new TagsRequest().send().then(response => {
            let _tagOptions: TagOption[] = [];
            response.tags.forEach(tag => {
                _tagOptions.push({ value: tag.id, label: tag.name });
            });
            setTagOptions(_tagOptions);
            setIsLoading(false);
        }).then(() => setIsLoading(false));
    }

    // TODO: Use context to pass this in.
    const createTag = async (tagName: string) => {
        setIsLoading(true);
        await new TagCreationRequest(tagName).send().then(newTag => {
            setTagOptions([...tagOptions, { value: newTag.id, label: newTag.name }]);
            onChange([...getSelectedTags(), { value: newTag.id, label: newTag.name }]);
        });
        setIsLoading(false);
    }

    // Needed because the select uses '==' to compare options.
    const getSelectedTags = () => {
        let _selectedTags: TagOption[] = [];

        selectedTags.forEach(tag => {
            _selectedTags.push(tagOptions.find(to => to.value === tag.value) as TagOption);
        });

        return _selectedTags;
    }

    return (
    isCreatable ? 
        <CreatableSelect 
            placeholder="Enter Tags..."
            value={getSelectedTags()}
            options={tagOptions}
            onChange={(newTagOptions: any) => onChange(newTagOptions ? newTagOptions : [])}
            onCreateOption={(inputValue: any) => createTag(inputValue as string)}
            isSearchable
            isMulti
            isLoading={isLoading}
        /> :
        <Select
            placeholder="Enter Tags..."
            value={getSelectedTags()}
            options={tagOptions}
            onChange={(newTagOptions: any) => onChange(newTagOptions ? newTagOptions : [])}
            onCreateOption={(inputValue: any) => createTag(inputValue as string)}
            isSearchable
            isMulti
            isLoading={isLoading}
        />
    );
}