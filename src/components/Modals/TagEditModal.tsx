import Tag from '../../types/Tag';
import { useEffect, useState } from 'react';
import BaseEditModal from './BaseEditModal';
import useTags from '../../hooks/useTags';

type Props = {
    tag: Tag,
    isShown: boolean,
    onClose?: () => void,
    onSave?: (updatedTag: Tag) => void
}

export default function TagEditModal({ tag, isShown, onClose, onSave = () => {} }: Props) {

    const { update } = useTags();
    const [newTagName, setNewTagName] = useState<string>('');

    useEffect(() => {
        setNewTagName('');
    }, [isShown]);

    const onTagSave = (): Promise<void> => {
        return update({ id: tag.id, name: newTagName }).then(onSave);
    };

    return (
        <BaseEditModal isShown={isShown} onClose={onClose} onSave={onTagSave}>
            <div className='tag_name_edit_div'>
                <p>New Name: </p>
                <form className='tag_name_edit_form'>
                    <input type='text' value={newTagName} onChange={(event) => setNewTagName(event.target.value as string)} />
                </form>
            </div>
        </BaseEditModal>
    );
}
