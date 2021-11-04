import Tag from '../../types/Tag';
import useTags from '../../hooks/useTags';
import useNavigation from '../../hooks/useNavigation';
import GenericAttributeTable from '../PageComponents/GenericAttributeTable';

export default function TagAttributeTable() {

    const { navigate } = useNavigation();
    const { delete: deleteTag, update, search } = useTags();

    const onSelectTag = (tag: Tag) => {
        navigate({ name: 'search', data: { whitelistTagIDs: [tag.id] } })
    }

    return (
        <GenericAttributeTable 
            attributeName='Tag'
            onSelectAttribute={onSelectTag}
            search={search}
            update={update}
            delete={deleteTag}
        />
    );
}
