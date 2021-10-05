import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';
import SelectOption from '../types/SelectOption';

type Props = {
    options: SelectOption[],
    selectedOption?: SelectOption,
    placeHolder?: string,
    onCreate?: (inputValue: any) => void,
    onChange?: (selectedOption: SelectOption) => void,
    onMenuOpen?: () => void,
    isLoading?: boolean,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function BaseSingleSelect({ 
    placeHolder, 
    selectedOption, 
    options, 
    onCreate, 
    onChange, 
    onMenuOpen, 
    isLoading = false, 
    isCreatable = false, 
    isDisabled = false } : Props) {

    const getSelectedOption = () => {
        if (selectedOption === undefined) {
            return undefined;
        }

        return options.find(o => o.value === selectedOption.value);
    }

    return (
    isCreatable ? 
        <CreatableSelect 
            placeholder={placeHolder}
            value={getSelectedOption()}
            options={options}
            onChange={(newOptions: any) => onChange ? onChange(newOptions ? newOptions : []) : () => {}}
            onCreateOption={onCreate}
            onMenuOpen={onMenuOpen}
            isSearchable
            isMulti={false}
            isLoading={isLoading}
            isDisabled={isDisabled}
        /> :
        <Select
            placeholder={placeHolder}
            value={getSelectedOption()}
            options={options}
            onChange={(newOptions: any) => onChange ? onChange(newOptions ? newOptions : []) : () => {}}
            onMenuOpen={onMenuOpen}
            isSearchable
            isMulti={false}
            isLoading={isLoading}
            isDisabled={isDisabled}
        />
    ); 
}
