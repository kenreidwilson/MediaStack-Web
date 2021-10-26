import Tag from '../types/Tag';
import IGenericSearchQuery from '../types/IGenericSearchQuery';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import { useState } from 'react';
import useNavigation from '../hooks/useNavigation';
import BasePage from './BasePage';
import TagEditModal from '../components/Modals/TagEditModal';
import TagDeleteModal from '../components/Modals/TagDeleteModal';
import PaginatedTagsTable from '../components/Tables/PaginatedTagsTable';
import TagSearchForm from '../components/Forms/TagSearchForm';

export default function TagsPage() {

    const { navigate } = useNavigation(); 

    const [query, setQuery] = useState<IGenericSearchQuery>({});
    const [ { selectedTag, showEditModal, showDeleteModal }, setModalState ] = 
        useState<{ selectedTag: Tag | undefined, showEditModal: boolean, showDeleteModal: boolean }>
            ({ selectedTag: undefined, showEditModal: false, showDeleteModal: false });

    return ( 
        <BasePage>
        <>
            {selectedTag && <TagEditModal 
                tag={selectedTag} 
                isShown={showEditModal} 
                onClose={() => setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false })} 
                onSave={(tag) => { setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false }); setQuery({}); }}/>} 

            {selectedTag && <TagDeleteModal
                tag={selectedTag}
                isShown={showDeleteModal}
                onClose={() => setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false })}
                onSave={(tag) => { setModalState({ selectedTag: undefined, showEditModal: false, showDeleteModal: false }); setQuery({}); }}/>}

            <div style={{ width: '80%', margin: 'auto' }}>
                <TagSearchForm query={query} setQuery={setQuery} />
            </div>
            
            <PaginatedTagsTable 
                baseQuery={query} 
                onTagEdit={(tag) => setModalState({ selectedTag: tag, showEditModal: true, showDeleteModal: false })}
                onTagDelete={(tag) => setModalState({ selectedTag: tag, showEditModal: false, showDeleteModal: true })}
                onTagClick={(tag: Tag) => navigate<IMediaSearchQuery>('/search', { whitelistTagIDs: [tag.id] })}/>
        </>
        </BasePage>
     );
}
