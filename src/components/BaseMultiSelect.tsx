import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import SelectOption from '../types/SelectOption';

type Props = {
    placeHolder?: string,
    selectedOptions: SelectOption[],
    getOptions: Function,
    createOption?: Function,
    onChange: Function,
    isLoading?: boolean,
    isCreatable?: boolean
}

export default function BaseMultiSelect({ placeHolder, selectedOptions, getOptions, createOption, onChange, isLoading = false, isCreatable = false } : Props) {

    const [options, setOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        getOptions().then(setOptions);
    }, []);

    // Needed because the select uses '==' to compare options.
    const getSelectedOptions = () => {
        let _selectedOptions: SelectOption[] = [];

        selectedOptions.forEach(option => {
            _selectedOptions.push(selectedOptions.find(o => o.value === option.value) as SelectOption);
        });

        return _selectedOptions;
    }

    const createAndSelectOption = (inputValue: any) => {
        if (createOption === undefined) {
            return;
        }

        createOption(inputValue).then((newOption: SelectOption) => {
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
