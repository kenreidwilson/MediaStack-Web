import { GenericSearchQuery } from '../../types';
import { useEffect, useState } from 'react';
import GenericSearchForm from '../Forms/GenericSearchForm';
import { Button } from 'react-bootstrap';

type Props = {
    initialQuery?: GenericSearchQuery,
    onQueryUpdate?: (query: GenericSearchQuery) => void,
    onSearch?: (query: GenericSearchQuery) => void
}

export default function GenericSearchMenu({ initialQuery = {}, onQueryUpdate = () => {}, onSearch = () => {} }: Props) {

    const [query, setQuery] = useState<GenericSearchQuery>(initialQuery);

    useEffect(() => {
        onQueryUpdate(query);
    }, [query]);

    return (
        <>
            <GenericSearchForm query={query} setQuery={setQuery}/>
            <Button onClick={() => onSearch(query)}>Search</Button>
        </>
    );
}
