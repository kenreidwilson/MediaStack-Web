import { useState } from 'react';
import { CategoryRepository } from '../../repositories/CategoryRepository';
import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from './SelectOption';

type Props = {
    selectedCategory?: SelectOption,
    onChange: (option?: SelectOption) => void,
    isCreatable?: boolean
}

export default function CategorySelect({ selectedCategory, onChange, isCreatable = false } : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const categories = new CategoryRepository();

    const getCategories = async () => {
        setIsLoading(true);
        return await categories.search({ count: 999 }).then(response => {
            let _options: SelectOption[] = [];
            response.categories.forEach(category => {
                _options.push({ value: category.id, label: category.name });
            });
            setIsLoading(false);
            return _options;
        });
    }

    const createCategory = async (name: string) => {
        setIsLoading(true);
        return await categories.add({ id: 0, name }).then(category => {
            setIsLoading(false);
            return { label: category.name, value: category.id };
        });
    }

    return (
        <BaseSingleSelect 
            placeHolder={"Select Category"} selectedOption={selectedCategory} getOptions={getCategories} createOption={createCategory} onChange={onChange} isCreatable={isCreatable} isLoading={isLoading}/>
        );
}