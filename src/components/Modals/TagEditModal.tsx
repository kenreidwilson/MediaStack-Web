import Tag from '../../types/Tag';
import { useEffect, useState } from 'react';
import useTags from '../../hooks/useTags';
import usePromise from '../../hooks/usePromise';
import BaseEditModal from './BaseEditModal';

type Props = {
    tag: Tag,
    isShown: boolean,
    onClose?: () => void,
    onSave?: (updatedTag: Tag) => void
}

export default function TagEditModal({ tag, isShown, onClose, onSave = () => {} }: Props) {

    const { update } = useTags();
    const [newTagName, setNewTagName] = useState<string>('');
    const { isLoading, error, result, resolve } = usePromise(() => update({ id: tag.id, name: newTagName }));

    useEffect(() => {
        setNewTagName('');
    }, [isShown]);

    useEffect(() => {
        if (result) {
            onSave(result);
        }
    }, [result]);

    return (
        <BaseEditModal 
            title={`Edit Tag: ${tag.id}`}
            isShown={isShown}
            isLoading={isLoading}
            errorMessage={error?.message}
            onClose={onClose} 
            onSave={resolve}>
            <div className='tag_name_edit_div'>
                <p>New Name: </p>
                <form className='tag_name_edit_form'>
                    <input type='text' value={newTagName} onChange={(event) => setNewTagName(event.target.value as string)} />
                </form>
            </div>
        </BaseEditModal>
    );
}
