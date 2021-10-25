import Tag from '../../types/Tag';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import ISearchResponse from '../../types/ISearchResponse';
import { useEffect, useContext, useCallback } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';
import useTags from '../../hooks/useTags';
import usePaginatedPromiseData from '../../hooks/usePaginatedPromiseData';
import TagsTable from './TagsTable';
import MSPagination from '../Misc/MSPagination';

type Props = {
    baseQuery: IGenericSearchQuery,
    onTagClick?: (tag: Tag) => void,
    onTagDelete?: (tag: Tag) => void,
    onTagEdit?: (tag: Tag) => void
}

export default function PaginatedTagsTable({ baseQuery, onTagClick, onTagDelete, onTagEdit }: Props) {

    const { search } = useTags();
    const { addError } = useContext(ErrorContext);

    const getTags = useCallback(
        (start: number, end: number): Promise<ISearchResponse<Tag>> =>
            search({ ...baseQuery, count: end - start, offset: start })
    , [baseQuery]);

    const { isLoading, error, data: tags, totalPages, currentPage, setPage } = 
        usePaginatedPromiseData<Tag>({ getData: getTags, dataPerPage: 10 });

    useEffect(() => {
        if (error !== undefined) {
            addError(error);
        }
    }, [error]);

    return (
        isLoading || tags === undefined ? 
            <p>Loading...</p> : 
            <>
                <TagsTable 
                    tags={tags.data} 
                    onTagClick={onTagClick} 
                    onTagDelete={onTagDelete} 
                    onTagEdit={onTagEdit}/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <MSPagination 
                        pageNumber={currentPage} 
                        numberOfPages={totalPages}
                        onNavigate={setPage}/>
                </div>
            </>
    );
}
