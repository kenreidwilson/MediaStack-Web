import IGenericSearchQuery from "../../types/IGenericSearchQuery";
import { useState, useEffect, useContext } from 'react';
import { Form } from 'react-bootstrap';
import { ThemeContext } from "../../contexts/ThemeContext";

type Props = {
    query: IGenericSearchQuery,
    setQuery: (query: IGenericSearchQuery) => void
}

export default function TagSearchForm({ query, setQuery }: Props) {

    const [fuzzyName, setFuzzyName] = useState<string | undefined>(query.fuzzyName);

    const getQuery = (): IGenericSearchQuery => {
        return {
            fuzzyName
        };
    }

    useEffect(() => {
        setQuery(getQuery());
    }, [fuzzyName]);

    const { theme } = useContext(ThemeContext);

    return (
        <Form>
            <Form.Group>
                <Form.Label style={theme.style}>Name</Form.Label>
                <Form.Control style={theme.style} value={fuzzyName} onChange={(e) => setFuzzyName(e.target.value)}/>
            </Form.Group>
        </Form>
    );
}
