import { Category } from '../../types';
import useCategories from '../../hooks/useCategories';
import useNavigation from '../../hooks/useNavigation';
import GenericAttributeTable from '../PageComponents/GenericAttributeTable';

export default function CategoryAttributeTable() {

    const { navigate } = useNavigation();
    const { delete: deleteCategory, update, search } = useCategories();

    const onCategorySelect = (category: Category) => {
        navigate({ name: 'search', data: { categoryID: category.id } })
    }

    return (
        <GenericAttributeTable 
            attributeName='Category'
            onSelectAttribute={onCategorySelect}
            search={search}
            update={update}
            delete={deleteCategory}
        />
    );
}
