import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

type Option = {
    label: string,
    value?: any
}

type Props = {
    placeHolder?: string,
    selectedOptions: Option[],
    getOptions: Function,
    createOption: Function,
    onChange: Function,
    isLoading?: boolean,
    isCreatable?: boolean
}

export default function BaseMultiSelect({ placeHolder, selectedOptions, getOptions, createOption, onChange, isLoading = false, isCreatable = false } : Props) {

    const [options, setOptions] = useState<Option[]>([]);

    useEffect(() => {
        getOptions().then(setOptions);
    }, []);

    // Needed because the select uses '==' to compare options.
    const getSelectedOptions = () => {
        let _selectedOptions: Option[] = [];

        selectedOptions.forEach(option => {
            _selectedOptions.push(selectedOptions.find(o => o.value === option.value) as Option);
        });

        return _selectedOptions;
    }

    const createAndSelectOption = (inputValue: any) => {
        createOption(inputValue).then((newOption: Option) => {
            setOptions([ ...options, newOption]);
            onChange([ ...getSelectedOptions(), newOption]);
        })
    }

    return (
    isCreatable ? 
        <CreatableSelect 
            placeholder={placeHolder}
            value={getSelectedOptions()}
            options={options}
            onChange={(newOptions: any) => onChange(newOptions ? newOptions : [])}
            onCreateOption={(inputValue: any) => createAndSelectOption(inputValue as string)}
            isSearchable
            isMulti
            isLoading={isLoading}
        /> :
        <Select
            placeholder={placeHolder}
            value={getSelectedOptions()}
            options={options}
            onChange={(newOptions: any) => onChange(newOptions ? newOptions : [])}
            isSearchable
            isMulti
            isLoading={isLoading}
        />
    );
}
