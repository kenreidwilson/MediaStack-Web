import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Button, Table } from 'react-bootstrap';

type Attribute = { id: number, name: string };

type Props<T extends Attribute> = {
    attributeObjects: T[],
    onAttributeClick?: (attribute: T) => void,
    onAttributeEdit?: (attribute: T) => void,
    onAttributeDelete?: (attribute: T) => void
}

export default function AttributeTable<T extends Attribute>({
    attributeObjects,
    onAttributeClick = () => {},
    onAttributeEdit = () => {},
    onAttributeDelete = () => {}}: Props<T>) {

    const { theme } = useContext(ThemeContext);

    return (
        <Table>
            <thead>
                <tr>
                    <th style={{ ...theme.style, width: '5%' }}>ID</th>
                    <th style={{ ...theme.style, width: '20%' }}>Name</th>
                    <th style={{ ...theme.style, width: '60%' }}>Media Count</th>
                    <th style={{ ...theme.style, width: '15%', minWidth: '111px' }}>Manage</th>
                </tr>
            </thead>
            <tbody style={theme.style}>
                {attributeObjects.map(att =>
                    <tr style={theme.style} key={att.id}>
                        <td style={theme.style}>{att.id}</td>
                        <td style={theme.style}><a onClick={() => onAttributeClick(att)}>{att.name}</a></td>
                        <td style={{ ...theme.style, color: theme.style.primaryColor }}>
                            <div className='spinner-border spinner-border-sm' role='status'></div>
                        </td>
                        <td style={theme.style}>
                            <Button style={{ marginRight: "5px"}} variant='primary' onClick={() => onAttributeEdit(att)}>Edit</Button>
                            <Button variant='danger' onClick={() => onAttributeDelete(att)}> Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
