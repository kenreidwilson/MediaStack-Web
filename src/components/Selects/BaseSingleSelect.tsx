import { useState, useEffect } from 'react';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import SelectOption from './SelectOption';

type Props = {
    placeHolder?: string,
    selectedOption?: SelectOption,
    getOptions: Function,
    createOption?: Function,
    onChange: Function,
    isLoading?: boolean,
    isCreatable?: boolean
}

export default function BaseSingleSelect({ placeHolder, selectedOption, getOptions, createOption, onChange, isLoading = false, isCreatable = false } : Props) {

    const [options, setOptions] = useState<SelectOption[]>([]);

    useEffect(() => {
        getOptions().then(setOptions);
    }, []);

    const getSelectedOption = () => {
        if (selectedOption === undefined) {
            return undefined;
        }

        return options.find(o => o.value === selectedOption.value);
    }

    const createAndSelectOption = (inputValue: any) => {
        if (createOption === undefined) {
            return;
        }

        createOption(inputValue).then((newOption: SelectOption) => {
            setOptions([ ...options, newOption]);
            onChange(getSelectedOption());
        })
    }

    return (
    isCreatable ? 
        <CreatableSelect 
            placeholder={placeHolder}
            value={getSelectedOption()}
            options={options}
            onChange={(newOptions: any) => onChange(newOptions ? newOptions : [])}
            onCreateOption={(inputValue: any) => createAndSelectOption(inputValue as string)}
            isSearchable
            isMulti={false}
            isLoading={isLoading}
        /> :
        <Select
            placeholder={placeHolder}
            value={getSelectedOption()}
            options={options}
            onChange={(newOptions: any) => onChange(newOptions ? newOptions : [])}
            isSearchable
            isMulti={false}
            isLoading={isLoading}
        />
    );
}
