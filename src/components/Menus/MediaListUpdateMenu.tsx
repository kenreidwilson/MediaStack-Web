import { Button } from 'react-bootstrap';

type Props = {
    onEdit?: () => void,
    onSelectAll?: () => void,
    onDeselectAll?: () => void,
    onCancel?: () => void,
    onOrganize?: () => void
}

export default function MediaListUpdateMenu({ 
    onEdit, 
    onSelectAll, 
    onDeselectAll,
    onCancel,
    onOrganize }: Props) {

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '350px'}}>
            {onEdit && <Button onClick={onEdit}>Edit</Button>}
            {onDeselectAll && <Button variant='secondary' onClick={onDeselectAll}>Deselect All</Button>}
            {onSelectAll && <Button variant='secondary' onClick={onSelectAll}>Select All</Button>}
            {onCancel && <Button variant='secondary' onClick={onCancel}>Cancel</Button>}
            {onOrganize && <Button variant='primary' onClick={onOrganize}>Organize</Button>}
        </div>
    );
}
