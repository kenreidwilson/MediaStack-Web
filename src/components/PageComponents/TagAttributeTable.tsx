import Tag from '../../types/Tag';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import { useState } from 'react';
import useNavigation from '../../hooks/useNavigation';
import TagEditModal from '../Modals/TagEditModal';
import TagDeleteModal from '../Modals/TagDeleteModal';
import PaginatedTagsTable from '../Tables/PaginatedTagsTable';
import GenericSearchMenu from '../Menus/GenericSearchMenu';

export default function TagAttributeTable() {

    const { navigate } = useNavigation();

    const [query, setQuery] = useState<IGenericSearchQuery>({});

    const [{ selectedTag, showEditModal, showDeleteModal }, setModalState] =
        useState<{ selectedTag: Tag | undefined, showEditModal: boolean, showDeleteModal: boolean }>
            ({ selectedTag: undefined, showEditModal: false, showDeleteModal: false });

    return (
        <>
            {selectedTag && <TagEditModal
                tag={selectedTag}
                isShown={showEditModal}
                onClose={() => setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false })}
                onSave={(tag) => { setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false }); setQuery({}); }} />}

            {selectedTag && <TagDeleteModal
                tag={selectedTag}
                isShown={showDeleteModal}
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
