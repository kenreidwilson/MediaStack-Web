import SelectOption from '../../types/SelectOption';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import CreatableSelect from 'react-select/creatable';
import Select, { CSSObjectWithLabel } from 'react-select';

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

    const { theme } = useContext(ThemeContext);

    const getSelectedOption = () => {
        if (selectedOption === undefined) {
            return undefined;
        }

        return options.find(o => o.value === selectedOption.value);
    }

    const customStyles = {
        menu: (provided: CSSObjectWithLabel) => ({ 
                ...provided,
                backgroundColor: theme.style.backgroundColor, 
                color: theme.style.color 
            }),
        control: (provided: CSSObjectWithLabel) => ({
            ...provided,
            backgroundColor: theme.style.backgroundColor, 
            color: theme.style.color
        })
    };

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
