import Tag from '../types/Tag';
import IMediaSearchQuery from '../types/IMediaSearchQuery';
import useNavigation from '../hooks/useNavigation';
import BasePage from './BasePage';
import PaginatedTagsTable from '../components/Tables/PaginatedTagsTable';
import { useState } from 'react';
import IGenericSearchQuery from '../types/IGenericSearchQuery';
import TagEditModal from '../components/Modals/TagEditModal';

export default function TagsPage() {

    const { navigate } = useNavigation(); 

    const [query, setQuery] = useState<IGenericSearchQuery>({});
    const [selectedTag, setSelectedTag] = useState<Tag | undefined>();
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

    return ( 
        <BasePage>
        <>
            {selectedTag && <TagEditModal 
                tag={selectedTag} 
                isShown={showEditModal} 
                onClose={() => setShowEditModal(false)} 
                onSave={(tag) => setShowEditModal(false)}/>} 

            <button onClick={() => setQuery({ fuzzyname: 'asdf1' })}>asdf</button>
            <PaginatedTagsTable 
                baseQuery={query} 
                onTagEdit={(tag) => { setSelectedTag(tag); setShowEditModal(true); }}
                onTagClick={(tag: Tag) => navigate<IMediaSearchQuery>('/search', { whitelistTagIDs: [tag.id] })}/>
        </>
        </BasePage>
     );
}
