import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext'; 
import { Form } from 'react-bootstrap';

type Entity = { id: number, name: string };

type Props<T extends Entity> = {
    request: T,
    onChange?: (tag: T) => void
}

export default function GenericUpdateForm<T extends Entity>({ request, onChange = () => {} }: Props<T>) {

    const [newName, setNewName] = useState<string>(request.name);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setNewName(request.name);
    }, [request]);

    useEffect(() => {
        onChange({
            ...request,
            name: newName
        });
    }, [newName]);

    return (
        <Form>
             <Form.Group>
                <Form.Label style={theme.style}>Name</Form.Label>
                <Form.Control 
                    style={theme.style} 
                    value={newName} 
                    onChange={(event) => setNewName(event.target.value)}/>
             </Form.Group>
        </Form>
    );
}
