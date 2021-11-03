import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import { useEffect, useState } from 'react';
import GenericSearchForm from '../Forms/GenericSearchForm';
import { Button } from 'react-bootstrap';

type Props = {
    initialQuery?: IGenericSearchQuery,
    onQueryUpdate?: (query: IGenericSearchQuery) => void,
    onSearch?: (query: IGenericSearchQuery) => void
}

export default function GenericSearchMenu({ initialQuery = {}, onQueryUpdate = () => {}, onSearch = () => {} }: Props) {

    const [query, setQuery] = useState<IGenericSearchQuery>(initialQuery);

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
