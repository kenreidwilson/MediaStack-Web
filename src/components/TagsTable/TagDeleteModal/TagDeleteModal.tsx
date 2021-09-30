import React from 'react';
import { Modal, Button } from "react-bootstrap";
import Tag from "../../../model/Tag";

type Props = {
    tag: Tag,
    isShown: boolean,
    onClose: Function,
    onDelete: Function
};

export default function TagDeleteModal({tag, isShown, onClose, onDelete}: Props) {

    return (
        <Modal show={isShown} onHide={() => onClose()}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Delete tag: {tag.name}? (ID: {tag.id})</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                <Button variant="primary" onClick={() => onDelete(tag)}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};
