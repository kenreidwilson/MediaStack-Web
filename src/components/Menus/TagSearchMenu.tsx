import IGenericSearchQuery from '../../types/IGenericSearchQuery';
import { useEffect, useState } from 'react';
import TagSearchForm from '../Forms/TagSearchForm';
import { Button } from 'react-bootstrap';

type Props = {
    initialQuery?: IGenericSearchQuery,
    onQueryUpdate?: (query: IGenericSearchQuery) => void,
    onSearch?: (query: IGenericSearchQuery) => void
}

export default function TagSearchMenu({ initialQuery = {}, onQueryUpdate = () => {}, onSearch = () => {} }: Props) {

    const [query, setQuery] = useState<IGenericSearchQuery>(initialQuery);

    useEffect(() => {
        onQueryUpdate(query);
    }, [query]);

    return (
        <>
            <TagSearchForm query={query} setQuery={setQuery}/>
            <Button onClick={() => onSearch(query)}>Search</Button>
        </>
    );
}
