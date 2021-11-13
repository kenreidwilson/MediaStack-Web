import SelectOption from '../../types/SelectOption';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import { useState, useEffect } from 'react';
import useCategories from '../../hooks/useCategories';
import BaseSingleSelect from './BaseSingleSelect';

type Props = {
    selectedCategory?: SelectOption,
    onCategoryChange: (option?: SelectOption) => void,
    categoriesQuery?: IGenericSearchQuery,
    isCreatable?: boolean,
    isDisabled?: boolean
}

export default function CategorySelect({ categoriesQuery, selectedCategory, onCategoryChange, isCreatable = false, isDisabled = false } : Props) {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [categoryOptions, setCategoryOptions] = useState<SelectOption[] | undefined>(undefined);

    const { search, add } = useCategories();

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
            if (isCreatable) {
                setCategoryOptions([ { label: '<No Category>', value: null }, ...options ]);
            } else {
                setCategoryOptions(options);
            }
            setIsLoading(false);
        });
    }

    const getCategories = (): Promise<SelectOption[]> => {
        return search(categoriesQuery ?  categoriesQuery : { count: 999 }).then(response => {
            return response.data.map(category => {
               return { value: category.id, label: category.name };
            });
        });
    }

    const createCategory = (name: string): Promise<void> => {
        if (!categoryOptions) {
            return Promise.resolve();
        }

        setIsLoading(true);
        return add({ id: 0, name }).then(category => {
            const newCategory = { label: category.name, value: category.id };
            setCategoryOptions([...categoryOptions, newCategory ]);
            onCategoryChange(newCategory);
            setIsLoading(false);
        });
    }

    return (
        <BaseSingleSelect 
            placeHolder={'Select Category'} 
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
