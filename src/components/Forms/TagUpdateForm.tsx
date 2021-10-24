import Tag from '../../types/Tag';
import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext'; 
import { Form } from 'react-bootstrap';

type Props = {
    request: Tag,
    onChange?: (tag: Tag) => void
}

export default function TagUpdateForm({ request, onChange = () => {} }: Props) {

    const [newTagName, setNewTagName] = useState<string>(request.name);

    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        setNewTagName(request.name);
    }, [request]);

    useEffect(() => {
        onChange({
            id: request.id,
            name: newTagName
        });
    }, [newTagName]);

    return (
        <Form>
             <Form.Group>
                <Form.Label style={theme.style}>Name</Form.Label>
                <Form.Control 
                    style={theme.style} 
                    value={newTagName} 
                    onChange={(event) => setNewTagName(event.target.value)}/>
             </Form.Group>
        </Form>
    );
}
