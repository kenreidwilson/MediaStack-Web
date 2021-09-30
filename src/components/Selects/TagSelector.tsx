import { useState } from 'react';
import { TagRepository } from '../../repositories/TagRepository';
import BaseMultiSelect from './BaseMultiSelect';
import SelectOption from './SelectOption';

type Props = {
    selectedTags: SelectOption[],
    onChange: (option: SelectOption[]) => void,
    isCreatable?: boolean
}

export default function TagSelector({ selectedTags, onChange, isCreatable = false } : Props) {

    const tags = new TagRepository();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // TODO: Use context to pass this in.
    const getTags = async () => {
        setIsLoading(true);
        return await tags.search({count: 999}).then(response => {
            let _tagOptions: SelectOption[] = [];
            response.tags.forEach(tag => {
                _tagOptions.push({ value: tag.id, label: tag.name });
            });
            setIsLoading(false);
            return _tagOptions;
        });
    }

    // TODO: Use context to pass this in.
    const createTag = async (tagName: string) => {
        setIsLoading(true);
        return await tags.add({id: 0, name: tagName}).then(newTag => {
            setIsLoading(false);
            return { label: newTag.name, value: newTag.id };
        });
    }

    return <BaseMultiSelect 
                selectedOptions={selectedTags} 
                getOptions={getTags} 
                createOption={createTag} 
                onChange={onChange} 
                isCreatable={isCreatable} 
                isLoading={isLoading}/>;
}