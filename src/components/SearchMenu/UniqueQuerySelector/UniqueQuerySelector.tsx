import React, { useState } from 'react';
import Select from 'react-select';

type Item = {
    id: number,
    name: string
}

type Option = {
    label: string,
    value: any
}

type Request = {
    send: Function
}

type Props = {
    optionItems: Promise<Item[]>,
    onChange: Function,
    placeHolder: string
}

export default function UniqueQuerySelector({ optionItems, onChange, placeHolder }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(optionItems === null);
    const [options, setOptions] = useState<Option[] | null>(null);

    const loadOptions = () => {
        if (isLoading) {
            return;
        }

        setIsLoading(true);
        optionItems.then(items => {
            let options: Option[] = [];
            items.forEach((optionItem) => {
                options.push({ value: optionItem.id, label: optionItem.name });
            });
            setOptions(options);
        });
        setIsLoading(false);
    }

    return ( 
        <Select 
            placeholder={placeHolder || ""}
            options={options ? options as Option[] : []}
            onChange={(option: any) => onChange(option)}
            isSearchable
            isClearable
            isLoading={isLoading}
            onFocus={() => loadOptions()}
        />
     );
}
