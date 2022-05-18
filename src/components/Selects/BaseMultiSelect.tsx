import { SelectOption } from '../../types';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

type Props = {
    options: SelectOption[],
    selectedOptions: SelectOption[],
    placeHolder?: string,
    onCreate?: (inputValue: any) => void,
    onChange?: (selectedOption: SelectOption[]) => void,
    onMenuOpen?: () => void,
    isLoading?: boolean,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function BaseMultiSelect({ 
    placeHolder, 
    selectedOptions, 
    options, 
    onCreate, 
    onChange, 
    onMenuOpen, 
    isLoading = false, 
    isCreatable = false,
    isDisabled = false } : Props) {

    // Needed because the select uses '==' to compare options.
    const getSelectedOptions = (): SelectOption[] => {
        if (options.length === 0) {
            return [];
        }

        let _options: SelectOption[] = [];

        for (let option of selectedOptions) {
            let selectedOption = options.find(o => o.value === option.value);
            if (selectedOption !== undefined) {
                _options.push(selectedOption);
            }
        }

        return _options;
    }

    return (
    isCreatable ? 
        <CreatableSelect 
            placeholder={placeHolder}
            value={getSelectedOptions()}
            options={options}
            onChange={(newOptions: any) => onChange ? onChange(newOptions ? newOptions : []) : () => {}}
            onCreateOption={onCreate}
            onMenuOpen={onMenuOpen}
            isSearchable
            isMulti
            isLoading={isLoading}
            isDisabled={isDisabled}
        /> :
        <Select
            placeholder={placeHolder}
            value={getSelectedOptions()}
            options={options}
            onChange={(newOptions: any) => onChange ? onChange(newOptions ? newOptions : []) : () => {}}
            onMenuOpen={onMenuOpen}
            isSearchable
            isMulti
            isLoading={isLoading}
            isDisabled={isDisabled}
        />
    );
}
