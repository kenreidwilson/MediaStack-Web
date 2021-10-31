import { Button } from 'react-bootstrap';

type Props = {
    onReset?: () => void,
    onSave?: () => void,
    onCancel?: () => void
}

export default function MediaOrganizeMenu({ onReset, onSave, onCancel }: Props) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '210px'}}>
            {onSave && <Button variant='primary' onClick={onSave}>Save</Button>}
            {onReset && <Button variant='secondary' onClick={onReset}>Reset</Button>}
            {onCancel && <Button variant='secondary' onClick={onCancel}>Cancel</Button>}
        </div>
    );
}
