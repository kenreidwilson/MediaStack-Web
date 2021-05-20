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
    request: Request,
    onChange: Function,
    placeHolder: string
}

export default function UniqueQuerySelector({ request, onChange, placeHolder }: Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<Option[] | null>(null);

    const loadOptions = () => {
        if (isLoading || options !== null) {
            return;
        }

        setIsLoading(true);
        request.send().then((response: Item[]) => {
            let options: Option[] = [];
            response.forEach((optionItem) => {
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
