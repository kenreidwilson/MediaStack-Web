import Tag from '../../types/Tag';
import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import { useCallback } from 'react';
import useTags from '../../hooks/useTags';
import PaginatedAttributeTable from './PaginatedAttributeTable';

type Props = {
    baseQuery: IGenericSearchQuery,
    onTagClick?: (tag: Tag) => void,
    onTagDelete?: (tag: Tag) => void,
    onTagEdit?: (tag: Tag) => void
}

export default function PaginatedTagsTable({ baseQuery, onTagClick, onTagDelete, onTagEdit }: Props) {

    const { search } = useTags();

    const getTags = useCallback(
        (start: number, end: number) =>
            search({ ...baseQuery, count: end - start, offset: start })
    , [baseQuery]);

    return (
        <PaginatedAttributeTable 
            loadMore={getTags}
            onAttributeClick={onTagClick}
            onAttributeEdit={onTagDelete}
            onAttributeDelete={onTagEdit}
        />
    );
}
