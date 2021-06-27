import React, { useState } from 'react';
import Select from 'react-select';

import { TagsRequest } from '../../../api/requests/TagRequests'

type TagOption = {
    label: string,
    value?: number
}

type Props = {
    onChange: Function
}

export default function TagSelector({ onChange }: Props) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [tagOptions, setTagOptions] = useState<TagOption[]>();

    const loadTagOptions = () => {
        if (isLoading || tagOptions !== undefined) {
            return;
        }

        setIsLoading(true);
        new TagsRequest().send().then(response => {
            let _tagOptions: TagOption[] = [];
            response.tags.forEach((tag) => {
                _tagOptions.push({ value: tag.id, label: tag.name });
            });
            setTagOptions(_tagOptions);
        });
        setIsLoading(false);
    };

    return (
        <Select 
            placeholder="Enter Tags..."
            options={tagOptions ? tagOptions as TagOption[] : []}
            onChange={(selectedTagOptions: any) => onChange(selectedTagOptions)}
            cacheOptions
            isSearchable
            isMulti
            isLoading={isLoading}
            onFocus={() => loadTagOptions()}
        />
     );
}
