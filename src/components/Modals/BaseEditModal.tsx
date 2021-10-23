import { useContext } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext'; 
import { Modal, Button } from 'react-bootstrap';

type Props = {
    children: JSX.Element,
    isShown: boolean,
    title?: string,
    errorMessage?: string,
    isLoading?: boolean,
    onClose?: () => void,
    onSave?: () => void
}

export default function BaseEditModal({ 
    children, 
    isShown, 
    title, 
    errorMessage,
    isLoading = false,
    onClose = () => {}, 
    onSave = () => {} }: Props) {

    const { theme } = useContext(ThemeContext);

    return (
        <Modal show={isShown} onHide={() => onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
                <p style={{ marginTop: "10px"}} className="text-danger">{errorMessage}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='secondary' onClick={onClose}>Close</Button>
                <Button variant='primary' onClick={onSave}>Save Changes {isLoading && "..."}</Button>
            </Modal.Footer>
        </Modal>
    );
}
