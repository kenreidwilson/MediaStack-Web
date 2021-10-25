import Tag from '../../types/Tag';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { Button, Table } from 'react-bootstrap';

type Props = {
    tags: Tag[],
    onTagClick?: (tag: Tag) => void,
    onTagDelete?: (tag: Tag) => void,
    onTagEdit?: (tag: Tag) => void
}

interface TagInfo extends Tag {
    mediaCount?: number
}

export default function TagsTable({ 
    tags, 
    onTagClick = () => {}, 
    onTagDelete = () => {}, 
    onTagEdit = () => {} }: Props) {

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
                {tags.map(tag =>
                    <tr style={theme.style} key={tag.id}>
                        <td style={theme.style}>{tag.id}</td>
                        <td style={theme.style}><a onClick={() => onTagClick(tag)}>{tag.name}</a></td>
                        <td style={{ ...theme.style, color: theme.style.primaryColor }}>
                            <div className='spinner-border spinner-border-sm' role='status'></div>
                        </td>
                        <td style={theme.style}>
                            <Button style={{ marginRight: "5px"}} variant='primary' onClick={() => onTagEdit(tag)}>Edit</Button>
                            <Button variant='danger' onClick={() => onTagDelete(tag)}> Delete</Button>
                        </td>
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
