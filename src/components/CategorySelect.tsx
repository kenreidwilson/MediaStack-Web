import { useState, useEffect } from 'react';
import { CategoryRepository } from '../repositories/CategoryRepository';
import BaseSingleSelect from './BaseSingleSelect';
import SelectOption from '../types/SelectOption';
import { IGenericSearchQuery } from '../repositories/GenericRepository';

type Props = {
    selectedCategory?: SelectOption,
    onCategoryChange: (option?: SelectOption) => void,
    categoriesQuery?: IGenericSearchQuery,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function CategorySelect({ categoriesQuery, selectedCategory, onCategoryChange, isCreatable = false, isDisabled = false } : Props) {

    const categoryRepo = new CategoryRepository();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[] | undefined>(undefined);

    useEffect(() => {
        if (selectedCategory !== undefined && categoryOptions === undefined) {
            loadCategoryOptions();
        }
    });

    const loadCategoryOptions = (): void => {
        if (categoryOptions !== undefined) {
            return;
        }

        setIsLoading(true);
        getCategories().then(options => {
            setCategoryOptions(options);
            setIsLoading(false);
        });
    }

    const getCategories = (): Promise<SelectOption[]> => {
        return categoryRepo.search(categoriesQuery ?  categoriesQuery : { count: 999 }).then(response => {
            return response.categories.map(category => {
               return { value: category.id, label: category.name };
            });
        });
    }

    const createCategory = (name: string): Promise<void> => {
        if (!categoryOptions) {
            return Promise.resolve();
        }

        setIsLoading(true);
        return categoryRepo.add({ id: 0, name }).then(category => {
            const newCategory = { label: category.name, value: category.id };
            setCategoryOptions([...categoryOptions, newCategory ]);
            onCategoryChange(newCategory);
            setIsLoading(false);
        });
    }

    return (
        <BaseSingleSelect 
            placeHolder={"Select Category"} 
            selectedOption={selectedCategory} 
            options={categoryOptions ? categoryOptions : []} 
            onCreate={createCategory}
            onMenuOpen={loadCategoryOptions}
            onChange={onCategoryChange} 
            isCreatable={isCreatable} 
            isDisabled={isDisabled}
            isLoading={isLoading}/>
        );
}