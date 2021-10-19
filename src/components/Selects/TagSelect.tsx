import SelectOption from '../../types/SelectOption';
import { useEffect, useState } from 'react';
import useTags from '../../hooks/useTags';
import BaseMultiSelect from './BaseMultiSelect';

type Props = {
    selectedTags: SelectOption[],
    onTagsChange: (option: SelectOption[]) => void,
    isCreatable?: boolean
}

export default function TagSelect({ selectedTags, onTagsChange: onChange, isCreatable = false } : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tagOptions, setTagOptions] = useState<SelectOption[] | undefined>(undefined);
    const { add: addTag, search: searchTags } = useTags();

    useEffect(() => {
        if (selectedTags.length !== 0 && tagOptions === undefined) {
            loadTagOptions();
        }
    }, []);

    const loadTagOptions = (): void => {
        if (tagOptions !== undefined) {
            return;
        }

        setIsLoading(true);
        getTags().then(options => {
            setTagOptions(options);
            setIsLoading(false);
        });
    }

    const getTags = (): Promise<SelectOption[]> => {
        return searchTags({count: 999}).then(response => {
            return response.data.map(tag => {
                return { value: tag.id, label: tag.name };
            });
        });
    }

    const createTag = (tagName: string): Promise<void> => {
        if (tagOptions === undefined) {
            return Promise.resolve();
        }

        setIsLoading(true);
        return addTag({id: 0, name: tagName}).then(tag => {
            const newTag = { label: tag.name, value: tag.id };
            setTagOptions([...tagOptions, newTag]);
            onChange([...selectedTags, newTag]);
            setIsLoading(false);
        });
    }

    return <BaseMultiSelect 
                placeHolder={'Select Tags'}
                selectedOptions={selectedTags} 
                options={tagOptions ? tagOptions : []} 
                onCreate={createTag}
                onChange={onChange}
                onMenuOpen={loadTagOptions}
                isCreatable={isCreatable} 
                isLoading={isLoading}/>;
}
