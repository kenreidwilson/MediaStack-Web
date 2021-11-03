import Tag from '../../types/Tag';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import { useState } from 'react';
import useTags from '../../hooks/useTags';
import useNavigation from '../../hooks/useNavigation';
import GenericEditModal from '../Modals/GenericEditModal';
import GenericDeleteModal from '../Modals/GenericDeleteModal';
import PaginatedTagsTable from '../Tables/PaginatedTagsTable';
import GenericSearchMenu from '../Menus/GenericSearchMenu';

export default function TagAttributeTable() {

    const { navigate } = useNavigation();
    const { delete: deleteTag, update: editTag } = useTags();

    const [query, setQuery] = useState<IGenericSearchQuery>({});

    const [{ selectedTag, showEditModal, showDeleteModal }, setModalState] =
        useState<{ selectedTag: Tag | undefined, showEditModal: boolean, showDeleteModal: boolean }>
            ({ selectedTag: undefined, showEditModal: false, showDeleteModal: false });

    return (
        <>
            {selectedTag && <GenericEditModal
                entity={selectedTag}
                isShown={showEditModal}
                editEntity={editTag}
                title={`Edit Tag: ${selectedTag.id}`}
                onClose={() => setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false })}
                onSave={(tag) => { setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false }); setQuery({}); }} />}

            {selectedTag && <GenericDeleteModal
                entity={selectedTag}
                isShown={showDeleteModal}
                deleteEntity={deleteTag}
                title={`Delete Tag: ${selectedTag.id}`}
                body={`Delete tag: ${selectedTag.name}? (ID: ${selectedTag.id})`}
                onClose={() => setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false })}
                onSave={(tag) => { setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false }); setQuery({}); }} />}

            <div style={{ width: '80%', margin: 'auto' }}>
                <GenericSearchMenu onSearch={setQuery} />
            </div>

            <PaginatedTagsTable
                baseQuery={query}
                onTagEdit={(tag) => setModalState({ selectedTag: tag, showEditModal: true, showDeleteModal: false })}
                onTagDelete={(tag) => setModalState({ selectedTag: tag, showEditModal: false, showDeleteModal: true })}
                onTagClick={(tag: Tag) => navigate({ name: 'search', data: { whitelistTagIDs: [tag.id] } })} />
        </>
    );
}
