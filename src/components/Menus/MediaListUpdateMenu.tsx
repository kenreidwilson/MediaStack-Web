import { Button } from 'react-bootstrap';

type Props = {
    onEdit?: () => void,
    onSelectAll?: () => void,
    onDeselectAll?: () => void,
    onCancel?: () => void
}

export default function MediaListUpdateMenu({ 
    onEdit = () => {}, 
    onSelectAll = () => {}, 
    onDeselectAll = () => {},
    onCancel = () => {} }: Props) {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '350px'}}>
            <Button onClick={onEdit}>Edit</Button>
            <Button variant='secondary' onClick={onDeselectAll}>Deselect All</Button>
            <Button variant='secondary' onClick={onSelectAll}>Select All</Button>
            <Button variant='secondary' onClick={onCancel}>Cancel</Button>
        </div>
    );
}
