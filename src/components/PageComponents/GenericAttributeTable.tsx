import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import { useState, useCallback } from 'react';
import GenericEditModal from '../Modals/GenericEditModal';
import GenericDeleteModal from '../Modals/GenericDeleteModal';
import GenericSearchMenu from '../Menus/GenericSearchMenu';
import PaginatedAttributeTable from '../Tables/PaginatedAttributeTable';
import { PaginatedData } from '../../hooks/usePaginatedPromiseData';

type Props<T> = {
    attributeName: string,
    onSelectAttribute?: (attribute: T) => void,
    search: (query: IGenericSearchQuery) => Promise<PaginatedData<T>>,
    update: (attribute: T) => Promise<T>,
    delete: (attribute: T) => Promise<void>
}

export default function GenericAttributeTable<T extends { id: number, name: string }>({ 
    attributeName, onSelectAttribute, search, update, delete: deleteAttribute }: Props<T>) {

    const [searchQuery, setSearchQuery] = useState<IGenericSearchQuery>({});

    const [{ selectedAttribute, showEditModal, showDeleteModal }, setModalState] =
    useState<{ selectedAttribute: T | undefined, showEditModal: boolean, showDeleteModal: boolean }>
        ({ selectedAttribute: undefined, showEditModal: false, showDeleteModal: false });

    const loadMoreAttributes: (start: number, end: number) => Promise<PaginatedData<T>> = useCallback(
        (start: number, end: number) =>
            search({ ...searchQuery, count: end - start, offset: start })
    , [searchQuery]);

    return (
        <>
            {selectedAttribute && <GenericEditModal
                entity={selectedAttribute}
                isShown={showEditModal}
                editEntity={update}
                title={`Edit ${attributeName}: ${selectedAttribute.id}`}
                onClose={() => setModalState({ selectedAttribute: undefined, showEditModal: false, showDeleteModal: false })}
                onSave={(tag) => { setModalState({ selectedAttribute: undefined, showEditModal: false, showDeleteModal: false }); setSearchQuery({}); }} />}

            {selectedAttribute && <GenericDeleteModal
                entity={selectedAttribute}
                isShown={showDeleteModal}
                deleteEntity={deleteAttribute}
                title={`Delete ${attributeName}: ${selectedAttribute.id}`}
                body={`Delete ${attributeName}: ${selectedAttribute.name}? (ID: ${selectedAttribute.id})`}
                onClose={() => setModalState({ selectedAttribute: undefined, showEditModal: false, showDeleteModal: false })}
                onSave={(tag) => { setModalState({ selectedAttribute: undefined, showEditModal: false, showDeleteModal: false }); setSearchQuery({}); }} />}

            <div style={{ width: '80%', margin: 'auto' }}>
                <GenericSearchMenu onSearch={setSearchQuery} />
            </div>

            <PaginatedAttributeTable<T>
                loadMore={loadMoreAttributes}
                onAttributeEdit={(attribute) => setModalState({ selectedAttribute: attribute, showEditModal: true, showDeleteModal: false })}
                onAttributeDelete={(attribute) => setModalState({ selectedAttribute: attribute, showEditModal: false, showDeleteModal: true })}
                onAttributeClick={onSelectAttribute}/>
        </>
    );
}
