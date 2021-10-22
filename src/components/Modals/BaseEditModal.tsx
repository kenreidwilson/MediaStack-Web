import { useEffect, useState } from 'react';
import { Modal, Button }from 'react-bootstrap';

type Props = {
    children: JSX.Element,
    isShown: boolean,
    title?: string,
    onClose?: () => void,
    onSave?: () => Promise<void>
}

export default function BaseEditModal({ children, title, isShown, onClose = () => {}, onSave = () => Promise.resolve() }: Props) {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ errorMessage, setErrorMessage ] = useState<string>("");

    useEffect(() => {
        if (!isShown) {
            setIsLoading(false);
            setErrorMessage("");
        }
    }, [isShown]);

    const onSaveClick = (): void => {
        setIsLoading(true);
        try {
            onSave().then(() => setIsLoading(false));
        } catch (error: any) {
            setErrorMessage(error.message);
            setIsLoading(false);
        }
    }

    return (
        <>
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
                    <Button variant='primary' onClick={onSaveClick}>Save Changes {isLoading && "..."}</Button>
                </Modal.Footer>
            </Modal>
      </>
    );
}
