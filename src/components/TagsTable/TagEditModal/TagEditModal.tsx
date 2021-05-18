import React, { useState } from 'react';
import { Modal, Button } from "react-bootstrap";
import { TagNameChangeRequest } from '../../../api/requests/TagRequests';
import Tag from '../../../model/Tag';

type Props = {
    tag: Tag,
    isShown: boolean,
    onClose: Function,
    onEdit: Function
}

export default function TagEditModal({ tag, isShown, onClose, onEdit }: Props) {

    const [newTagName, setNewTagName] = useState<string | undefined>(undefined);

    const onTagEdit = () => {
        let tagName = newTagName as string;
        new TagNameChangeRequest(tag.id, tagName).send().then(edittedTag => {
            onEdit(edittedTag);
        });
    };

    return (
        <Modal show={isShown} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tag</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="tag_name_edit_div">
                    <p>New Name: </p>
                    <form className="tag_name_edit_form">
                        <input type="text" value={newTagName} onChange={(event) => setNewTagName(event.target.value as string)} />
                    </form>
                </div>
            </Modal.Body>
             <Modal.Footer>
                <Button variant="secondary" onClick={() => onClose()}>Close</Button>
                <Button variant="primary" onClick={() => onTagEdit()}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
}
